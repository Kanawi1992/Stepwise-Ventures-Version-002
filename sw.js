const CACHE = "stepwise-v3";
const FILES = ["./", "index.html", "lending.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "bag-black.jpg", "bag-brown.jpg", "bag-main.jpg", "cardholder-open.jpg", "cardholders.jpg", "cover.jpg", "detail-carbon.jpg", "detail-cash.jpg", "detail-slots.jpg", "logo.png", "slim-closed.jpg", "slim-open.jpg", "slim-wide.jpg", "sofa-colours.jpg", "sofa-main.jpg", "sofa-ottoman.jpg", "sofa-valve.jpg", "wallet-main.jpg", "watch-back.jpg", "watch-engraving.jpg", "watch-front.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
