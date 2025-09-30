const CACHE_NAME = 'viandmo-pwa-v3'; // Increment version for new strategy
const RUNTIME_API_CACHE = 'viandmo-api-v1';
const IMAGE_CACHE = 'viandmo-img-v1';
const urlsToCache = [
  '.',
  'index.html',
  // In a real build, asset URLs with hashes would be injected here.
  // Dynamic caching in the fetch handler will cache other assets on the fly.
];

// Install: Open cache and add core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches to remove outdated data
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Implement intelligent caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;

  // Network first for navigation requests (app shell fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const net = await fetch(request);
          if (net && net.ok) {
            const clone = net.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
            return net;
          }
          throw new Error('Bad response');
        } catch {
          return (await caches.match(request)) || (await caches.match('.')) || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' }});
        }
      })()
    );
    return;
  }

  // API proxy network-first with fallback to cache
  if (request.url.includes('/api/ai-proxy')) {
    event.respondWith(
      (async () => {
        try {
          const net = await fetch(request);
          const clone = net.clone();
            caches.open(RUNTIME_API_CACHE).then(c => c.put(request, clone));
            return net;
        } catch {
          return (await caches.match(request)) || new Response(JSON.stringify({ error: 'Offline' }), { status: 503 });
        }
      })()
    );
    return;
  }

  // Images: stale-while-revalidate separate cache
  if (request.destination === 'image') {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        const fetchPromise = fetch(request).then(net => {
          caches.open(IMAGE_CACHE).then(c => c.put(request, net.clone()));
          return net;
        }).catch(() => cached);
        return cached || fetchPromise;
      })()
    );
    return;
  }

  // For other requests (CSS, JS, images), use Stale-While-Revalidate strategy
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Fetch from network in the background to update the cache
        const fetchPromise = fetch(request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });
        // Return cached response immediately if available, otherwise wait for fetch
        return cachedResponse || fetchPromise;
      })
  );
});