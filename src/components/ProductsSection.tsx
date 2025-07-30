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
              whileHover={!isMobile ? { y: -8, transition: { duration: 0.3 } } : {}}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden"
              style={{ minHeight: "340px" }}
            >
              {/* Иконка */}
              <div className={`w-16 h-16 bg-gradient-to-br ${product.gradientPosition} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                <Icon
                  name={product.icon as any}
                  size={28}
                  className="text-white"
                />
              </div>
              
              {/* Заголовок */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
                {product.title}
              </h3>
              
              {/* Декоративная линия */}
              <div className={`w-12 h-0.5 bg-gradient-to-r ${product.gradientPosition} rounded-full opacity-60 mb-4`}></div>

              {/* Описание */}
              <p className="text-gray-600 leading-relaxed text-[15px] font-medium mb-6">
                {product.description}
              </p>

              {/* Список характеристик */}
              <div className="flex-1 mb-6">
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-gradient-to-br ${product.gradientPosition}`}>
                        <Icon
                          name="Check"
                          size={10}
                          className="text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кнопка */}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;