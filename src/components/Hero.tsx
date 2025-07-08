import { useEffect, useState } from "react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const fullText =
    "iDATA — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="wave-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,50 Q25,20 50,50 T100,50"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.15"
              />
            </pattern>
          </defs>

          {/* Flowing wave lines */}
          <path
            d="M0,200 Q300,100 600,200 T1200,200"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M0,300 Q400,150 800,300 T1200,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M0,400 Q200,250 400,400 T800,400 Q1000,350 1200,400"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.1"
          />
          <path
            d="M0,500 Q350,350 700,500 T1200,500"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.18"
          />
          <path
            d="M0,600 Q150,450 300,600 T600,600 Q750,550 900,600 T1200,600"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.12"
          />

          {/* Diagonal intersecting lines */}
          <path
            d="M0,0 Q400,200 800,100 T1200,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.1"
          />
          <path
            d="M0,800 Q300,600 600,700 T1200,500"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.08"
          />

          {/* Subtle network connections */}
          <path
            d="M100,150 L350,320 M350,320 L600,250 M600,250 L850,380 M850,380 L1100,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.08"
          />
          <path
            d="M200,450 L450,280 M450,280 L700,420 M700,420 L950,250"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.06"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed transition-all duration-300 hover:scale-105 hover:drop-shadow-md cursor-default min-h-[3em]">
              {typingText}
              {typingText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
              <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 font-sans min-h-[44px] hover:scale-105 hover:shadow-lg">
                Техническая поддержка
              </button>
              <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                Консультация
              </button>
            </div>
          </div>
          <div className="relative mt-6 md:mt-8 lg:mt-0 h-80 md:h-96 lg:h-[420px]">
            {!isMobile ? (
              <div className="relative w-full h-full">
                {/* Метки-пинты */}
                <div className="absolute top-2 left-24 z-20">
                  <div className="bg-yellow-100 text-black px-2 py-1 rounded-lg text-xs shadow-sm mb-1 flex items-center gap-1">
                    <span>📍</span>
                    <span>Location</span>
                  </div>
                  <div className="border-l-2 border-dashed border-yellow-300 h-6 ml-3"></div>
                </div>

                <div className="absolute top-2 right-80 z-20">
                  <div className="bg-yellow-100 text-black px-2 py-1 rounded-lg text-xs shadow-sm mb-1 flex items-center gap-1">
                    <span>🔌</span>
                    <span>Interfaces</span>
                  </div>
                  <div className="border-l-2 border-dashed border-yellow-300 h-6 ml-3"></div>
                </div>

                {/* Основная карточка IDS-108F Switch */}
                <div className="absolute top-10 left-8 bg-white rounded-xl p-4 shadow-lg w-60 z-10">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    IDS-108F Switch
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">iDATA</p>
                  <div className="flex justify-center">
                    <img
                      src="/img/8ec5ec20-46da-4cd7-b25c-085a6bbd020c.jpg"
                      alt="IDS-108F Switch"
                      className="w-28 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Чат-виджет Поддержка iDATA */}
                <div className="absolute top-2 right-2 bg-white rounded-xl shadow-lg w-64 z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-t-xl flex items-center gap-2">
                    <span>👤</span>
                    <span className="font-medium text-sm">Поддержка iDATA</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <button className="w-full bg-blue-500 text-white py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                      Вам нужна помощь?
                    </button>
                    <div className="bg-gray-100 p-2 rounded-lg text-xs">
                      <p className="text-gray-700">
                        Здравствуйте! Готовы ответить на ваши вопросы.
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs"
                        placeholder="Введите сообщение..."
                      />
                      <button className="bg-blue-500 text-white px-2 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-xs">
                        ➤
                      </button>
                    </div>
                  </div>
                </div>

                {/* Три мини-карточки внизу */}
                <div className="absolute bottom-2 left-8 flex gap-2">
                  {/* Deal funnel */}
                  <div className="bg-white rounded-xl p-3 shadow-lg w-28 h-28">
                    <div className="h-16 flex flex-col justify-center space-y-1">
                      <div className="bg-blue-200 h-3 w-full rounded"></div>
                      <div className="bg-red-300 h-3 w-3/4 rounded"></div>
                      <div className="bg-blue-200 h-3 w-full rounded"></div>
                      <div className="bg-red-300 h-3 w-1/2 rounded"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Deal funnel
                    </p>
                  </div>

                  {/* Leads by source */}
                  <div className="bg-white rounded-xl p-3 shadow-lg w-28 h-28">
                    <div className="h-14 flex items-center justify-center">
                      <div className="relative w-10 h-10">
                        <svg
                          className="w-10 h-10 transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeDasharray="60, 40"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="3"
                            strokeDasharray="40, 60"
                            strokeDashoffset="60"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center">
                      Leads by source
                    </p>
                  </div>

                  {/* Tickets closed */}
                  <div className="bg-white rounded-xl p-3 shadow-lg w-28 h-28">
                    <div className="h-14 flex items-end justify-center space-x-1">
                      <div className="bg-red-400 w-3 h-6 rounded-t"></div>
                      <div className="bg-red-400 w-3 h-10 rounded-t"></div>
                      <div className="bg-red-400 w-3 h-4 rounded-t"></div>
                      <div className="bg-red-400 w-3 h-8 rounded-t"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center">
                      Tickets closed
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm">Сетевые технологии</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
