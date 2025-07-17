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
    // Упрощенная быстрая загрузка - просто помечаем как готовое
    if (!globalModelCache.has(url)) {
      console.log('✅ Помечаю модель как готовую:', url);
      globalModelCache.add(url);
      setLoadedModels(new Set(globalModelCache));
    }
    return Promise.resolve();
  };

  const preloadModels = async (urls: string[]): Promise<void> => {
    console.log('✅ Помечаю все модели как готовые:', urls);
    
    // Быстро помечаем все модели как готовые
    urls.forEach(url => {
      if (!globalModelCache.has(url)) {
        globalModelCache.add(url);
      }
    });
    
    setLoadedModels(new Set(globalModelCache));
    return Promise.resolve();
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