import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ProductsSection = () => {
  const productCategories = [
    {
      icon: "Network",
      title: "Управляемые коммутаторы",
      description:
        "L3 коммутаторы с поддержкой VLAN, QoS и расширенными функциями управления",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка",
        "Стекирование",
        "SNMP мониторинг",
      ],
    },
    {
      icon: "Router",
      title: "Корпоративные маршрутизаторы",
      description: "Высокопроизводительные маршрутизаторы для филиальных сетей",
      features: [
        "VPN подключения",
        "Firewall встроенный",
        "Load balancing",
        "Резервирование",
      ],
    },
    {
      icon: "Wifi",
      title: "Беспроводные решения",
      description: "Enterprise-класс точки доступа и контроллеры для Wi-Fi 6",
      features: [
        "Wi-Fi 6E поддержка",
        "Mesh технология",
        "Централизованное управление",
        "Roaming",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name={category.icon}
                    size={32}
                    className="text-blue-600"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {category.title}
              </h3>

              <p className="text-gray-600 mb-6 text-center">
                {category.description}
              </p>

              <ul className="space-y-3 mb-8">
                {category.features.map((feature, featureIndex) => (
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

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Подробнее
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
