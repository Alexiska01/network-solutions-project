import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";

const FeaturesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [refreshRate, setRefreshRate] = useState<'60hz' | '90hz' | '120hz' | '144hz' | '240hz'>('60hz');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      title: "Вариативность",
      description:
        "Широкий выбор моделей для создания индивидуального решения любой сложности",
      icon: "Layers",
    },
    {
      title: "Функциональность",
      description: "Программное обеспечение оборудования обладает широкими функциональными возможностями",
      icon: "Cpu",
    },
    {
      title: "Надежность",
      description:
        "Высокое качество оборудования позволяет минимизировать простои ИТ-инфраструктуры",
      icon: "Shield",
    },
    {
      title: "Техподдержка",
      description:
        "Консультации в режиме 24/7 и упреждающая замена оборудования",
      icon: "Headphones",
    },
  ];

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
        
        console.log(`🚀 FeaturesSection: ${fps} FPS (${detectedRate}) - GPU анимации активны`);
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
    setVisibleCards(new Array(features.length).fill(false));
    cardRefs.current = new Array(features.length).fill(null);
  }, []);

  // IntersectionObserver для анимаций появления
  useEffect(() => {
    if (!isMobile) {
      // ДЕСКТОП - каскадное появление всей секции
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHeaderVisible(true);
            console.log('🎬 FeaturesSection: Каскадная анимация запущена (десктоп)');
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
      // МОБИЛЬНЫЙ - индивидуальное появление заголовка и карточек
      const observers: IntersectionObserver[] = [];
      
      // Observer для заголовка на мобильных
      if (headerRef.current) {
        const headerObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setHeaderVisible(true);
              console.log('🎬 FeaturesSection: Заголовок появился (мобильный)');
            }
          },
          { 
            threshold: 0.3,
            rootMargin: '-20px 0px -20px 0px'
          }
        );
        
        headerObserver.observe(headerRef.current);
        observers.push(headerObserver);
      }
      
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  console.log(`🎬 FeaturesSection: Карточка ${index + 1} появилась (мобильный)`);
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
      className={`pt-12 pb-12 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24 bg-gradient-to-b from-transparent via-gray-50/30 to-white relative overflow-hidden features-section refresh-${refreshRate}`}
    >
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/35 via-blue-50/30 via-transparent to-teal-50/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          ref={headerRef}
          className={`text-center mb-8 md:mb-16 feature-header ${
            headerVisible ? 'feature-header-visible' : 'feature-header-hidden'
          }`}
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
            Почему выбирают iDATA
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
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
                {/* Icon with enhanced styling */}
                <div className="relative mb-5 md:mb-8">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg group-hover:shadow-lg md:group-hover:shadow-xl transform translateZ(0) transition-all duration-500 ease-out backface-visibility-hidden -webkit-font-smoothing-antialiased">
                    <Icon
                      name={feature.icon as any}
                      size={isMobile ? 20 : 28}
                      className="text-white transform translate3d(0, 0, 0)"
                    />
                  </div>
                  {/* Decorative ring - только на десктопе */}
                  <div className="hidden md:block absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Text content */}
                <div className="flex-1 space-y-3 md:space-y-4">
                  <h3 className="text-base md:text-xl font-bold text-gray-900 leading-tight tracking-tight break-words">
                    {feature.title}
                  </h3>
                  <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full opacity-60"></div>
                  <p className="text-gray-600 leading-tight md:leading-relaxed text-sm md:text-[15px] font-medium break-words">
                    {feature.description}
                  </p>
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

export default FeaturesSection;