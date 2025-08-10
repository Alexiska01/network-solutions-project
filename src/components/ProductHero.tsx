import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { modelPreloader } from '@/utils/modelPreloader';
import { modelCacheManager } from '@/utils/modelCacheManager';

// Конфигурация моделей коммутаторов - только "all" версии
const heroData = [
  {
    id: 'IDS3530',
    series: '3530',
    title: 'Коммутаторы IDS3530',
    description: 'Промышленные коммутаторы для критически важных применений',
    modelUrl: '/models/3530all.glb',
    features: [
      'Встроенные блоки питания',
      'Поддержка РоЕ/РоЕ+',
      'Статическая и динамическая маршрутизация'
    ],
    gradient: 'from-[#32398e] via-[#005baa] to-[#0079b6]',
    glowColor: '[#005baa]',
    accentColor: '#53c2a4'
  },
  {
    id: 'IDS3730',
    series: '3730',
    title: 'Коммутаторы IDS3730',
    description: 'Высокопроизводительные коммутаторы для корпоративных сетей',
    modelUrl: '/models/3730all.glb',
    features: [
      'Два модульных блока питания',
      'Поддержка РоЕ/РоЕ+',
      'Статическая и динамическая маршрутизация'
    ],
    gradient: 'from-[#32398e] via-[#8338EC] to-[#B5179E]',
    glowColor: '[#8338EC]',
    accentColor: '#FF6B35'
  },
  {
    id: 'IDS4530',
    series: '4530',
    title: 'Коммутаторы IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями',
    modelUrl: '/models/4530all.glb',
    features: [
      'Два модульных блока питания',
      'Поддержка РоЕ/РоЕ+',
      'Поддержка технологии VxLAN'
    ],
    gradient: 'from-[#0093b6] via-[#00acad] to-[#53c2a4]',
    glowColor: '[#00acad]',
    accentColor: '#A0EEC0'
  },
  {
    id: 'IDS6010',
    series: '6010',
    title: 'Коммутаторы IDS6010',
    description: 'Высокопроизводительные коммутаторы для дата-центров',
    modelUrl: '/models/6010all.glb',
    features: [
      'Два модульных блока питания',
      'Поддержка РоЕ/РоЕ+',
      'Поддержка технологии VxLAN'
    ],
    gradient: 'from-[#FF6B35] via-[#F5B700] to-[#FF8C7A]',
    glowColor: '[#FF6B35]',
    accentColor: '#FFD6C2'
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});
  const preloadedViewers = useRef<Map<string, any>>(new Map());

  // Отслеживание размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Инициализация и мгновенная загрузка при наличии кэша
  useEffect(() => {
    const initializeComponent = async () => {
      console.log('🚀 ProductHero: Инициализация компонента');
      
      // Проверяем кэш всех моделей
      const allModelsInCache = heroData.every(model => 
        modelPreloader.isLoaded(model.modelUrl)
      );
      
      if (allModelsInCache) {
        console.log('⚡ ProductHero: Все модели в кэше - мгновенная загрузка');
        // Синхронизируем состояние UI со всеми моделями из кэша
        const newStatus: Record<string, boolean> = {};
        heroData.forEach(model => {
          newStatus[model.modelUrl] = true;
        });
        setModelLoadStatus(newStatus);
        setIsInitialized(true);
      } else {
        console.log('📦 ProductHero: Проверяем доступность моделей по отдельности');
        // Синхронизируем доступные модели перед инициализацией
        const partialStatus: Record<string, boolean> = {};
        
        for (const model of heroData) {
          const isPreloaded = modelPreloader.isLoaded(model.modelUrl);
          const isCached = await modelCacheManager.hasModel(model.modelUrl);
          
          if (isPreloaded || isCached) {
            partialStatus[model.modelUrl] = true;
            console.log(`✅ ProductHero: Модель ${model.series} доступна (preloader: ${isPreloaded}, cache: ${isCached})`);
          } else {
            console.log(`⏳ ProductHero: Модель ${model.series} недоступна`);
          }
        }
        
        if (Object.keys(partialStatus).length > 0) {
          setModelLoadStatus(partialStatus);
        }
        console.log('📦 ProductHero: Модели не в кэше, начинаем загрузку');
        // Запускаем обычную загрузку
        const currentModel = heroData[currentIndex];
        if (!modelPreloader.isLoaded(currentModel.modelUrl)) {
          modelPreloader.preloadModel(currentModel.modelUrl, 'high');
        }
        setIsInitialized(true);
      }
      
      // Предзагружаем следующую модель заранее
      const preloadNextModel = () => {
        const nextIndex = (currentIndex + 1) % heroData.length;
        const nextModel = heroData[nextIndex];
        
        if (!modelPreloader.isLoaded(nextModel.modelUrl)) {
          modelPreloader.preloadModel(nextModel.modelUrl, 'high');
        }
      };
      
      // Предзагружаем текущую и следующую модели
      const currentModel = heroData[currentIndex];
      
      // Если модель уже загружена в modelPreloader, обновляем modelLoadStatus
      const isPreloaded = modelPreloader.isLoaded(currentModel.modelUrl);
      const isCached = await modelCacheManager.hasModel(currentModel.modelUrl);
      
      if (isPreloaded || isCached) {
        console.log(`✅ ProductHero: Модель ${currentModel.series} доступна (preloader: ${isPreloaded}, cache: ${isCached}), синхронизируем UI`);
        setModelLoadStatus(prev => ({ ...prev, [currentModel.modelUrl]: true }));
        preloadNextModel();
      } else {
        console.log(`⏳ ProductHero: Начинаем предзагрузку модели ${currentModel.series}`);
        // Начинаем загрузку
        modelPreloader.preloadModel(currentModel.modelUrl, 'high').then(() => {
          console.log(`✅ ProductHero: Модель ${currentModel.series} предзагружена через ModelPreloader`);
          setModelLoadStatus(prev => ({ ...prev, [currentModel.modelUrl]: true }));
          preloadNextModel();
        }).catch(error => {
          console.error(`❌ ProductHero: Ошибка предзагрузки модели ${currentModel.series}:`, error);
        });
      }
      
      preloadNextModel();
    };

    // Инициализируем компонент сразу при первом рендере
    if (!isInitialized) {
      initializeComponent();
    } else {
      // При смене слайда - предзагружаем следующий
      const preloadNextModel = () => {
        const nextIndex = (currentIndex + 1) % heroData.length;
        const nextModel = heroData[nextIndex];
        
        if (!modelPreloader.isLoaded(nextModel.modelUrl)) {
          modelPreloader.preloadModel(nextModel.modelUrl, 'high');
        }
      };
      
      preloadNextModel();
    }
  }, [currentIndex, isInitialized]);

  // Мобильная инициализация model-viewer
  useEffect(() => {
    if (isMobile && modelRef.current) {
      const initMobileModel = () => {
        const mv = modelRef.current as any;
        if (mv && mv.cameraOrbit) {
          // Принудительная инициализация для мобильных - отдаленная камера без взаимодействий
          mv.cameraOrbit = "0deg 75deg 1.6m";
          mv.fieldOfView = "40deg";
          mv.minCameraOrbit = "auto auto 1.6m";
          mv.maxCameraOrbit = "auto auto 1.6m";
          if (mv.jumpCameraToGoal) {
            mv.jumpCameraToGoal();
          }
        }
      };

      // Мгновенная инициализация
      initMobileModel();
      const timer = setTimeout(initMobileModel, 50);
      return () => clearTimeout(timer);
    }
  }, [isMobile, currentIndex]);

  // Трекинг мыши для параллакс эффектов (только на десктопе)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Автоматическая смена слайдов каждые 11 секунд
  useEffect(() => {
    if (isInitialized) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        
        // Предзагружаем модель за 2 слайда вперед
        const nextNextIndex = (currentIndex + 2) % heroData.length;
        const nextNextModel = heroData[nextNextIndex];
        if (!modelPreloader.isLoaded(nextNextModel.modelUrl)) {
          modelPreloader.preloadModel(nextNextModel.modelUrl, 'low');
        }
        
        setTimeout(async () => {
          const nextIndex = (currentIndex + 1) % heroData.length;
          const nextModel = heroData[nextIndex];
          
          // Принудительная синхронизация для проблемных моделей
          if (nextModel.series === '3730' || nextModel.series === '4530' || nextModel.series === '6010') {
            console.log(`🔧 ProductHero: Принудительная синхронизация при переходе к ${nextModel.series}`);
            // Проверяем cache и preloader перед синхронизацией
            try {
              const hasInCache = modelCacheManager.hasModel ? await modelCacheManager.hasModel(nextModel.modelUrl) : false;
              const hasInPreloader = modelPreloader.isLoaded(nextModel.modelUrl);
              
              if (hasInCache || hasInPreloader) {
                console.log(`✅ ProductHero: Модель ${nextModel.series} найдена (cache: ${hasInCache}, preloader: ${hasInPreloader})`);
                setModelLoadStatus(prev => ({ ...prev, [nextModel.modelUrl]: true }));
              }
            } catch (error) {
              console.warn(`⚠️ ProductHero: Ошибка проверки кэша для ${nextModel.series}:`, error);
            }
          }
          
          setCurrentIndex(nextIndex);
          setIsTransitioning(false);
        }, isMobile ? 100 : 300);
      }, 11000);
      
      intervalRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [isInitialized, isMobile, currentIndex]);

  const currentData = heroData[currentIndex];

  return (
    <div 
      className="hero-container relative h-screen md:h-[70vh] bg-gradient-to-br from-[#0B3C49] via-[#1A237E] to-[#2E2E2E] overflow-hidden"
      style={{
        '--current-glow-color': currentData.glowColor.replace('[', '').replace(']', ''),
        '--current-accent-color': currentData.accentColor,
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y
      } as React.CSSProperties}
    >
      {/* Динамический фоновый градиент */}
      <div 
        className={`hero-bg absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-30`}
      />
      
      {/* Параллакс элементы */}
      <div className="absolute inset-0">
        {/* Основной световой эффект */}
        <div
          className="hero-glow-main absolute top-1/4 left-1/3 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: `${currentData.glowColor.replace('[', '').replace(']', '')}40`
          }}
        />
        
        {/* Дополнительные световые пятна */}
        <div
          className="hero-glow-secondary absolute bottom-1/4 right-1/3 w-48 h-48 md:w-64 md:h-64 rounded-full blur-2xl"
          style={{
            backgroundColor: `${currentData.accentColor}33`
          }}
        />
        
        {/* Геометрические элементы */}
        <div
          className="hero-geo-1 absolute top-16 right-8 md:top-20 md:right-20 w-20 h-20 md:w-32 md:h-32 border rounded-lg rotate-12"
          style={{
            borderColor: `${currentData.accentColor}40`
          }}
        />
        
        <div
          className="hero-geo-2 absolute bottom-24 left-8 md:bottom-32 md:left-20 w-16 h-16 md:w-24 md:h-24 border border-white/5 rounded-full"
        />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 h-full md:h-auto">
          <div className="grid lg:grid-cols-2 gap-0 md:gap-6 lg:gap-16 items-stretch md:items-center h-full md:h-auto">
            
            {/* Левая колонка - контент */}
            <div className="hero-content flex flex-col justify-end md:justify-center space-y-4 md:space-y-6 order-2 lg:order-1 pb-safe pt-4 md:pt-0 md:pb-0 h-[45vh] md:h-auto">
              {/* Заголовок */}
              <div className="space-y-3 md:space-y-4">
                <div className="hero-badge inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-[11px] md:text-sm font-medium text-white/80 border border-white/20">
                  ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ
                </div>
                
                <h1
                  key={currentData.id}
                  className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
                >
                  {currentData.title}
                </h1>
                
                <p
                  key={`${currentData.id}-desc`}
                  className="hero-description text-sm xs:text-base sm:text-lg md:text-lg text-white/70 leading-relaxed max-w-lg md:max-w-none"
                >
                  {currentData.description}
                </p>
              </div>

              {/* Особенности */}
              <div
                key={`${currentData.id}-features`}
                className="hero-features space-y-2 md:space-y-3"
              >
                {currentData.features.map((feature, index) => (
                  <div
                    key={`${currentData.id}-feature-${index}`}
                    className="hero-feature flex items-center gap-3 md:gap-4 px-3 py-2.5 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    style={{ '--feature-index': index } as React.CSSProperties}
                  >
                    <div 
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full shadow-lg"
                      style={{
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      }}
                    />
                    <span className="text-white font-medium text-[13px] xs:text-sm sm:text-base md:text-base leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Индикатор прогресса */}
              <div className="hero-progress flex items-center gap-3 md:gap-4 pt-3 md:pt-4">
                <div className="flex gap-2">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 md:h-1 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? `w-10 md:w-12 shadow-lg` 
                          : 'w-3 md:w-4 bg-white/20'
                      }`}
                      style={index === currentIndex ? {
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      } : {}}
                    />
                  ))}
                </div>
                <span className="text-[13px] md:text-sm text-white/50 font-mono tabular-nums">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Правая колонка - 3D модель */}
            <div className="hero-model-container relative h-[55vh] xs:h-[50vh] sm:h-[45vh] md:h-[400px] lg:h-[500px] order-1 lg:order-2 flex items-center">
              {/* 3D фоновые эффекты */}
              <div className="absolute inset-0">
                <div className={`hero-model-bg absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-30 rounded-3xl blur-2xl`} />
                <div className={`hero-model-glow absolute inset-0 bg-${currentData.glowColor}-400/20 rounded-full blur-3xl`} />
              </div>
              
              {/* 3D модель с интеллектуальной загрузкой */}
              <div className="w-full h-full">
                <div
                  key={currentData.id}
                  className="hero-model relative w-full h-full"
                >
                  {/* 3D модель для всех устройств с оптимизированными настройками */}
                  <div className="w-full h-full relative">
                    {/* Лоадер показывается только если модель НЕ доступна */}
                    {!modelLoadStatus[currentData.modelUrl] && !modelPreloader.isLoaded(currentData.modelUrl) && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-4">
                          <div className="loader w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full" />
                          <p className="text-white/60 text-sm">Загрузка 3D модели...</p>
                        </div>
                      </div>
                    )}
                    
                    {isMobile ? (
                      <model-viewer
                        ref={modelRef}
                        src={currentData.modelUrl}
                        alt={currentData.title}
                        auto-rotate={true}
                        auto-rotate-delay="0"
                        rotation-per-second="30deg"
                        camera-orbit="0deg 75deg 1.6m"
                        min-camera-orbit="auto auto 1.6m"
                        max-camera-orbit="auto auto 1.6m"
                        field-of-view="40deg"
                        exposure="1.2"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          borderRadius: '1rem',
                          '--progress-bar-color': 'transparent',
                          '--progress-mask': 'transparent',
                          pointerEvents: 'none'
                        }}
                        onLoad={(e: any) => {
                          console.log(`✅ ProductHero: Модель загружена ${currentData.series}`);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: true }));
                          
                          // Дополнительная синхронизация с modelPreloader
                          if (!modelPreloader.isLoaded(currentData.modelUrl)) {
                            console.log(`🔄 ProductHero: Синхронизируем модель ${currentData.series} с preloader`);
                            modelPreloader.markAsLoaded && modelPreloader.markAsLoaded(currentData.modelUrl);
                          }
                        }}
                        onError={(e: any) => {
                          console.error(`❌ ProductHero: Ошибка загрузки модели ${currentData.series}:`, e);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: false }));
                        }}
                      />
                    ) : (
                      <model-viewer
                        ref={modelRef}
                        src={currentData.modelUrl}
                        alt={currentData.title}
                        auto-rotate={true}
                        auto-rotate-delay="0"
                        rotation-per-second="30deg"
                        camera-controls={true}
                        camera-orbit="0deg 75deg 1.2m"
                        min-camera-orbit="auto auto 0.4m"
                        max-camera-orbit="auto auto 2.5m"
                        field-of-view="30deg"
                        exposure="1.2"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          borderRadius: '1rem',
                          '--progress-bar-color': 'transparent',
                          '--progress-mask': 'transparent'
                        }}
                        onLoad={(e: any) => {
                          console.log(`✅ ProductHero: Модель загружена ${currentData.series}`);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: true }));
                          
                          // Дополнительная синхронизация с modelPreloader
                          if (!modelPreloader.isLoaded(currentData.modelUrl)) {
                            console.log(`🔄 ProductHero: Синхронизируем модель ${currentData.series} с preloader`);
                            modelPreloader.markAsLoaded && modelPreloader.markAsLoaded(currentData.modelUrl);
                          }
                        }}
                        onError={(e: any) => {
                          console.error(`❌ ProductHero: Ошибка загрузки модели ${currentData.series}:`, e);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: false }));
                        }}
                      />
                    )}
                    
                    {/* Fallback для ошибки загрузки */}
                    {modelLoadStatus[currentData.modelUrl] === false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl">
                        <div className="text-center p-8">
                          <Icon name="Wifi" size={48} className="text-white/60 mx-auto mb-4" />
                          <p className="text-white/80 text-lg font-medium mb-2">Модель {currentData.series} недоступна</p>
                          <p className="text-white/60 text-sm">Проверьте подключение к сети</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Переходные эффекты */}
      {isTransitioning && !isMobile && (
        <div className="hero-transition absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}

      {/* CSS Стили */}
      <style jsx>{`
        /* CSS Variables для адаптивности под разные герцовки */
        :root {
          --dur-fast: 160ms;
          --dur-normal: 240ms; 
          --dur-slow: 320ms;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
          --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          --dist-small: 20px;
          --dist-medium: 40px;
          --dist-large: 60px;
        }

        /* Адаптация под высокие частоты обновления */
        @media (min-resolution: 90dpi) {
          :root {
            --dur-fast: 140ms;
            --dur-normal: 220ms;
            --dur-slow: 280ms;
          }
        }

        @media (min-resolution: 120dpi) {
          :root {
            --dur-fast: 120ms;
            --dur-normal: 200ms;
            --dur-slow: 260ms;
            --dist-small: 18px;
            --dist-medium: 36px;
            --dist-large: 54px;
          }
        }

        @media (min-resolution: 144dpi) {
          :root {
            --dur-fast: 110ms;
            --dur-normal: 180ms;
            --dur-slow: 240ms;
            --dist-small: 16px;
            --dist-medium: 32px;
            --dist-large: 48px;
          }
        }

        /* Основная анимация появления Hero */
        .hero-container {
          will-change: transform, opacity;
          animation: heroEntry var(--dur-slow) var(--ease-out) forwards;
          animation-delay: 200ms;
          opacity: 0;
          transform: scale(0.98) translateY(var(--dist-medium));
          filter: blur(20px) brightness(0.3);
        }

        @keyframes heroEntry {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0) brightness(1);
          }
        }

        /* Параллакс эффекты - только transform и opacity */
        .hero-bg {
          will-change: transform;
          transition: all 1000ms var(--ease-out);
          transform: scale(calc(1 + abs(var(--mouse-x, 0)) * 0.05));
        }

        .hero-glow-main {
          will-change: transform;
          animation: glowFloat 4s ease-in-out infinite;
          transform: translate(
            calc(var(--mouse-x, 0) * 20px),
            calc(var(--mouse-y, 0) * 20px)
          );
        }

        .hero-glow-secondary {
          will-change: transform;
          animation: glowFloat 3s ease-in-out infinite reverse;
          transform: translate(
            calc(var(--mouse-x, 0) * -15px),
            calc(var(--mouse-y, 0) * -15px)
          ) rotate(calc(var(--mouse-x, 0) * 10deg));
        }

        .hero-geo-1 {
          will-change: transform;
          transform: translate(
            calc(var(--mouse-x, 0) * 5px),
            calc(var(--mouse-y, 0) * 5px)
          ) rotate(calc(12deg + var(--mouse-x, 0) * 5deg));
        }

        .hero-geo-2 {
          will-change: transform;
          transform: translate(
            calc(var(--mouse-x, 0) * -8px),
            calc(var(--mouse-y, 0) * -8px)
          ) rotate(calc(var(--mouse-x, 0) * -8deg));
        }

        @keyframes glowFloat {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8) translate(var(--x, 0), var(--y, 0));
          }
          50% {
            opacity: 0.1;
            transform: scale(1.2) translate(var(--x, 0), var(--y, 0));
          }
        }

        /* Контент анимации - stagger эффект */
        .hero-content {
          will-change: transform, opacity;
          animation: contentEntry var(--dur-slow) var(--ease-out) forwards;
          animation-delay: 600ms;
          opacity: 0;
          transform: translateY(var(--dist-large));
          filter: blur(10px);
        }

        @keyframes contentEntry {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .hero-badge {
          will-change: transform, opacity;
          animation: badgeEntry var(--dur-normal) var(--ease-bounce) forwards;
          animation-delay: 900ms;
          opacity: 0;
          transform: scale(0.5) translateY(var(--dist-small));
        }

        @keyframes badgeEntry {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .hero-title {
          will-change: transform, opacity;
          animation: titleEntry var(--dur-slow) var(--ease-out) forwards;
          animation-delay: 1100ms;
          opacity: 0;
          transform: translateY(var(--dist-large)) scale(0.9);
          filter: blur(8px);
        }

        @keyframes titleEntry {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .hero-description {
          will-change: opacity, transform;
          animation: descEntry var(--dur-normal) var(--ease-out) forwards;
          animation-delay: 1300ms;
          opacity: 0;
          transform: translateY(var(--dist-small));
        }

        @keyframes descEntry {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stagger анимация для фич */
        .hero-features {
          will-change: opacity;
          animation: featuresEntry var(--dur-normal) var(--ease-out) forwards;
          animation-delay: 1500ms;
          opacity: 0;
        }

        .hero-feature {
          will-change: transform, opacity;
          animation: featureEntry var(--dur-normal) var(--ease-out) forwards;
          animation-delay: calc(1600ms + var(--feature-index, 0) * 100ms);
          opacity: 0;
          transform: translateX(calc(var(--dist-small) * -1));
        }

        @keyframes featuresEntry {
          to { opacity: 1; }
        }

        @keyframes featureEntry {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-progress {
          will-change: opacity, transform;
          animation: progressEntry var(--dur-normal) var(--ease-out) forwards;
          animation-delay: 1800ms;
          opacity: 0;
          transform: translateY(var(--dist-small));
        }

        @keyframes progressEntry {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 3D модель анимации */
        .hero-model-container {
          will-change: transform, opacity;
          animation: modelContainerEntry var(--dur-slow) var(--ease-out) forwards;
          animation-delay: 800ms;
          opacity: 0;
          transform: scale(0.7) rotateY(30deg) rotateX(15deg);
          filter: blur(20px);
        }

        @keyframes modelContainerEntry {
          to {
            opacity: 1;
            transform: scale(1) rotateY(0) rotateX(0);
            filter: blur(0);
          }
        }

        .hero-model-bg {
          will-change: transform, opacity;
          animation: modelBgPulse 4s ease-in-out infinite;
        }

        .hero-model-glow {
          will-change: transform, opacity;
          animation: modelGlowPulse 3s ease-in-out infinite;
        }

        @keyframes modelBgPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes modelGlowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.2);
          }
        }

        .hero-model {
          will-change: transform, opacity;
          animation: modelEntry var(--dur-slow) var(--ease-out) forwards;
          animation-delay: 1400ms;
          opacity: 0;
          transform: scale(0.9) translateY(var(--dist-small));
          filter: blur(10px);
        }

        @keyframes modelEntry {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        /* Лоадер анимация */
        .loader {
          will-change: transform;
          animation: loaderSpin 1s linear infinite;
        }

        @keyframes loaderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Переходные эффекты */
        .hero-transition {
          will-change: transform;
          animation: transitionSlide var(--dur-fast) var(--ease-in-out);
          transform: scaleX(0);
          transform-origin: left;
        }

        @keyframes transitionSlide {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }

        /* Мобильные оптимизации */
        @media (max-width: 768px) {
          :root {
            --dur-fast: 100ms;
            --dur-normal: 200ms;
            --dur-slow: 280ms;
            --dist-small: 16px;
            --dist-medium: 32px;
            --dist-large: 48px;
          }

          /* Отключаем параллакс и сложные эффекты на мобильных */
          .hero-glow-main,
          .hero-glow-secondary,
          .hero-geo-1,
          .hero-geo-2 {
            transform: none !important;
            animation-duration: 2s;
          }

          .hero-bg {
            transform: none !important;
          }

          /* Ускоренные анимации для мобильных */
          .hero-content,
          .hero-model-container {
            animation-delay: 300ms;
            animation-duration: var(--dur-normal);
          }

          .hero-badge { animation-delay: 400ms; }
          .hero-title { animation-delay: 500ms; }
          .hero-description { animation-delay: 600ms; }
          .hero-features { animation-delay: 700ms; }
          .hero-feature { animation-delay: calc(750ms + var(--feature-index, 0) * 50ms); }
          .hero-progress { animation-delay: 900ms; }
        }

        /* Убираем will-change после завершения анимаций */
        .hero-container.loaded,
        .hero-container.loaded * {
          will-change: auto;
        }
      `}</style>
    </div>
  );
};

export default ProductHero;