import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { modelPreloader } from '@/utils/modelPreloader';
import { modelCacheManager } from '@/utils/modelCacheManager';

// Конфигурация моделей коммутаторов
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
    glowColor: '#005baa',
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
    glowColor: '#8338EC',
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
    glowColor: '#00acad',
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
    glowColor: '#FF6B35',
    accentColor: '#FFD6C2'
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});

  // Отслеживание размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Инициализация моделей
  useEffect(() => {
    const initializeComponent = async () => {
      console.log('🚀 ProductHero: Инициализация компонента');
      
      const allModelsInCache = heroData.every(model => 
        modelPreloader.isLoaded(model.modelUrl)
      );
      
      if (allModelsInCache) {
        console.log('⚡ ProductHero: Все модели в кэше - мгновенная загрузка');
        const newStatus: Record<string, boolean> = {};
        heroData.forEach(model => {
          newStatus[model.modelUrl] = true;
        });
        setModelLoadStatus(newStatus);
        setIsInitialized(true);
      } else {
        console.log('📦 ProductHero: Проверяем доступность моделей');
        const partialStatus: Record<string, boolean> = {};
        
        for (const model of heroData) {
          const isPreloaded = modelPreloader.isLoaded(model.modelUrl);
          const isCached = await modelCacheManager.hasModel(model.modelUrl);
          
          if (isPreloaded || isCached) {
            partialStatus[model.modelUrl] = true;
            console.log(`✅ ProductHero: Модель ${model.series} доступна`);
          }
        }
        
        if (Object.keys(partialStatus).length > 0) {
          setModelLoadStatus(partialStatus);
        }
        
        const currentModel = heroData[currentIndex];
        if (!modelPreloader.isLoaded(currentModel.modelUrl)) {
          modelPreloader.preloadModel(currentModel.modelUrl, 'high');
        }
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeComponent();
    }
  }, [currentIndex, isInitialized]);

  // Автоматическая смена слайдов
  useEffect(() => {
    if (isInitialized) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        
        setTimeout(() => {
          const nextIndex = (currentIndex + 1) % heroData.length;
          setCurrentIndex(nextIndex);
          setIsTransitioning(false);
        }, 300);
      }, 8000);
      
      intervalRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [isInitialized, currentIndex]);

  const currentData = heroData[currentIndex];

  return (
    <div className="hero-section">
      {/* Динамический фоновый градиент */}
      <div 
        className={`hero-background bg-gradient-to-br ${currentData.gradient}`}
        style={{
          '--glow-color': currentData.glowColor,
          '--accent-color': currentData.accentColor
        } as React.CSSProperties}
      />
      
      {/* Световые эффекты */}
      <div className="hero-lights">
        <div className="light-primary" style={{ backgroundColor: `${currentData.glowColor}40` }} />
        <div className="light-secondary" style={{ backgroundColor: `${currentData.accentColor}33` }} />
      </div>
      
      {/* Геометрические элементы */}
      <div className="hero-geometry">
        <div className="geometry-box" style={{ borderColor: `${currentData.accentColor}40` }} />
        <div className="geometry-circle" />
      </div>

      {/* Основной контент */}
      <div className="hero-content">
        <div className="hero-container">
          <div className="hero-grid">
            
            {/* Левая колонка - контент */}
            <div className={`hero-text ${isTransitioning ? 'transitioning' : ''}`}>
              {/* Заголовок */}
              <div className="hero-header">
                <div className="hero-badge">
                  ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ
                </div>
                
                <h1 className="hero-title" key={currentData.id}>
                  {currentData.title}
                </h1>
                
                <p className="hero-description" key={`${currentData.id}-desc`}>
                  {currentData.description}
                </p>
              </div>

              {/* Особенности */}
              <div className="hero-features" key={`${currentData.id}-features`}>
                {currentData.features.map((feature, index) => (
                  <div
                    key={`${currentData.id}-feature-${index}`}
                    className="hero-feature"
                    style={{ '--feature-delay': `${index * 100}ms` } as React.CSSProperties}
                  >
                    <div 
                      className="feature-dot"
                      style={{
                        backgroundColor: currentData.glowColor,
                        boxShadow: `0 0 10px ${currentData.glowColor}80`
                      }}
                    />
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Индикатор прогресса */}
              <div className="hero-progress">
                <div className="progress-dots">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
                      style={index === currentIndex ? {
                        backgroundColor: currentData.glowColor,
                        boxShadow: `0 0 10px ${currentData.glowColor}80`
                      } : {}}
                    />
                  ))}
                </div>
                <span className="progress-counter">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Правая колонка - 3D модель */}
            <div className={`hero-model ${isTransitioning ? 'transitioning' : ''}`}>
              {/* 3D фоновые эффекты отключены для слияния с основным фоном */}
              
              {/* 3D модель */}
              <div className="model-container">
                {/* Лоадер */}
                {!modelLoadStatus[currentData.modelUrl] && !modelPreloader.isLoaded(currentData.modelUrl) && (
                  <div className="model-loader">
                    <div className="loader-spinner" />
                    <p className="loader-text">Загрузка 3D модели...</p>
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
                    camera-orbit="0deg 75deg 1.2m"
                    min-camera-orbit="auto auto 1.2m"
                    max-camera-orbit="auto auto 1.2m"
                    field-of-view="35deg"
                    exposure="1.2"
                    shadow-intensity="0.3"
                    environment-image="neutral"
                    interaction-prompt="none"
                    loading="eager"
                    reveal="auto"
                    className="model-viewer-mobile"
                    onLoad={() => {
                      console.log(`✅ ProductHero: Модель загружена ${currentData.series}`);
                      setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: true }));
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
                    camera-orbit="0deg 75deg 1.0m"
                    min-camera-orbit="auto auto 0.6m"
                    max-camera-orbit="auto auto 1.8m"
                    field-of-view="35deg"
                    exposure="1.2"
                    shadow-intensity="0.3"
                    environment-image="neutral"
                    interaction-prompt="none"
                    loading="eager"
                    reveal="auto"
                    className="model-viewer-desktop"
                    onLoad={() => {
                      console.log(`✅ ProductHero: Модель загружена ${currentData.series}`);
                      setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: true }));
                    }}
                    onError={(e: any) => {
                      console.error(`❌ ProductHero: Ошибка загрузки модели ${currentData.series}:`, e);
                      setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: false }));
                    }}
                  />
                )}
                
                {/* Fallback для ошибки загрузки */}
                {modelLoadStatus[currentData.modelUrl] === false && (
                  <div className="model-error">
                    <Icon name="Wifi" size={48} className="error-icon" />
                    <p className="error-title">Модель {currentData.series} недоступна</p>
                    <p className="error-text">Проверьте подключение к сети</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Переходные эффекты */}
      {isTransitioning && !isMobile && (
        <div className="hero-transition" />
      )}
    </div>
  );
};

export default ProductHero;