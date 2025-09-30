const CACHE_VERSION = 'v5';
const APP_SHELL_CACHE = `viandmo-shell-${CACHE_VERSION}`; // HTML / core
const STATIC_CACHE = `viandmo-static-${CACHE_VERSION}`; // hashed static assets (js, css)
const RUNTIME_API_CACHE = `viandmo-api-${CACHE_VERSION}`;
const IMAGE_CACHE = `viandmo-img-${CACHE_VERSION}`;
const IMAGE_CACHE_MAX_ENTRIES = 80; // Basic upper bound for responsive variants
const FONT_CACHE = `viandmo-font-${CACHE_VERSION}`;
const APP_SHELL_URLS = [
  '.',
  'index.html',
];

// Install: Open cache and add core assets
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(APP_SHELL_CACHE);
      await shell.addAll(APP_SHELL_URLS);
    })()
  );
  self.skipWaiting();
});

// Activate: Clean up old caches to remove outdated data
self.addEventListener('activate', event => {
  const whitelist = [APP_SHELL_CACHE, STATIC_CACHE, RUNTIME_API_CACHE, IMAGE_CACHE, FONT_CACHE];
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map(n => { if (!whitelist.includes(n)) return caches.delete(n); }));
      await self.clients.claim();
    })()
  );
});

// Fetch: Implement intelligent caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;

  // Ignore non-GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigation requests: network-first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const net = await fetch(request);
        if (net && net.ok) {
          const clone = net.clone();
          caches.open(APP_SHELL_CACHE).then(c => c.put(request, clone));
          return net;
        }
        throw new Error('Bad response');
      } catch {
        return (await caches.match(request)) || (await caches.match('index.html')) || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
      }
    })());
    return;
  }

  // Static immutable assets (heuristic: hashed filenames) - cache-first
  if (/\.(?:js|css|woff2?|ttf)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const net = await fetch(request);
        if (net.ok) cache.put(request, net.clone());
        return net;
      } catch (e) {
        return cached || new Response('', { status: 504 });
      }
    })());
    return;
  }

  // Fonts: cache-first
  if (request.destination === 'font') {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const net = await fetch(request);
        if (net.ok) cache.put(request, net.clone());
        return net;
      } catch { return cached || new Response('', { status: 504 }); }
    })());
    return;
  }

  // API: stale-while-revalidate with max-age simulation (store timestamp in cache metadata not available -> rely on network)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_API_CACHE);
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then(net => {
        if (net && net.ok) cache.put(request, net.clone());
        return net;
      }).catch(() => cached || new Response(JSON.stringify({ error: 'Offline' }), { status: 503 }));
      return cached || fetchPromise;
    })());
    return;
  }

  // Images: stale-while-revalidate with basic cache size control.
  if (request.destination === 'image') {
    event.respondWith((async () => {
      const cache = await caches.open(IMAGE_CACHE);
      // Normalize cache key for responsive variants (strip trailing dimension that only differs by format?)
      // For external placeholder service we cache by full URL; improvement placeholder for real CDN logic.
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then(async net => {
        if (net && net.ok) {
          await cache.put(request, net.clone());
          // Enforce max entries (naive LRU: list keys & delete oldest)
          const keys = await cache.keys();
            if (keys.length > IMAGE_CACHE_MAX_ENTRIES) {
              await cache.delete(keys[0]);
            }
        }
        return net;
      }).catch(() => cached);
      return cached || fetchPromise;
    })());
    return;
  }

  // Default: stale-while-revalidate for miscellaneous (e.g. JSON config)
  event.respondWith((async () => {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    const fetchPromise = fetch(request).then(net => { if (net && net.ok) cache.put(request, net.clone()); return net; }).catch(() => cached);
    return cached || fetchPromise;
  })());
});