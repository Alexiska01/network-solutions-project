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
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-6 font-sans">
            Почему выбирают iDATA
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans">
            Преимущества, которые получают наши клиенты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex md:flex-col items-center md:text-center bg-white rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-hero rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 mr-3 md:mr-0 md:mx-auto mb-0 md:mb-3 lg:mb-6">
                <Icon
                  name={feature.icon as any}
                  size={20}
                  className="text-white md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-9 xl:h-9"
                />
              </div>
              <div className="flex-1 md:flex-none">
                <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-1 md:mb-2 lg:mb-4 font-sans">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 font-sans leading-relaxed">
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
