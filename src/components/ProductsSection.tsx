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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Наши продукты и технологии
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Полная линейка сетевого оборудования для построения надежной
            корпоративной инфраструктуры
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon
                  name={product.icon as any}
                  size={24}
                  className="text-blue-600"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <Icon
                      name="Check"
                      size={16}
                      className="text-green-500 mr-2 flex-shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
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
