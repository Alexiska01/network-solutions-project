import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { switchesData } from "@/data/switchesData";
import "./AccessSwitchesPage.css";

const AccessSwitchesPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [is120fps, setIs120fps] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          console.log(`🚀 AccessSwitches: Обнаружен ${fps} FPS дисплей - активирован режим 120 FPS!`);
        } else {
          setIs120fps(false);
          console.log(`📺 AccessSwitches: Стандартный ${fps} FPS дисплей`);
        }
        return;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Проверка поддержки высокой частоты через media query
    const highRefreshSupported = window.matchMedia('(min-refresh-rate: 120hz)').matches;
    if (highRefreshSupported) {
      setIs120fps(true);
      console.log('🚀 AccessSwitches: 120Hz+ дисплей определен через CSS media query');
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

  const accessSwitches = switchesData.filter((s) => s.category === "access");

  useEffect(() => {
    // Инициализируем массив видимости карточек
    setVisibleCards(new Array(accessSwitches.length).fill(false));
    cardRefs.current = new Array(accessSwitches.length).fill(null);
  }, [accessSwitches.length]);

  useEffect(() => {
    if (!isMobile) {
      // Для десктопа - все сразу
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
  }, [isMobile, accessSwitches.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h1 className="hero-main-title mb-6 sm:mb-8">
              Управляемые коммутаторы доступа — надёжность и масштабируемость вашей ЛВС
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mb-8 sm:mb-10">
              Гарантированная производительность, поддержка PoE и высокая отказоустойчивость — всё, что нужно вашей IT-инфраструктуре.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-buttons">
              <button 
                className="hero-btn-primary"
                onClick={() => {
                  const element = document.querySelector('#products');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Подробнее
              </button>
              <button className="hero-btn-secondary">
                Скачать PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        ref={sectionRef}
        id="products" 
        className={`py-8 sm:py-12 lg:py-16 products-section ${is120fps ? 'products-120fps' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {accessSwitches.map((switchData, index) => (
              <div
                key={switchData.id}
                ref={(el) => {
                  if (cardRefs.current) {
                    cardRefs.current[index] = el;
                  }
                }}
                className={`product-card group transition-all ${
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
                <div className="product-card-inner">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={switchData.image}
                      alt={switchData.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full">
                        <Icon name="Wifi" className="h-4 w-4" />
                        <span>Доступ</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {switchData.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {switchData.description}
                    </p>

                    {/* Professional Specs Grid */}
                    <div className="spec-grid-container mb-8">
                      <div className="spec-grid">
                        <div className="spec-card spec-card-primary group/spec">
                          <div className="spec-icon-wrapper">
                            <Icon name="Plug" className="spec-icon" />
                            <div className="spec-icon-glow"></div>
                          </div>
                          <div className="spec-content">
                            <div className="spec-label">Порты</div>
                            <div className="spec-value">{switchData.specs.ports}</div>
                          </div>
                          <div className="spec-decoration"></div>
                        </div>

                        <div className="spec-card spec-card-secondary group/spec">
                          <div className="spec-icon-wrapper">
                            <Icon name="Zap" className="spec-icon" />
                            <div className="spec-icon-glow"></div>
                          </div>
                          <div className="spec-content">
                            <div className="spec-label">Питание</div>
                            <div className="spec-value">{switchData.specs.power}</div>
                          </div>
                          <div className="spec-decoration"></div>
                        </div>

                        <div className="spec-card spec-card-accent group/spec">
                          <div className="spec-icon-wrapper">
                            <Icon name="Activity" className="spec-icon" />
                            <div className="spec-icon-glow"></div>
                          </div>
                          <div className="spec-content">
                            <div className="spec-label">Пропускная способность</div>
                            <div className="spec-value">{switchData.specs.throughput}</div>
                          </div>
                          <div className="spec-decoration"></div>
                        </div>

                        <div className="spec-card spec-card-neutral group/spec">
                          <div className="spec-icon-wrapper">
                            <Icon name="Settings" className="spec-icon" />
                            <div className="spec-icon-glow"></div>
                          </div>
                          <div className="spec-content">
                            <div className="spec-label">Функции</div>
                            <div className="spec-value">{switchData.specs.features.length} шт</div>
                          </div>
                          <div className="spec-decoration"></div>
                        </div>
                      </div>
                    </div>

                    {/* Professional Features Badges */}
                    <div className="features-section mb-8">
                      <div className="features-label mb-4">
                        <Icon name="Star" className="features-label-icon" />
                        <span>Ключевые возможности</span>
                      </div>
                      <div className="features-grid">
                        {switchData.specs.features.slice(0, 6).map((feature, idx) => (
                          <div
                            key={idx}
                            className={`feature-badge feature-badge-${idx % 3} group/feature`}
                            style={{
                              animationDelay: `${idx * 100}ms`
                            }}
                          >
                            <div className="feature-badge-inner">
                              <div className="feature-badge-glow"></div>
                              <div className="feature-badge-content">
                                <Icon 
                                  name={[
                                    'Shield', 'Wifi', 'Zap', 
                                    'Network', 'Settings', 'Activity'
                                  ][idx] || 'CheckCircle'} 
                                  className="feature-badge-icon" 
                                />
                                <span className="feature-badge-text">{feature}</span>
                              </div>
                              <div className="feature-badge-shimmer"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Button */}
                    <Button
                      className="w-full group/btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                      onClick={() => navigate(switchData.link)}
                    >
                      <span>Подробнее</span>
                      <Icon name="ArrowRight" className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccessSwitchesPage;