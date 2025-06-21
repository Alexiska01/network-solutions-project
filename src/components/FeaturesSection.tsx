import React from "react";
import Icon from "@/components/ui/icon";

const FeaturesSection = () => {
  const features = [
    {
      title: "Надежность 99.9%",
      description:
        "Промышленный стандарт надежности для критически важных приложений",
      icon: "Shield",
    },
    {
      title: "Техническая поддержка 24/7",
      description: "Круглосуточная поддержка от сертифицированных инженеров",
      icon: "Headphones",
    },
    {
      title: "Простота управления",
      description:
        "Интуитивный веб-интерфейс и централизованное управление через облако",
      icon: "Settings",
    },
    {
      title: "Масштабируемость",
      description:
        "Легкое расширение сети от малого офиса до enterprise-уровня",
      icon: "TrendingUp",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Почему выбирают iDATA
          </h2>
          <p className="text-lg text-gray-600">
            Преимущества, которые получают наши клиенты
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name={feature.icon as any}
                  size={32}
                  className="text-brand-primary"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
