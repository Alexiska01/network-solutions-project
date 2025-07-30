import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";

const ProductsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white mt-8 md:mt-12 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-teal-50/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl mb-6 shadow-lg">
            <Icon name="Package" size={28} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Наши решения
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
            Профессиональное сетевое оборудование для бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 overflow-hidden ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                minHeight: "480px",
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon with enhanced styling */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.gradientPosition} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    <Icon
                      name={product.icon as any}
                      size={28}
                      className="text-white"
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Text content */}
                <div className="flex-1 space-y-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
                    {product.title}
                  </h3>
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${product.gradientPosition} rounded-full opacity-60`}></div>
                  <p className="text-gray-600 leading-relaxed text-[15px] font-medium">
                    {product.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mt-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <div className={`relative w-4 h-4 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-gradient-to-br ${product.gradientPosition} shadow-sm mt-0.5`}>
                          <Icon
                            name="Check"
                            size={10}
                            className="text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="leading-relaxed text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  {index === 0 ? (
                    <Link
                      to="/switches"
                      className="group/cta flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <span className="mr-2">Подробнее</span>
                      <Icon
                        name="ArrowRight"
                        size={16}
                        className="group-hover/cta:translate-x-0.5 transition-transform duration-200"
                      />
                    </Link>
                  ) : (
                    <button className="group/cta flex items-center justify-center w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <span className="mr-2">Подробнее</span>
                      <Icon
                        name="ArrowRight"
                        size={16}
                        className="group-hover/cta:translate-x-0.5 transition-transform duration-200"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradientPosition} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;