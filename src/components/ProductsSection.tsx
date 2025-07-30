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
              className={`group relative cursor-pointer overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:rotate-1 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ 
                height: "520px",
                transitionDelay: `${index * 120}ms`
              }}
            >
              {/* Основная карточка с градиентным бордером */}
              <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-white via-gray-50/30 to-white p-[1px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-700">
                <div className="relative h-full w-full rounded-2xl bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                  
                  {/* Градиентный акцент сверху */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradientPosition} rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  
                  {/* Элегантный индикатор статуса */}
                  <div className="absolute top-5 right-5 flex items-center space-x-2 opacity-30 group-hover:opacity-50 transition-all duration-500">
                    {/* Тонкие линии вместо точек */}
                    <div className="flex space-x-1">
                      <div className="w-3 h-0.5 bg-gray-400 rounded-full"></div>
                      <div className={`w-4 h-0.5 bg-gradient-to-r ${product.gradientPosition} rounded-full opacity-60`}></div>
                      <div className="w-2 h-0.5 bg-gray-300 rounded-full"></div>
                    </div>
                    {/* Миниатюрная иконка категории */}
                    <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <Icon
                        name={product.icon as any}
                        size={12}
                        className="text-gray-500"
                      />
                    </div>
                  </div>
                  {/* Секция 1: Чистая иконка */}
                  <div className="relative mb-6" style={{ height: "72px" }}>
                    <div className="relative flex items-center justify-start">
                      {/* Простая иконка с легким фоном */}
                      <div className="relative p-4 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-all duration-300 border border-gray-100">
                        <Icon
                          name={product.icon as any}
                          size={32}
                          className="text-gray-700 group-hover:text-gray-900 group-hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                
                  {/* Секция 2: Премиум заголовок */}
                  <div className="mb-5" style={{ height: "78px" }}>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight mb-4 whitespace-pre-line group-hover:text-gray-800 transition-colors duration-300">
                      {product.title}
                    </h3>
                    {/* Анимированная линия */}
                    <div className="relative h-0.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${product.gradientPosition} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out`}></div>
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
                          <div className={`relative w-5 h-5 rounded-full flex items-center justify-center mr-4 flex-shrink-0 bg-gradient-to-br ${product.gradientPosition} shadow-sm group-hover:shadow-md transition-all duration-300 mt-0.5`}>
                            <Icon
                              name="Check"
                              size={12}
                              className="text-white"
                              strokeWidth={2.5}
                            />
                            {/* Пульсирующий эффект */}
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${product.gradientPosition} opacity-0 group-hover:opacity-30 animate-ping`}></div>
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
                        className="group/cta flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:bg-gray-50/50"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-900 font-semibold text-sm group-hover/cta:text-gray-800 transition-colors duration-200">Подробнее</span>
                        </div>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${product.gradientPosition} group-hover/cta:scale-110 transition-all duration-300 group-hover/cta:shadow-lg`}>
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-white group-hover/cta:translate-x-0.5 transition-transform duration-200"
                          />
                        </div>
                        {/* Анимированная линия снизу */}
                        <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${product.gradientPosition} transform scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-300 origin-left rounded-full`}></div>
                      </Link>
                    ) : (
                      <button className="group/cta relative flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-900 font-semibold text-sm group-hover/cta:text-gray-800 transition-colors duration-200">Подробнее</span>
                        </div>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${product.gradientPosition} group-hover/cta:scale-110 transition-all duration-300 group-hover/cta:shadow-lg`}>
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-white group-hover/cta:translate-x-0.5 transition-transform duration-200"
                          />
                        </div>
                        {/* Анимированная линия снизу */}
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