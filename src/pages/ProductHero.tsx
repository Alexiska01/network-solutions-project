import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import ModelViewer3D from '@/components/ModelViewer3D';
import { useModelPreloader } from '@/hooks/useModelPreloader';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
import WelcomeScreen from '@/components/WelcomeScreen';

const heroData = [
  {
    id: 'IDS3530',
    title: 'Коммутаторы серии IDS3530',
    description: 'Промышленные управляемые коммутаторы для критически важных применений',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3530all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС;',
      'Два модульных блока питания;',
      'Поддержка PoE/PoE+;',
      'Статическая и динамическая маршрутизация;',
      'Развитые возможности по управлению;',
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
      'Уровень доступа в корпоративных ЛВС;',
      'Два модульных блока питания;',
      'Поддержка PoE/PoE+;',
      'Статическая и динамическая маршрутизация;',
      'Развитые возможности по управлению;',
      '',
      ''
    ]
  },
  {
    id: 'IDS4530',
    title: 'Коммутаторы серии IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями управления',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС;',
      'Два модульных блока питания;',
      'Поддержка PoE/PoE+;',
      'Модули расширения;',
      'Статическая и динамическая маршрутизация;',
      'Поддержка технологии VxLAN;',
      'Развитые возможности по управлению.'
    ]
  },
  {
    id: 'IDS6010',
    title: 'Коммутаторы серии IDS6010',
    description: 'Модульные коммутаторы с расширенными возможностями управления',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS6010-all.glb',
    features: [
      '-;',
      '-;',
      '-;',
      '-;',
      '-;',
      '-;',
      '-.'
    ]
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isModelReady, isModelPartiallyReady, preloadModel, preloadModelPartially, preloadModels } = useModelPreloader();
  const { isWelcomeLoadingComplete, loadingProgress } = useWelcomePreloader(heroData);

  // Умная предзагрузка: дозагружаем 3730 и фоново остальные
  useEffect(() => {
    const firstModelUrl = heroData[0].modelUrl; // 3530
    const secondModelUrl = heroData[1].modelUrl; // 3730
    const otherModelUrls = heroData.slice(2).map(item => item.modelUrl); // 4530, 6010
    
    console.log('🎯 Дозагрузка и фоновая загрузка моделей в ProductHero');
    
    // Дозагружаем 3730 если он был частично загружен
    if (isModelPartiallyReady(secondModelUrl) && !isModelReady(secondModelUrl)) {
      console.log('🔄 Дозагружаю 3730 серию до 100%:', secondModelUrl);
      preloadModel(secondModelUrl).then(() => {
        console.log('✅ 3730 серия полностью загружена');
      });
    }
    
    // Фоновая загрузка остальных серий
    if (otherModelUrls.length > 0) {
      console.log('🔄 Фоновая загрузка остальных серий:', otherModelUrls);
      preloadModels(otherModelUrls).then(() => {
        console.log('🎉 Все серии загружены!');
      });
    }
  }, []);

  // Запускаем карусель: первая серия показывается ровно 12 секунд
  useEffect(() => {
    // Запускаем только если страница открыта (не показываем Welcome)
    if (!showWelcome) {
      console.log('🎬 Страница открыта, начинаю показ 3530 серии на 12 секунд');
      
      // Убеждаемся что показываем 3530 серию
      setCurrentIndex(0);
      setIsVisible(true);
      setIsTransitioning(false);
      
      // Первый переход с 3530 на 3730 через 12 секунд
      const firstTransition = setTimeout(() => {
        console.log('🔄 Первый переход: 3530 → 3730');
        setIsTransitioning(true);
        setIsVisible(false);
        
        setTimeout(() => {
          setCurrentIndex(1); // Переходим на 3730 (второй элемент)
        }, 600);
        
        setTimeout(() => {
          setIsVisible(true);
          setIsTransitioning(false);
        }, 900);
        
        // Запускаем регулярную карусель для остальных серий
        setTimeout(() => {
          intervalRef.current = setInterval(() => {
            setIsTransitioning(true);
            setIsVisible(false);
            
            setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % heroData.length);
            }, 600);
            
            setTimeout(() => {
              setIsVisible(true);
              setIsTransitioning(false);
            }, 900);
          }, 12000);
        }, 12000); // Следующий переход тоже через 12 сек
        
      }, 12000); // Первый переход через 12 секунд

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        clearTimeout(firstTransition);
      };
    }
  }, [showWelcome]); // Зависимость от showWelcome

  const currentData = heroData[currentIndex];
  
  // Отладочная информация
  console.log('🔍 Debug ProductHero:', {
    showWelcome,
    isWelcomeLoadingComplete,
    loadingProgress,
    currentIndex,
    currentSeries: heroData[currentIndex]?.id
  });

  // Переход с WelcomeScreen когда загрузка завершена
  useEffect(() => {
    if (isWelcomeLoadingComplete) {
      console.log('✅ WelcomeScreen загрузка завершена, переходим');
      // Убеждаемся что начинаем с 3530 серии (индекс 0)
      setCurrentIndex(0);
      setShowWelcome(false);
    }
  }, [isWelcomeLoadingComplete]);

  if (showWelcome) {
    return <WelcomeScreen 
      onComplete={() => {
        console.log('✅ WelcomeScreen onComplete вызван');
        setShowWelcome(false);
      }} 
      modelsReady={isWelcomeLoadingComplete}
      loadingProgress={loadingProgress}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
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

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="space-y-6">

                
                <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                    Высококачественное оборудование
                  </span>
                  {' '}для сетевой инфраструктуры
                </h1>
              </div>

              <div className={`h-96 flex flex-col space-y-6 transition-all duration-700 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 transform translate-x-[-50px] scale-95 blur-sm' 
                  : 'opacity-100 transform translate-x-0 scale-100 blur-0'
              }`}>
                <div className="space-y-4">
                  <h2 className={`text-2xl font-bold text-white transition-all duration-700 ease-out ${
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
                      }`} style={{ transitionDelay: `${index * 50 + 300}ms` }}>
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

            <div className="relative h-[600px] lg:h-[700px]">
              {/* Динамический фоновый градиент с анимацией */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-3xl blur-2xl transition-all duration-1000 ${
                isTransitioning ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
              }`} />
              
              {/* Дополнительные световые эффекты при переходе */}
              <div className={`absolute inset-0 bg-gradient-radial from-blue-400/30 via-transparent to-transparent rounded-3xl transition-all duration-700 ${
                isTransitioning ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
              }`} />
              
              <div className={`relative w-full h-full transition-all duration-800 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 scale-90 transform rotate-2 blur-sm' 
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


    </div>
  );
};

export default ProductHero;