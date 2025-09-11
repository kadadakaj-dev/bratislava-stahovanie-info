const CACHE_NAME = 'viandmo-pwa-v2'; // Incremented version for cache busting
const urlsToCache = [
  '/',
  '/index.html',
  // In a real build, asset URLs with hashes would be injected here.
  // Dynamic caching in the fetch handler will cache other assets on the fly.
];

// Install: Open cache and add core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching core assets');
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
            console.log('Deleting old cache:', cacheName);
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

  // For HTML pages, use Network Falling Back to Cache strategy
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If response is good, clone it and cache it for offline use
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, serve the page from the cache
          return caches.match(request.url) || caches.match('/');
        })
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