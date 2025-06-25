
import React from "react";

const PartnersHero = () => {
  return (
    <section className="bg-gradient-to-br from-[#0065B3] via-[#004A87] to-[#003366] text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-montserrat leading-tight">
            Наши партнёры
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-montserrat font-normal leading-relaxed max-w-3xl mx-auto">
            Полная экосистема сетевого оборудования и проверенных интеграторов для вашего бизнеса
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-montserrat">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-blue-100">🌍 Глобальное покрытие</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-blue-100">🤝 Сертифицированные партнёры</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-blue-100">⚡ Быстрая поддержка</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
