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
        
        // Запускаем фоновую загрузку обеих серий параллельно
        console.log('📥 Запускаю фоновую загрузку 3530 и 3730 серий');
        setLoadingProgress(10);
        
        // Фоновая загрузка 3530 серии
        preloadModel(firstModelUrl).then(() => {
          console.log('✅ 3530 серия полностью загружена в фоне');
        }).catch(error => {
          console.warn('⚠️ Ошибка фоновой загрузки 3530:', error);
        });
        
        // Фоновая загрузка 3730 серии
        preloadModel(secondModelUrl).then(() => {
          console.log('✅ 3730 серия полностью загружена в фоне');
        }).catch(error => {
          console.warn('⚠️ Ошибка фоновой загрузки 3730:', error);
        });
        
        // Имитируем прогресс загрузки
        setTimeout(() => setLoadingProgress(30), 500);
        setTimeout(() => setLoadingProgress(50), 1000);
        setTimeout(() => setLoadingProgress(70), 1500);
        setTimeout(() => setLoadingProgress(90), 2000);
        
        // Завершаем показ WelcomeScreen
        setTimeout(() => {
          setLoadingProgress(100);
          setIsWelcomeLoadingComplete(true);
          console.log('🎉 WelcomeScreen предзагрузка завершена!');
        }, 2500);
        
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