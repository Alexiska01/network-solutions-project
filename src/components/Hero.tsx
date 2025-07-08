import { useEffect, useState, useCallback, useRef } from "react";
import { loadSlim } from "@tsparticles/slim";
import { Particles } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const modelViewerRef = useRef<any>(null);
  const fullText =
    "iDATA — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // particles loaded
    },
    [],
  );

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
          <div className="relative mt-6 md:mt-8 lg:mt-0 h-64 md:h-80 lg:h-96">
            {!isMobile ? (
              <div className="relative w-full h-full">
                <Particles
                  id="tsparticles"
                  init={particlesInit}
                  loaded={particlesLoaded}
                  options={{
                    background: {
                      color: {
                        value: "transparent",
                      },
                    },
                    fpsLimit: 120,
                    interactivity: {
                      events: {
                        onClick: {
                          enable: false,
                        },
                        onHover: {
                          enable: true,
                          mode: "repulse",
                        },
                        resize: true,
                      },
                      modes: {
                        repulse: {
                          distance: 50,
                          duration: 0.4,
                        },
                      },
                    },
                    particles: {
                      color: {
                        value: "#ffffff",
                      },
                      links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                        triangles: {
                          enable: false,
                        },
                      },
                      move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                          default: "bounce",
                        },
                        random: false,
                        speed: 0.8,
                        straight: false,
                        trail: {
                          enable: true,
                          length: 10,
                          fill: {
                            color: {
                              value: "#ffffff",
                            },
                          },
                        },
                      },
                      number: {
                        density: {
                          enable: true,
                          area: 800,
                        },
                        value: 25,
                      },
                      opacity: {
                        value: 0.3,
                        animation: {
                          enable: true,
                          speed: 1,
                          minimumValue: 0.1,
                          sync: false,
                        },
                      },
                      shape: {
                        type: "circle",
                      },
                      size: {
                        value: { min: 1, max: 3 },
                        animation: {
                          enable: true,
                          speed: 2,
                          minimumValue: 0.5,
                          sync: false,
                        },
                      },
                    },
                    detectRetina: true,
                  }}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Mini Dashboard */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Background Decorative Elements */}
                  <div className="absolute top-8 right-12 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                  <div
                    className="absolute bottom-16 left-8 w-16 h-16 bg-purple-400/10 rounded-full blur-lg animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div
                    className="absolute top-1/3 right-4 w-12 h-12 bg-green-400/10 rounded-full blur-md animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Main Dashboard Container */}
                  <div className="relative h-full flex items-center justify-center p-8">
                    <div className="grid grid-cols-1 gap-6 max-w-xs w-full">
                      {/* Uptime Counter */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/30 group">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                          99.99<span className="text-2xl md:text-3xl">%</span>
                        </div>
                        <div className="text-white/70 text-sm md:text-base font-medium">
                          Uptime
                        </div>
                        <div className="text-white/50 text-xs mt-1">
                          Надёжность системы
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-3 animate-pulse"></div>
                      </div>
                      
                      {/* Clients Counter */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/30 group">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          500<span className="text-2xl md:text-3xl">+</span>
                        </div>
                        <div className="text-white/70 text-sm md:text-base font-medium">
                          Клиентов
                        </div>
                        <div className="text-white/50 text-xs mt-1">
                          Успешных проектов
                        </div>
                        <div className="flex justify-center space-x-1 mt-3">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                      
                      {/* Support Counter */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/30 group">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                          24<span className="text-2xl md:text-3xl">/7</span>
                        </div>
                        <div className="text-white/70 text-sm md:text-base font-medium">
                          Поддержка
                        </div>
                        <div className="text-white/50 text-xs mt-1">
                          Круглосуточная помощь
                        </div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full mx-auto mt-3 animate-pulse"></div>
                      </div>
                      
                    </div>
                  </div>
                  
                  {/* Floating Indicator */}
                  <div className="absolute top-6 right-6">
                    <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
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
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 text-sm font-medium">
                          Пропускная способность
                        </span>
                        <div className="text-blue-400 text-xs">сейчас</div>
                      </div>
                      <div className="flex items-end space-x-1 mb-2">
                        <div
                          className="w-2 bg-blue-400/60 rounded-t"
                          style={{ height: "16px" }}
                        ></div>
                        <div
                          className="w-2 bg-blue-400/70 rounded-t"
                          style={{ height: "24px" }}
                        ></div>
                        <div
                          className="w-2 bg-blue-400/80 rounded-t"
                          style={{ height: "20px" }}
                        ></div>
                        <div
                          className="w-2 bg-blue-400 rounded-t"
                          style={{ height: "32px" }}
                        ></div>
                        <div
                          className="w-2 bg-blue-400/90 rounded-t"
                          style={{ height: "28px" }}
                        ></div>
                        <div
                          className="w-2 bg-blue-400/70 rounded-t"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                      <div className="text-white text-lg font-bold">
                        847 Mbps
                      </div>
                    </div>

                    {/* Devices Connected */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-white/15 border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 text-sm font-medium">
                          Подключенные устройства
                        </span>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-white text-lg font-bold">24</div>
                          <div className="text-white/60 text-xs">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white text-lg font-bold">
                            156
                          </div>
                          <div className="text-white/60 text-xs">Total</div>
                        </div>
                      </div>
                    </div>

                    {/* Alert Notification */}
                    <div className="bg-orange-500/20 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-orange-500/25 border border-orange-400/30 animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            !
                          </span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">
                            Обновление ПО
                          </div>
                          <div className="text-white/70 text-xs">
                            Доступна новая версия
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-white/15 border border-white/20">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-white text-sm font-bold">
                            2.1ms
                          </div>
                          <div className="text-white/60 text-xs">Latency</div>
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold">0%</div>
                          <div className="text-white/60 text-xs">
                            Packet Loss
                          </div>
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold">
                            42°C
                          </div>
                          <div className="text-white/60 text-xs">
                            Temperature
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6">
                    <div className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 border border-white/30">
                      <div className="w-6 h-6 text-white text-center text-sm font-bold">
                        ⚡
                      </div>
                    </div>
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