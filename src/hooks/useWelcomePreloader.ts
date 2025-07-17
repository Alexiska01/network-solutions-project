import { useEffect, useState } from 'react';

interface WelcomePreloaderState {
  isWelcomeLoadingComplete: boolean;
  loadingProgress: number;
}

export const useWelcomePreloader = (heroData: any[]): WelcomePreloaderState => {
  const [isWelcomeLoadingComplete, setIsWelcomeLoadingComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadWelcome = async () => {
      console.log('🚀 Быстрая загрузка WelcomeScreen');
      
      // Быстрая анимация прогресса за 3 секунды
      setLoadingProgress(20);
      setTimeout(() => setLoadingProgress(50), 500);
      setTimeout(() => setLoadingProgress(80), 1000);
      setTimeout(() => setLoadingProgress(100), 1500);
      
      // Завершаем через 3 секунды
      setTimeout(() => {
        setIsWelcomeLoadingComplete(true);
        console.log('✅ WelcomeScreen готов!');
      }, 3000);
    };

    loadWelcome();
  }, [heroData]);

  return {
    isWelcomeLoadingComplete,
    loadingProgress
  };
};