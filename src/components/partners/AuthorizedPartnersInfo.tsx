import React from "react";
import Icon from "@/components/ui/icon";

const AuthorizedPartnersInfo = () => {
  const benefits = [
    {
      icon: "Shield",
      title: "Техническая поддержка",
      description:
        "Профессиональная поддержка от сертифицированных специалистов",
    },
    {
      icon: "Settings",
      title: "Гарантийное и постгарантийное обслуживание, сервисный центр",
      description:
        "Полный цикл технического обслуживания и ремонта оборудования",
    },
    {
      icon: "Award",
      title: "Сертифицированные решения",
      description: "Только проверенные и сертифицированные продукты",
    },
    {
      icon: "Users",
      title: "Обучение персонала",
      description: "Комплексное обучение работе с оборудованием",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-montserrat mb-4">
            Преимущества работы с авторизованными партнёрами
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-montserrat max-w-3xl mx-auto">
            Наши партнёры предоставляют полный спектр услуг для обеспечения
            максимальной эффективности вашей IT-инфраструктуры
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="bg-[#0065B3] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Icon name={benefit.icon as any} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 font-montserrat mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorizedPartnersInfo;
