// GET /api/status  -> bot state from KV + live Roblox API probes (Roblox only). Cached 30s.
const BUCKET_SECONDS = 600;
const BUCKETS = 144;
const ONLINE_WINDOW = 300; // seconds

const PROBES = [
  { name: 'Users', host: 'users.roblox.com', path: '/v1/users/1' },
  { name: 'Friends', host: 'friends.roblox.com', path: '/v1/users/1/friends/count' },
  { name: 'Games', host: 'games.roblox.com', path: '/v1/games?universeIds=1' },
  { name: 'Thumbnails', host: 'thumbnails.roblox.com', path: '/v1/users/avatar-headshot?userIds=1&size=48x48&format=Png' },
  { name: 'Badges', host: 'badges.roblox.com', path: '/v1/badges/1' },
  { name: 'Groups', host: 'groups.roblox.com', path: '/v2/groups?groupIds=1' },
  { name: 'Game passes', host: 'apis.roblox.com', path: '/game-passes/v1/game-passes/1/product-info' },
  { name: 'Website', host: 'www.roblox.com', path: '/' },
];

async function probe(p) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  const t0 = Date.now();
  try {
    const res = await fetch('https://' + p.host + p.path, {
      signal: ctrl.signal,
      redirect: 'manual',
      headers: { Accept: 'application/json', 'User-Agent': 'ChomikStatus/1.0' },
    });
    const ms = Date.now() - t0;
    try { res.body && res.body.cancel(); } catch {}
    let status = 'operational';
    if (res.status >= 500) status = 'down';
    else if (res.status === 429 || ms > 3000) status = 'degraded';
    return { name: p.name, host: p.host, status, ms };
  } catch {
    return { name: p.name, host: p.host, status: 'down', ms: null };
  } finally {
    clearTimeout(timer);
  }
}

async function readBot(env) {
  if (!env.STATUS_KV) {
    return { configured: false, bot: { online: false, latency_ms: null, uptime_seconds: null, availability_24h: null, history: [], last_seen: null } };
  }
  let s = null;
  try { s = await env.STATUS_KV.get('bot', 'json'); } catch { s = null; }
  const now = Math.floor(Date.now() / 1000);
  if (!s) {
    return { configured: true, bot: { online: false, latency_ms: null, uptime_seconds: null, availability_24h: null, history: [], last_seen: null } };
  }
  const online = !s.shutting_down && now - s.last < ONLINE_WINDOW;
  const cur = Math.floor(now / BUCKET_SECONDS);
  let h = Array.isArray(s.h) ? s.h.map(Boolean) : [];
  const lb = Number.isFinite(s.lb) ? s.lb : cur;
  // buckets that passed since the last heartbeat were missed
  const gap = Math.min(Math.max(cur - lb, 0), BUCKETS);
  for (let i = 0; i < gap; i++) h.push(false);
  if (h.length > BUCKETS) h = h.slice(h.length - BUCKETS);
  // the in-progress bucket is not counted against availability while it is empty
  let counted = h;
  if (counted.length && !counted[counted.length - 1] && cur > lb && online) counted = counted.slice(0, -1);
  const up = counted.filter(Boolean).length;
  const availability = counted.length ? Math.round((up / counted.length) * 1000) / 10 : null;
  return {
    configured: true,
    bot: {
      online,
      latency_ms: online ? s.latency_ms : null,
      uptime_seconds: online && s.started_at ? Math.max(0, now - s.started_at) : null,
      availability_24h: availability,
      history: h,
      last_seen: s.last,
    },
  };
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const cacheKey = new Request(url.origin + url.pathname);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const [botPart, roblox] = await Promise.all([readBot(env), Promise.all(PROBES.map(probe))]);
  const body = {
    now: Math.floor(Date.now() / 1000),
    configured: botPart.configured,
    bot: botPart.bot,
    roblox,
  };
  const res = new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' },
  });
  const put = cache.put(cacheKey, res.clone());
  if (typeof context.waitUntil === 'function') context.waitUntil(put); else await put;
  return res;
}
