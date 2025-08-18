import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";

const FeaturesSection = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => new Array(4).fill(false));
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
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener('change', handler as any);
    return () => mq.removeEventListener('change', handler as any);
  }, []);

  // Детекция частоты обновления экрана
  useEffect(() => {
    // Упрощённая и более быстрая детекция частоты
    let frames = 0; let t0 = 0; let id: number;
    const sampleTarget = 60; // меньше итераций
    const tick = (t: number) => {
      if (!t0) t0 = t;
      frames++;
      if (frames >= sampleTarget) {
        const fps = Math.round(frames * 1000 / (t - t0));
        let rate: typeof refreshRate = '60hz';
        if (fps >= 230) rate = '240hz'; else if (fps >= 140) rate = '144hz'; else if (fps >= 115) rate = '120hz'; else if (fps >= 85) rate = '90hz';
        setRefreshRate(rate);
        document.body.className = document.body.className.replace(/refresh-\d+hz/g, '') + ` refresh-${rate}`;
        return;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  // Синхронизация длины массива если список фич изменится
  useEffect(() => {
    if (visibleCards.length !== features.length) {
      setVisibleCards(prev => {
        const next = [...prev];
        while (next.length < features.length) next.push(false);
        return next.slice(0, features.length);
      });
    }
  }, [features.length, visibleCards.length]);

  // IntersectionObserver для анимаций появления
  useEffect(() => {
    const desktopObserverOptions = { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' };
    const mobileObserverOptions = { threshold: 0.25, rootMargin: '-25px 0px -25px 0px' };
    if (!isMobile) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); setHeaderVisible(true);
        }
      }, desktopObserverOptions);
      if (sectionRef.current) observer.observe(sectionRef.current);
      // Fallback: если observer не сработал (например SSR/layout shift) — показать через timeout
  setTimeout(() => {
        if (!isVisible) { setIsVisible(true); setHeaderVisible(true); }
      }, 1200);
      return () => observer.disconnect();
    }
    const observers: IntersectionObserver[] = [];
    if (headerRef.current) {
      const hObs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); }, mobileObserverOptions);
      hObs.observe(headerRef.current); observers.push(hObs);
    }
    cardRefs.current.forEach((cardRef, index) => {
      if (!cardRef) return;
      const cObs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCards(prev => { if (prev[index]) return prev; const cp = [...prev]; cp[index] = true; return cp; });
        }
      }, mobileObserverOptions);
      cObs.observe(cardRef); observers.push(cObs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isMobile, features.length, isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`pt-3 pb-4 sm:pt-4 sm:pb-6 md:pt-6 md:pb-8 lg:pt-7 lg:pb-9 bg-gradient-to-b from-transparent via-gray-50/30 to-white relative overflow-hidden features-section refresh-${refreshRate}`}
    >
      {/* Декоративный фон */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/35 via-blue-50/30 to-teal-50/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8 relative">
        <div className="flex flex-col justify-center min-h-[320px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px]">
        <div 
          ref={headerRef}
          className={`text-center mb-3 md:mb-6 feature-header ${
            headerVisible ? 'feature-header-visible' : 'feature-header-hidden'
          }`}
        >
          <h2 className="text-[1.25rem] sm:text-[1.45rem] md:text-2xl lg:text-3xl xl:text-[2.375rem] font-bold text-gray-900 mb-2 md:mb-4 leading-snug tracking-tight">
            Почему выбирают iDATA
          </h2>
          <div className="w-14 md:w-20 h-0.5 md:h-[3px] bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-1 md:mb-2 rounded-full"></div>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (cardRefs.current) {
                  cardRefs.current[index] = el;
                }
              }}
              className={`feature-card group relative bg-white rounded-xl md:rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] md:shadow-[0_4px_18px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] md:hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] px-4 py-4 sm:py-5 md:p-7 xl:p-8 min-h-[170px] sm:min-h-[180px] md:min-h-[190px] h-full overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white transform-gpu will-change-transform ${
                isMobile 
                  ? (visibleCards[index] ? 'feature-card-visible' : 'feature-card-hidden-mobile')
                  : (isVisible ? 'feature-card-visible' : 'feature-card-hidden')
              }`}
              style={{
                '--feature-index': index,
              } as React.CSSProperties}
              tabIndex={0}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 md:from-blue-50/50 via-transparent to-teal-50/20 md:to-teal-50/30 opacity-0 group-hover:opacity-100 rounded-xl md:rounded-3xl transition-opacity duration-500 md:duration-700 ease-out pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-center">
                {/* Icon with enhanced styling */}
                <div className="relative mb-4 md:mb-7">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md md:shadow-lg group-hover:shadow-lg md:group-hover:shadow-xl transform translateZ(0) transition-all duration-500 ease-out backface-visibility-hidden -webkit-font-smoothing-antialiased">
                    <Icon
                      name={feature.icon as any}
                      size={isMobile ? 22 : 28}
                      className="text-white transform translate3d(0, 0, 0)"
                    />
                  </div>
                  {/* Decorative ring - только на десктопе */}
                  <div className="hidden md:block absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Text content */}
                <div className="flex-1 space-y-2.5 sm:space-y-3 md:space-y-4">
                  <h3 className="text-[0.95rem] sm:text-base md:text-xl font-bold text-gray-900 leading-tight tracking-tight break-words">
                    {feature.title}
                  </h3>
                  <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full opacity-60"></div>
                  <p className="text-gray-600 leading-snug sm:leading-tight md:leading-relaxed text-[0.8rem] sm:text-sm md:text-[15px] font-medium break-words">
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
      </div>
    </section>
  );
};

export default FeaturesSection;