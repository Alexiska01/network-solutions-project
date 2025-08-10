import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";

const FeaturesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [is120fps, setIs120fps] = useState(false);
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

  // Обнаружение 120 FPS дисплеев
  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    
    const detectFrameRate = () => {
      frameCount++;
      if (frameCount < 60) {
        requestAnimationFrame(detectFrameRate);
      } else {
        const endTime = performance.now();
        const fps = Math.round(60000 / (endTime - startTime));
        
        if (fps >= 115) {
          setIs120fps(true);
          console.log(`🚀 FeaturesSection: Обнаружен ${fps} FPS дисплей - активирован режим 120 FPS!`);
        } else {
          setIs120fps(false);
          console.log(`📺 FeaturesSection: Стандартный ${fps} FPS дисплей`);
        }
      }
    };
    
    requestAnimationFrame(detectFrameRate);
  }, []);

  useEffect(() => {
    // Инициализируем массив видимости карточек
    setVisibleCards(new Array(features.length).fill(false));
    cardRefs.current = new Array(features.length).fill(null);
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
      // Для мобильных - индивидуальное появление карточек + заголовок
      const observers: IntersectionObserver[] = [];
      
      // Observer для заголовка на мобильных
      if (headerRef.current) {
        const headerObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setHeaderVisible(true);
            }
          },
          { threshold: 0.1 }
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

  return (
    <section ref={sectionRef} className="pt-12 pb-12 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24 bg-gradient-to-b from-transparent via-gray-50/30 to-white relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/35 via-blue-50/30 via-transparent to-teal-50/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div 
          ref={headerRef}
          className={`text-center mb-8 md:mb-16 feature-header ${
            (isMobile ? headerVisible : isVisible)
              ? 'feature-header-visible' 
              : 'feature-header-hidden'
          }`}
        >

          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
            Почему выбирают iDATA
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 leading-tight md:leading-relaxed max-w-3xl mx-auto font-medium">
            Преимущества, которые получают наши клиенты
          </p>
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
              className={`group relative bg-white rounded-xl md:rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] px-4 py-5 md:p-8 h-full overflow-hidden feature-card feature-card-height ${
                // Основная анимация карточки
                isMobile 
                  ? (is120fps ? 'feature-card-120fps-mobile' : 'feature-card-mobile')
                  : (is120fps ? 'feature-card-120fps-desktop' : 'feature-card-desktop')
              } ${
                // Hover анимация
                is120fps ? 'feature-card-hover-120fps' : 'feature-card-hover'
              } ${
                // Состояние видимости
                isMobile 
                  ? (visibleCards[index] 
                      ? 'feature-card-visible' 
                      : 'feature-card-hidden-mobile'
                    )
                  : (isVisible 
                      ? 'feature-card-visible' 
                      : 'feature-card-hidden'
                    )
              } ${
                // Задержка появления только для десктопа
                !isMobile 
                  ? (is120fps 
                      ? `feature-card-delay-120fps-${index}` 
                      : `feature-card-delay-${index}`
                    )
                  : ''
              } hover:-translate-y-1 md:hover:-translate-y-2`}
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/30 md:from-blue-50/50 via-transparent to-teal-50/20 md:to-teal-50/30 opacity-0 group-hover:opacity-100 rounded-xl md:rounded-3xl ${
                is120fps ? 'transition-opacity duration-200' : 'transition-opacity duration-300 md:duration-500'
              }`}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon with enhanced styling */}
                <div className="relative mb-5 md:mb-8">
                  <div className={`w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg group-hover:shadow-lg md:group-hover:shadow-xl group-hover:scale-105 ${
                    is120fps ? 'transition-all duration-200' : 'transition-all duration-300'
                  }`}>
                    <Icon
                      name={feature.icon as any}
                      size={20}
                      className="text-white md:hidden"
                    />
                    <Icon
                      name={feature.icon as any}
                      size={28}
                      className="text-white hidden md:block"
                    />
                  </div>
                  {/* Decorative ring - только на десктопе */}
                  <div className={`hidden md:block absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 ${
                    is120fps ? 'transition-opacity duration-200' : 'transition-opacity duration-300'
                  }`}></div>
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
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-b-xl md:rounded-b-3xl ${
                is120fps ? 'transition-transform duration-200' : 'transition-transform duration-300 md:duration-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;