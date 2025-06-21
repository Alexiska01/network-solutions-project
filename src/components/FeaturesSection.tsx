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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-sans">
            Почему выбирают iDATA
          </h2>
          <p className="text-xl text-gray-600 font-sans">
            Преимущества, которые получают наши клиенты
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-icon rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icon
                  name={feature.icon as any}
                  size={36}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-sans leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
