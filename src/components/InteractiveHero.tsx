import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface SeriesData {
  id: string;
  title: string;
  description: string;
  modelUrl: string;
  features: string[];
  badge: string;
  color: string;
}

const seriesData: SeriesData[] = [
  {
    id: 'IDS3530',
    title: 'Серия IDS3530',
    description: 'Управляемые коммутаторы L2+ с поддержкой 10G портов и расширенными возможностями маршрутизации',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24S.glb',
    features: ['10G SFP+', 'Layer 2+', 'PoE+', 'VLAN'],
    badge: 'Корпоративный',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'IDS3730',
    title: 'Серия IDS3730',
    description: 'Высокопроизводительные коммутаторы с поддержкой 40G портов для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-48T.glb',
    features: ['40G QSFP+', 'Layer 3', 'Стекинг', 'QoS'],
    badge: 'Премиальный',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'IDS4530',
    title: 'Серия IDS4530',
    description: 'Мощные коммутаторы L3 с поддержкой PoE+ и расширенными функциями безопасности',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-48P.glb',
    features: ['PoE++', 'Layer 3', 'Безопасность', 'Управление'],
    badge: 'Флагманский',
    color: 'from-emerald-500 to-teal-500'
  }
];

const InteractiveHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [textCarouselOffset, setTextCarouselOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % seriesData.length);
        setTextCarouselOffset(prev => prev - 100); // Сдвиг текста на 100%
        setIsVisible(true);
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeSeries = seriesData[currentIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Сетка фона */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <style jsx>{`
        @keyframes cylinderSpin {
          0% { transform: rotateX(-15deg) rotateY(0deg); }
          100% { transform: rotateX(-15deg) rotateY(360deg); }
        }
        
        .cylinder-3d {
          animation: cylinderSpin 3s linear infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .cylinder-top {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%) rotateX(90deg);
          width: 240px;
          height: 240px;
          background: linear-gradient(45deg, rgba(124, 58, 237, 0.8), rgba(79, 70, 229, 0.8));
          border-radius: 50%;
          box-shadow: 
            0 0 30px rgba(124, 58, 237, 0.5),
            inset 0 10px 20px rgba(255, 255, 255, 0.1);
        }
        
        .cylinder-bottom {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%) rotateX(90deg);
          width: 240px;
          height: 240px;
          background: linear-gradient(45deg, rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.9));
          border-radius: 50%;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(124, 58, 237, 0.4);
        }
        
        .cylinder-side {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 240px;
          height: 60%;
          background: linear-gradient(
            90deg,
            rgba(124, 58, 237, 0.1),
            rgba(124, 58, 237, 0.3) 25%,
            rgba(124, 58, 237, 0.4) 50%,
            rgba(124, 58, 237, 0.3) 75%,
            rgba(124, 58, 237, 0.1)
          );
          border-left: 2px solid rgba(124, 58, 237, 0.3);
          border-right: 2px solid rgba(124, 58, 237, 0.3);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cylinder-text {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          text-shadow: 
            0 0 20px rgba(255,255,255,0.8),
            0 0 40px rgba(124, 58, 237, 0.6);
          letter-spacing: 4px;
          transform: rotateY(0deg);
          z-index: 10;
        }
        
        .cylinder-highlight {
          position: absolute;
          top: 30%;
          left: 10%;
          width: 80%;
          height: 40%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1) 50%,
            transparent
          );
          border-radius: 50% / 80%;
          opacity: 0.6;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Левая колонка */}
          <div className="space-y-12">
            {/* Верхний фиксированный контейнер */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm font-medium">
                  <Icon name="Zap" size={16} />
                  <span>Новое поколение ПО</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Программное
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    обеспечение
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Комплексные решения для управления сетевой инфраструктурой с интуитивным интерфейсом и мощными возможностями мониторинга
                </p>
              </div>
            </div>

            {/* Нижний динамический контейнер - Карусель текста */}
            <div className="relative h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              
              <div className="relative h-full p-8">
                <div className="relative h-full overflow-hidden">
                  <div 
                    className="flex transition-transform duration-1000 ease-in-out h-full"
                    style={{
                      transform: `translateX(${textCarouselOffset}%)`
                    }}
                  >
                    {seriesData.map((series, index) => (
                      <div
                        key={series.id}
                        className="flex-shrink-0 w-full h-full flex flex-col"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${series.color} flex items-center justify-center`}>
                            <Icon name="Cpu" size={24} className="text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                              {series.title}
                            </h2>
                            <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${series.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                              <Icon name="Star" size={14} />
                              <span>{series.badge}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                          {series.description}
                        </p>
                        
                        <div className="space-y-4">
                          <h3 className="text-white font-semibold text-lg">Ключевые возможности:</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {series.features.map((feature, featureIndex) => (
                              <div 
                                key={featureIndex}
                                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2"
                              >
                                <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Индикаторы */}
                <div className="absolute bottom-6 left-8 flex space-x-3">
                  {seriesData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-8 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-500/50' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка с цилиндрической 3D-каруселью */}
          <div className="relative h-[600px] lg:h-[800px] overflow-hidden">
            {/* Светящийся фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
            
            {/* 3D Цилиндрическая карусель */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full perspective-1000">
                <div className="cylinder-3d relative w-full h-full">
                  
                  {/* Верхнее основание цилиндра */}
                  <div className="cylinder-top">
                    <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent rounded-full" />
                  </div>
                  
                  {/* Нижнее основание цилиндра */}
                  <div className="cylinder-bottom">
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 rounded-full" />
                  </div>
                  
                  {/* Боковая поверхность цилиндра */}
                  <div className="cylinder-side">
                    {/* Текст серии на боковой поверхности */}
                    <div className="cylinder-text">
                      <div className={`bg-gradient-to-r ${activeSeries.color} bg-clip-text text-transparent`}>
                        {activeSeries.id}
                      </div>
                    </div>
                    
                    {/* Световой блик на цилиндре */}
                    <div className="cylinder-highlight" />
                  </div>
                  
                  {/* Дополнительные 3D эффекты */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Левая тень */}
                    <div className="absolute left-0 top-20% w-4 h-60% bg-gradient-to-r from-black/30 to-transparent" />
                    {/* Правая тень */}
                    <div className="absolute right-0 top-20% w-4 h-60% bg-gradient-to-l from-black/30 to-transparent" />
                    {/* Верхняя тень */}
                    <div className="absolute top-20% left-1/2 transform -translate-x-1/2 w-60 h-4 bg-gradient-to-b from-black/20 to-transparent rounded-full" />
                    {/* Нижняя тень */}
                    <div className="absolute bottom-20% left-1/2 transform -translate-x-1/2 w-60 h-8 bg-gradient-to-t from-black/40 to-transparent rounded-full" />
                  </div>
                  
                </div>
              </div>
            </div>
            
            {/* Индикатор прогресса вращения */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="RotateCw" size={16} className="text-white/60 animate-spin" />
                <span className="text-white/80 text-sm font-medium">
                  {activeSeries.id} • 360° за 3 сек
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;