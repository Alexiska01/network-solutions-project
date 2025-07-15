// Service Worker для агрессивного кэширования 3D моделей
const CACHE_NAME = 'models-cache-v1';
const MODEL_URLS = [
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-all.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-all.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS6010-all.glb'
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
  
  // Если это запрос к нашим моделям
  if (MODEL_URLS.includes(url)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('🎯 Модель из кэша:', url);
            return response;
          }
          
          // Если нет в кэше, загружаем и кэширем
          return fetch(event.request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone);
                  });
              }
              return response;
            });
        })
    );
  }
});

// Активация
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker активирован');
  event.waitUntil(self.clients.claim());
});