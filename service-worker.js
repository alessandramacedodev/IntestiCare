
const CACHE_NAME = 'intesticare-cache-v2'; // Altere este valor para forçar atualização
const urlsToCache = [
  '/',
  '/index.html',
  '/sobre.html',
  '/contato.html',
  '/login.html',
  '/acesso.html',
  '/style.css',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // ativa imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // força controle imediato dos clients
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return fetch(event.request)
        .then(response => {
          // Atualiza o cache com a nova resposta
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => cached || fetch(event.request));
    })
  );
});
