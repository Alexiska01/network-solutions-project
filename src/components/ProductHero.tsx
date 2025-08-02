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
  
  // Удаляем зависимость от showWelcome - теперь ProductHero полностью автономен
  const [isInitialized, setIsInitialized] = useState(false);
  

  const [isMobile, setIsMobile] = useState(false);
  const [isHighRefreshRate, setIsHighRefreshRate] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});

  const preloadedViewers = useRef<Map<string, any>>(new Map());

  // Отслеживание размера экрана и частоты обновления
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const detectHighRefreshRate = () => {
      // Детекция 120Hz+ дисплеев
      const checkRefreshRate = () => {
        let refreshRate = 60; // Дефолт
        
        // Проверка через matchMedia для поддерживаемых браузеров
        if (window.matchMedia) {
          if (window.matchMedia('(min-refresh-rate: 120hz)').matches) {
            refreshRate = 120;
          } else if (window.matchMedia('(min-refresh-rate: 90hz)').matches) {
            refreshRate = 90;
          }
        }
        
        // Детекция через requestAnimationFrame (backup метод)
        if (refreshRate === 60) {
          const times: number[] = [];
          const measureRefreshRate = (timestamp: number) => {
            times.push(timestamp);
            if (times.length >= 10) {
              const avgInterval = (times[times.length - 1] - times[0]) / (times.length - 1);
              const estimatedRefreshRate = 1000 / avgInterval;
              
              if (estimatedRefreshRate > 100) {
                setIsHighRefreshRate(true);
                console.log(`🚀 Обнаружен высокочастотный дисплей: ~${Math.round(estimatedRefreshRate)} FPS`);
              }
            } else {
              requestAnimationFrame(measureRefreshRate);
            }
          };
          requestAnimationFrame(measureRefreshRate);
        } else {
          setIsHighRefreshRate(refreshRate >= 90);
          console.log(`🚀 Детекция через CSS: ${refreshRate}Hz дисплей`);
        }
      };
      
      // Запускаем детекцию после полной загрузки
      setTimeout(checkRefreshRate, 100);
    };
    
    checkMobile();
    detectHighRefreshRate();
    
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



  // Автоматическая смена слайдов каждые 7 секунд
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

  // ProductHero теперь полностью автономен и не зависит от WelcomeScreen
  // WelcomeScreen управляется в Index.tsx на уровне страницы

  return (
    <div className={`relative h-[100vh] md:h-[70vh] bg-gradient-to-br from-[#0B3C49] via-[#1A237E] to-[#2E2E2E] overflow-hidden hero-container ${isHighRefreshRate ? 'hero-120fps' : ''}`}>
      {/* Динамический фоновый градиент */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-30 transition-all duration-1000 ease-out`}
      />
      
      {/* Параллакс элементы */}
      <div className="absolute inset-0">
        {/* Основной световой эффект */}
        <div
          className={`absolute top-1/4 left-1/3 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl hero-parallax-light1`}
          style={{
            backgroundColor: `${currentData.glowColor.replace('[', '').replace(']', '')}40`
          }}
        />
        
        {/* Дополнительные световые пятна */}
        <div
          className={`absolute bottom-1/4 right-1/3 w-48 h-48 md:w-64 md:h-64 rounded-full blur-2xl hero-parallax-light2`}
          style={{
            backgroundColor: `${currentData.accentColor}33`
          }}
        />
        
        {/* Геометрические элементы */}
        <div
          className="absolute top-16 right-8 md:top-20 md:right-20 w-20 h-20 md:w-32 md:h-32 border border-white/20 rounded-lg rotate-12 hero-parallax-geo1"
          style={{
            borderColor: `${currentData.accentColor}40`
          }}
        />
        
        <div className="absolute bottom-24 left-8 md:bottom-32 md:left-20 w-16 h-16 md:w-24 md:h-24 border border-white/5 rounded-full hero-parallax-geo2" />
      </div>



      {/* Основной контент */}
      <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 h-full md:h-auto">
          <div className="grid lg:grid-cols-2 gap-0 md:gap-6 lg:gap-16 items-center h-full md:h-auto">
            
            {/* Левая колонка - контент */}
            <div className="flex flex-col justify-end md:justify-center space-y-4 md:space-y-6 order-2 lg:order-1 pb-safe pt-4 md:pt-0 md:pb-0 h-[40vh] md:h-auto hero-text-container">
              {/* Заголовок */}
              <div className="space-y-3 md:space-y-4">
                <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-[11px] md:text-sm font-medium text-white/80 border border-white/20 hero-badge">
                  ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ
                </div>
                
                <h1
                  key={currentData.id}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight hero-title hero-content-transition"
                  data-changing={isTransitioning}
                >
                  {currentData.title}
                </h1>
                
                <p
                  key={`${currentData.id}-desc`}
                  className="text-sm xs:text-base sm:text-lg md:text-lg text-white/70 leading-relaxed max-w-lg md:max-w-none hero-description hero-content-transition"
                  data-changing={isTransitioning}
                >
                  {currentData.description}
                </p>
              </div>

              {/* Особенности */}
              <div
                key={`${currentData.id}-features`}
                className="space-y-2 md:space-y-3 hero-features hero-content-transition"
                data-changing={isTransitioning}
              >
                {currentData.features.map((feature, index) => (
                  <div
                    key={`${currentData.id}-feature-${index}`}
                    className="flex items-center gap-3 md:gap-4 px-3 py-2.5 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-xl border border-white/10 hover:bg-white/10 hero-feature-item"
                  >
                    <div 
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full shadow-lg`}
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
              <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 hero-progress hero-content-transition">
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
            <div className="relative h-[400px] order-1 lg:order-2 flex items-center justify-center hero-model-container" style={{
              contain: 'layout style paint',
              overflow: 'hidden',
              transform: 'translateZ(0)',
              minHeight: '400px',
              maxHeight: '400px',
              flexShrink: 0,
              flexGrow: 0
            }}>

              
              {/* 3D модель с интеллектуальной загрузкой */}
              <div className="w-full h-full">
                <div
                  key={currentData.id}
                  className="relative w-full h-full hero-model-content"
                  data-transitioning={isTransitioning && isMobile}
                >
                  {/* 3D модель для всех устройств с оптимизированными настройками */}
                  <div className="w-full h-full relative">
                    {/* DEBUG: Логируем состояния */}
                    {(() => {
                      const hasInUI = modelLoadStatus[currentData.modelUrl];
                      const hasInPreloader = modelPreloader.isLoaded(currentData.modelUrl);
                      const shouldShowLoader = !hasInUI && !hasInPreloader;
                      console.log(`🔍 ProductHero RENDER: ${currentData.series} - UI: ${hasInUI}, Preloader: ${hasInPreloader}, showLoader: ${shouldShowLoader}`);
                      return null;
                    })()}
                    
                    {/* Лоадер показывается только если модель НЕ доступна ни в UI, ни в preloader */}
                    {!modelLoadStatus[currentData.modelUrl] && !modelPreloader.isLoaded(currentData.modelUrl) && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
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
                        min-camera-orbit="0deg 75deg 1.6m"
                        max-camera-orbit="0deg 75deg 1.6m"
                        field-of-view="40deg"
                        exposure="1.2"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        disable-zoom={true}
                        disable-pan={true}
                        style={{
                          width: '100%',
                          height: '400px',
                          background: 'transparent',
                          borderRadius: '1rem',
                          '--progress-bar-color': 'transparent',
                          '--progress-mask': 'transparent',
                          pointerEvents: 'none',
                          minHeight: '400px',
                          maxHeight: '400px',
                          objectFit: 'contain',
                          transform: 'translateZ(0)',
                          contain: 'layout style paint',
                          flexShrink: 0,
                          flexGrow: 0
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
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent origin-left hero-transition-line" />
      )}
    </div>
  );
};

export default ProductHero;