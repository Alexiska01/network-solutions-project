import React from "react";

const SwitchesHero = () => {
  return (
    <section className="bg-gradient-hero text-white py-10 md:py-15 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight font-montserrat"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
          >
            Коммутаторы iDATA
          </h1>
          <p
            className="text-base md:text-lg lg:text-xl text-white font-montserrat leading-relaxed"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
          >
            Полная линейка решений для любого уровня сети
          </p>
        </div>
      </div>
    </section>
  );
};

export default SwitchesHero;
