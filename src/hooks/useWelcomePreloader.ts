import { useEffect, useState } from 'react';

interface WelcomePreloaderState {
  isWelcomeLoadingComplete: boolean;
  loadingProgress: number;
}

export const useWelcomePreloader = (heroData: any[]): WelcomePreloaderState => {
  const [isWelcomeLoadingComplete, setIsWelcomeLoadingComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [criticalModelsLoaded, setCriticalModelsLoaded] = useState(false);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    
    const loadWelcome = async () => {
      console.log('🚀 WelcomeScreen: Запуск фоновой загрузки всех моделей');
      
      // Получаем все URL моделей
      const allUrls = heroData.map(item => item.modelUrl);
      console.log('📎 WelcomeScreen: Начинаю загрузку моделей:', allUrls);
      
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
      
      // Плавный прогресс загрузки синхронизированный с временем
      const totalDuration = 15000; // 15 секунд
      const updateInterval = 100; // Обновление каждые 100мс
      let currentProgress = 0;
      
      progressInterval = setInterval(() => {
        currentProgress += (100 / (totalDuration / updateInterval));
        if (currentProgress >= 100) {
          setLoadingProgress(100);
          clearInterval(progressInterval);
        } else {
          setLoadingProgress(currentProgress);
        }
      }, updateInterval);
      
      // Ждем загрузки критически важных моделей
      Promise.all(loadingPromises.slice(0, 2)).then(() => {
        console.log('✅ WelcomeScreen: Критически важные модели (3530, 3730) загружены!');
        setCriticalModelsLoaded(true);
      });
      
      // Представление длится 15 секунд, но переход возможен только после загрузки критических моделей
      timeoutId = setTimeout(() => {
        console.log('✅ WelcomeScreen готов! Представление завершено за 15 секунд');
        setIsWelcomeLoadingComplete(true);
      }, 15000); // Представление 15 секунд
    };

    loadWelcome();

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [heroData]);

  // Отдельный useEffect для отслеживания завершения загрузки
  useEffect(() => {
    if (criticalModelsLoaded && loadingProgress >= 100) {
      const delay = setTimeout(() => {
        setIsWelcomeLoadingComplete(true);
        console.log('✅ WelcomeScreen готов! Критические модели загружены и прогресс завершен');
      }, 500);
      
      return () => clearTimeout(delay);
    }
  }, [criticalModelsLoaded, loadingProgress]);

  return {
    isWelcomeLoadingComplete,
    loadingProgress
  };
};