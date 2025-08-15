import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { modelCacheManager } from '@/utils/modelCacheManager'

// Регистрация Service Worker (только в production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ SW зарегистрирован', reg.scope))
      .catch(err => console.warn('⚠️ SW регистрация: ошибка', err));
  });
} else {
  console.log('🧪 SW: пропущена регистрация (dev или нет поддержки)');
}

// Инициализируем modelCacheManager
modelCacheManager.init().catch(error => {
  console.warn('⚠️ Ошибка инициализации modelCacheManager:', error);
});

createRoot(document.getElementById("root")!).render(<App />);