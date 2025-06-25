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
      icon: "CheckCircle",
      title: "Корпоративные стандарты",
      description:
        "Соответствие корпоративным стандартам и требованиям безопасности",
    },
    {
      icon: "Award",
      title: "Надёжное обслуживание",
      description: "Гарантийное и постгарантийное обслуживание",
    },
    {
      icon: "Settings",
      title: "Полный цикл решений",
      description: "Комплексный подход — от проектирования до внедрения",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-900/10 via-blue-600/10 to-teal-500/10">
        <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 font-montserrat mb-3 md:mb-4">
              Преимущества партнёров
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Станьте частью экосистемы iDATA и получите доступ к эксклюзивным
              возможностям
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
            {benefits.slice(0, 4).map((benefit, index) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const { observeElement, isVisible } = useScrollReveal({
                staggerDelay: 150,
              });

              useEffect(() => {
                observeElement(cardRef.current, index);
              }, [observeElement, index]);

              return (
                <div
                  key={index}
                  ref={cardRef}
                  className={`group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 hover:border-[#00BEAD]/20 ${
                    isVisible(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={benefit.icon}
                      className="text-white group-hover:animate-[bounce_0.6s_ease]"
                      size={18}
                    />
                  </div>

                  <h3 className="font-montserrat font-semibold text-sm md:text-base text-[#0A1F44] mt-3 md:mt-4 mb-1 md:mb-2 group-hover:text-[#0A1F44] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="font-montserrat font-normal text-xs md:text-sm text-[#333] mt-1 md:mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Последняя карточка на всю ширину для мобильной версии */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
            {benefits.slice(4).map((benefit, index) => {
              const actualIndex = index + 4;
              const cardRef = useRef<HTMLDivElement>(null);
              const { observeElement, isVisible } = useScrollReveal({
                staggerDelay: 150,
              });

              useEffect(() => {
                observeElement(cardRef.current, actualIndex);
              }, [observeElement, actualIndex]);

              return (
                <div
                  key={actualIndex}
                  ref={cardRef}
                  className={`group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 hover:border-[#00BEAD]/20 col-span-full sm:col-span-2 lg:col-span-3 xl:col-span-5 ${
                    isVisible(actualIndex)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={benefit.icon}
                      className="text-white group-hover:animate-[bounce_0.6s_ease]"
                      size={18}
                    />
                  </div>

                  <h3 className="font-montserrat font-semibold text-sm md:text-base text-[#0A1F44] mt-3 md:mt-4 mb-1 md:mb-2 group-hover:text-[#0A1F44] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="font-montserrat font-normal text-xs md:text-sm text-[#333] mt-1 md:mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold font-montserrat rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Стать партнером
              <Icon name="ArrowRight" className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthorizedPartnersInfo;
