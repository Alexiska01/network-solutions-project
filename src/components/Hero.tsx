import { useEffect, useState, useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";
import { Particles } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
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

                {/* Simplified Network Schema */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="320"
                    height="240"
                    viewBox="0 0 320 240"
                    className="max-w-full max-h-full opacity-80"
                  >
                    {/* Connection Lines */}
                    <g
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.5"
                      fill="none"
                    >
                      <line x1="160" y1="120" x2="80" y2="60" />
                      <line x1="160" y1="120" x2="240" y2="60" />
                      <line x1="160" y1="120" x2="80" y2="180" />
                      <line x1="160" y1="120" x2="240" y2="180" />
                    </g>

                    {/* Animated Data Pulses */}
                    <g>
                      <circle r="2" fill="#60A5FA" opacity="0.8">
                        <animateMotion dur="3s" repeatCount="indefinite">
                          <mpath href="#path1" />
                        </animateMotion>
                      </circle>

                      <circle r="2" fill="#93C5FD" opacity="0.6">
                        <animateMotion
                          dur="3.5s"
                          repeatCount="indefinite"
                          begin="1s"
                        >
                          <mpath href="#path2" />
                        </animateMotion>
                      </circle>
                    </g>

                    {/* Hidden paths for animation */}
                    <defs>
                      <path id="path1" d="M160,120 L80,60" />
                      <path id="path2" d="M160,120 L240,60" />
                    </defs>

                    {/* Network Devices */}
                    <g>
                      {/* Central Switch */}
                      <rect
                        x="140"
                        y="100"
                        width="40"
                        height="40"
                        rx="6"
                        fill="rgba(255,255,255,0.1)"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="145"
                        y="110"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(96,165,250,0.6)"
                      />
                      <rect
                        x="145"
                        y="118"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(96,165,250,0.4)"
                      />
                      <rect
                        x="145"
                        y="126"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(96,165,250,0.3)"
                      />

                      {/* Servers */}
                      <rect
                        x="60"
                        y="40"
                        width="40"
                        height="40"
                        rx="6"
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <rect
                        x="70"
                        y="52"
                        width="20"
                        height="16"
                        rx="2"
                        fill="rgba(34,197,94,0.3)"
                      />

                      {/* Workstations */}
                      <rect
                        x="220"
                        y="40"
                        width="40"
                        height="40"
                        rx="6"
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <rect
                        x="230"
                        y="52"
                        width="20"
                        height="12"
                        rx="2"
                        fill="rgba(147,197,253,0.3)"
                      />
                      <rect
                        x="230"
                        y="68"
                        width="20"
                        height="2"
                        rx="1"
                        fill="rgba(147,197,253,0.4)"
                      />

                      {/* Wi-Fi */}
                      <circle
                        cx="80"
                        cy="180"
                        r="20"
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="80"
                        cy="180"
                        r="6"
                        fill="rgba(168,85,247,0.3)"
                      />
                      <circle
                        cx="80"
                        cy="180"
                        r="10"
                        fill="none"
                        stroke="rgba(168,85,247,0.2)"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="r"
                          values="6;14;6"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0.1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Cloud/Storage */}
                      <rect
                        x="220"
                        y="160"
                        width="40"
                        height="40"
                        rx="6"
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <path
                        d="M230,175 Q235,170 240,175 Q245,170 250,175 Q245,180 240,175 Q235,180 230,175"
                        fill="rgba(59,130,246,0.3)"
                      />
                    </g>

                    {/* Status Indicators */}
                    <g>
                      <circle cx="90" cy="50" r="2" fill="#10B981">
                        <animate
                          attributeName="opacity"
                          values="1;0.4;1"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="250" cy="50" r="2" fill="#10B981">
                        <animate
                          attributeName="opacity"
                          values="1;0.4;1"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="170" cy="110" r="2" fill="#3B82F6">
                        <animate
                          attributeName="opacity"
                          values="1;0.4;1"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  </svg>
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
