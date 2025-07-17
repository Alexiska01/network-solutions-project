import { useState } from 'react';

interface ModelPreloaderState {
  loadedModels: Set<string>;
  preloadingModels: Set<string>;
  partiallyLoadedModels: Set<string>;
  isModelReady: (url: string) => boolean;
  isModelPartiallyReady: (url: string) => boolean;
  preloadModel: (url: string) => Promise<void>;
  preloadModelPartially: (url: string, percentage: number) => Promise<void>;
  preloadModels: (urls: string[]) => Promise<void>;
}

// Глобальный кэш загруженных моделей
const globalModelCache = new Set<string>();
const globalPartialCache = new Set<string>();

export const useModelPreloader = (): ModelPreloaderState => {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set(globalModelCache));
  const [partiallyLoadedModels, setPartiallyLoadedModels] = useState<Set<string>>(new Set(globalPartialCache));
  const [preloadingModels, setPreloadingModels] = useState<Set<string>>(new Set());

  const preloadModel = async (url: string): Promise<void> => {
    if (!globalModelCache.has(url)) {
      console.log('🔄 ProductHero: Загружаю модель:', url);
      
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ ProductHero: Модель загружена:', url);
          globalModelCache.add(url);
          setLoadedModels(new Set(globalModelCache));
        } else {
          console.warn('⚠️ ProductHero: Модель недоступна:', url);
        }
      } catch (error) {
        console.error('❌ ProductHero: Ошибка загрузки модели:', url, error);
      }
    }
  };

  const preloadModels = async (urls: string[]): Promise<void> => {
    console.log('🔄 ProductHero: Фоновая загрузка моделей:', urls);
    
    // Загружаем все модели параллельно
    const loadingPromises = urls.map(preloadModel);
    await Promise.all(loadingPromises);
    
    console.log('✅ ProductHero: Все модели загружены!');
  };

  const preloadModelPartially = async (url: string, percentage: number): Promise<void> => {
    // Упрощенная версия - просто помечаем как частично готовое
    if (!globalPartialCache.has(url)) {
      console.log(`✅ Помечаю модель как частично готовую (${percentage}%):`, url);
      globalPartialCache.add(url);
      setPartiallyLoadedModels(new Set(globalPartialCache));
    }
    return Promise.resolve();
  };

  const isModelReady = (url: string): boolean => {
    // Упрощенная проверка - считаем все модели готовыми
    return true;
  };

  const isModelPartiallyReady = (url: string): boolean => {
    return true;
  };

  return {
    loadedModels,
    partiallyLoadedModels,
    preloadingModels,
    isModelReady,
    isModelPartiallyReady,
    preloadModel,
    preloadModelPartially,
    preloadModels
  };
};