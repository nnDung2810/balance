const assets = ['/', 'sw-register.js'];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open('assets').then((cache) => {
      cache.addAll(assets);
    }),
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cachedResponse) => {
      const fetchPromise = fetch(evt.request).then((networkResponse) => {
        caches.open('assets').then((cache) => {
          cache.put(evt.request, networkResponse.clone());
          return networkResponse;
        });
      });
      return cachedResponse || fetchPromise;
    }),
  );
});
