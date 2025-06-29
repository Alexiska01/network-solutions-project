import React, { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();

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

    // Network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number[];
    }> = [];

    const nodeCount = 12;
    const maxDistance = 150;
    let mouseX = 0;
    let mouseY = 0;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2,
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

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          node.x -= dx * 0.001;
          node.y -= dy * 0.001;
        }
      });

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
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
        layer1Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
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
        id="network-web"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight transition-all duration-300">
          Профессиональные решения для сетевой инфраструктуры
        </h1>
        <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed transition-all duration-300">
          iDATA — ведущий производитель коммутаторов, маршрутизаторов и
          беспроводного оборудования для корпоративных сетей любой сложности.
        </p>
      </div>
    </section>
  );
};

export default Hero;
