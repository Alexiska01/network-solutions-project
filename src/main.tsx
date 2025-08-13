import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { modelCacheManager } from '@/utils/modelCacheManager'

// СУПЕР АГРЕССИВНАЯ регистрация Service Worker
if ('serviceWorker' in navigator) {
  // Регистрируем НЕМЕДЛЕННО, не ждём load
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('🔥 СУПЕР Service Worker зарегистрирован для максимальной производительности');
      
      // Принудительное обновление SW если есть новая версия
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Обновление Service Worker - перезагружаем через 1 сек');
              setTimeout(() => window.location.reload(), 1000);
            }
          });
        }
      });
    })
    .catch((error) => {
      console.warn('⚠️ Ошибка регистрации СУПЕР Service Worker:', error);
    });
}

// Инициализируем modelCacheManager
modelCacheManager.init().catch(error => {
  console.warn('⚠️ Ошибка инициализации modelCacheManager:', error);
});

createRoot(document.getElementById("root")!).render(<App />);