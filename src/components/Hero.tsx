import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const features = [
    {
      icon: "Network",
      title: "Коммутаторы",
      subtitle: "L2/L3 решения",
    },
    {
      icon: "Router",
      title: "Маршрутизаторы",
      subtitle: "Корпоративные",
    },
    {
      icon: "Wifi",
      title: "Wi-Fi",
      subtitle: "Беспроводные AP",
    },
    {
      icon: "Shield",
      title: "Безопасность",
      subtitle: "Защита сети",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              iDATA — ведущий производитель коммутаторов, маршрутизаторов и
              беспроводного оборудования для корпоративных сетей любой
              сложности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Посмотреть продукты
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-700"
              >
                Связаться с нами
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  <Icon name={feature.icon} size={40} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-blue-100">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
