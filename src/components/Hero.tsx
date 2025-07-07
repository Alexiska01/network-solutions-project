import React, { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const fullText =
    "iDATA — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

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

  // Flying cubes animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas sizing
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Network nodes - специально для коммутаторов
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: "switch" | "endpoint";
      connections: number[];
    }> = [];

    const nodeCount = 15;
    const maxDistance = 120;
    let mouseX = 0;
    let mouseY = 0;

    // Initialize nodes - создаем топологию коммутаторов
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: i < 5 ? 4 + Math.random() * 2 : 2 + Math.random() * 1.5, // коммутаторы крупнее
        type: i < 5 ? "switch" : "endpoint",
        connections: [],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction - коммутаторы притягиваются к курсору
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = node.type === "switch" ? 0.002 : 0.001;
          node.x += dx * force;
          node.y += dy * force;
        }
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            // Коммутаторы имеют более яркие связи
            const isSwitch =
              nodes[i].type === "switch" || nodes[j].type === "switch";
            const alpha = isSwitch ? opacity * 0.25 : opacity * 0.1;

            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = isSwitch ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        if (node.type === "switch") {
          // Коммутаторы - квадратные с обводкой
          ctx.fillStyle = "rgba(46, 91, 255, 0.9)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.fillRect(
            node.x - node.radius,
            node.y - node.radius,
            node.radius * 2,
            node.radius * 2,
          );
          ctx.strokeRect(
            node.x - node.radius,
            node.y - node.radius,
            node.radius * 2,
            node.radius * 2,
          );
        } else {
          // Конечные устройства - круглые
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Canvas network animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

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
                Посмотреть продукты
              </button>
              <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                Связаться с нами
              </button>
            </div>
          </div>
          <div className="relative mt-6 md:mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Network"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Коммутаторы
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    L2/L3 решения
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Router"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Маршрутизаторы
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Корпоративные
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Wifi"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Wi-Fi
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Беспроводные AP
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Shield"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Безопасность
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Защита сети
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
