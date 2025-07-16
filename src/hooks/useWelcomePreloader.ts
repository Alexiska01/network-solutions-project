import { useEffect, useState } from 'react';
import { useModelPreloader } from './useModelPreloader';

interface WelcomePreloaderState {
  isWelcomeLoadingComplete: boolean;
  loadingProgress: number;
}

export const useWelcomePreloader = (heroData: any[]): WelcomePreloaderState => {
  const [isWelcomeLoadingComplete, setIsWelcomeLoadingComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const { isModelReady, isModelPartiallyReady, preloadModel, preloadModelPartially } = useModelPreloader();

  useEffect(() => {
    const loadWelcomeModels = async () => {
      try {
        const firstModelUrl = heroData[0]?.modelUrl; // 3530
        const secondModelUrl = heroData[1]?.modelUrl; // 3730
        
        if (!firstModelUrl || !secondModelUrl) {
          console.error('❌ Не найдены URL моделей');
          setIsWelcomeLoadingComplete(true);
          return;
        }

        console.log('🚀 Начинаю умную предзагрузку в WelcomeScreen');
        
        // Этап 1: Загружаем 3530 полностью (0% -> 50%)
        console.log('📥 Загружаю 3530 серию полностью:', firstModelUrl);
        setLoadingProgress(10);
        
        await preloadModel(firstModelUrl);
        console.log('✅ 3530 серия полностью загружена');
        setLoadingProgress(50);
        
        // Этап 2: Имитируем загрузку 70% от 3730 и запускаем фоновую загрузку
        console.log('📥 Запускаю загрузку 3730 серии в фоне:', secondModelUrl);
        setLoadingProgress(60);
        
        // Запускаем фоновую загрузку 3730 (не ждем завершения)
        preloadModel(secondModelUrl).then(() => {
          console.log('✅ 3730 серия полностью загружена в фоне');
        }).catch(error => {
          console.warn('⚠️ Ошибка фоновой загрузки 3730:', error);
        });
        
        // Имитируем прогресс загрузки (70% готово)
        setTimeout(() => {
          setLoadingProgress(90);
        }, 1000);
        
        // Небольшая задержка для UX
        setTimeout(() => {
          setLoadingProgress(100);
          setIsWelcomeLoadingComplete(true);
          console.log('🎉 WelcomeScreen предзагрузка завершена!');
        }, 500);
        
      } catch (error) {
        console.error('❌ Ошибка предзагрузки в WelcomeScreen:', error);
        // Все равно переходим, чтобы не блокировать интерфейс
        setIsWelcomeLoadingComplete(true);
      }
    };

    loadWelcomeModels();
  }, [heroData, preloadModel, preloadModelPartially]);

  return {
    isWelcomeLoadingComplete,
    loadingProgress
  };
};