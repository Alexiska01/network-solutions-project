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
      description: "Корпоративные L3 коммутаторы для сетей",
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
      title: "Системы управления",
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

  // Профессиональные анимации с оптимизацией для мобильных
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 20 : 40,
      scale: isMobile ? 0.95 : 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.5 : 0.7,
        delay: i * (isMobile ? 0.1 : 0.15),
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: isMobile ? 120 : 100,
        damping: isMobile ? 20 : 18,
      },
    }),
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className={`group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 overflow-hidden ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                height: "400px",
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Декоративный градиент при hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Контент с строгой структурой */}
              <div className="relative z-10 h-full flex flex-col">
                
                {/* Секция 1: Иконка - фиксированная высота */}
                <div className="relative mb-6" style={{ height: "64px" }}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.gradientPosition} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    <Icon
                      name={product.icon as any}
                      size={28}
                      className="text-white"
                    />
                  </div>
                  {/* Декоративное кольцо */}
                  <div className="absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Секция 2: Заголовок - фиксированная высота */}
                <div className="mb-4" style={{ height: "56px" }}>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                    {product.title}
                  </h3>
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${product.gradientPosition} rounded-full opacity-60`}></div>
                </div>
                
                {/* Секция 3: Описание - фиксированная высота */}
                <div className="mb-4" style={{ height: "48px" }}>
                  <p className="text-gray-600 leading-relaxed text-[15px] font-medium">
                    {product.description}
                  </p>
                </div>
                
                {/* Секция 4: Список характеристик - растягивается */}
                <div className="flex-1 mb-6">
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700" style={{ minHeight: "24px" }}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-gradient-to-r ${product.gradientPosition} mt-0.5`}>
                          <Icon
                            name="Check"
                            size={10}
                            className="text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Секция 5: Кнопка - фиксированная высота в низу */}
                <div className="mt-auto">
                  {index === 0 ? (
                    <Link
                      to="/switches"
                      className={`block w-full text-white py-3 px-4 rounded-lg font-medium text-sm text-center transition-all duration-300 bg-gradient-to-r ${product.gradientPosition} hover:shadow-lg`}
                    >
                      Подробнее
                    </Link>
                  ) : (
                    <button 
                      className={`w-full text-white py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 bg-gradient-to-r ${product.gradientPosition} hover:shadow-lg`}
                    >
                      Подробнее
                    </button>
                  )}
                </div>
                
              </div>

              {/* Нижняя акцентная линия */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradientPosition} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;