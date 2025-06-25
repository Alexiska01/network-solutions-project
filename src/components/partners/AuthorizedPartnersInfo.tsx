import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AuthorizedPartnersInfo = () => {
  const benefits = [
    {
      icon: "Shield",
      title: "Экспертная поддержка",
      description: "Поддержка от специалистов, обученных нашим технологиям",
    },
    {
      icon: "Truck",
      title: "Логистическая эффективность",
      description: "Оперативные поставки и логистическая прозрачность",
    },
    {
      icon: "Settings",
      title: "Полный цикл решений",
      description: "Комплексный подход — от проектирования до внедрения",
    },
    {
      icon: "Award",
      title: "Надёжное обслуживание",
      description: "Гарантийное и постгарантийное обслуживание",
    },
    {
      icon: "CheckCircle",
      title: "Корпоративные стандарты",
      description:
        "Соответствие корпоративным стандартам и требованиям безопасности",
    },
  ];

  return (
    <section
      className="py-20"
      style={{
        background:
          "linear-gradient(90deg, rgba(10,31,68,0.1) 0%, rgba(0,190,173,0.1) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat mb-4">
            Преимущества партнёров
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Станьте частью экосистемы iDATA и получите доступ к эксклюзивным
            возможностям
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-[#00BEAD]/20"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#0A1F44] to-[#00BEAD] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name={benefit.icon} className="text-white" size={24} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2 group-hover:text-[#0A1F44] transition-colors">
                {benefit.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#0A1F44] to-[#00BEAD] hover:from-[#082340] hover:to-[#009A8A] text-white px-8 py-4 text-lg font-semibold font-montserrat rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Стать партнером
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthorizedPartnersInfo;
