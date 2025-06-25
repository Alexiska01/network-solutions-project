import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const SwitchesPage = () => {
  const switchSeries = [
    {
      category: "Управляемые коммутаторы",
      description: "L2/L3 коммутаторы с расширенными функциями управления",
      series: [
        {
          name: "IDS-3730 Series",
          description: "24/48 портов с PoE+, стекирование",
          icon: "Network",
          ports: "24-48 портов",
          features: ["PoE+", "Стекирование", "L3 функции"],
        },
        {
          name: "IDS-3530 Series",
          description: "Компактные управляемые коммутаторы",
          icon: "Router",
          ports: "8-24 порта",
          features: ["VLAN", "QoS", "SNMP"],
        },
        {
          name: "IDS-4530 Series",
          description: "Высокопроизводительные коммутаторы",
          icon: "Server",
          ports: "24-48 портов",
          features: ["10G Uplink", "Redundancy", "Advanced L3"],
        },
      ],
    },
    {
      category: "Промышленные коммутаторы",
      description: "Решения для промышленных сетей и автоматизации",
      series: [
        {
          name: "IDS-6010 Series",
          description: "Промышленные коммутаторы DIN-rail",
          icon: "Zap",
          ports: "5-16 портов",
          features: ["DIN-rail", "Wide temp", "Ring topology"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Block */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 font-montserrat">
            Коммутаторы iDATA
          </h1>
          <p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto font-inter">
            Полная линейка решений для любого уровня сети
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {switchSeries.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-montserrat">
                  {category.category}
                </h2>
                <p className="text-sm md:text-base text-gray-600 font-inter">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.series.map((series, seriesIndex) => (
                  <div
                    key={seriesIndex}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon
                          name={series.icon}
                          size={24}
                          className="text-blue-600"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 font-montserrat">
                          {series.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-inter">
                          {series.ports}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 font-inter">
                      {series.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {series.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-inter"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium font-inter">
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SwitchesPage;
