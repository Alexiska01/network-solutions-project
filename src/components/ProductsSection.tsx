import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
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
  }, []);

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

  // Оптимизированные анимации для мобильных устройств
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 60,
      scale: isMobile ? 0.96 : 0.85,
      rotateX: isMobile ? 0 : 15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        delay: i * (isMobile ? 0.05 : 0.12),
        ease: isMobile ? "easeOut" : [0.23, 1, 0.32, 1],
        type: isMobile ? "tween" : "spring",
        ...(isMobile ? {} : { stiffness: 80, damping: 20 }),
      },
    }),
  };

  return (
    <section ref={sectionRef} className="py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden flex items-center">
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-teal-50/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className={`transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                height: isMobile ? "auto" : "560px",
                transitionDelay: `${index * (isMobile ? 60 : 120)}ms`
              }}
            >
              <div className={`group relative bg-white border border-gray-100 h-full overflow-hidden transition-all ease-out ${
                isMobile 
                  ? 'rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 duration-300 hover:-translate-y-1'
                  : 'rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2'
              }`}>
                {/* Оптимизированный gradient overlay */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                )}
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Оптимизированная иконка */}
                  <div className={`relative ${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <div className={`bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center transition-all ${
                      isMobile 
                        ? 'w-14 h-14 shadow-md duration-200 group-hover:shadow-lg'
                        : 'w-16 h-16 shadow-lg duration-300 group-hover:shadow-xl group-hover:scale-105'
                    }`}>
                      <Icon
                        name={product.icon as any}
                        size={isMobile ? 24 : 28}
                        className="text-white"
                      />
                    </div>
                    {/* Декоративное кольцо только для десктопа */}
                    {!isMobile && (
                      <div className="absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                
                  {/* Адаптивный заголовок */}
                  <div className={`${isMobile ? 'mb-4' : 'mb-5'}`} style={{ height: isMobile ? "auto" : "78px" }}>
                    <h3 className={`font-bold text-gray-900 leading-tight tracking-tight whitespace-pre-line group-hover:text-gray-800 transition-colors ${
                      isMobile 
                        ? 'text-xl mb-3 duration-200'
                        : 'text-2xl mb-4 duration-300'
                    }`}>
                      {product.title}
                    </h3>
                    {/* Анимированная линия - упрощенная для мобильных */}
                    <div className="relative h-0.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${product.gradientPosition} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform ease-out ${
                        isMobile ? 'duration-200' : 'duration-400'
                      }`}></div>
                    </div>
                  </div>
                
                  {/* Адаптивное описание */}
                  <div className={`flex items-start ${isMobile ? 'mb-5' : 'mb-6'}`} style={{ height: isMobile ? "auto" : "60px" }}>
                    <p className={`text-gray-600 leading-relaxed font-medium group-hover:text-gray-700 transition-colors ${
                      isMobile 
                        ? 'text-sm duration-200'
                        : 'text-base duration-300'
                    }`}>
                      {product.description}
                    </p>
                  </div>
                
                  {/* Оптимизированный список характеристик */}
                  <div className={`flex-1 ${isMobile ? 'mb-6' : 'mb-8'}`} style={{ minHeight: isMobile ? "auto" : "120px" }}>
                    <ul className={isMobile ? 'space-y-2' : 'space-y-3'}>
                      {product.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className={`flex items-start text-gray-700 group-hover:text-gray-800 transition-colors ${
                            isMobile ? 'duration-200' : 'duration-300'
                          }`}
                          initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -10 }}
                          animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
                          transition={{ delay: isMobile ? 0 : (index * 0.1) + (idx * 0.1) + 0.3 }}
                        >
                          <div className={`relative rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-600 to-teal-500 shadow-sm transition-all mt-0.5 ${
                            isMobile 
                              ? 'w-4 h-4 mr-3 duration-200'
                              : 'w-5 h-5 mr-4 duration-300 group-hover:scale-110 group-hover:shadow-md'
                          }`}>
                            <Icon
                              name="Check"
                              size={isMobile ? 10 : 12}
                              className={`text-white transition-transform ${
                                isMobile ? 'duration-150' : 'duration-200 group-hover:scale-105'
                              }`}
                              strokeWidth={2.5}
                            />
                          </div>
                          <span className={`leading-relaxed font-medium ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                
                  {/* Оптимизированная CTA кнопка */}
                  <div className={`mt-auto ${isMobile ? 'pt-3' : 'pt-4'}`}>
                    {index === 0 ? (
                      <Link
                        to="/switches"
                        className={`group/cta relative flex items-center justify-between w-full border border-gray-200 hover:border-gray-300 transition-all hover:bg-gray-50/50 ${
                          isMobile 
                            ? 'p-3 rounded-lg duration-200 hover:shadow-md'
                            : 'p-4 rounded-xl duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]'
                        }`
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-gray-900 font-semibold group-hover/cta:text-gray-800 transition-colors ${
                            isMobile ? 'text-xs duration-150' : 'text-sm duration-200'
                          }`}>Подробнее</span>
                        </div>
                        <div className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all ${
                          isMobile 
                            ? 'w-7 h-7 duration-200 group-hover/cta:scale-105'
                            : 'w-8 h-8 duration-300 group-hover/cta:scale-110 group-hover/cta:shadow-lg group-hover/cta:rotate-6'
                        }`}>
                          <Icon
                            name="ArrowRight"
                            size={isMobile ? 12 : 14}
                            className={`text-white transition-transform ${
                              isMobile ? 'duration-150' : 'duration-200 group-hover/cta:translate-x-0.5'
                            }`}
                          />
                        </div>
                        {/* Анимированная линия в кнопке - упрощенная для мобильных */}
                        <div className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover/cta:scale-x-100 transition-transform origin-left rounded-full ${
                          isMobile 
                            ? 'left-3 right-3 duration-200'
                            : 'left-4 right-4 duration-300'
                        }`}></div>
                      </Link>
                    ) : (
                      <button className={`group/cta relative flex items-center justify-between w-full border border-gray-200 hover:border-gray-300 transition-all hover:bg-gray-50/50 ${
                        isMobile 
                          ? 'p-3 rounded-lg duration-200 hover:shadow-md'
                          : 'p-4 rounded-xl duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <span className={`text-gray-900 font-semibold group-hover/cta:text-gray-800 transition-colors ${
                            isMobile ? 'text-xs duration-150' : 'text-sm duration-200'
                          }`}>Подробнее</span>
                        </div>
                        <div className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all ${
                          isMobile 
                            ? 'w-7 h-7 duration-200 group-hover/cta:scale-105'
                            : 'w-8 h-8 duration-300 group-hover/cta:scale-110 group-hover/cta:shadow-lg group-hover/cta:rotate-6'
                        }`}>
                          <Icon
                            name="ArrowRight"
                            size={isMobile ? 12 : 14}
                            className={`text-white transition-transform ${
                              isMobile ? 'duration-150' : 'duration-200 group-hover/cta:translate-x-0.5'
                            }`}
                          />
                        </div>
                        {/* Анимированная линия в кнопке - упрощенная для мобильных */}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;