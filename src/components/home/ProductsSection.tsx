import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";
import "./ProductsSection.css";

// Данные продуктов
const products = [
  {
    title: "Управляемые коммутаторы",
    description: "Гибкое управление сетями с корпоративными L3-коммутаторами",
    detailedInfo: "Профессиональные решения для построения масштабируемых корпоративных сетей с расширенными возможностями мониторинга, управления трафиком и обеспечения высокой надёжности подключений.",
    features: [
      "24/48 портов Gigabit Ethernet",
      "PoE/PoE+ поддержка до 370W", 
      "SNMP v3 мониторинг и управление",
      "VLAN и QoS конфигурация",
      "Redundant power supply"
    ],
    icon: "Network",
    gradientPosition: "from-blue-600 to-blue-700",
  },
  {
    title: "Корпоративные маршрутизаторы",
    description: "Высокопроизводительные решения для филиальных сетей",
    detailedInfo: "Надёжные и производительные маршрутизаторы для обеспечения стабильного подключения удалённых офисов к центральной сети с поддержкой современных протоколов безопасности.",
    features: [
      "Site-to-Site VPN подключения",
      "Встроенный Next-Gen Firewall",
      "WAN Load balancing и Failover",
      "SD-WAN технология",
      "Centralized policy management"
    ],
    icon: "Router",
    gradientPosition: "from-blue-700 to-blue-800",
  },
  {
    title: "Беспроводные решения", 
    description: "Enterprise-класс точки доступа и контроллеры Wi-Fi 6",
    detailedInfo: "Современные беспроводные системы корпоративного уровня с поддержкой новейших стандартов Wi-Fi 6E для обеспечения высокой пропускной способности и надёжности.",
    features: [
      "Wi-Fi 6E поддержка (6GHz band)",
      "Mesh технология и roaming",
      "Централизованное cloud-управление",
      "Advanced security (WPA3)",
      "AI-powered optimization"
    ],
    icon: "Wifi",
    gradientPosition: "from-blue-800 to-teal-600",
  },
  {
    title: "Системы управления",
    description: "Централизованные платформы для управления инфраструктурой",
    detailedInfo: "Комплексные решения для мониторинга, управления и автоматизации сетевой инфраструктуры с возможностью интеграции различных систем в единую платформу.",
    features: [
      "Унифицированная dashboard панель",
      "Real-time аналитика и отчёты",
      "Автоматизация сетевых процессов",
      "Integration API и webhooks",
      "Multi-tenant архитектура"
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
        {/* Desktop: Premium 2x2 Grid with balanced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 lg:max-w-6xl lg:mx-auto xl:max-w-7xl">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => {
                if (cardRefs.current) {
                  cardRefs.current[index] = el;
                }
              }}
              className={`feature-card group relative bg-white rounded-xl md:rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] px-4 py-5 md:p-8 h-full overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 transform-gpu ${
                isMobile 
                  ? (visibleCards[index] ? 'feature-card-visible' : 'feature-card-hidden-mobile')
                  : (isVisible ? 'feature-card-visible' : 'feature-card-hidden')
              }`}
              style={{
                '--feature-index': index,
              } as React.CSSProperties}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 md:from-blue-50/50 via-transparent to-teal-50/20 md:to-teal-50/30 opacity-0 group-hover:opacity-100 rounded-xl md:rounded-3xl transition-opacity duration-500 md:duration-700 ease-out pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                  {/* Иконка */}
                  <div className={`ps-section-icon relative ${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <div className="ps-icon-wrapper bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
                      <Icon
                        name={product.icon as any}
                        size={isMobile ? 20 : 28}
                        className="text-white ps-icon"
                      />
                    </div>
                    {/* Декоративное кольцо - только на десктопе */}
                    {!isMobile && (
                      <div className="ps-icon-ring absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    )}
                  </div>
                
                  {/* Заголовок */}
                  <div className={`ps-section-header ${isMobile ? 'mb-4' : 'mb-[10px]'}`}>
                    <div className={isMobile ? '' : 'min-h-[80px] flex flex-col justify-center'}>
                      <h3 className="ps-title font-bold text-gray-900 leading-tight tracking-tight whitespace-normal lg:whitespace-pre-line">
                        {product.title}
                      </h3>
                      {/* GPU-анимированная подчеркивающая линия */}
                      <div className="ps-underline relative h-0.5 bg-gray-100 rounded-full overflow-hidden mt-0">
                        <div className={`ps-underline-fill absolute inset-0 bg-gradient-to-r ${product.gradientPosition} rounded-full`} />
                      </div>
                    </div>
                  </div>
                
                  {/* Описание - только для мобильных */}
                  {isMobile && (
                    <div className="ps-section-description mb-6">
                      <div>
                        <p className="ps-description text-gray-600 font-medium leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Детальная информация - только десктоп */}
                  {!isMobile && (
                    <div className="ps-section-detailed mb-6">
                      <div className="min-h-[72px] flex flex-col justify-center">
                        <p className="ps-detailed-info text-sm text-gray-500 font-normal leading-relaxed">
                          {product.detailedInfo}
                        </p>
                      </div>
                    </div>
                  )}
                
                  {/* Характеристики */}
                  <div className="ps-section-features mb-8 lg:mb-[16px]">
                    <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}> 
                      {/* Список характеристик всегда отображается, анимация только на карточке */}
                      {(isMobile ? product.features.slice(0, 3) : product.features).map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="ps-feature flex items-start gap-3"
                          style={{ '--feature-index': idx } as React.CSSProperties}
                        >
                          <div className={`ps-feature-icon rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center flex-shrink-0 ${isMobile ? 'mt-0.5' : 'mt-1'}`}> 
                            <Icon
                              name="Check"
                              size={isMobile ? 10 : 12}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </div>
                          <span className={`ps-feature-text font-medium text-gray-700 leading-relaxed flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                
                  {/* CTA кнопка - всегда внизу */}
                  <div className="ps-section-cta pt-[5px]">
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

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-b-xl md:rounded-b-3xl transition-transform duration-500 md:duration-700 ease-out pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;