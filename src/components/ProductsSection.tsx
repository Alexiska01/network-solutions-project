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
      buttonText: "Подробнее",
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
      buttonText: "Подробнее",
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
      buttonText: "Подробнее",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Наши продукты и технологии
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полная линейка сетевого оборудования для построения надежной
            корпоративной инфраструктуры
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Icon
                  name={product.icon as any}
                  size={32}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {product.title}
              </h3>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <ul className="space-y-2 mb-8">
                {product.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-500 mr-3 flex-shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                {product.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
