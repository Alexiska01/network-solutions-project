import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import * as THREE from "three";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typingText, setTypingText] = useState("");
  const fullText =
    "iDATA — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

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

  // Three.js WebGL background
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Particles for network effect
    const particleCount = 150;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.3 + Math.random() * 0.4);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 8;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      const positions = particleSystem.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Bounce off boundaries
        if (positions[i3] > 10 || positions[i3] < -10) velocities[i3] *= -1;
        if (positions[i3 + 1] > 5 || positions[i3 + 1] < -5)
          velocities[i3 + 1] *= -1;
        if (positions[i3 + 2] > 10 || positions[i3 + 2] < -10)
          velocities[i3 + 2] *= -1;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Mouse interaction
      camera.rotation.x += (mouseY * 0.1 - camera.rotation.x) * 0.05;
      camera.rotation.y += (mouseX * 0.1 - camera.rotation.y) * 0.05;

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Three.js WebGL Background */}
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
                Техническая поддержка
              </button>
              <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                Консультация
              </button>
            </div>
          </div>
          <div className="relative mt-6 md:mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Zap"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Доступ
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    24-48 портов
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Settings"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Распределение
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Агрегация трафика
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Shield"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Spine
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Центр данных
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="ArrowRight"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Leaf
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Серверные стойки
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
