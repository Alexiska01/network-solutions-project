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
      className="hero-container"
      style={{
        '--current-glow-color': currentData.glowColor.replace('[', '').replace(']', ''),
        '--current-accent-color': currentData.accentColor,
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y
      } as React.CSSProperties}
    >
      {/* Динамический фоновый градиент */}
      <div 
        className="hero-bg"
        style={{
          background: `linear-gradient(135deg, ${currentData.gradient.replace('from-[', '').replace('] via-[', ', ').replace('] to-[', ', ').replace(']', '')})`
        }}
      />
      
      {/* Параллакс элементы */}
      <div className="hero-parallax">
        {/* Основной световой эффект */}
        <div
          className="hero-glow-main"
          style={{
            backgroundColor: `${currentData.glowColor.replace('[', '').replace(']', '')}40`
          }}
        />
        
        {/* Дополнительные световые пятна */}
        <div
          className="hero-glow-secondary"
          style={{
            backgroundColor: `${currentData.accentColor}33`
          }}
        />
        
        {/* Геометрические элементы */}
        <div
          className="hero-geo-1"
          style={{
            borderColor: `${currentData.accentColor}40`
          }}
        />
        
        <div className="hero-geo-2" />
      </div>

      {/* Основной контент */}
      <div className="hero-main">
        <div className="hero-wrapper">
          <div className="hero-grid">
            
            {/* Левая колонка - контент */}
            <div className="hero-content">
              {/* Заголовок */}
              <div className="hero-header">
                <div className="hero-badge">
                  ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ
                </div>
                
                <h1
                  key={currentData.id}
                  className="hero-title"
                >
                  {currentData.title}
                </h1>
                
                <p
                  key={`${currentData.id}-desc`}
                  className="hero-description"
                >
                  {currentData.description}
                </p>
              </div>

              {/* Особенности */}
              <div
                key={`${currentData.id}-features`}
                className="hero-features"
              >
                {currentData.features.map((feature, index) => (
                  <div
                    key={`${currentData.id}-feature-${index}`}
                    className="hero-feature"
                    style={{ '--feature-index': index } as React.CSSProperties}
                  >
                    <div 
                      className="hero-feature-dot"
                      style={{
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      }}
                    />
                    <span className="hero-feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Индикатор прогресса */}
              <div className="hero-progress">
                <div className="hero-progress-dots">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`hero-progress-dot ${index === currentIndex ? 'active' : ''}`}
                      style={index === currentIndex ? {
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      } : {}}
                    />
                  ))}
                </div>
                <span className="hero-progress-counter">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Правая колонка - 3D модель */}
            <div className="hero-model-container">
              {/* 3D фоновые эффекты */}
              <div className="hero-model-effects">
                <div 
                  className="hero-model-bg" 
                  style={{
                    background: `linear-gradient(135deg, ${currentData.gradient.replace('from-[', '').replace('] via-[', ', ').replace('] to-[', ', ').replace(']', '')})`
                  }}
                />
                <div 
                  className="hero-model-glow"
                  style={{
                    backgroundColor: `${currentData.glowColor.replace('[', '').replace(']', '')}20`
                  }}
                />
              </div>
              
              {/* 3D модель с интеллектуальной загрузкой */}
              <div className="hero-model-wrapper">
                <div
                  key={currentData.id}
                  className="hero-model"
                >
                  {/* 3D модель для всех устройств с оптимизированными настройками */}
                  <div className="hero-model-inner">
                    {/* Лоадер показывается только если модель НЕ доступна */}
                    {!modelLoadStatus[currentData.modelUrl] && !modelPreloader.isLoaded(currentData.modelUrl) && (
                      <div className="hero-loader">
                        <div className="hero-loader-inner">
                          <div className="loader" />
                          <p className="hero-loader-text">Загрузка 3D модели...</p>
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
                      <div className="hero-model-error">
                        <div className="hero-model-error-content">
                          <Icon name="Wifi" size={48} className="hero-model-error-icon" />
                          <p className="hero-model-error-title">Модель {currentData.series} недоступна</p>
                          <p className="hero-model-error-text">Проверьте подключение к сети</p>
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
        <div className="hero-transition" />
      )}

      <style jsx>{`
        .hero-container {
          position: relative;
          height: 100vh;
          background: linear-gradient(135deg, #0B3C49, #1A237E, #2E2E2E);
          overflow: hidden;
          opacity: 0;
          transform: scale(0.98) translateY(40px);
          filter: blur(20px) brightness(0.3);
          animation: heroEntry 320ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards;
        }

        @media (min-width: 768px) {
          .hero-container {
            height: 70vh;
          }
        }

        @keyframes heroEntry {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0) brightness(1);
          }
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          transition: transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-parallax {
          position: absolute;
          inset: 0;
        }

        .hero-glow-main {
          position: absolute;
          top: 25%;
          left: 33.333%;
          width: 16rem;
          height: 16rem;
          border-radius: 50%;
          filter: blur(3rem);
          animation: glowFloat 4s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .hero-glow-main {
            width: 24rem;
            height: 24rem;
          }
        }

        .hero-glow-secondary {
          position: absolute;
          bottom: 25%;
          right: 33.333%;
          width: 12rem;
          height: 12rem;
          border-radius: 50%;
          filter: blur(2rem);
          animation: glowFloat 3s ease-in-out infinite reverse;
        }

        @media (min-width: 768px) {
          .hero-glow-secondary {
            width: 16rem;
            height: 16rem;
          }
        }

        .hero-geo-1 {
          position: absolute;
          top: 4rem;
          right: 2rem;
          width: 5rem;
          height: 5rem;
          border-width: 1px;
          border-style: solid;
          border-radius: 0.5rem;
          transform: rotate(12deg);
        }

        @media (min-width: 768px) {
          .hero-geo-1 {
            top: 5rem;
            right: 5rem;
            width: 8rem;
            height: 8rem;
          }
        }

        .hero-geo-2 {
          position: absolute;
          bottom: 6rem;
          left: 2rem;
          width: 4rem;
          height: 4rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        @media (min-width: 768px) {
          .hero-geo-2 {
            bottom: 8rem;
            left: 5rem;
            width: 6rem;
            height: 6rem;
          }
        }

        @keyframes glowFloat {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.2);
          }
        }

        .hero-main {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .hero-main {
            flex-direction: row;
            align-items: center;
            height: auto;
          }
        }

        .hero-wrapper {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1rem;
          height: 100%;
        }

        @media (min-width: 768px) {
          .hero-wrapper {
            padding: 0 2rem;
            height: auto;
          }
        }

        @media (min-width: 1024px) {
          .hero-wrapper {
            padding: 0 4rem;
          }
        }

        .hero-grid {
          display: grid;
          gap: 0;
          align-items: stretch;
          height: 100%;
        }

        @media (min-width: 768px) {
          .hero-grid {
            gap: 1.5rem;
            align-items: center;
            height: auto;
          }
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: end;
          gap: 1rem;
          order: 2;
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
          padding-top: 1rem;
          height: 45vh;
          opacity: 0;
          transform: translateY(60px);
          filter: blur(10px);
          animation: contentEntry 320ms cubic-bezier(0.16, 1, 0.3, 1) 600ms forwards;
        }

        @media (min-width: 768px) {
          .hero-content {
            justify-content: center;
            gap: 1.5rem;
            order: 1;
            padding: 0;
            height: auto;
          }
        }

        @media (min-width: 1024px) {
          .hero-content {
            order: 1;
          }
        }

        @keyframes contentEntry {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .hero-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 768px) {
          .hero-header {
            gap: 1rem;
          }
        }

        .hero-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(0.5rem);
          border-radius: 9999px;
          font-size: 0.6875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
          opacity: 0;
          transform: scale(0.5) translateY(20px);
          animation: badgeEntry 240ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 900ms forwards;
        }

        @media (min-width: 768px) {
          .hero-badge {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }

        @keyframes badgeEntry {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .hero-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          line-height: 1.25;
          opacity: 0;
          transform: translateY(60px) scale(0.9);
          filter: blur(8px);
          animation: titleEntry 320ms cubic-bezier(0.16, 1, 0.3, 1) 1100ms forwards;
        }

        @media (min-width: 375px) {
          .hero-title {
            font-size: 1.875rem;
          }
        }

        @media (min-width: 414px) {
          .hero-title {
            font-size: 2.25rem;
          }
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 1.875rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 2.25rem;
          }
        }

        @media (min-width: 1280px) {
          .hero-title {
            font-size: 3rem;
          }
        }

        @keyframes titleEntry {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .hero-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.625;
          max-width: 32rem;
          opacity: 0;
          transform: translateY(20px);
          animation: descEntry 240ms cubic-bezier(0.16, 1, 0.3, 1) 1300ms forwards;
        }

        @media (min-width: 375px) {
          .hero-description {
            font-size: 1rem;
          }
        }

        @media (min-width: 414px) {
          .hero-description {
            font-size: 1.125rem;
          }
        }

        @media (min-width: 768px) {
          .hero-description {
            font-size: 1.125rem;
            max-width: none;
          }
        }

        @keyframes descEntry {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-features {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 0;
          animation: featuresEntry 240ms cubic-bezier(0.16, 1, 0.3, 1) 1500ms forwards;
        }

        @media (min-width: 768px) {
          .hero-features {
            gap: 0.75rem;
          }
        }

        @keyframes featuresEntry {
          to {
            opacity: 1;
          }
        }

        .hero-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(0.5rem);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: background 300ms;
          opacity: 0;
          transform: translateX(-20px);
          animation: featureEntry 240ms cubic-bezier(0.16, 1, 0.3, 1) calc(1600ms + var(--feature-index, 0) * 100ms) forwards;
        }

        @media (min-width: 768px) {
          .hero-feature {
            gap: 1rem;
            padding: 1rem;
            border-radius: 0.75rem;
          }
        }

        .hero-feature:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @keyframes featureEntry {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-feature-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }

        @media (min-width: 768px) {
          .hero-feature-dot {
            width: 0.75rem;
            height: 0.75rem;
          }
        }

        .hero-feature-text {
          color: white;
          font-weight: 500;
          font-size: 0.8125rem;
          line-height: 1.25;
        }

        @media (min-width: 375px) {
          .hero-feature-text {
            font-size: 0.875rem;
          }
        }

        @media (min-width: 414px) {
          .hero-feature-text {
            font-size: 1rem;
          }
        }

        @media (min-width: 768px) {
          .hero-feature-text {
            font-size: 1rem;
          }
        }

        .hero-progress {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.75rem;
          opacity: 0;
          transform: translateY(20px);
          animation: progressEntry 240ms cubic-bezier(0.16, 1, 0.3, 1) 1800ms forwards;
        }

        @media (min-width: 768px) {
          .hero-progress {
            gap: 1rem;
            padding-top: 1rem;
          }
        }

        @keyframes progressEntry {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-progress-dots {
          display: flex;
          gap: 0.5rem;
        }

        .hero-progress-dot {
          height: 0.25rem;
          border-radius: 9999px;
          transition: all 500ms;
          width: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-progress-dot.active {
          width: 2.5rem;
        }

        @media (min-width: 768px) {
          .hero-progress-dot {
            height: 0.25rem;
            width: 1rem;
          }

          .hero-progress-dot.active {
            width: 3rem;
          }
        }

        .hero-progress-counter {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
          font-family: ui-monospace, SFMono-Regular, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-variant-numeric: tabular-nums;
        }

        @media (min-width: 768px) {
          .hero-progress-counter {
            font-size: 0.875rem;
          }
        }

        .hero-model-container {
          position: relative;
          height: 55vh;
          order: 1;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: scale(0.7) rotateY(30deg) rotateX(15deg);
          filter: blur(20px);
          animation: modelContainerEntry 320ms cubic-bezier(0.16, 1, 0.3, 1) 800ms forwards;
        }

        @media (min-width: 375px) {
          .hero-model-container {
            height: 50vh;
          }
        }

        @media (min-width: 414px) {
          .hero-model-container {
            height: 45vh;
          }
        }

        @media (min-width: 768px) {
          .hero-model-container {
            height: 25rem;
            order: 2;
          }
        }

        @media (min-width: 1024px) {
          .hero-model-container {
            height: 31.25rem;
            order: 2;
          }
        }

        @keyframes modelContainerEntry {
          to {
            opacity: 1;
            transform: scale(1) rotateY(0) rotateX(0);
            filter: blur(0);
          }
        }

        .hero-model-effects {
          position: absolute;
          inset: 0;
        }

        .hero-model-bg {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          border-radius: 1.5rem;
          filter: blur(2rem);
          animation: modelBgPulse 4s ease-in-out infinite;
        }

        .hero-model-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          filter: blur(3rem);
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

        .hero-model-wrapper {
          width: 100%;
          height: 100%;
        }

        .hero-model {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: scale(0.9) translateY(20px);
          filter: blur(10px);
          animation: modelEntry 320ms cubic-bezier(0.16, 1, 0.3, 1) 1400ms forwards;
        }

        @keyframes modelEntry {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        .hero-model-inner {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hero-loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .hero-loader-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .loader {
          width: 4rem;
          height: 4rem;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top: 4px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: loaderSpin 1s linear infinite;
        }

        @keyframes loaderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-loader-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .hero-model-error {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(1rem);
          border-radius: 1rem;
        }

        .hero-model-error-content {
          text-align: center;
          padding: 2rem;
        }

        .hero-model-error-icon {
          color: rgba(255, 255, 255, 0.6);
          margin: 0 auto 1rem;
        }

        .hero-model-error-title {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .hero-model-error-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .hero-transition {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.25rem;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: scaleX(0);
          transform-origin: left;
          animation: transitionSlide 160ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes transitionSlide {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }

        /* Мобильные оптимизации */
        @media (max-width: 768px) {
          /* Отключаем параллакс и сложные эффекты на мобильных */
          .hero-glow-main,
          .hero-glow-secondary,
          .hero-geo-1,
          .hero-geo-2 {
            animation-duration: 2s;
          }

          /* Ускоренные анимации для мобильных */
          .hero-content,
          .hero-model-container {
            animation-delay: 300ms;
            animation-duration: 200ms;
          }

          .hero-badge { animation-delay: 400ms; }
          .hero-title { animation-delay: 500ms; }
          .hero-description { animation-delay: 600ms; }
          .hero-features { animation-delay: 700ms; }
          .hero-feature { animation-delay: calc(750ms + var(--feature-index, 0) * 50ms); }
          .hero-progress { animation-delay: 900ms; }
        }
      `}</style>
    </div>
  );
};

export default ProductHero;