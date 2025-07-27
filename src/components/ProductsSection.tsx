import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products = [
    {
      title: "Управляемые коммутаторы",
      description: "Корпоративные L3 коммутаторы с расширенными функциями управления",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка",
        "SNMP мониторинг",
      ],
      icon: "Network",
      gradientPosition: "from-[#32398e] to-[#005baa]",
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
      gradientPosition: "from-[#005baa] to-[#0079b6]",
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
      gradientPosition: "from-[#0079b6] to-[#0093b6]",
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
      gradientPosition: "from-[#0093b6] to-[#00acad]",
    },
  ];

  // Упрощенные анимации для десктопа
  const desktopVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
    hover: {
      y: -6,
      scale: 1.01,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.99,
      transition: { duration: 0.1 },
    },
  };

  // Мягкие анимации для мобильных
  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.08,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Минимальный фоновый градиент */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: `linear-gradient(135deg, #32398e, #005baa, #0079b6, #0093b6, #00acad, #53c2a4)`,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={isMobile ? mobileVariants : desktopVariants}
              whileHover="hover"
              whileTap="tap"
              className={`
                group relative bg-white rounded-xl
                p-5 md:p-6 flex flex-col
                border border-gray-100
                shadow-md hover:shadow-lg
                transition-all duration-300 ease-out
                transform-gpu
                min-h-[280px] md:min-h-[300px]
              `}
            >
              {/* Заголовок с иконкой */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`
                    w-10 h-10 md:w-12 md:h-12 
                    bg-gradient-to-br ${product.gradientPosition}
                    rounded-lg
                    flex items-center justify-center
                    flex-shrink-0 shadow-sm
                  `}
                >
                  <Icon
                    name={product.icon as any}
                    size={isMobile ? 20 : 24}
                    className="text-white"
                    strokeWidth={1.5}
                  />
                </div>
                
                <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-tight">
                  {product.title === "Беспроводные решения" ? (
                    <>
                      Беспроводные<br className="hidden sm:block lg:hidden xl:block" /> решения
                    </>
                  ) : (
                    product.title
                  )}
                </h3>
              </div>

              {/* Описание */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Список характеристик */}
              <div className="flex-1 mb-4">
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <div 
                        className={`
                          w-4 h-4 rounded-full flex items-center justify-center mr-2.5 flex-shrink-0
                          bg-gradient-to-br ${product.gradientPosition}
                        `}
                      >
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
              <motion.div
                whileHover={{ scale: !isMobile ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                {index === 0 ? (
                  <Link
                    to="/switches"
                    className={`
                      block w-full text-white py-2.5 md:py-3 px-4
                      rounded-lg font-medium text-sm
                      text-center transition-all duration-300 transform-gpu
                      bg-gradient-to-r ${product.gradientPosition}
                      hover:shadow-md
                      ${!isMobile ? 'hover:-translate-y-0.5' : ''}
                    `}
                  >
                    Подробнее
                  </Link>
                ) : (
                  <button 
                    className={`
                      w-full text-white py-2.5 md:py-3 px-4
                      rounded-lg font-medium text-sm
                      transition-all duration-300 transform-gpu
                      bg-gradient-to-r ${product.gradientPosition}
                      hover:shadow-md
                      ${!isMobile ? 'hover:-translate-y-0.5' : ''}
                    `}
                  >
                    Подробнее
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;