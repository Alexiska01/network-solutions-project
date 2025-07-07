import React, { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const fullText =
    "iDATA — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
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

      // Draw connections - приоритет коммутаторам
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero relative overflow-hidden text-white flex flex-col justify-center items-center min-h-[70vh] px-8">
      {/* Background layers */}
      <div
        ref={layer1Ref}
        className="hero-bg layer1 absolute inset-0 transition-transform duration-75 ease-out"
        style={{ background: "linear-gradient(90deg, #0033A0, #00B4B4)" }}
      />
      <div
        ref={layer2Ref}
        className="hero-bg layer2 absolute inset-0 transition-transform duration-100 ease-out"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,31,68,0.5), rgba(0,180,180,0.5))",
        }}
      />

      {/* Canvas network */}
      <canvas
        ref={canvasRef}
        id="switches-network"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight transition-all duration-300">
          Профессиональные решения для сетевой инфраструктуры
        </h1>
        <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed transition-all duration-300 min-h-[3em]">
          {typingText}
          {typingText.length < fullText.length && (
            <span className="animate-pulse">|</span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="bg-white text-[#0065B3] px-6 py-3 rounded-lg text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 font-sans min-h-[44px] hover:scale-105 hover:shadow-lg">
            Посмотреть продукты
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
            Связаться с нами
          </button>
        </div>

        {/* Product icons grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-4">
            <Icon
              name="Network"
              size={32}
              className="mx-auto mb-3 text-blue-200"
            />
            <h3 className="text-sm font-semibold mb-1">Коммутаторы</h3>
            <p className="text-xs text-blue-200">L2/L3 решения</p>
          </div>
          <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-4">
            <Icon
              name="Router"
              size={32}
              className="mx-auto mb-3 text-blue-200"
            />
            <h3 className="text-sm font-semibold mb-1">Маршрутизаторы</h3>
            <p className="text-xs text-blue-200">Корпоративные</p>
          </div>
          <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-4">
            <Icon
              name="Wifi"
              size={32}
              className="mx-auto mb-3 text-blue-200"
            />
            <h3 className="text-sm font-semibold mb-1">Wi-Fi</h3>
            <p className="text-xs text-blue-200">Беспроводные AP</p>
          </div>
          <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-4">
            <Icon
              name="Shield"
              size={32}
              className="mx-auto mb-3 text-blue-200"
            />
            <h3 className="text-sm font-semibold mb-1">Безопасность</h3>
            <p className="text-xs text-blue-200">Защита сети</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
