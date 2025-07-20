// Service Worker для агрессивного кэширования 3D моделей
const CACHE_NAME = 'models-cache-v3'; // Обновили версию для нового CDN
const VERCEL_CDN = 'https://models-static-anummr3hg-alexiskas-projects.vercel.app';
const MODEL_URLS = [
  `${VERCEL_CDN}/3530all.glb`,
  `${VERCEL_CDN}/3730all.glb`,
  `${VERCEL_CDN}/4530all.glb`,
  `${VERCEL_CDN}/6010all.glb`
];

// Установка - предзагружаем модели
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Предзагружаю 3D модели...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          MODEL_URLS.map(url => {
            return fetch(url)
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
      })
  );
  
  self.skipWaiting();
});

// Перехват запросов к моделям
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Если это запрос к нашим моделям или Vercel CDN
  if (MODEL_URLS.includes(url) || url.startsWith(VERCEL_CDN)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('🎯 Модель из кэша:', url);
            return response;
          }
          
          // Если нет в кэше, загружаем и кэширем
          // Vercel CDN автоматически использует HTTP/2 и оптимизированную доставку
          return fetch(event.request, {
            // Используем высокий приоритет для моделей
            priority: 'high',
            // Vercel CDN поддерживает HTTP/2 Server Push
            mode: 'cors',
            credentials: 'omit'
          })
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone);
                    console.log('✅ Модель закэширована из CDN:', url);
                  });
              }
              return response;
            });
        })
    );
  }
});

// Активация - удаляем старые кеши
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker активирован');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Удаляем старые версии кеша
          if (cacheName !== CACHE_NAME && cacheName.startsWith('models-cache')) {
            console.log('🗑️ Удаляю старый кеш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});