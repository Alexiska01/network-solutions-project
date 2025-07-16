import { useEffect, useRef, useState } from 'react';

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
const globalPreloadPromises = new Map<string, Promise<void>>();

export const useModelPreloader = (): ModelPreloaderState => {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set(globalModelCache));
  const [partiallyLoadedModels, setPartiallyLoadedModels] = useState<Set<string>>(new Set(globalPartialCache));
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

  const preloadModel = async (url: string, retryCount = 0): Promise<void> => {
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
      console.log(`🚀 Начинаю предзагрузку модели (попытка ${retryCount + 1}):`, url);

      // Ждем загрузки model-viewer если еще не готов
      const waitForModelViewer = () => {
        if (typeof customElements !== 'undefined' && customElements.get('model-viewer')) {
          console.log('✅ model-viewer готов, начинаю предзагрузку');
          startPreload();
        } else {
          console.log('⏳ Ожидаю загрузки model-viewer...', {
            customElementsExists: typeof customElements !== 'undefined',
            modelViewerRegistered: typeof customElements !== 'undefined' ? !!customElements.get('model-viewer') : false
          });
          
          // Fallback через простой fetch через 3 секунды ожидания
          setTimeout(() => {
            if (!globalModelCache.has(url)) {
              console.log('🔄 Fallback: пробую простой fetch вместо model-viewer для:', url);
              fetch(url, { method: 'HEAD' }).then(response => {
                console.log('📊 Fetch response:', {
                  url,
                  status: response.status,
                  headers: Object.fromEntries(response.headers.entries()),
                  size: response.headers.get('content-length')
                });
                if (response.ok) {
                  console.log('✅ Модель доступна, помечаю как загруженную:', url);
                  globalModelCache.add(url);
                  setLoadedModels(new Set(globalModelCache));
                  resolve();
                } else {
                  console.warn('❌ Модель недоступна, статус:', response.status);
                  resolve(); // Не блокируем интерфейс
                }
              }).catch(error => {
                console.error('❌ Fallback fetch ошибка:', url, error);
                resolve(); // Не блокируем интерфейс
              });
            }
          }, 3000);
          
          setTimeout(waitForModelViewer, 100);
        }
      };

      const startPreload = () => {
        if (!preloaderRef.current) {
          reject(new Error('Preloader container not available'));
          return;
        }

        // Создаем скрытый model-viewer с оптимизированными настройками
        const modelViewerHTML = `
          <model-viewer
            src="${url}"
            style="width: 1px; height: 1px; display: block; pointer-events: none;"
            loading="eager"
            reveal="auto"
            auto-rotate="false"
            camera-controls="false"
            interaction-prompt="none"
            data-preload-url="${url}">
          </model-viewer>
        `;

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = modelViewerHTML;
        preloaderRef.current.appendChild(tempContainer);

        const modelViewer = tempContainer.querySelector('model-viewer') as any;

        if (modelViewer) {
          // Уменьшаем таймаут и добавляем retry
          const timeout = setTimeout(() => {
            console.warn(`⏰ Таймаут предзагрузки модели (15 сек, попытка ${retryCount + 1}):`, url);
            cleanup();
            
            if (retryCount < 2) {
              // Повторная попытка
              setTimeout(() => {
                preloadModel(url, retryCount + 1).then(resolve).catch(reject);
              }, 1000);
            } else {
              console.error('❌ Все попытки предзагрузки исчерпаны:', url);
              resolve(); // Не блокируем интерфейс
            }
          }, 15000);

          const cleanup = () => {
            clearTimeout(timeout);
            if (preloaderRef.current && preloaderRef.current.contains(tempContainer)) {
              try {
                preloaderRef.current.removeChild(tempContainer);
              } catch (e) {
                console.warn('Ошибка при удалении контейнера:', e);
              }
            }
            setPreloadingModels(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
          };

          // Обработчики событий
          const onLoad = () => {
            console.log('✅ Модель предзагружена:', url);
            globalModelCache.add(url);
            setLoadedModels(new Set(globalModelCache));
            cleanup();
            resolve();
          };

          const onError = (e: any) => {
            console.error(`❌ Ошибка предзагрузки модели (попытка ${retryCount + 1}):`, url, e);
            cleanup();
            
            if (retryCount < 2) {
              // Повторная попытка
              setTimeout(() => {
                preloadModel(url, retryCount + 1).then(resolve).catch(reject);
              }, 2000);
            } else {
              console.error('❌ Все попытки предзагрузки исчерпаны:', url);
              resolve(); // Не блокируем интерфейс
            }
          };

          modelViewer.addEventListener('load', onLoad, { once: true });
          modelViewer.addEventListener('error', onError, { once: true });

          // Дополнительная проверка через model-viewer API
          if (modelViewer.loaded) {
            onLoad();
          }

        } else {
          reject(new Error('Failed to create model-viewer element'));
        }
      };

      waitForModelViewer();
    });

    globalPreloadPromises.set(url, preloadPromise);

    try {
      await preloadPromise;
    } catch (error) {
      console.error('Критическая ошибка предзагрузки модели:', error);
    } finally {
      globalPreloadPromises.delete(url);
    }
  };

  const preloadModels = async (urls: string[]): Promise<void> => {
    console.log('🔄 Начинаю предзагрузку всех моделей:', urls);
    
    // Запускаем загрузки с небольшой задержкой между ними для стабильности
    const preloadPromises = urls.map((url, index) => 
      new Promise<void>(resolve => {
        setTimeout(() => {
          preloadModel(url).then(resolve).catch(resolve);
        }, index * 500); // 500мс задержка между моделями
      })
    );
    
    try {
      await Promise.all(preloadPromises);
      console.log('🎉 Предзагрузка всех моделей завершена');
      
      // Дополнительная проверка готовности
      const readyModels = urls.filter(url => globalModelCache.has(url));
      console.log(`📊 Готовые модели: ${readyModels.length}/${urls.length}`, readyModels);
      
    } catch (error) {
      console.error('Ошибка при предзагрузке моделей:', error);
    }
  };

  const preloadModelPartially = async (url: string, percentage: number): Promise<void> => {
    console.log(`🎯 Начинаю частичную загрузку модели (${percentage}%):`, url);
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentLength = response.headers.get('content-length');
      
      if (!contentLength) {
        console.warn('⚠️ Не удалось получить размер файла, загружаю полностью');
        return preloadModel(url);
      }
      
      const totalSize = parseInt(contentLength);
      const partialSize = Math.floor(totalSize * percentage / 100);
      
      console.log(`📊 Частичная загрузка: ${partialSize} из ${totalSize} байт (${percentage}%)`);
      
      const partialResponse = await fetch(url, {
        headers: {
          'Range': `bytes=0-${partialSize - 1}`
        }
      });
      
      if (partialResponse.status === 206) {
        console.log(`✅ Частичная загрузка завершена (${percentage}%):`, url);
        globalPartialCache.add(url);
        setPartiallyLoadedModels(new Set(globalPartialCache));
      } else {
        console.warn('⚠️ Сервер не поддерживает Range запросы, загружаю полностью');
        return preloadModel(url);
      }
    } catch (error) {
      console.error('❌ Ошибка частичной загрузки:', error);
      // Fallback на полную загрузку
      return preloadModel(url);
    }
  };

  const isModelReady = (url: string): boolean => {
    const ready = globalModelCache.has(url);
    console.log('🔍 isModelReady:', { url, ready, cacheSize: globalModelCache.size });
    return ready;
  };

  const isModelPartiallyReady = (url: string): boolean => {
    return globalPartialCache.has(url) || globalModelCache.has(url);
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