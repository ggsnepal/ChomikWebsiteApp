// GET /api/gameicon?g=<key>  -> a game's icon image, looked up on Roblox server-side (the browser can't call
// Roblox's thumbnail API directly). Only the keys listed below are served, so this is not an open proxy.
// If a lookup picks the wrong game, put the right id in `universeId` and it will be used directly.
const GAMES = {
  'anything-could-be-a-secret': { q: 'Anything Could Be A Secret', universeId: null },
  'secret-universe': { q: 'Secret Universe', universeId: null },
  'find-the-chomiks': { q: 'Find the Chomiks', universeId: null },
  'find-the-markers': { q: 'Find the Markers', universeId: null },
};

const UA = { 'User-Agent': 'ChomikSite/1.0', Accept: 'application/json' };

async function findUniverse(q) {
  try {
    const r = await fetch('https://apis.roblox.com/search-api/omni-search?searchQuery=' + encodeURIComponent(q) +
      '&sessionId=' + crypto.randomUUID() + '&pageType=all', { headers: UA });
    if (r.ok) {
      const j = await r.json();
      for (const g of j.searchResults || []) {
        if (String(g.contentGroupType).toLowerCase() === 'game' && g.contents && g.contents[0]) return g.contents[0].universeId;
      }
    }
  } catch {}
  return null;
}

export async function onRequestGet(context) {
  const key = new URL(context.request.url).searchParams.get('g') || '';
  const game = GAMES[key];
  if (!game) return new Response('not found', { status: 404 });

  const cache = caches.default;
  const cacheKey = new Request(new URL(context.request.url).origin + '/api/gameicon?g=' + key);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const uid = game.universeId || await findUniverse(game.q);
  if (!uid) return new Response('not found', { status: 404 });
  try {
    const t = await fetch('https://thumbnails.roblox.com/v1/games/icons?universeIds=' + uid +
      '&returnPolicy=PlaceHolder&size=256x256&format=Png&isCircular=false', { headers: UA });
    const tj = await t.json();
    const url = tj.data && tj.data[0] && tj.data[0].imageUrl;
    if (!url) return new Response('not found', { status: 404 });
    const img = await fetch(url);
    if (!img.ok) return new Response('not found', { status: 404 });
    const res = new Response(img.body, {
      headers: { 'Content-Type': img.headers.get('Content-Type') || 'image/png', 'Cache-Control': 'public, max-age=86400' },
    });
    context.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  } catch {
    return new Response('error', { status: 502 });
  }
}
