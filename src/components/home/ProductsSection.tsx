import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";

// Данные продуктов
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

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [refreshRate, setRefreshRate] = useState<'60hz' | '90hz' | '120hz' | '144hz' | '240hz'>('60hz');
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

  // Детекция частоты обновления экрана
  useEffect(() => {
    let frameCount = 0;
    let startTime = 0;
    let animationId: number;

    const measureRefreshRate = () => {
      if (frameCount === 0) {
        startTime = performance.now();
      }
      frameCount++;
      
      if (frameCount === 120) {
        const endTime = performance.now();
        const fps = Math.round(120000 / (endTime - startTime));
        
        let detectedRate: typeof refreshRate = '60hz';
        if (fps >= 230) detectedRate = '240hz';
        else if (fps >= 140) detectedRate = '144hz';
        else if (fps >= 115) detectedRate = '120hz';
        else if (fps >= 85) detectedRate = '90hz';
        
        setRefreshRate(detectedRate);
        
        // Добавляем класс на body для CSS переменных
        document.body.className = document.body.className
          .replace(/refresh-\d+hz/g, '')
          + ` refresh-${detectedRate}`;
        
        console.log(`🚀 ProductsSection: ${fps} FPS (${detectedRate}) - GPU анимации активны`);
        return;
      }
      
      animationId = requestAnimationFrame(measureRefreshRate);
    };

    if (window.matchMedia('(min-refresh-rate: 120hz)').matches) {
      setRefreshRate('120hz');
      document.body.className = document.body.className.replace(/refresh-\d+hz/g, '') + ' refresh-120hz';
    } else {
      animationId = requestAnimationFrame(measureRefreshRate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Инициализация массивов состояния
  useEffect(() => {
    setVisibleCards(new Array(products.length).fill(false));
    cardRefs.current = new Array(products.length).fill(null);
  }, []);

  // IntersectionObserver для анимаций появления
  useEffect(() => {
    if (!isMobile) {
      // ДЕСКТОП - каскадное появление всей секции
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            console.log('🎬 ProductsSection: Каскадная анимация запущена (десктоп)');
          }
        },
        { 
          threshold: 0.2,
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    } else {
      // МОБИЛЬНЫЙ - индивидуальное появление каждой карточки
      const observers: IntersectionObserver[] = [];
      
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  console.log(`🎬 ProductsSection: Карточка ${index + 1} появилась (мобильный)`);
                  return newVisible;
                });
              }
            },
            { 
              threshold: 0.3,
              rootMargin: '-20px 0px -20px 0px'
            }
          );
          
          observer.observe(cardRef);
          observers.push(observer);
        }
      });

      return () => {
        observers.forEach(observer => observer.disconnect());
      };
    }
  }, [isMobile, cardRefs.current.length]);

  return (
    <section 
      ref={sectionRef} 
      className={`pt-3 pb-16 sm:pt-4 sm:pb-20 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-gradient-to-b from-gray-200/80 via-gray-100/90 to-transparent relative overflow-hidden flex items-center products-section refresh-${refreshRate}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-teal-100/40 pointer-events-none ps-bg-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full py-0 my-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => {
                if (cardRefs.current) {
                  cardRefs.current[index] = el;
                }
              }}
              className={`ps-card ps-enter ps-hover ps-delay-${index} ${
                isMobile ? 'ps-mobile' : 'ps-desktop'
              } ${
                isMobile 
                  ? (visibleCards[index] ? 'ps-visible' : 'ps-hidden')
                  : (isVisible ? 'ps-visible' : 'ps-hidden')
              }`}
              style={{
                '--ps-index': index,
                '--ps-total': products.length
              } as React.CSSProperties}
            >
              <div className="ps-card-inner group relative bg-white h-full overflow-hidden">
                {/* GPU-оптимизированный градиентный overlay */}
                <div className="ps-gradient-overlay absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-teal-50/20" />
                
                {/* Премиальная анимированная рамка для десктопа */}
                {!isMobile && (
                  <div className="ps-border-glow absolute inset-0 rounded-3xl border border-transparent" />
                )}
                
                <div className={`relative z-10 h-full flex flex-col ${isMobile ? 'p-6' : 'p-8'}`}>
                  {/* Иконка */}
                  <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <div className="ps-icon-wrapper bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
                      <Icon
                        name={product.icon as any}
                        size={isMobile ? 20 : 28}
                        className="text-white ps-icon"
                      />
                    </div>
                  </div>
                
                  {/* Заголовок */}
                  <div className={`${isMobile ? 'mb-4' : 'mb-6'}`} style={{ height: isMobile ? "48px" : "72px" }}>
                    <h3 className="ps-title font-bold text-gray-900 leading-tight tracking-tight whitespace-pre-line">
                      {product.title}
                    </h3>
                    {/* GPU-анимированная подчеркивающая линия */}
                    <div className="ps-underline relative h-0.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`ps-underline-fill absolute inset-0 bg-gradient-to-r ${product.gradientPosition} rounded-full`} />
                    </div>
                  </div>
                
                  {/* Описание */}
                  <div className={`${isMobile ? 'mb-6' : 'mb-8'}`} style={{ height: isMobile ? "36px" : "48px" }}>
                    <p className="ps-description text-gray-600 font-medium leading-tight">
                      {product.description}
                    </p>
                  </div>
                
                  {/* Характеристики */}
                  <div className={`flex-1 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <div className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="ps-feature grid grid-cols-[auto_1fr] gap-3 items-center"
                          style={{ '--feature-index': idx } as React.CSSProperties}
                        >
                          <div className="ps-feature-icon rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                            <Icon
                              name="Check"
                              size={isMobile ? 10 : 12}
                              className="text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <span className="ps-feature-text font-medium text-gray-700 leading-tight">
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
                        className="ps-cta group/cta relative flex items-center justify-between w-full border border-gray-200"
                      >
                        <span className="ps-cta-text text-gray-900 font-semibold">
                          Подробнее
                        </span>
                        <div className="ps-cta-icon flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500">
                          <Icon
                            name="ArrowRight"
                            size={isMobile ? 12 : 14}
                            className="text-white ps-cta-arrow"
                          />
                        </div>
                        {/* Анимированная линия в кнопке */}
                        <div className="ps-cta-line absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full" />
                      </Link>
                    ) : (
                      <button className="ps-cta group/cta relative flex items-center justify-between w-full border border-gray-200">
                        <span className="ps-cta-text text-gray-900 font-semibold">
                          Подробнее
                        </span>
                        <div className="ps-cta-icon flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500">
                          <Icon
                            name="ArrowRight"
                            size={isMobile ? 12 : 14}
                            className="text-white ps-cta-arrow"
                          />
                        </div>
                        {/* Анимированная линия в кнопке */}
                        <div className="ps-cta-line absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full" />
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