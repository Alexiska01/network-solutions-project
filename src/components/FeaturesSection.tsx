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
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 font-sans leading-tight"
            style={{ lineHeight: "1.2" }}
          >
            Почему выбирают iDATA
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-4"></div>
          <p
            className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans leading-relaxed"
            style={{ lineHeight: "1.4" }}
          >
            Преимущества, которые получают наши клиенты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
              style={{ minHeight: "280px" }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Icon
                  name={feature.icon as any}
                  size={32}
                  className="text-white"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 font-sans">
                  {feature.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 font-sans leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
