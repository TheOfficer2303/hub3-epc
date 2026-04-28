// HUB3 → EPC QR PWA Service Worker
// Strategy: cache-first for app shell and libraries, network-first for HTML

const CACHE_NAME = 'hub3-epc-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  // External libs (will be cached on first successful fetch)
  'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',
  'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js',
  // Fonts
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&display=swap',
];

// Install: pre-cache app shell. Don't fail if some external resources fail.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache local resources strictly (must succeed)
      const local = APP_SHELL.filter(u => !u.startsWith('http'));
      await cache.addAll(local);
      // Cache external resources optimistically (don't fail install)
      const external = APP_SHELL.filter(u => u.startsWith('http'));
      await Promise.allSettled(
        external.map(url => fetch(url, { mode: 'no-cors' }).then(res => cache.put(url, res)))
      );
      self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for everything, network fallback, then cached HTML for offline navigation
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((response) => {
        // Cache successful responses for next time
        if (response.ok && (req.url.startsWith(self.location.origin) ||
            req.url.includes('jsdelivr.net') || req.url.includes('fonts.'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
