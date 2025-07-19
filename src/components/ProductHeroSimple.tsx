import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const heroData = [
  {
    id: 'IDS3530',
    title: 'Коммутаторы серии IDS3530',
    description: 'Корпоративные управляемые коммутаторы для критически важных применений',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3530all.glb',
    features: ['Уровень доступа в корпоративных ЛВС', 'Поддержка PoE/PoE+', 'Развитые возможности по управлению']
  },
  {
    id: 'IDS3730',
    title: 'Коммутаторы серии IDS3730',
    description: 'Высокопроизводительные коммутаторы для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3730all.glb',
    features: ['Статическая и динамическая маршрутизация', 'Два модульных блока питания', 'Поддержка PoE/PoE+']
  },
  {
    id: 'IDS4530',
    title: 'Коммутаторы серии IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями управления',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-all.glb',
    features: ['Модули расширения', 'Поддержка технологии VxLAN', 'Развитые возможности по управлению']
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  console.log('ProductHero рендерится');

  useEffect(() => {
    console.log('ProductHero useEffect сработал');
    
    const startCarousel = () => {
      intervalRef.current = setInterval(() => {
        setIsVisible(false);
        
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % heroData.length);
          setIsVisible(true);
        }, 300);
      }, 12000);
    };

    const timeout = setTimeout(startCarousel, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(timeout);
    };
  }, []);

  const currentData = heroData[currentIndex];

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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  Корпоративные коммутаторы
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Серия
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {' '}IDS3530
                  </span>
                </h1>
                
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Высокопроизводительные управляемые коммутаторы для критически важных корпоративных применений
                </p>
              </div>

              <div className={`space-y-6 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">
                    {currentData.title}
                  </h2>
                  
                  <p className="text-lg text-slate-300">
                    {currentData.description}
                  </p>
                  
                  <div className="space-y-3">
                    {currentData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-3xl blur-2xl" />
              
              <div className={`relative w-full h-full transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Icon name="Router" size={64} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{currentData.title}</h3>
                      <p className="text-blue-200">3D модель (тестовый режим)</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{currentData.title}</h3>
                        <p className="text-slate-300 text-sm">Упрощенная версия</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-sm">Работает</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">
            Автосмена через 12 сек
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;