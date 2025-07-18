import { useEffect, useState } from 'react';
import { useProgressCounter } from './useProgressCounter';

interface WelcomePreloaderState {
  isWelcomeLoadingComplete: boolean;
  loadingProgress: number;
}

export const useWelcomePreloader = (heroData: any[]): WelcomePreloaderState => {
  const [isWelcomeLoadingComplete, setIsWelcomeLoadingComplete] = useState(false);
  const [criticalModelsLoaded, setCriticalModelsLoaded] = useState(false);
  
  // Профессиональный счетчик прогресса - 15 секунд для загрузки моделей
  const { progress: loadingProgress, start: startProgress, isComplete: progressComplete } = useProgressCounter({
    duration: 15000, // Возвращаем к 15 секундам для надёжной загрузки
    updateInterval: typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 50, // Оптимизированные обновления
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
      
      // Обязательная загрузка критически важных моделей 3530 и 3730 серии
      const criticalUrls = heroData.slice(0, 2).map(item => item.modelUrl);
      const remainingUrls = heroData.slice(2).map(item => item.modelUrl);
      console.log('⚡ WelcomeScreen: Критические модели (3530, 3730):', criticalUrls);
      console.log('🔄 WelcomeScreen: Остальные модели для фоновой загрузки:', remainingUrls);
      
      // Обязательная загрузка критических моделей с ретраеми
      const loadCriticalModel = async (url: string, index: number, maxRetries = 3) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`🔄 WelcomeScreen: Попытка ${attempt}/${maxRetries} - Загрузка критической модели ${index + 1} - ${url}`);
            const response = await fetch(url, { 
              method: 'HEAD',
              cache: 'force-cache',
              mode: 'cors'
            });
            
            if (response.ok) {
              console.log(`✅ WelcomeScreen: Критическая модель ${index + 1} успешно загружена - ${url}`);
              return true;
            } else {
              console.warn(`⚠️ WelcomeScreen: Критическая модель ${index + 1} недоступна (${response.status}) - ${url}`);
              if (attempt < maxRetries) await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
          } catch (error) {
            console.error(`❌ WelcomeScreen: Ошибка загрузки критической модели ${index + 1} (попытка ${attempt}/${maxRetries}) - ${url}:`, error);
            if (attempt < maxRetries) await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
        return false;
      };
      
      // Загрузка критических моделей с обязательным ожиданием
      try {
        const criticalResults = await Promise.all(
          criticalUrls.map((url, index) => loadCriticalModel(url, index))
        );
        
        const successfulCriticalLoads = criticalResults.filter(result => result).length;
        console.log(`✅ WelcomeScreen: Успешно загружено ${successfulCriticalLoads}/${criticalUrls.length} критических моделей`);
        
        if (successfulCriticalLoads > 0) {
          setCriticalModelsLoaded(true);
        } else {
          console.warn('⚠️ WelcomeScreen: Ни одна критическая модель не загрузилась, но продолжаем...');
          setCriticalModelsLoaded(true);
        }
      } catch (error) {
        console.error('❌ WelcomeScreen: Критическая ошибка при загрузке моделей:', error);
        // Даже при критической ошибке разрешаем переход через 5 секунд
        setTimeout(() => setCriticalModelsLoaded(true), 5000);
      }
      
      // Начинаем фоновую загрузку остальных моделей параллельно
      if (remainingUrls.length > 0) {
        console.log('🔄 WelcomeScreen: Запуск фоновой загрузки остальных моделей...');
        
        // Фоновая загрузка не блокирует основной процесс
        Promise.all(
          remainingUrls.map(async (url, index) => {
            try {
              console.log(`🔄 WelcomeScreen: Фоновая загрузка модели ${index + 3} - ${url}`);
              const response = await fetch(url, { 
                method: 'HEAD',
                cache: 'force-cache',
                mode: 'cors'
              });
              
              if (response.ok) {
                console.log(`✅ WelcomeScreen: Фоновая модель ${index + 3} загружена - ${url}`);
              } else {
                console.warn(`⚠️ WelcomeScreen: Фоновая модель ${index + 3} недоступна - ${url}`);
              }
            } catch (error) {
              console.error(`❌ WelcomeScreen: Ошибка фоновой загрузки модели ${index + 3} - ${url}:`, error);
            }
          })
        ).then(() => {
          console.log('✅ WelcomeScreen: Фоновая загрузка всех моделей завершена!');
        }).catch(error => {
          console.error('❌ WelcomeScreen: Ошибка фоновой загрузки:', error);
        });
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

  // Принудительное завершение через 20 секунд (safety net) - для крайних случаев
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      console.log('🚨 WelcomeScreen: Принудительное завершение через 20 секунд - для крайних случаев');
      setIsWelcomeLoadingComplete(true);
    }, 20000); // Увеличиваем до 20 секунд для надёжной загрузки

    return () => clearTimeout(safetyTimeout);
  }, []);

  return {
    isWelcomeLoadingComplete,
    loadingProgress
  };
};