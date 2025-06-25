import React from "react";

const SwitchesHero = () => {
  return (
    <section className="bg-gradient-hero text-white py-10 md:py-15 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className="text-[28px] md:text-[32px] lg:text-[40px] font-bold leading-tight font-montserrat mb-4"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
          >
            Коммутаторы iDATA
          </h1>
          <p
            className="text-[14px] md:text-[16px] lg:text-[18px] font-montserrat font-normal text-white/90"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
          >
            Полная линейка решений для любого уровня сети
          </p>
        </div>
      </div>
    </section>
  );
};

export default SwitchesHero;
