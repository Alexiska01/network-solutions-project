import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AuthorizedPartnersInfo = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-montserrat mb-6">
            Авторизованные партнёры
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-montserrat leading-relaxed mb-8">
            Мы сотрудничаем с надёжными и проверенными компаниями, которые
            прошли официальную авторизацию и обладают экспертизой в наших
            продуктах и решениях.
          </p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10">
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-[#0065B3] rounded-full flex items-center justify-center mb-4">
                <Icon name="Shield" className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 font-montserrat mb-2">
                Гарантированное качество сервиса
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-[#0065B3] rounded-full flex items-center justify-center mb-4">
                <Icon name="Award" className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 font-montserrat mb-2">
                Доступ к актуальной информации и сертифицированным решениям
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-[#0065B3] rounded-full flex items-center justify-center mb-4">
                <Icon name="Users" className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 font-montserrat mb-2">
                Поддержка от специалистов, обученных нашим технологиям
              </h3>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-[#0065B3] hover:bg-[#004A87] text-white px-8 py-3 text-lg font-montserrat"
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
