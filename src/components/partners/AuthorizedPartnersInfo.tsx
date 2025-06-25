import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AuthorizedPartnersInfo = () => {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-montserrat mb-4 md:mb-6">
            Авторизованные партнёры
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0065B3] to-[#004A87] mx-auto mb-6 md:mb-8 rounded-full"></div>
          <p className="text-sm md:text-lg text-gray-600 font-montserrat leading-relaxed mb-6 md:mb-8 text-left md:text-center ml-[26px] md:ml-0">
            Мы сотрудничаем с надёжными и проверенными компаниями, которые
            прошли официальную авторизацию и обладают экспертизой в наших
            продуктах и решениях.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-10">
            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-[#0065B3] rounded-full flex items-center justify-center mb-2 md:mb-4">
                <Icon name="Shield" className="text-white" size={16} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 font-montserrat">
                Гарантированное качество сервиса
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-[#0065B3] rounded-full flex items-center justify-center mb-2 md:mb-4">
                <Icon name="Award" className="text-white" size={16} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 font-montserrat">
                Доступ к актуальной информации и сертифицированным решениям
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-4 md:p-6 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-[#0065B3] rounded-full flex items-center justify-center mb-2 md:mb-4">
                <Icon name="Users" className="text-white" size={16} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 font-montserrat">
                Поддержка от специалистов, обученных нашим технологиям
              </h3>
            </div>
          </div>

          <Button
            size="default"
            className="bg-[#0065B3] hover:bg-[#004A87] text-white px-4 py-2 md:px-8 md:py-3 text-sm md:text-lg font-montserrat w-full md:w-auto"
          >
            Стать партнером
            <Icon name="ArrowRight" className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthorizedPartnersInfo;
