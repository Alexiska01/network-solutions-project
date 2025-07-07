import { Link } from "react-router-dom";
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

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg md:rounded-xl px-6 md:px-8 py-6 md:py-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
            >
              {/* Header with icon and title */}
              <div className="flex gap-4 items-start mb-2">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={product.icon as any}
                    size={24}
                    className="text-white md:w-8 md:h-8 lg:w-9 lg:h-9"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 font-sans leading-tight">
                    {product.title === "Беспроводные решения" ? (
                      <>
                        Беспроводные
                        <br className="hidden sm:block" /> решения
                      </>
                    ) : (
                      product.title
                    )}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5 md:mb-6">
                <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features list */}
              <div className="flex-1 mb-6">
                <ul className="space-y-2 md:space-y-2.5">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs md:text-sm text-gray-700 font-sans"
                    >
                      <Icon
                        name="Check"
                        size={12}
                        className="text-green-500 mr-2 flex-shrink-0 md:w-4 md:h-4"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button with enhanced CTA styling */}
              {index === 0 ? (
                <Link
                  to="/switches"
                  className="block w-full bg-[#0065B3] text-white py-2 md:py-2.5 px-3 md:px-4 rounded-lg hover:bg-gradient-hero transition-all duration-300 font-sans text-sm md:text-base min-h-[44px] shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center"
                >
                  Подробнее
                </Link>
              ) : (
                <button className="w-full bg-[#0065B3] text-white py-2 md:py-2.5 px-3 md:px-4 rounded-lg hover:bg-gradient-hero transition-all duration-300 font-sans text-sm md:text-base min-h-[44px] shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Подробнее
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
