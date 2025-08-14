import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { modelCacheManager } from '@/utils/modelCacheManager'

// Service Worker отключен для устранения network ошибок
// CORS ограничения вызывают проблемы с fetch в SW
console.log('🚫 Service Worker отключен для стабильной работы');

// Инициализируем modelCacheManager
modelCacheManager.init().catch(error => {
  console.warn('⚠️ Ошибка инициализации modelCacheManager:', error);
});

createRoot(document.getElementById("root")!).render(<App />);