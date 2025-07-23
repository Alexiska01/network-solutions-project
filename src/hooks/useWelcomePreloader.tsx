import { useState, useEffect, useCallback } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';

interface ModelItem {
  modelUrl: string;
}

interface PreloadResult {
  url: string;
  success: boolean;
  cached: boolean;
}

/**
 * Оптимизированный хук для предзагрузки 3D моделей с кэшированием
 */
export const useWelcomePreloader = (heroData: ModelItem[]) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isWelcomeLoadingComplete, setIsWelcomeLoadingComplete] = useState(false);
  const [preloadResults, setPreloadResults] = useState<PreloadResult[]>([]);

  // Оптимизированная загрузка с кэшированием
  const preloadModelsOptimized = useCallback(async (models: ModelItem[]) => {
    console.log('🚀 useWelcomePreloader: Начинаем оптимизированную загрузку');
    
    const modelUrls = models.map(item => item.modelUrl);
    const results: PreloadResult[] = [];
    let completedCount = 0;

    try {
      // Проверяем, какие модели уже есть в кэше
      const cacheChecks = await Promise.allSettled(
        modelUrls.map(async (url) => ({
          url,
          cached: await modelCacheManager.hasModel(url)
        }))
      );

      const uncachedModels: string[] = [];
      
      cacheChecks.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const { url, cached } = result.value;
          if (cached) {
            results.push({ url, success: true, cached: true });
            completedCount++;
            console.log(`✅ useWelcomePreloader: Модель в кэше ${url}`);
          } else {
            uncachedModels.push(url);
          }
        } else {
          uncachedModels.push(modelUrls[index]);
        }
      });

      // Обновляем прогресс для закэшированных моделей
      if (completedCount > 0) {
        const initialProgress = (completedCount / modelUrls.length) * 100;
        setLoadingProgress(initialProgress);
        console.log(`📊 useWelcomePreloader: Начальный прогресс ${initialProgress}%`);
      }

      // ПОСЛЕДОВАТЕЛЬНАЯ загрузка: 3530 → 3730 → 4530 → 6010
      if (uncachedModels.length > 0) {
        console.log(`🔄 useWelcomePreloader: ПОСЛЕДОВАТЕЛЬНАЯ загрузка ${uncachedModels.length} новых моделей`);
        
        // Определяем правильный порядок загрузки
        const sequenceOrder = ['/models/3530all.glb', '/models/3730all.glb', '/models/4530all.glb', '/models/6010all.glb'];
        const sequentialModels = sequenceOrder.filter(url => uncachedModels.includes(url));
        
        console.log(`📝 useWelcomePreloader: Порядок загрузки:`, sequentialModels.map(url => url.match(/(\d+)all\.glb/)?.[1]).join(' → '));
        
        // Загружаем последовательно
        for (let i = 0; i < sequentialModels.length; i++) {
          const url = sequentialModels[i];
          const modelSeries = url.match(/(\d+)all\.glb/)?.[1] || 'unknown';
          
          try {
            console.log(`⏳ useWelcomePreloader: Загружаю модель ${modelSeries} (${i + 1}/${sequentialModels.length})`);
            
            const response = await modelCacheManager.loadModel(url);
            const success = response !== null;
            
            results.push({ url, success, cached: false });
            completedCount++;
            
            // Обновляем прогресс
            const progress = (completedCount / modelUrls.length) * 100;
            setLoadingProgress(progress);
            
            console.log(`${success ? '✅' : '❌'} useWelcomePreloader: ${success ? 'Загружена' : 'Ошибка'} модель ${modelSeries} (${Math.round(progress)}%)`);
            
            // Небольшая пауза между загрузками для стабильности
            if (i < sequentialModels.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 200));
            }
            
          } catch (error) {
            console.error(`❌ useWelcomePreloader: Ошибка загрузки модели ${modelSeries}:`, error);
            results.push({ url, success: false, cached: false });
            completedCount++;
            
            const progress = (completedCount / modelUrls.length) * 100;
            setLoadingProgress(progress);
          }
        }
      }

      setPreloadResults(results);
      
      // Проверяем успешность загрузки
      const successfulLoads = results.filter(r => r.success).length;
      const loadSuccess = successfulLoads >= modelUrls.length * 0.75; // 75% успешных загрузок
      
      console.log(`📈 useWelcomePreloader: Завершено ${successfulLoads}/${modelUrls.length} моделей (успех: ${loadSuccess})`);
      
      // Финальное обновление прогресса
      setLoadingProgress(100);
      
      // Небольшая задержка для плавности UI
      setTimeout(() => {
        setIsWelcomeLoadingComplete(true);
      }, 300);

    } catch (error) {
      console.error('❌ useWelcomePreloader: Критическая ошибка предзагрузки', error);
      
      // В случае критической ошибки завершаем загрузку
      setLoadingProgress(100);
      setTimeout(() => {
        setIsWelcomeLoadingComplete(true);
      }, 100);
    }
  }, []);

  // Запуск предзагрузки при изменении данных
  useEffect(() => {
    if (heroData?.length > 0) {
      console.log(`🎯 useWelcomePreloader: Запускаем предзагрузку ${heroData.length} моделей`);
      setLoadingProgress(0);
      setIsWelcomeLoadingComplete(false);
      setPreloadResults([]);
      
      // Небольшая задержка для инициализации UI
      const timer = setTimeout(() => {
        preloadModelsOptimized(heroData);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [heroData, preloadModelsOptimized]);

  // Дополнительная защита от зависания
  useEffect(() => {
    const maxWaitTime = 15000; // 15 секунд максимум
    
    const fallbackTimer = setTimeout(() => {
      if (!isWelcomeLoadingComplete) {
        console.log('⏰ useWelcomePreloader: Принудительное завершение по таймауту');
        setLoadingProgress(100);
        setIsWelcomeLoadingComplete(true);
      }
    }, maxWaitTime);

    return () => clearTimeout(fallbackTimer);
  }, [isWelcomeLoadingComplete]);

  return {
    loadingProgress,
    isWelcomeLoadingComplete,
    preloadResults,
    // Дополнительные данные для отладки
    cacheStats: preloadResults.filter(r => r.cached).length,
    newLoads: preloadResults.filter(r => !r.cached && r.success).length,
    failures: preloadResults.filter(r => !r.success).length
  };
};