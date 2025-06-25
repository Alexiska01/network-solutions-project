import React from "react";
import Icon from "@/components/ui/icon";

const ProductsSection = () => {
  const products = [
    {
      title: "Управляемые коммутаторы",
      description:
        "L3 коммутаторы с поддержкой VLAN, QoS и расширенными функциями управления",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка",
        "Стекирование",
        "SNMP мониторинг",
      ],
      icon: "Network",
    },
    {
      title: "Корпоративные маршрутизаторы",
      description: "Высокопроизводительные маршрутизаторы для филиальных сетей",
      features: [
        "VPN подключения",
        "Firewall встроенный",
        "Load balancing",
        "Резервирование",
      ],
      icon: "Router",
    },
    {
      title: "Беспроводные решения",
      description: "Enterprise-класс точки доступа и контроллеры для Wi-Fi 6",
      features: [
        "Wi-Fi 6E поддержка",
        "Mesh технология",
        "Централизованное управление",
        "Roaming",
      ],
      icon: "Wifi",
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4 font-sans">
            Наши продукты и технологии
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto font-sans">
            Полная линейка сетевого оборудования для построения надежной
            корпоративной инфраструктуры
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 md:items-start">
          {products.map((product, index) => (
            <div
              key={index}
              className={`product-card-${index} bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col`}
            >
              <div
                className={`product-header-${index} flex gap-3 md:gap-4 items-start mb-4`}
              >
                <div
                  className={`product-icon-${index} w-12 h-12 md:w-16 md:h-16 bg-gradient-icon rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon
                    name={product.icon as any}
                    size={24}
                    className="text-white md:w-8 md:h-8 lg:w-9 lg:h-9"
                  />
                </div>
                <div className={`product-content-${index} flex-1`}>
                  <h3
                    className={`product-title-${index} text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-1 md:mb-2 font-sans`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`product-desc-${index} text-xs md:text-xs lg:text-sm text-gray-600 font-sans leading-relaxed`}
                  >
                    {product.description}
                  </p>
                </div>
              </div>
              <ul
                className={`product-features-${index} space-y-1.5 md:space-y-2 mb-6 flex-1`}
              >
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`product-feature-${index}-${idx} flex items-center text-xs md:text-sm text-gray-700 font-sans`}
                  >
                    <Icon
                      name="Check"
                      size={12}
                      className="text-green-500 mr-1.5 md:mr-2 flex-shrink-0 md:w-4 md:h-4"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`product-button-${index} w-full bg-[#0065B3] text-white py-2 md:py-2.5 px-3 md:px-4 rounded-md md:rounded-lg hover:bg-gradient-hero transition-all duration-300 font-sans text-sm md:text-base min-h-[44px] mt-auto`}
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
