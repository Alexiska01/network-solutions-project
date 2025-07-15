import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface ModelViewer3DProps {
  src: string;
  alt: string;
  isPreloaded?: boolean;
}

// Глобальный кэш для предзагруженных моделей
const modelCache = new Map<string, boolean>();
const loadingPromises = new Map<string, Promise<void>>();

// Функция предзагрузки 3D модели с агрессивным кэшированием
export const preloadModel = async (src: string): Promise<void> => {
  // Если уже загружена
  if (modelCache.has(src)) {
    return Promise.resolve();
  }

  // Если уже идет загрузка
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }

  // Создаем промис загрузки
  const loadPromise = new Promise<void>((resolve, reject) => {
    console.log(`🔄 Начинаем предзагрузку: ${src}`);
    
    // Создаем скрытый model-viewer для предзагрузки
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: -1000px;
      left: -1000px;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    `;
    
    container.innerHTML = `
      <model-viewer
        src="${src}"
        loading="eager"
        reveal="manual"
        camera-controls="false"
        auto-rotate="false"
        style="width: 1px; height: 1px; opacity: 0;">
      </model-viewer>
    `;
    
    document.body.appendChild(container);
    const viewer = container.querySelector('model-viewer') as any;
    
    let resolved = false;
    
    const cleanup = () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
    
    const handleSuccess = () => {
      if (resolved) return;
      resolved = true;
      
      modelCache.set(src, true);
      loadingPromises.delete(src);
      console.log(`✅ Модель предзагружена: ${src}`);
      cleanup();
      resolve();
    };
    
    const handleError = (error: any) => {
      if (resolved) return;
      resolved = true;
      
      loadingPromises.delete(src);
      console.error(`❌ Ошибка предзагрузки: ${src}`, error);
      cleanup();
      // Не отклоняем промис, чтобы не блокировать интерфейс
      resolve();
    };
    
    // События загрузки
    viewer.addEventListener('load', handleSuccess);
    viewer.addEventListener('error', handleError);
    
    // Fallback таймаут
    setTimeout(() => {
      if (!resolved) {
        console.warn(`⏰ Таймаут предзагрузки: ${src}`);
        handleSuccess(); // Считаем успехом
      }
    }, 15000);
  });

  loadingPromises.set(src, loadPromise);
  return loadPromise;
};

// Предзагрузка массива моделей
export const preloadModels = async (urls: string[]): Promise<void> => {
  console.log(`🚀 Предзагрузка ${urls.length} моделей...`);
  
  try {
    await Promise.allSettled(urls.map(url => preloadModel(url)));
    console.log(`🎉 Предзагрузка завершена для всех моделей`);
  } catch (error) {
    console.error('Ошибка при предзагрузке моделей:', error);
  }
};

// Проверка готовности модели
export const isModelReady = (src: string): boolean => {
  return modelCache.has(src);
};

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ src, alt, isPreloaded = false }) => {
  const [isLoading, setIsLoading] = useState(!isPreloaded);
  const [hasError, setHasError] = useState(false);
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Если модель предзагружена, сразу показываем
    if (isModelReady(src)) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    // Если не предзагружена, загружаем сейчас
    const loadModel = async () => {
      try {
        await preloadModel(src);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки модели:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadModel();
  }, [src]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || isLoading) return;

    // Настройки для плавного отображения
    viewer.addEventListener('load', () => {
      console.log('Model viewer загружен:', src);
      setIsLoading(false);
      setHasError(false);
    });

    viewer.addEventListener('error', (e: any) => {
      console.error('Model viewer ошибка:', e);
      setHasError(true);
      setIsLoading(false);
    });

  }, [src, isLoading]);

  // Показываем ошибку
  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-2xl border border-red-500/20 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={32} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Ошибка загрузки</h3>
            <p className="text-red-300 text-sm">3D модель недоступна</p>
          </div>
        </div>
      </div>
    );
  }

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Загрузка 3D модели</h3>
            <p className="text-blue-200 text-sm">Подготовка к отображению...</p>
          </div>
        </div>
      </div>
    );
  }

  // Показываем модель
  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10"
    >
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="20deg"
        camera-controls
        touch-action="pan-y"
        disable-zoom
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent'
        }}
        loading="eager"
        reveal="auto"
        camera-orbit="0deg 75deg 4m"
        field-of-view="30deg"
        min-camera-orbit="auto auto 2m"
        max-camera-orbit="auto auto 8m"
        interaction-prompt="none"
      />
      
      {/* Градиентная рамка */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      
      {/* Подсветка углов */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-br-2xl pointer-events-none" />
    </div>
  );
};

export default ModelViewer3D;