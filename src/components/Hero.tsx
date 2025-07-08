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

                {/* Network Infrastructure Schema */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="400"
                    height="300"
                    viewBox="0 0 400 300"
                    className="max-w-full max-h-full"
                  >
                    {/* Connection Lines */}
                    <g
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                      fill="none"
                    >
                      {/* Main switch connections */}
                      <line x1="200" y1="150" x2="80" y2="80" />
                      <line x1="200" y1="150" x2="320" y2="80" />
                      <line x1="200" y1="150" x2="80" y2="220" />
                      <line x1="200" y1="150" x2="320" y2="220" />
                      <line x1="200" y1="150" x2="200" y2="50" />
                      <line x1="200" y1="150" x2="200" y2="250" />
                      <line x1="200" y1="150" x2="120" y2="150" />
                      <line x1="200" y1="150" x2="280" y2="150" />
                    </g>

                    {/* Animated Data Pulses */}
                    <g>
                      {/* Pulse 1 */}
                      <circle r="3" fill="#60A5FA" opacity="0.8">
                        <animateMotion dur="2s" repeatCount="indefinite">
                          <mpath href="#path1" />
                        </animateMotion>
                      </circle>

                      {/* Pulse 2 */}
                      <circle r="2" fill="#93C5FD" opacity="0.6">
                        <animateMotion
                          dur="2.5s"
                          repeatCount="indefinite"
                          begin="0.5s"
                        >
                          <mpath href="#path2" />
                        </animateMotion>
                      </circle>

                      {/* Pulse 3 */}
                      <circle r="2.5" fill="#DBEAFE" opacity="0.7">
                        <animateMotion
                          dur="3s"
                          repeatCount="indefinite"
                          begin="1s"
                        >
                          <mpath href="#path3" />
                        </animateMotion>
                      </circle>

                      {/* Pulse 4 */}
                      <circle r="2" fill="#60A5FA" opacity="0.5">
                        <animateMotion
                          dur="2.2s"
                          repeatCount="indefinite"
                          begin="1.5s"
                        >
                          <mpath href="#path4" />
                        </animateMotion>
                      </circle>
                    </g>

                    {/* Hidden paths for animation */}
                    <defs>
                      <path id="path1" d="M200,150 L80,80" />
                      <path id="path2" d="M200,150 L320,80" />
                      <path id="path3" d="M200,150 L80,220" />
                      <path id="path4" d="M200,150 L320,220" />
                    </defs>

                    {/* Network Devices */}
                    <g>
                      {/* Central Switch */}
                      <rect
                        x="180"
                        y="130"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.2)"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="2"
                      />
                      <rect
                        x="185"
                        y="135"
                        width="30"
                        height="6"
                        rx="1"
                        fill="rgba(96,165,250,0.8)"
                      />
                      <rect
                        x="185"
                        y="145"
                        width="30"
                        height="6"
                        rx="1"
                        fill="rgba(96,165,250,0.6)"
                      />
                      <rect
                        x="185"
                        y="155"
                        width="30"
                        height="6"
                        rx="1"
                        fill="rgba(96,165,250,0.4)"
                      />

                      {/* Servers */}
                      <rect
                        x="60"
                        y="60"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="65"
                        y="68"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(34,197,94,0.6)"
                      />
                      <rect
                        x="65"
                        y="76"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(34,197,94,0.4)"
                      />
                      <rect
                        x="65"
                        y="84"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(34,197,94,0.3)"
                      />

                      {/* Workstations */}
                      <rect
                        x="300"
                        y="60"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="305"
                        y="68"
                        width="30"
                        height="20"
                        rx="2"
                        fill="rgba(147,197,253,0.4)"
                      />
                      <rect
                        x="305"
                        y="92"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(147,197,253,0.6)"
                      />

                      {/* Wi-Fi Access Points */}
                      <circle
                        cx="80"
                        cy="220"
                        r="20"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="80"
                        cy="220"
                        r="8"
                        fill="rgba(168,85,247,0.4)"
                      />
                      <circle
                        cx="80"
                        cy="220"
                        r="12"
                        fill="none"
                        stroke="rgba(168,85,247,0.3)"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="r"
                          values="8;16;8"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.4;0.1;0.4"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Network Storage */}
                      <rect
                        x="300"
                        y="200"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="305"
                        y="208"
                        width="30"
                        height="6"
                        rx="1"
                        fill="rgba(251,191,36,0.6)"
                      />
                      <rect
                        x="305"
                        y="218"
                        width="30"
                        height="6"
                        rx="1"
                        fill="rgba(251,191,36,0.4)"
                      />
                      <rect
                        x="305"
                        y="228"
                        width="30"
                        height="6"
                        rx="1"
                        fill="rgba(251,191,36,0.3)"
                      />

                      {/* Internet Gateway */}
                      <rect
                        x="180"
                        y="30"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="200"
                        cy="50"
                        r="8"
                        fill="rgba(59,130,246,0.6)"
                      />
                      <path
                        d="M192,42 Q200,38 208,42 Q200,46 192,42"
                        fill="rgba(59,130,246,0.4)"
                      />

                      {/* Printer */}
                      <rect
                        x="180"
                        y="230"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="185"
                        y="240"
                        width="30"
                        height="15"
                        rx="2"
                        fill="rgba(156,163,175,0.4)"
                      />
                      <rect
                        x="190"
                        y="245"
                        width="20"
                        height="5"
                        rx="1"
                        fill="rgba(156,163,175,0.6)"
                      />

                      {/* Laptops */}
                      <rect
                        x="100"
                        y="130"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="105"
                        y="140"
                        width="30"
                        height="18"
                        rx="2"
                        fill="rgba(147,197,253,0.3)"
                      />
                      <rect
                        x="105"
                        y="162"
                        width="30"
                        height="4"
                        rx="1"
                        fill="rgba(147,197,253,0.5)"
                      />

                      {/* Mobile Devices */}
                      <rect
                        x="260"
                        y="130"
                        width="40"
                        height="40"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="270"
                        y="140"
                        width="20"
                        height="28"
                        rx="3"
                        fill="rgba(147,197,253,0.4)"
                      />
                      <circle
                        cx="280"
                        cy="164"
                        r="2"
                        fill="rgba(147,197,253,0.6)"
                      />
                    </g>

                    {/* Status Indicators */}
                    <g>
                      <circle cx="90" cy="70" r="3" fill="#10B981">
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="330" cy="70" r="3" fill="#10B981">
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="210" cy="40" r="3" fill="#3B82F6">
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
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
