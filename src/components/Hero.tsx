import React from "react";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[70vh] px-8"
      style={{
        background: "linear-gradient(90deg, #0033A0 0%, #00B4B4 100%)",
      }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern
              id="circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#circles)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight opacity-0 animate-fadeUp [animation-delay:0.2s]">
          Профессиональные решения для сетевой инфраструктуры
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed opacity-0 animate-fadeUp [animation-delay:0.4s]">
          iDATA — ведущий производитель коммутаторов, маршрутизаторов и
          беспроводного оборудования для корпоративных сетей любой сложности.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;
