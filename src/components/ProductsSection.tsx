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

  // Премиум анимации для современных карточек
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 60,
      scale: isMobile ? 0.92 : 0.85,
      rotateX: 15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.8,
        delay: i * (isMobile ? 0.08 : 0.12),
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    }),
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white mt-8 md:mt-12 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-teal-50/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                height: "560px",
                transitionDelay: `${index * 120}ms`
              }}
            >
              <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      <Icon
                        name={product.icon as any}
                        size={28}
                        className="text-white"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                
                  {/* Секция 2: Премиум заголовок */}
                  <div className="mb-5" style={{ height: "78px" }}>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-4 whitespace-pre-line group-hover:text-gray-800 transition-colors duration-300">
                      {product.title}
                    </h3>
                    {/* Анимированная линия */}
                    <div className="relative h-0.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${product.gradientPosition} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out`}></div>
                    </div>
                  </div>
                
                  {/* Секция 3: Элегантное описание */}
                  <div className="mb-6 flex items-start" style={{ height: "60px" }}>
                    <p className="text-gray-600 leading-relaxed text-base font-medium group-hover:text-gray-700 transition-colors duration-300">
                      {product.description}
                    </p>
                  </div>
                
                  {/* Секция 4: Стильный список характеристик */}
                  <div className="mb-8 flex-1" style={{ minHeight: "120px" }}>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1) + 0.3 }}
                        >
                          <div className={`relative w-5 h-5 rounded-full flex items-center justify-center mr-4 flex-shrink-0 bg-gradient-to-br ${product.gradientPosition} shadow-sm transition-all duration-300 mt-0.5`}>
                            <Icon
                              name="Check"
                              size={12}
                              className="text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                          <span className="leading-relaxed text-sm font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                
                  {/* Секция 5: Современный CTA */}
                  <div className="mt-auto pt-4">
                    {index === 0 ? (
                      <Link
                        to="/switches"
                        className="group/cta relative flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:bg-gray-50/50"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-900 font-semibold text-sm group-hover/cta:text-gray-800 transition-colors duration-200">Подробнее</span>
                        </div>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${product.gradientPosition} transition-all duration-300`}>
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-white group-hover/cta:translate-x-0.5 transition-transform duration-200"
                          />
                        </div>
                        {/* Анимированная линия в кнопке */}
                        <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${product.gradientPosition} transform scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-300 origin-left rounded-full`}></div>
                      </Link>
                    ) : (
                      <button className="group/cta relative flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-900 font-semibold text-sm group-hover/cta:text-gray-800 transition-colors duration-200">Подробнее</span>
                        </div>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${product.gradientPosition} transition-all duration-300`}>
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-white group-hover/cta:translate-x-0.5 transition-transform duration-200"
                          />
                        </div>
                        {/* Анимированная линия в кнопке */}
                        <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${product.gradientPosition} transform scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-300 origin-left rounded-full`}></div>
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