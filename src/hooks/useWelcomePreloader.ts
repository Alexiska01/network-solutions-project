import { useEffect, useState } from 'react';
import { useProgressCounter } from './useProgressCounter';

interface WelcomePreloaderState {
  isWelcomeLoadingComplete: boolean;
  loadingProgress: number;
}

export const useWelcomePreloader = (heroData: any[]): WelcomePreloaderState => {
  const [isWelcomeLoadingComplete, setIsWelcomeLoadingComplete] = useState(false);
  const [criticalModelsLoaded, setCriticalModelsLoaded] = useState(false);
  
  // Профессиональный счетчик прогресса с оптимизацией для мобильных
  const { progress: loadingProgress, start: startProgress, isComplete: progressComplete } = useProgressCounter({
    duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 10000 : 15000, // Быстрее на мобильных
    updateInterval: typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 50, // Реже обновления на мобильных
    onComplete: () => {
      console.log('✅ Progress Counter: Достигнут 100%');
    }
  });

  // Загрузка моделей
  useEffect(() => {
    console.log('🚀 WelcomeScreen: Запуск системы загрузки');
    
    // Запускаем счетчик сразу
    startProgress();
    
    const loadModels = async () => {
      // Получаем все URL моделей
      const allUrls = heroData.map(item => item.modelUrl);
      console.log('📎 WelcomeScreen: URL моделей:', allUrls);
      
      // Приоритетная загрузка критически важных моделей (3530 и 3730)
      const criticalUrls = heroData.slice(0, 2).map(item => item.modelUrl);
      console.log('⚡ WelcomeScreen: Приоритетная загрузка:', criticalUrls);
      
      // Начинаем загрузку всех моделей параллельно
      const loadingPromises = allUrls.map(async (url, index) => {
        try {
          console.log(`🔄 WelcomeScreen: Загрузка модели ${index + 1}/4 - ${url}`);
          const response = await fetch(url, { method: 'HEAD' });
          if (response.ok) {
            console.log(`✅ WelcomeScreen: Модель ${index + 1} загружена - ${url}`);
          } else {
            console.warn(`⚠️ WelcomeScreen: Модель ${index + 1} недоступна - ${url}`);
          }
        } catch (error) {
          console.error(`❌ WelcomeScreen: Ошибка загрузки модели ${index + 1} - ${url}:`, error);
        }
      });
      
      // Ждем загрузки критически важных моделей
      try {
        await Promise.all(loadingPromises.slice(0, 2));
        console.log('✅ WelcomeScreen: Критически важные модели (3530, 3730) загружены!');
        setCriticalModelsLoaded(true);
      } catch (error) {
        console.error('❌ WelcomeScreen: Ошибка загрузки критических моделей:', error);
        // Даже при ошибке разрешаем переход через некоторое время
        setTimeout(() => setCriticalModelsLoaded(true), 5000);
      }
    };

    loadModels();
  }, [heroData, startProgress]);

  // Отслеживание завершения загрузки
  useEffect(() => {
    if (progressComplete && criticalModelsLoaded) {
      console.log('🎉 WelcomeScreen: Все условия выполнены - прогресс 100% и критические модели загружены');
      setIsWelcomeLoadingComplete(true);
    }
  }, [progressComplete, criticalModelsLoaded]);

  // Принудительное завершение с адаптацией для мобильных (safety net)
  useEffect(() => {
    const timeout = typeof window !== 'undefined' && window.innerWidth < 768 ? 12000 : 16000; // Быстрее на мобильных
    const safetyTimeout = setTimeout(() => {
      console.log(`🚨 WelcomeScreen: Принудительное завершение через ${timeout/1000} секунд`);
      setIsWelcomeLoadingComplete(true);
    }, timeout);

    return () => clearTimeout(safetyTimeout);
  }, []);

  return {
    isWelcomeLoadingComplete,
    loadingProgress
  };
};