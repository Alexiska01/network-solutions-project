import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    <section className="py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-idata-text font-montserrat mb-4 lg:mb-6">
            Преимущества партнёров
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-sans leading-relaxed">
            Станьте частью экосистемы iDATA и получите доступ к эксклюзивным
            возможностям
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {benefits.map((benefit, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const { observeElement, isVisible } = useScrollReveal({
              threshold: 0.1,
              staggerDelay: 150,
            });

            useEffect(() => {
              observeElement(cardRef.current, index);
            }, []);

            return (
              <div
                key={index}
                ref={cardRef}
                className={`group bg-white rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-gray-100 hover:border-idata-teal/30 ${
                  isVisible(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-16 h-16 bg-gradient-brand rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={benefit.icon} className="text-white" size={28} />
                </div>

                <h3 className="font-montserrat font-bold text-lg text-idata-primary mb-3 group-hover:text-idata-teal transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="font-sans text-gray-600 leading-relaxed text-sm lg:text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-brand hover:bg-gradient-brand-dark text-white px-8 lg:px-10 py-4 lg:py-5 text-lg font-bold font-montserrat rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
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
