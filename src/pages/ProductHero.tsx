import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import ModelViewer3D from '@/components/ModelViewer3D';
import { useModelPreloader } from '@/hooks/useModelPreloader';
import WelcomeScreen from '@/components/WelcomeScreen';

const heroData = [
  {
    id: 'IDS3530-24S',
    title: 'Коммутаторы серии IDS3530',
    description: 'Промышленные управляемые коммутаторы для критически важных применений',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС;',
      'Встроенные блоки питания;',
      'Поддержка PoE/PoE+;',
      'Статическая и динамическая маршрутизация;',
      'Развитые возможности по управлению.'
    ]
  },
  {
    id: 'IDS4530-2',
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
    id: 'IDS4530',
    title: 'Коммутаторы серии IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями управления',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS6010-all.glb',
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
    id: 'IDS3730',
    title: 'Коммутаторы серии IDS3730',
    description: 'Высокопроизводительные коммутаторы для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS3730_all.glb',
    features: [
      'Уровень доступа в корпоративных ЛВС;',
      'Два модульных блока питания;',
      'Поддержка PoE/PoE+;',
      'Статическая и динамическая маршрутизация;',
      'Развитые возможности по управлению.'
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
  const { isModelReady, preloadModels } = useModelPreloader();

  // Немедленно запускаем предзагрузку всех моделей сразу при монтировании
  useEffect(() => {
    const modelUrls = heroData.map(item => item.modelUrl);
    console.log('🚀 Запускаю агрессивную предзагрузку моделей:', modelUrls);
    
    // Запускаем предзагрузку без задержек
    preloadModels(modelUrls).then(() => {
      console.log('🎉 Все модели предзагружены и готовы!');
    });
  }, []); // Убираем зависимость от preloadModels для немедленного запуска

  // Запускаем карусель с мировой анимацией
  useEffect(() => {
    const startCarousel = () => {
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
      }, 6000);
    };

    // Запускаем карусель через небольшую задержку
    const timeout = setTimeout(startCarousel, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(timeout);
    };
  }, []);

  const currentData = heroData[currentIndex];
  
  // Проверяем готовность всех моделей
  const allModelsReady = heroData.every(item => isModelReady(item.modelUrl));

  if (showWelcome) {
    return <WelcomeScreen 
      onComplete={() => setShowWelcome(false)} 
      modelsReady={allModelsReady}
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
            
            <div className="space-y-8">
              <div className="space-y-6">

                
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Высококачественное оборудование
                  </span>
                  {' '}для сетевой инфраструктуры
                </h1>
              </div>

              <div className={`space-y-6 transition-all duration-700 ease-in-out ${
                isTransitioning 
                  ? 'opacity-0 transform translate-x-[-50px] scale-95 blur-sm' 
                  : 'opacity-100 transform translate-x-0 scale-100 blur-0'
              }`}>
                <div className="space-y-4">
                  <h2 className={`text-3xl font-bold text-white transition-all duration-700 ease-out ${
                    isTransitioning 
                      ? 'transform translate-y-[-20px] opacity-0' 
                      : 'transform translate-y-0 opacity-100'
                  }`}>
                    {currentData.title}
                  </h2>
                  
                  <p className={`text-lg text-slate-300 transition-all duration-700 ease-out delay-100 ${
                    isTransitioning 
                      ? 'transform translate-y-[-15px] opacity-0' 
                      : 'transform translate-y-0 opacity-100'
                  }`}>
                    {currentData.description}
                  </p>
                  
                  <div className={`space-y-3 transition-all duration-700 ease-out delay-200 ${
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
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-slate-300">{feature}</span>
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