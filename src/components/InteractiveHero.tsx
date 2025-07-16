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
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-all.glb'
  },
  {
    id: 'IDS3730',
    title: 'Серия IDS3730',
    description: 'Высокопроизводительные коммутаторы с поддержкой 40G портов для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3730all.glb'
  },
  {
    id: 'IDS4530',
    title: 'Серия IDS4530',
    description: 'Мощные коммутаторы L3 с поддержкой PoE+ и расширенными функциями безопасности',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-all.glb'
  }
];

const InteractiveHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % seriesData.length);
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

          {/* Правая колонка с 3D-моделями */}
          <div className="relative h-[600px] lg:h-[700px]">
            {seriesData.map((series, index) => (
              <div
                key={series.id}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
                  <model-viewer
                    className="w-full h-full spinning-model"
                    src={series.modelUrl}
                    alt={`3D модель ${series.title}`}
                    auto-rotate
                    auto-rotate-delay="0"
                    rotation-per-second="120deg"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;