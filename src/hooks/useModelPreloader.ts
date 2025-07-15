import { useEffect, useRef, useState } from 'react';

interface ModelPreloaderState {
  loadedModels: Set<string>;
  preloadingModels: Set<string>;
  isModelReady: (url: string) => boolean;
  preloadModel: (url: string) => Promise<void>;
  preloadModels: (urls: string[]) => Promise<void>;
}

// Глобальный кэш загруженных моделей
const globalModelCache = new Set<string>();
const globalPreloadPromises = new Map<string, Promise<void>>();

export const useModelPreloader = (): ModelPreloaderState => {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set(globalModelCache));
  const [preloadingModels, setPreloadingModels] = useState<Set<string>>(new Set());
  const preloaderRef = useRef<HTMLDivElement | null>(null);

  // Создаем невидимый контейнер для предзагрузки
  useEffect(() => {
    if (!preloaderRef.current) {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.overflow = 'hidden';
      container.style.visibility = 'hidden';
      container.style.pointerEvents = 'none';
      container.id = 'model-preloader-container';
      
      document.body.appendChild(container);
      preloaderRef.current = container;
    }

    return () => {
      if (preloaderRef.current && document.body.contains(preloaderRef.current)) {
        document.body.removeChild(preloaderRef.current);
      }
    };
  }, []);

  const preloadModel = async (url: string): Promise<void> => {
    // Если модель уже загружена
    if (globalModelCache.has(url)) {
      return Promise.resolve();
    }

    // Если модель уже загружается
    if (globalPreloadPromises.has(url)) {
      return globalPreloadPromises.get(url)!;
    }

    // Начинаем загрузку
    setPreloadingModels(prev => new Set([...prev, url]));

    const preloadPromise = new Promise<void>((resolve, reject) => {
      if (!preloaderRef.current) {
        reject(new Error('Preloader container not available'));
        return;
      }

      console.log('🚀 Начинаю предзагрузку модели:', url);

      // Создаем скрытый model-viewer
      const modelViewerHTML = `
        <model-viewer
          src="${url}"
          style="width: 1px; height: 1px; display: block;"
          loading="eager"
          reveal="auto"
          auto-rotate="false"
          camera-controls="false"
          data-preload-url="${url}">
        </model-viewer>
      `;

      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = modelViewerHTML;
      preloaderRef.current.appendChild(tempContainer);

      const modelViewer = tempContainer.querySelector('model-viewer');

      if (modelViewer) {
        const timeout = setTimeout(() => {
          console.warn('⏰ Таймаут предзагрузки модели:', url);
          cleanup();
          resolve(); // Не блокируем интерфейс
        }, 10000);

        const cleanup = () => {
          clearTimeout(timeout);
          if (preloaderRef.current && preloaderRef.current.contains(tempContainer)) {
            preloaderRef.current.removeChild(tempContainer);
          }
          setPreloadingModels(prev => {
            const newSet = new Set(prev);
            newSet.delete(url);
            return newSet;
          });
        };

        modelViewer.addEventListener('load', () => {
          console.log('✅ Модель предзагружена:', url);
          globalModelCache.add(url);
          setLoadedModels(new Set(globalModelCache));
          cleanup();
          resolve();
        }, { once: true });

        modelViewer.addEventListener('error', (e) => {
          console.error('❌ Ошибка предзагрузки модели:', url, e);
          cleanup();
          reject(new Error(`Failed to preload model: ${url}`));
        }, { once: true });

      } else {
        reject(new Error('Failed to create model-viewer element'));
      }
    });

    globalPreloadPromises.set(url, preloadPromise);

    try {
      await preloadPromise;
    } catch (error) {
      console.error('Ошибка предзагрузки модели:', error);
      // Не бросаем ошибку дальше, чтобы не сломать интерфейс
    } finally {
      globalPreloadPromises.delete(url);
    }
  };

  const preloadModels = async (urls: string[]): Promise<void> => {
    console.log('🔄 Начинаю предзагрузку всех моделей:', urls);
    
    // Запускаем все загрузки параллельно
    const preloadPromises = urls.map(url => preloadModel(url));
    
    try {
      await Promise.allSettled(preloadPromises);
      console.log('🎉 Предзагрузка всех моделей завершена');
    } catch (error) {
      console.error('Ошибка при предзагрузке моделей:', error);
    }
  };

  const isModelReady = (url: string): boolean => {
    return globalModelCache.has(url);
  };

  return {
    loadedModels,
    preloadingModels,
    isModelReady,
    preloadModel,
    preloadModels
  };
};