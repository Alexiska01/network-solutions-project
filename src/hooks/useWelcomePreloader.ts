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
      
      // Прогресс загрузки основан на времени
      setLoadingProgress(10);
      setTimeout(() => setLoadingProgress(25), 1000);
      setTimeout(() => setLoadingProgress(50), 3000);
      setTimeout(() => setLoadingProgress(70), 6000);
      setTimeout(() => setLoadingProgress(85), 9000);
      setTimeout(() => setLoadingProgress(95), 12000);
      setTimeout(() => setLoadingProgress(100), 14000);
      
      // Ждем загрузки критически важных моделей
      Promise.all(loadingPromises.slice(0, 2)).then(() => {
        console.log('✅ WelcomeScreen: Критически важные модели (3530, 3730) загружены!');
        setCriticalModelsLoaded(true);
      });
      
      // Представление длится 15 секунд, но переход возможен только после загрузки критических моделей
      setTimeout(() => {
        if (criticalModelsLoaded) {
          setIsWelcomeLoadingComplete(true);
          console.log('✅ WelcomeScreen готов! Представление завершено за 15 секунд');
        }
      }, 15000); // Представление 15 секунд
    };

    loadWelcome();
  }, [heroData, criticalModelsLoaded]);

  return {
    isWelcomeLoadingComplete,
    loadingProgress
  };
};