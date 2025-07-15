import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface ModelViewer3DProps {
  src: string;
  alt: string;
  isPreloaded?: boolean;
}

// Глобальный кэш для предзагруженных моделей
const modelCache = new Set<string>();
const preloadedModels = new Map<string, boolean>();

// Функция предзагрузки 3D модели
export const preloadModel = async (src: string): Promise<void> => {
  if (modelCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    // Создаем скрытый model-viewer для предзагрузки
    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.position = 'absolute';
    hiddenContainer.style.left = '-9999px';
    hiddenContainer.style.width = '1px';
    hiddenContainer.style.height = '1px';
    hiddenContainer.style.opacity = '0';
    hiddenContainer.style.pointerEvents = 'none';
    
    hiddenContainer.innerHTML = `
      <model-viewer
        src="${src}"
        loading="eager"
        reveal="manual"
        style="width: 1px; height: 1px;">
      </model-viewer>
    `;
    
    document.body.appendChild(hiddenContainer);
    
    const modelViewer = hiddenContainer.querySelector('model-viewer');
    
    if (modelViewer) {
      let isCleanedUp = false;
      const cleanup = () => {
        if (!isCleanedUp) {
          try {
            if (hiddenContainer.parentNode) {
              hiddenContainer.parentNode.removeChild(hiddenContainer);
            }
          } catch (error) {
            console.warn('Элемент уже удален:', error);
          } finally {
            isCleanedUp = true;
          }
        }
      };
      
      modelViewer.addEventListener('load', () => {
        modelCache.add(src);
        preloadedModels.set(src, true);
        console.log('3D модель предзагружена:', src);
        cleanup();
        resolve();
      });
      
      modelViewer.addEventListener('error', (e) => {
        console.error('Ошибка предзагрузки 3D модели:', e, src);
        cleanup();
        reject(e);
      });
      
      // Таймаут на случай долгой загрузки
      setTimeout(() => {
        console.warn('Таймаут предзагрузки модели:', src);
        cleanup();
        resolve(); // Не блокируем интерфейс
      }, 10000);
    } else {
      try {
        if (hiddenContainer.parentNode) {
          hiddenContainer.parentNode.removeChild(hiddenContainer);
        }
      } catch (error) {
        console.warn('Не удалось удалить hiddenContainer:', error);
      }
      reject(new Error('Не удалось создать model-viewer'));
    }
  });
};

// Функция массовой предзагрузки
export const preloadModels = async (urls: string[]): Promise<void[]> => {
  console.log('Начинаем предзагрузку 3D моделей:', urls);
  return Promise.allSettled(urls.map(preloadModel)).then(results => {
    const successful = results.filter(r => r.status === 'fulfilled').length;
    console.log(`Предзагружено ${successful} из ${urls.length} 3D моделей`);
    return results.map(r => r.status === 'fulfilled' ? r.value : undefined).filter(Boolean) as void[];
  });
};

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ src, alt, isPreloaded = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(!preloadedModels.get(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const wasPreloaded = preloadedModels.get(src);
      setIsLoading(!wasPreloaded);
      setHasError(false);
      
      const modelViewerHTML = `
        <model-viewer
          src="${src}"
          alt="${alt}"
          auto-rotate
          auto-rotate-delay="${wasPreloaded ? '0' : '500'}"
          rotation-per-second="30deg"
          disable-tap
          disable-pan
          disable-zoom
          interaction-policy="allow-when-focused"
          style="width: 100%; height: 100%; background: transparent; border-radius: 1rem; --poster-color: transparent;"
          loading="eager"
          reveal="${wasPreloaded ? 'auto' : 'interaction'}"
          exposure="1.2"
          shadow-intensity="0.3"
          environment-image="neutral"
          ${wasPreloaded ? '' : 'poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMjEyMTIxIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjM2MzYzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7QmtCx0YDQsNC30YPQtdGC0YHRjzwvdGV4dD4KPHN2Zz4K"'}>
          ${!wasPreloaded ? `
          <div slot="poster" style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)); border-radius: 1rem;">
            <div style="text-align: center; color: white;">
              <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: linear-gradient(45deg, #3b82f6, #9333ea); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">📡</div>
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${alt}</div>
              <div style="font-size: 14px; opacity: 0.7;">Инициализация 3D модели...</div>
            </div>
          </div>
          ` : ''}
        </model-viewer>
      `;
      
      containerRef.current.innerHTML = modelViewerHTML;
      
      const modelViewer = containerRef.current.querySelector('model-viewer');
      
      if (modelViewer) {
        modelViewer.addEventListener('load', () => {
          setIsLoading(false);
          preloadedModels.set(src, true);
          console.log('3D модель готова к отображению:', src);
        });
        
        modelViewer.addEventListener('error', (e) => {
          setHasError(true);
          setIsLoading(false);
          console.error('Ошибка загрузки 3D модели:', e, src);
        });

        // Если модель уже предзагружена, сразу начинаем вращение
        if (wasPreloaded) {
          setIsLoading(false);
        }
      }
    }
  }, [src, alt]);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Icon name="AlertTriangle" size={48} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{alt}</h3>
            <p className="text-red-200 text-sm">Ошибка загрузки 3D модели</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full model-viewer-container"
    />
  );
};

export default ModelViewer3D;