import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const SeriesCatalog = () => {
  const models = [
    {
      id: "ids3730-24p-4x",
      name: "IDS3730-24P-4X",
      description: "24×1G PoE+, 4×10G SFP+, PoE 370 Вт",
      link: "/models/ids3730-24p-4x.html",
    },
    {
      id: "ids3730-48p-6x",
      name: "IDS3730-48P-6X",
      description: "48×1G PoE+, 6×10G SFP+, PoE 740 Вт",
      link: "/models/ids3730-48p-6x.html",
    },
    {
      id: "ids3730-24f-4x",
      name: "IDS3730-24F-4X",
      description: "24×1G SFP, 4×10G SFP+, без PoE",
      link: "/models/ids3730-24f-4x.html",
    },
    {
      id: "ids3730-48t-6x",
      name: "IDS3730-48T-6X",
      description: "48×1G Base-T, 6×10G SFP+, без PoE",
      link: "/models/ids3730-48t-6x.html",
    },
  ];

  const advantages = [
    {
      icon: "Zap",
      title: "PoE+ до 740 Вт",
      description: "Мощное питание устройств",
    },
    {
      icon: "Network",
      title: "10G uplink (SFP+)",
      description: "Высокоскоростные соединения",
    },
    {
      icon: "Settings",
      title: "Поддержка L3: ACL, QoS, маршрутизация",
      description: "Расширенные функции управления",
    },
    {
      icon: "Layers",
      title: "Стекирование до 4 устройств",
      description: "Масштабируемая архитектура",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Block */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              IDS3730 — управляемые L2+/L3-коммутаторы корпоративного уровня
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              До 740 Вт PoE+, стек до 4 устройств, uplink 10G, маршрутизация L3
              — всё в одной платформе
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-primary text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-brand-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Подробнее
              </button>
              <button className="border-2 border-brand-primary text-brand-primary px-10 py-4 rounded-lg font-semibold text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                Сравнить модели
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Block */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Icon
                    name={advantage.icon}
                    size={36}
                    className="text-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Cards Block */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {model.name}
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {model.description}
                </p>
                <Link
                  to={model.link}
                  className="inline-flex items-center bg-brand-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Подробнее
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Нужна помощь с выбором?
          </h2>
          <button className="bg-white text-brand-primary px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
            Связаться с инженером
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeriesCatalog;
