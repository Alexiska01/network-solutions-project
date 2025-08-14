// СУПЕР АГРЕССИВНЫЙ Service Worker для максимальной производительности
const CACHE_NAME = 'idata-super-cache-v6';
const CRITICAL_CACHE = 'idata-critical-v6';
const MODEL_CACHE = 'idata-models-v6';
const IMAGE_CACHE = 'idata-images-v6';

// Критические ресурсы - кэшируем НАВСЕГДА
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json'
];

// 3D Модели - кэшируем на год
const MODEL_URLS = [
  '/models/3530all.glb',
  '/models/3730all.glb',
  '/models/4530all.glb',
  '/models/6010all.glb',
  '/models/IDS3530-24P.glb',
  '/models/IDS3530-24T.glb',
  '/models/IDS3530-24S.glb'
];

// Критические изображения - кэшируем навсегда
const CRITICAL_IMAGES = [
  // Используем локальные изображения вместо CDN
  '/img/164ca65e-bdb4-4caa-89fb-0459f4ca4138.jpg'
];

// Установка SW - СУПЕР агрессивное кэширование
self.addEventListener('install', (event) => {
  console.log('🚀 СУПЕР Service Worker: Установка с агрессивным кэшированием');
  
  event.waitUntil(
    Promise.all([
      // Критические ресурсы
      caches.open(CRITICAL_CACHE).then(cache => {
        console.log('⚡ Кэшируем критические ресурсы');
        return cache.addAll(CRITICAL_RESOURCES).catch(err => {
          console.warn('⚠️ Ошибка кэширования критических ресурсов:', err);
        });
      }),
      
      // 3D модели с высоким приоритетом
      caches.open(MODEL_CACHE).then(cache => {
        console.log('🎯 Кэшируем 3D модели');
        return Promise.all(
          MODEL_URLS.map(url => {
            return fetch(url, {
              priority: 'high',
              mode: 'cors',
              credentials: 'omit'
            })
            .then(response => {
              if (response.ok) {
                console.log('✅ Модель закэширована:', url);
                return cache.put(url, response);
              }
            })
            .catch(err => {
              console.warn('⚠️ Ошибка кэширования модели:', url, err);
            });
          })
        );
      }),
      
      // Критические изображения
      caches.open(IMAGE_CACHE).then(cache => {
        console.log('🖼️ Кэшируем критические изображения');
        return Promise.all(
          CRITICAL_IMAGES.map(url => {
            return fetch(url, {
              mode: 'cors',
              credentials: 'omit'
            })
            .then(response => {
              if (response.ok) {
                console.log('✅ Изображение закэшировано:', url);
                return cache.put(url, response);
              }
            })
            .catch(err => {
              console.warn('⚠️ Ошибка кэширования изображения:', url, err);
            });
          })
        );
      })
    ]).then(() => {
      // Принудительно активируем новый SW
      console.log('✅ Все ресурсы предзагружены, активируем SW');
      self.skipWaiting();
    })
  );
});

// Активация - берём контроль немедленно
self.addEventListener('activate', (event) => {
  console.log('✅ СУПЕР Service Worker активирован');
  
  event.waitUntil(
    Promise.all([
      // Удаляем старые кэши
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.includes('v5')) {
              console.log('🗑️ Удаляем старый кэш:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Берём контроль над всеми клиентами
      self.clients.claim()
    ])
  );
});

// Fetch - СУПЕР агрессивная стратегия кэширования
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;
  
  // Игнорируем не-GET запросы
  if (request.method !== 'GET') return;
  
  // 3D МОДЕЛИ - максимальный приоритет, кэш НАВСЕГДА
  if (MODEL_URLS.some(modelUrl => url.endsWith(modelUrl))) {
    event.respondWith(superCacheFirst(request, MODEL_CACHE, '🎯 Модель'));
  }
  
  // КРИТИЧЕСКИЕ ИЗОБРАЖЕНИЯ - кэш навсегда
  else if (CRITICAL_IMAGES.some(imageUrl => url.includes(imageUrl))) {
    event.respondWith(superCacheFirst(request, IMAGE_CACHE, '🖼️ Изображение'));
  }
  
  // СТАТИЧЕСКИЕ РЕСУРСЫ - агрессивное кэширование
  else if (isStaticAsset(request)) {
    event.respondWith(aggressiveCache(request, CACHE_NAME, '📦 Статика'));
  }
  
  // HTML СТРАНИЦЫ - кэш с обновлением в фоне
  else if (isHTMLPage(request)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME, '📄 HTML'));
  }
  
  // ВСЁ ОСТАЛЬНОЕ - стандартное кэширование
  else {
    event.respondWith(standardCache(request, CACHE_NAME, '🌐 Прочее'));
  }
});

// Проверки типов ресурсов
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|webp|glb)$/);
}

function isHTMLPage(request) {
  const url = new URL(request.url);
  return url.pathname === '/' || !url.pathname.includes('.');
}

// СУПЕР кэш - ресурс НИКОГДА не перезагружается
async function superCacheFirst(request, cacheName, logPrefix) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log(`⚡ ${logPrefix} из СУПЕР кэша:`, request.url);
    return cachedResponse;
  }
  
  try {
    console.log(`🌐 ${logPrefix} загружаем ПЕРВЫЙ раз:`, request.url);
    const networkResponse = await fetch(request, {
      priority: 'high',
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (networkResponse.ok) {
      // Кэшируем НАВСЕГДА
      await cache.put(request, networkResponse.clone());
      console.log(`✅ ${logPrefix} закэширован НАВСЕГДА:`, request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.warn(`❌ ${logPrefix} недоступен:`, request.url, error);
    return new Response(`${logPrefix} offline`, { status: 503 });
  }
}

// Агрессивное кэширование - долгий TTL
async function aggressiveCache(request, cacheName, logPrefix) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Проверяем возраст кэша (24 часа)
    const cachedDate = new Date(cachedResponse.headers.get('sw-cached-date') || 0);
    const now = new Date();
    const ageHours = (now - cachedDate) / (1000 * 60 * 60);
    
    if (ageHours < 24) {
      console.log(`⚡ ${logPrefix} из агрессивного кэша:`, request.url);
      return cachedResponse;
    }
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Добавляем метку времени кэширования
      const responseClone = networkResponse.clone();
      const headers = new Headers(responseClone.headers);
      headers.set('sw-cached-date', new Date().toISOString());
      
      const newResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      });
      
      await cache.put(request, newResponse);
      console.log(`✅ ${logPrefix} обновлён в агрессивном кэше:`, request.url);
    }
    
    return networkResponse;
  } catch (error) {
    // Возвращаем старый кэш даже если устарел
    if (cachedResponse) {
      console.log(`🔄 ${logPrefix} из СТАРОГО кэша (офлайн):`, request.url);
      return cachedResponse;
    }
    
    return new Response(`${logPrefix} offline`, { status: 503 });
  }
}

// Stale While Revalidate - для HTML страниц
async function staleWhileRevalidate(request, cacheName, logPrefix) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Обновляем в фоне
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
      console.log(`🔄 ${logPrefix} обновлён в фоне:`, request.url);
    }
    return response;
  }).catch(() => {
    console.warn(`⚠️ ${logPrefix} не удалось обновить:`, request.url);
  });
  
  if (cachedResponse) {
    console.log(`⚡ ${logPrefix} из кэша + обновление в фоне:`, request.url);
    return cachedResponse;
  }
  
  return fetchPromise;
}

// Стандартное кэширование
async function standardCache(request, cacheName, logPrefix) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log(`✅ ${logPrefix} закэширован:`, request.url);
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log(`🔄 ${logPrefix} из резервного кэша:`, request.url);
      return cachedResponse;
    }
    
    return new Response(`${logPrefix} offline`, { status: 503 });
  }
}

console.log('🔥🚀 СУПЕР АГРЕССИВНЫЙ Service Worker готов к работе!');