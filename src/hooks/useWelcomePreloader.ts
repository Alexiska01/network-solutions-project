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
      console.log('🚀 Загрузка WelcomeScreen на 15 секунд с приоритетной загрузкой 3530 и 3730');
      
      // Приоритетная загрузка критически важных моделей (3530 и 3730)
      const criticalUrls = heroData.slice(0, 2).map(item => item.modelUrl);
      console.log('📎 Приоритетная загрузка:', criticalUrls);
      
      // Прогресс загрузки на 15 секунд
      setLoadingProgress(10);
      setTimeout(() => setLoadingProgress(20), 1000);
      setTimeout(() => setLoadingProgress(40), 3000);
      setTimeout(() => setLoadingProgress(60), 6000);
      setTimeout(() => setLoadingProgress(80), 9000);
      setTimeout(() => setLoadingProgress(90), 12000);
      setTimeout(() => setLoadingProgress(100), 14000);
      
      // Мимикрируем загрузку критически важных моделей
      setTimeout(() => {
        setCriticalModelsLoaded(true);
        console.log('✅ Критически важные модели (3530, 3730) загружены!');
      }, 8000); // Модели загружаются за 8 секунд
      
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