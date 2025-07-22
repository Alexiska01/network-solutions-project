import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { modelCacheManager } from '@/utils/modelCacheManager'

// Регистрируем Service Worker для кэширования моделей
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🚀 Service Worker зарегистрирован для кэширования моделей');
      })
      .catch((error) => {
        console.warn('⚠️ Ошибка регистрации Service Worker:', error);
      });
  });
}

// Инициализируем modelCacheManager
modelCacheManager.init().catch(error => {
  console.warn('⚠️ Ошибка инициализации modelCacheManager:', error);
});

createRoot(document.getElementById("root")!).render(<App />);