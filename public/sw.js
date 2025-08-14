// Профессиональный Service Worker с надёжным error handling
const CACHE_VERSION = 'v7';
const CACHE_NAME = `idata-cache-${CACHE_VERSION}`;
const CRITICAL_CACHE = `idata-critical-${CACHE_VERSION}`;
const MODEL_CACHE = `idata-models-${CACHE_VERSION}`;
const IMAGE_CACHE = `idata-images-${CACHE_VERSION}`;

// Критические ресурсы для офлайн работы
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json'
];

// 3D модели для кэширования
const MODEL_URLS = [
  '/models/3530all.glb',
  '/models/3730all.glb',
  '/models/4530all.glb',
  '/models/6010all.glb',
  '/models/IDS3530-24P.glb',
  '/models/IDS3530-24T.glb',
  '/models/IDS3530-24S.glb'
];

// Критические изображения
const CRITICAL_IMAGES = [
  '/img/ЛОГО.png',
  '/img/КРОК.png',
  '/img/Инфосэл.png',
  '/img/САТЕЛ.png',
  '/img/инлайн.png',
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing...');
  
  event.waitUntil(
    Promise.allSettled([
      // Кэшируем критические ресурсы
      cacheResources(CRITICAL_CACHE, CRITICAL_RESOURCES, 'критические ресурсы'),
      // Кэшируем изображения
      cacheResources(IMAGE_CACHE, CRITICAL_IMAGES, 'изображения'),
      // Предзагружаем модели в фоне (не блокируем установку)
      preloadModelsInBackground()
    ]).then((results) => {
      console.log('✅ Service Worker: Installation complete');
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`⚠️ Cache operation ${index} failed:`, result.reason);
        }
      });
      // Принудительно активируем новый SW
      return self.skipWaiting();
    })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Очищаем старые кэши
      cleanOldCaches(),
      // Берём контроль над всеми клиентами
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker: Activated and ready');
    })
  );
});

// Обработка fetch запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Обрабатываем только GET запросы
  if (request.method !== 'GET') return;
  
  const url = new URL(request.url);
  
  // Определяем стратегию кэширования
  if (isModelRequest(url)) {
    event.respondWith(cacheFirstStrategy(request, MODEL_CACHE));
  } else if (isCriticalImage(url)) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
  } else if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME));
  } else if (isHTMLRequest(url)) {
    event.respondWith(networkFirstStrategy(request, CACHE_NAME));
  } else {
    event.respondWith(networkFirstStrategy(request, CACHE_NAME));
  }
});

// Утилиты для кэширования
async function cacheResources(cacheName, resources, description) {
  try {
    const cache = await caches.open(cacheName);
    const validResources = [];
    
    // Проверяем каждый ресурс отдельно
    for (const resource of resources) {
      try {
        const response = await fetch(resource, { 
          method: 'HEAD',
          cache: 'no-cache'
        });
        if (response.ok) {
          validResources.push(resource);
        } else {
          console.warn(`⚠️ Resource not available: ${resource}`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to check resource: ${resource}`, error);
      }
    }
    
    if (validResources.length > 0) {
      await cache.addAll(validResources);
      console.log(`✅ Cached ${validResources.length} ${description}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to cache ${description}:`, error);
    throw error;
  }
}

async function preloadModelsInBackground() {
  // Загружаем модели в фоне, не блокируя установку
  setTimeout(async () => {
    try {
      await cacheResources(MODEL_CACHE, MODEL_URLS, '3D модели');
    } catch (error) {
      console.warn('⚠️ Background model preloading failed:', error);
    }
  }, 2000);
  
  return Promise.resolve();
}

async function cleanOldCaches() {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.startsWith('idata-') && !name.includes(CACHE_VERSION)
    );
    
    await Promise.all(
      oldCaches.map(cacheName => {
        console.log(`🗑️ Deleting old cache: ${cacheName}`);
        return caches.delete(cacheName);
      })
    );
    
    console.log(`🧹 Cleaned ${oldCaches.length} old caches`);
  } catch (error) {
    console.warn('⚠️ Cache cleanup failed:', error);
  }
}

// Стратегии кэширования
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Cache-first strategy failed:', error);
    
    // Пытаемся найти в любом кэше
    const fallbackResponse = await caches.match(request);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    
    return new Response('Resource unavailable offline', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Network request failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Resource unavailable', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Проверки типов запросов
function isModelRequest(url) {
  return MODEL_URLS.some(modelUrl => url.pathname.endsWith(modelUrl));
}

function isCriticalImage(url) {
  return CRITICAL_IMAGES.some(imageUrl => url.pathname.includes(imageUrl));
}

function isStaticAsset(url) {
  return /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|webp|glb)$/.test(url.pathname);
}

function isHTMLRequest(url) {
  return url.pathname === '/' || (!url.pathname.includes('.') && !url.pathname.startsWith('/api/'));
}

console.log('🚀 Professional Service Worker initialized');