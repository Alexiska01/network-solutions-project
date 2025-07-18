import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import ModelViewer3D from '@/components/ModelViewer3D';
import { useModelPreloader } from '@/hooks/useModelPreloader';
import WelcomeScreen from '@/components/WelcomeScreen';
import PlayStationTransition from '@/components/PlayStationTransition';

const heroData = [
  {
    id: 'IDS3530',
    title: 'Коммутаторы серии IDS3530',
    description: 'Промышленные управляемые коммутаторы для критически важных применений',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3530all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС',
      'Два модульных блока питания',
      'Поддержка PoE/PoE+',
      'Статическая и динамическая маршрутизация',
      'Развитые возможности по управлению',
      '',
      ''
    ]
  },
  {
    id: 'IDS3730',
    title: 'Коммутаторы серии IDS3730',
    description: 'Высокопроизводительные коммутаторы для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3730all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС',
      'Два модульных блока питания',
      'Поддержка PoE/PoE+',
      'Статическая и динамическая маршрутизация',
      'Развитые возможности по управлению',
      '',
      ''
    ]
  },
  {
    id: 'IDS4530',
    title: 'Коммутаторы серии IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями управления',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/4530all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС',
      'Два модульных блока питания',
      'Поддержка PoE/PoE+',
      'Модули расширения',
      'Статическая и динамическая маршрутизация',
      'Поддержка технологии VxLAN',
      'Развитые возможности по управлению'
    ]
  },
  {
    id: 'IDS6010',
    title: 'Коммутаторы серии IDS6010',
    description: 'Высокопроизводительные модульные коммутаторы для дата-центров',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/6010all.glb',
    features: [
      'Высокая плотность портов',
      'Поддержка 100G интерфейсов',
      'Расширенные функции безопасности',
      'Отказоустойчивость',
      'Централизованное управление',
      'Масштабируемость',
      'Энергоэффективность'
    ]
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { preloadModels, isModelReady } = useModelPreloader();
  // const { getModelUrl, isLoading: isModelsLoading } = useCompressedModels();

  // Простая фоновая загрузка всех моделей
  useEffect(() => {
    const allUrls = heroData.map(item => item.modelUrl);
    console.log('🔄 Фоновая загрузка моделей:', allUrls);
    preloadModels(allUrls);
  }, [preloadModels]);

  // Простая карусель - смена каждые 9 секунд
  useEffect(() => {
    if (!showWelcome) {
      console.log('🎬 Запускаю карусель каждые 9 секунд');
      
      const interval = setInterval(() => {
        // Запускаем переход
        setIsTransitioning(true);
        
        // Через 300ms меняем контент
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % heroData.length);
          setIsTransitioning(false);
        }, 300);
      }, 9000);
      
      intervalRef.current = interval;
      
      return () => clearInterval(interval);
    }
  }, [showWelcome]);

  const currentData = heroData[currentIndex];
  
  // Отладочная информация
  console.log('🔍 Debug ProductHero:', {
    showWelcome,
    currentIndex,
    currentSeries: heroData[currentIndex]?.id,
    currentModelUrl: heroData[currentIndex]?.modelUrl,
    resolvedModelUrl: heroData[currentIndex]?.modelUrl || '',
    totalSeries: heroData.length,
    allSeriesIds: heroData.map(item => item.id)
  });

  // Проверка доступности моделей
  useEffect(() => {
    heroData.forEach((item, index) => {
      console.log(`🔍 Проверка модели ${index}: ${item.id} - ${item.modelUrl}`);
      
      fetch(item.modelUrl, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            console.log(`✅ ${item.id} модель доступна`);
          } else {
            console.error(`❌ ${item.id} модель недоступна: ${response.status}`);
          }
        })
        .catch(error => {
          console.error(`❌ ${item.id} ошибка загрузки:`, error);
        });
    });
  }, []);

  // Простая автозагрузка welcome screen
  useEffect(() => {
    // WelcomeScreen сам управляет временем (15 секунд)
    // Никаких дополнительных действий не требуется
  }, []);

  const handleWelcomeComplete = () => {
    console.log('✅ WelcomeScreen onComplete вызван');
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    console.log('✅ PlayStation переход завершен');
    setShowWelcome(false);
    setShowTransition(false);
  };

  if (showWelcome) {
    return (
      <>
        <WelcomeScreen onComplete={handleWelcomeComplete} />
        <PlayStationTransition 
          isVisible={showTransition}
          onComplete={handleTransitionComplete}
        />
      </>
    );
  }



  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1.5, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-400/10 via-transparent to-transparent rounded-full" />
      </div>

      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <Icon name="ChevronLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Назад</span>
      </button>

      <div className="relative z-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8"
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-4">
              <div className="space-y-4">

                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                    Высококачественное оборудование
                  </span>
                  {' '}для сетевой инфраструктуры
                </h1>
              </div>

              <div className={`flex flex-col space-y-4 transition-all duration-700 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 transform translate-x-[-50px] scale-95 blur-sm' 
                  : 'opacity-100 transform translate-x-0 scale-100 blur-0'
              }`}>
                <div className="space-y-4">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white transition-all duration-700 ease-out ${
                    isTransitioning 
                      ? 'transform translate-y-[-20px] opacity-0' 
                      : 'transform translate-y-0 opacity-100'
                  }`}>
                    {currentData.title}
                  </h2>
                  
                  <p className={`text-base text-slate-300 transition-all duration-700 ease-out delay-100 ${
                    isTransitioning 
                      ? 'transform translate-y-[-15px] opacity-0' 
                      : 'transform translate-y-0 opacity-100'
                  }`}>
                    {currentData.description}
                  </p>
                  
                  <div className={`space-y-3 flex-1 transition-all duration-700 ease-out delay-200 ${
                    isTransitioning 
                      ? 'transform translate-y-[-10px] opacity-0' 
                      : 'transform translate-y-0 opacity-100'
                  }`}>
                    {currentData.features.map((feature, index) => (
                      <div key={index} className={`flex items-center gap-3 transition-all duration-500 ease-out ${
                        isTransitioning 
                          ? 'transform translate-x-[-30px] opacity-0' 
                          : 'transform translate-x-0 opacity-100'
                      }`} style={{ transitionDelay: `${index * 20 + 100}ms` }}>
                        {feature ? (
                          <>
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            <span className="text-sm text-slate-300">{feature}</span>
                          </>
                        ) : (
                          <div className="h-6"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-12 bg-blue-400' 
                          : 'w-6 bg-white/20'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-400 ml-2">
                    {currentIndex + 1} / {heroData.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-[510px] lg:h-[595px]">
              {/* Динамический фоновый градиент с анимацией */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-3xl blur-2xl transition-all duration-500 ${
                isTransitioning ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
              }`} />
              
              {/* Дополнительные световые эффекты при переходе */}
              <div className={`absolute inset-0 bg-gradient-radial from-blue-400/30 via-transparent to-transparent rounded-3xl transition-all duration-300 ${
                isTransitioning ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
              }`} />
              
              <div className={`relative w-full h-full transition-all duration-400 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 scale-95 transform rotate-1 blur-sm' 
                  : 'opacity-100 scale-100 transform rotate-0 blur-0'
              }`}>
                <ModelViewer3D 
                  src={currentData.modelUrl}
                  alt={currentData.title}
                  isPreloaded={isModelReady(currentData.modelUrl)}
                />
              </div>
            </div>

          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default ProductHero;