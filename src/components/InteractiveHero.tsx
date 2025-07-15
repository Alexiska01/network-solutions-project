import React, { useState, useEffect } from 'react';

interface SeriesData {
  id: string;
  title: string;
  description: string;
  modelUrl: string;
}

const seriesData: SeriesData[] = [
  {
    id: 'IDS3530',
    title: 'Серия IDS3530',
    description: 'Управляемые коммутаторы L2+ с поддержкой 10G портов и расширенными возможностями маршрутизации',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24S.glb'
  },
  {
    id: 'IDS3730',
    title: 'Серия IDS3730',
    description: 'Высокопроизводительные коммутаторы с поддержкой 40G портов для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-48T.glb'
  },
  {
    id: 'IDS4530',
    title: 'Серия IDS4530',
    description: 'Мощные коммутаторы L3 с поддержкой PoE+ и расширенными функциями безопасности',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-48P.glb'
  }
];

const InteractiveHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [carouselRotation, setCarouselRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % seriesData.length);
        setCarouselRotation(prev => prev - 120); // Поворот на 120 градусов (360/3)
        setIsVisible(true);
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentSeries = seriesData[currentIndex];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка */}
          <div className="space-y-8">
            {/* Верхний фиксированный контейнер */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Программное обеспечение для коммутаторов
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Комплексные решения для управления сетевой инфраструктурой с интуитивным интерфейсом и мощными возможностями мониторинга
              </p>
            </div>

            {/* Нижний динамический контейнер */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {currentSeries.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {currentSeries.description}
                </p>
              </div>
              
              {/* Индикаторы */}
              <div className="flex space-x-2 mt-6">
                {seriesData.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка с 3D-каруселью */}
          <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
            {/* Внешний контейнер карусели */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Карусель */}
                <div 
                  className="absolute inset-0 transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: `rotateY(${carouselRotation}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {seriesData.map((series, index) => {
                    const angle = (index * 120) - 60; // Размещение по кругу: 0°, 120°, 240°
                    const radius = 280; // Радиус карусели
                    
                    return (
                      <div
                        key={series.id}
                        className="absolute w-80 h-80 lg:w-96 lg:h-96"
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                          transformStyle: 'preserve-3d',
                          left: '50%',
                          top: '50%',
                          marginLeft: '-160px', // Половина ширины для центровки
                          marginTop: '-160px', // Половина высоты для центровки
                        }}
                      >
                        <div 
                          className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden"
                          style={{
                            transform: `rotateY(${-angle}deg)`, // Компенсация поворота для правильного отображения
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          <model-viewer
                            className="w-full h-full"
                            src={series.modelUrl}
                            alt={`3D модель ${series.title}`}
                            auto-rotate
                            auto-rotate-delay="0"
                            rotation-per-second="60deg"
                            camera-controls
                            background-color="#ffffff"
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'block'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;