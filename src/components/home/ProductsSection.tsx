import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [is120fps, setIs120fps] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Детекция 120 FPS дисплеев
  useEffect(() => {
    let frameCount = 0;
    let startTime = 0;
    let animationId: number;

    const measureFPS = () => {
      if (frameCount === 0) {
        startTime = performance.now();
      }
      frameCount++;
      
      if (frameCount === 60) {
        const endTime = performance.now();
        const fps = Math.round(60000 / (endTime - startTime));
        
        if (fps >= 115) {
          setIs120fps(true);
          console.log(`🚀 ProductsSection: Обнаружен ${fps} FPS дисплей - активирован режим 120 FPS!`);
        } else {
          setIs120fps(false);
          console.log(`📺 ProductsSection: Стандартный ${fps} FPS дисплей`);
        }
        return;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Проверка поддержки высокой частоты через media query
    const highRefreshSupported = window.matchMedia('(min-refresh-rate: 120hz)').matches;
    if (highRefreshSupported) {
      setIs120fps(true);
      console.log('🚀 ProductsSection: 120Hz+ дисплей определен через CSS media query');
    } else {
      // Измерение FPS через requestAnimationFrame
      animationId = requestAnimationFrame(measureFPS);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  useEffect(() => {
    // Инициализируем массив видимости карточек
    setVisibleCards(new Array(products.length).fill(false));
    cardRefs.current = new Array(products.length).fill(null);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      // Для десктопа - старая логика (все сразу)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    } else {
      // Для мобильных - индивидуальное появление карточек
      const observers: IntersectionObserver[] = [];
      
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }
            },
            { threshold: 0.2 }
          );
          
          observer.observe(cardRef);
          observers.push(observer);
        }
      });

      return () => {
        observers.forEach(observer => observer.disconnect());
      };
    }
  }, [isMobile]);

  const products = [
    {
      title: "Управляемые коммутаторы",
      description: "Гибкое управление сетями с корпоративными L3-коммутаторами",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка",
        "SNMP мониторинг",
      ],
      icon: "Network",
      gradientPosition: "from-blue-600 to-blue-700",
    },
    {
      title: "Корпоративные маршрутизаторы", 
      description: "Высокопроизводительные решения для филиальных сетей",
      features: [
        "VPN подключения",
        "Встроенный Firewall",
        "Load balancing",
      ],
      icon: "Router",
      gradientPosition: "from-blue-700 to-blue-800",
    },
    {
      title: "Беспроводные решения",
      description: "Enterprise-класс точки доступа и контроллеры Wi-Fi 6",
      features: [
        "Wi-Fi 6E поддержка",
        "Mesh технология",
        "Централизованное управление",
      ],
      icon: "Wifi",
      gradientPosition: "from-blue-800 to-teal-600",
    },
    {
      title: "Системы\nуправления",
      description: "Централизованные платформы для управления инфраструктурой",
      features: [
        "Унифицированная панель",
        "Аналитика и отчеты",
        "Автоматизация процессов",
      ],
      icon: "Settings",
      gradientPosition: "from-teal-600 to-teal-500",
    },
  ];



  return (
    <section 
      ref={sectionRef} 
      className={`pt-3 pb-16 sm:pt-4 sm:pb-20 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-gradient-to-b from-gray-200/80 via-gray-100/90 to-transparent relative overflow-hidden flex items-center products-section ${
        is120fps ? 'products-120fps' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-teal-100/40 pointer-events-none product-gradient-overlay ${
        is120fps ? 'products-120fps' : ''
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => {
                if (cardRefs.current) {
                  cardRefs.current[index] = el;
                }
              }}
              className={`product-card transition-all ${
                // Высота карточки
                isMobile ? 'product-card-height-mobile' : 'product-card-height-desktop'
              } ${
                // Состояние видимости
                isMobile 
                  ? (visibleCards[index] ? 'product-card-visible' : 'product-card-hidden')
                  : (isVisible ? 'product-card-visible' : 'product-card-hidden')
              } ${
                // Длительность анимации в зависимости от устройства и FPS
                isMobile 
                  ? (is120fps ? 'product-card-120fps-mobile' : 'product-card-mobile')
                  : (is120fps ? 'product-card-120fps-desktop' : 'product-card-desktop')
              } ${
                // Задержка появления только для десктопа
                !isMobile 
                  ? (is120fps 
                      ? `product-card-delay-120fps-${index}` 
                      : `product-card-delay-${index}`
                    )
                  : ''
              } ${
                // GPU оптимизация
                is120fps ? 'products-120fps' : ''
              }`}
            >
              <div className={`group relative bg-white border border-gray-100 h-full overflow-hidden transition-all product-card-interactive ${
                is120fps ? 'products-120fps product-card-hover' : ''
              } ${
                isMobile 
                  ? 'rounded-xl shadow-[0_1px_6px_rgba(0,0,0,0.04)] active:shadow-[0_2px_8px_rgba(0,0,0,0.06)] duration-200 ease-out'
                  : 'rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] duration-500 ease-out hover:-translate-y-2'
              }`}>
                {/* Премиальный градиентный overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-teal-50/20 transition-opacity product-gradient-overlay ${
                  is120fps ? 'products-120fps' : ''
                } ${
                  isMobile 
                    ? 'opacity-0 group-active:opacity-100 duration-200'
                    : 'opacity-0 group-hover:opacity-100 duration-500 rounded-3xl'
                }`}></div>
                
                {/* Анимированная рамка для премиальности */}
                {!isMobile && (
                  <div className={`absolute inset-0 rounded-3xl border border-blue-100/0 group-hover:border-blue-100/50 transition-all duration-500 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                )}
                
                <div className={`relative z-10 h-full flex flex-col ${isMobile ? 'p-6' : 'p-8'}`}>
                  {/* Иконка - фиксированная позиция */}
                  <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <div className={`bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center transition-all product-icon ${
                      is120fps ? 'products-120fps' : ''
                    } ${
                      isMobile 
                        ? 'w-12 h-12 shadow-sm duration-150'
                        : 'w-16 h-16 shadow-lg duration-300 group-hover:shadow-xl group-hover:scale-105'
                    }`}>
                      <Icon
                        name={product.icon as any}
                        size={isMobile ? 20 : 28}
                        className="text-white"
                      />
                    </div>
                    {!isMobile && (
                      <div className="absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                
                  {/* Заголовок - фиксированная высота */}
                  <div className={`${isMobile ? 'mb-4' : 'mb-6'}`} style={{ height: isMobile ? "48px" : "72px" }}>
                    <h3 className={`font-bold text-gray-900 leading-tight tracking-tight whitespace-pre-line group-hover:text-gray-800 transition-colors product-text ${
                      is120fps ? 'products-120fps' : ''
                    } ${
                      isMobile 
                        ? 'text-lg mb-2 duration-150'
                        : 'text-2xl mb-4 duration-300'
                    }`}>
                      {product.title}
                    </h3>
                    {/* Анимированная градиентная линия */}
                    <div className="relative h-0.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${product.gradientPosition} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform ease-out ${
                        isMobile ? 'duration-200' : 'duration-400'
                      }`}></div>
                    </div>
                  </div>
                
                  {/* Описание - фиксированная высота */}
                  <div className={`${isMobile ? 'mb-6' : 'mb-8'}`} style={{ height: isMobile ? "36px" : "48px" }}>
                    <p className={`text-gray-600 font-medium leading-tight group-hover:text-gray-700 transition-colors product-text ${
                      is120fps ? 'products-120fps' : ''
                    } ${
                      isMobile 
                        ? 'text-sm duration-200'
                        : 'text-base duration-300'
                    }`}>
                      {product.description}
                    </p>
                  </div>
                
                  {/* Характеристики - абсолютное выравнивание */}
                  <div className={`flex-1 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <div className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="grid grid-cols-[auto_1fr] gap-3 items-center"
                        >
                          <div className={`rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center ${
                            isMobile ? 'w-4 h-4' : 'w-5 h-5'
                          }`}>
                            <Icon
                              name="Check"
                              size={isMobile ? 10 : 12}
                              className="text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <span className={`font-medium text-gray-700 leading-tight ${
                            isMobile ? 'text-sm' : 'text-sm'
                          }`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                
                  {/* CTA кнопка */}
                  <div className="mt-auto">
                    {index === 0 ? (
                      <Link
                        to="/switches"
                        className={`group/cta relative flex items-center justify-between w-full border border-gray-200 transition-all product-cta ${
                          is120fps ? 'products-120fps' : ''
                        } ${
                          isMobile 
                            ? 'p-3 rounded-lg duration-150 active:bg-gray-50/30 active:border-gray-300'
                            : 'p-4 rounded-xl duration-300 hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 hover:bg-gray-50/50'
                        }`}
                      >
                        <span className={`text-gray-900 font-semibold transition-colors ${
                          isMobile ? 'text-sm duration-100 group-active/cta:text-gray-700' : 'text-sm duration-200 group-hover/cta:text-gray-800'
                        }`}>
                          Подробнее
                        </span>
                        <div className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all ${
                          isMobile 
                            ? 'w-7 h-7 duration-100'
                            : 'w-8 h-8 duration-300 group-hover/cta:scale-110 group-hover/cta:shadow-lg'
                        }`}>
                          <Icon
                            name="ArrowRight"
                            size={isMobile ? 12 : 14}
                            className={`text-white transition-transform ${
                              isMobile ? 'duration-100' : 'duration-200 group-hover/cta:translate-x-0.5'
                            }`}
                          />
                        </div>
                        {/* Анимированная линия в кнопке */}
                        <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover/cta:scale-x-100 transition-transform origin-left rounded-full ${
                          isMobile 
                            ? 'left-3 right-3 duration-200'
                            : 'left-4 right-4 duration-300'
                        }`}></div>
                      </Link>
                    ) : (
                      <button className={`group/cta relative flex items-center justify-between w-full border border-gray-200 transition-all product-cta ${
                        is120fps ? 'products-120fps' : ''
                      } ${
                        isMobile 
                          ? 'p-3 rounded-lg duration-150 active:bg-gray-50/30 active:border-gray-300'
                          : 'p-4 rounded-xl duration-300 hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 hover:bg-gray-50/50'
                      }`}>
                        <span className={`text-gray-900 font-semibold transition-colors ${
                          isMobile ? 'text-sm duration-100 group-active/cta:text-gray-700' : 'text-sm duration-200 group-hover/cta:text-gray-800'
                        }`}>
                          Подробнее
                        </span>
                        <div className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all ${
                          isMobile 
                            ? 'w-7 h-7 duration-100'
                            : 'w-8 h-8 duration-300 group-hover/cta:scale-110 group-hover/cta:shadow-lg'
                        }`}>
                          <Icon
                            name="ArrowRight"
                            size={isMobile ? 12 : 14}
                            className={`text-white transition-transform ${
                              isMobile ? 'duration-100' : 'duration-200 group-hover/cta:translate-x-0.5'
                            }`}
                          />
                        </div>
                        {/* Анимированная линия в кнопке */}
                        <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover/cta:scale-x-100 transition-transform origin-left rounded-full ${
                          isMobile 
                            ? 'left-3 right-3 duration-200'
                            : 'left-4 right-4 duration-300'
                        }`}></div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;