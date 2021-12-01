/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-1493741';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./povidky_o_manzelstvi_a_o_sexu_001.html","./povidky_o_manzelstvi_a_o_sexu_002.html","./povidky_o_manzelstvi_a_o_sexu_005.html","./povidky_o_manzelstvi_a_o_sexu_006.html","./povidky_o_manzelstvi_a_o_sexu_007.html","./povidky_o_manzelstvi_a_o_sexu_008.html","./povidky_o_manzelstvi_a_o_sexu_009.html","./povidky_o_manzelstvi_a_o_sexu_010.html","./povidky_o_manzelstvi_a_o_sexu_011.html","./povidky_o_manzelstvi_a_o_sexu_012.html","./povidky_o_manzelstvi_a_o_sexu_013.html","./povidky_o_manzelstvi_a_o_sexu_014.html","./povidky_o_manzelstvi_a_o_sexu_015.html","./povidky_o_manzelstvi_a_o_sexu_016.html","./povidky_o_manzelstvi_a_o_sexu_017.html","./povidky_o_manzelstvi_a_o_sexu_018.html","./povidky_o_manzelstvi_a_o_sexu_019.html","./povidky_o_manzelstvi_a_o_sexu_020.html","./povidky_o_manzelstvi_a_o_sexu_021.html","./povidky_o_manzelstvi_a_o_sexu_022.html","./povidky_o_manzelstvi_a_o_sexu_023.html","./povidky_o_manzelstvi_a_o_sexu_024.html","./povidky_o_manzelstvi_a_o_sexu_025.html","./povidky_o_manzelstvi_a_o_sexu_026.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_povidky_o_manzel_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
