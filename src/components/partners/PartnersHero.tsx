import React from "react";

const PartnersHero = () => {
  return (
    <section className="bg-gradient-to-br from-[#0065B3] via-[#004A87] to-[#003366] text-white py-8 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[31px] md:text-4xl lg:text-5xl font-semibold md:font-bold mb-6 font-montserrat leading-tight">
            Наши партнёры
          </h1>
          <p className="text-sm md:text-xl text-blue-100 font-montserrat font-normal leading-relaxed max-w-3xl mx-auto">
            Полная экосистема сетевого оборудования и проверенных интеграторов
            для вашего бизнеса
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
