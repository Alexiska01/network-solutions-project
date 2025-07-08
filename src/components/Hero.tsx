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

                {/* HubSpot style circular layout */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Central Circle Background */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-white/5 to-white/15 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-lg font-bold mb-1">
                        iDATA
                      </div>
                      <div className="text-white/70 text-sm">
                        Network Solutions
                      </div>
                      <div className="w-8 h-8 mx-auto mt-3 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Top Status Card */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-green-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/30 w-40 text-center hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm">
                        Система активна
                      </span>
                    </div>
                    <div className="text-white/60 text-xs">Network Monitor</div>
                  </div>

                  {/* Top Right - Donut Chart */}
                  <div className="absolute top-16 right-8 bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 border border-white/20 w-36">
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <svg
                        className="w-12 h-12 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          strokeDasharray="75, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          75%
                        </span>
                      </div>
                    </div>
                    <div className="text-white/70 text-xs mb-1">
                      Пропускная способность
                    </div>
                    <div className="text-white text-lg font-bold">847 Mbps</div>
                  </div>

                  {/* Bottom Right - Bar Chart */}
                  <div className="absolute bottom-16 right-8 bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 border border-white/20 w-36">
                    <div className="flex items-end justify-center space-x-1 mb-3 h-12">
                      <div
                        className="w-2 bg-blue-400 rounded-t"
                        style={{ height: "48px" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-400/80 rounded-t"
                        style={{ height: "36px" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-400/90 rounded-t"
                        style={{ height: "28px" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-400/70 rounded-t"
                        style={{ height: "20px" }}
                      ></div>
                    </div>
                    <div className="text-white/70 text-xs mb-1">
                      Активные порты
                    </div>
                    <div className="text-white text-lg font-bold">24/48</div>
                  </div>

                  {/* Bottom Left - Speedometer */}
                  <div className="absolute bottom-16 left-8 bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 border border-white/20 w-36">
                    <div className="relative w-12 h-6 mx-auto mb-3">
                      <svg className="w-12 h-6" viewBox="0 0 32 16">
                        <path
                          d="M 2 14 A 14 14 0 0 1 30 14"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 2 14 A 14 14 0 0 1 22 14"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="16" cy="14" r="1.5" fill="#10b981" />
                        <line
                          x1="16"
                          y1="14"
                          x2="20"
                          y2="8"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="text-white/70 text-xs mb-1">
                      PoE мощность
                    </div>
                    <div className="text-white text-lg font-bold">340W</div>
                  </div>

                  {/* Top Left - Uptime */}
                  <div className="absolute top-16 left-8 bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300 border border-white/20 w-36">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white/70">Uptime</span>
                    </div>
                    <div className="text-white text-xl font-bold">99.9%</div>
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
