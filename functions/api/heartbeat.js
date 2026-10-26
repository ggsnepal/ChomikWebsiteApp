// POST /api/heartbeat  (called by the Chomik bot every ~120s)
// Exactly ONE KV write per request (key "bot").
const BUCKET_SECONDS = 600; // 10 minutes
const BUCKETS = 144; // 24h

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

async function safeEqual(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

const num = (v, min, max, fallback) => {
  v = Number(v);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
};

export async function onRequestPost({ request, env }) {
  if (!env.STATUS_TOKEN || !env.STATUS_KV) {
    return json({ error: 'status not configured' }, 503);
  }
  const auth = request.headers.get('Authorization') || '';
  const given = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!(await safeEqual(given, env.STATUS_TOKEN)) || !given) {
    return json({ error: 'unauthorized' }, 401);
  }

  let body;
  try { body = await request.json(); } catch { return json({ error: 'invalid json' }, 400); }
  if (!body || typeof body !== 'object') return json({ error: 'invalid body' }, 400);

  const now = Math.floor(Date.now() / 1000);
  const latency = Math.round(num(body.latency_ms, 0, 60000, 0));
  const startedAt = Math.round(num(body.started_at, 0, now, now));
  const guilds = body.guilds === undefined ? undefined : Math.round(num(body.guilds, 0, 1e7, 0));
  const shuttingDown = body.shutting_down === true;

  let prev = null;
  try { prev = await env.STATUS_KV.get('bot', 'json'); } catch { prev = null; }

  const cur = Math.floor(now / BUCKET_SECONDS);
  let h = Array.isArray(prev && prev.h) ? prev.h.map(Boolean) : [];
  let lb = prev && Number.isFinite(prev.lb) ? prev.lb : cur;
  if (h.length === 0) {
    h = [true];
  } else if (cur > lb) {
    const missed = Math.min(cur - lb - 1, BUCKETS);
    for (let i = 0; i < missed; i++) h.push(false);
    h.push(true);
  } else {
    h[h.length - 1] = true;
  }
  if (h.length > BUCKETS) h = h.slice(h.length - BUCKETS);

  const state = {
    last: now,
    latency_ms: latency,
    started_at: startedAt,
    shutting_down: shuttingDown,
    h,
    lb: Math.max(cur, lb),
  };
  if (guilds !== undefined) state.guilds = guilds;
  else if (prev && prev.guilds !== undefined) state.guilds = prev.guilds;

  await env.STATUS_KV.put('bot', JSON.stringify(state));
  return json({ ok: true });
}
