/* Service Worker for caching .glb models and offline fallback */
/* build id placeholder: __BUILD_ID__ */

const VERSION = '__BUILD_ID__';
const STATIC_CACHE = `static-${VERSION}`;
const MODEL_CACHE = `models-${VERSION}`;
const OFFLINE_URL = '/offline.html';

// Patterns
const GLB_REGEX = /\/models\/(.+)\.glb$/i;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll([OFFLINE_URL]);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.endsWith(VERSION)).map(k => caches.delete(k)));
    clients.claim();
  })());
});

/**
 * Strategy:
 *  - GLB: stale-while-revalidate (serve cache fast, update in background)
 *  - Other navigation: network-first with offline fallback
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  if (GLB_REGEX.test(url.pathname)) {
    event.respondWith(glbHandler(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(pageHandler(request));
    return;
  }
});

async function glbHandler(request) {
  const cache = await caches.open(MODEL_CACHE);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(async res => {
    if (res.ok) {
      cache.put(request, res.clone());
    }
    return res;
  }).catch(() => cached); // fallback to cached if network fails
  return cached || fetchPromise;
}

async function pageHandler(request) {
  try {
    const res = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, res.clone());
    return res;
  } catch (e) {
    const cache = await caches.open(STATIC_CACHE);
    const offline = await cache.match(OFFLINE_URL);
    return offline || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
  }
}

// Cleanup old GLB entries exceeding 1 year or > N entries (simple heuristic)
async function trimModelCache(maxEntries = 30) {
  const cache = await caches.open(MODEL_CACHE);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  // FIFO delete oldest by order (Cache API preserves insertion order)
  for (let i = 0; i < keys.length - maxEntries; i++) {
    await cache.delete(keys[i]);
  }
}

self.addEventListener('message', evt => {
  if (evt.data === 'trim-model-cache') {
    trimModelCache().catch(() => {});
  }
});
