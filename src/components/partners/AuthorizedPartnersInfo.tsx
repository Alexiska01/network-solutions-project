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
    <>
      <style jsx>{`
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12 justify-items-center">
            {benefits.map((benefit, index) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const { observeElement, isVisible } = useScrollReveal({
                staggerDelay: 150,
              });

              useEffect(() => {
                observeElement(cardRef.current, index);
              }, []);

              return (
                <div
                  key={index}
                  ref={cardRef}
                  className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 hover:border-[#00BEAD]/20 ${
                    isVisible(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0A1F44] to-[#00BEAD] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={benefit.icon}
                      className="text-white group-hover:animate-[bounce_0.6s_ease]"
                      size={24}
                    />
                  </div>

                  <h3 className="font-montserrat font-semibold text-base text-[#0A1F44] mt-4 mb-2 group-hover:text-[#0A1F44] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="font-montserrat font-normal text-sm text-[#333] mt-2 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
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
    </>
  );
};

export default AuthorizedPartnersInfo;
