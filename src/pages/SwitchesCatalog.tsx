import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Settings, Headphones, ArrowRight } from "lucide-react";
import SwitchesSearch from "@/components/SwitchesSearch";
import SwitchCard from "@/components/SwitchCard";
import { switchesData, categoryLabels } from "@/data/switchesData";
import Icon from "@/components/ui/icon";
import * as THREE from "three";

const SwitchesCatalog = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typingText, setTypingText] = useState("");
  const isMobile = useIsMobile();
  const fullText =
    "Полная линейка коммутаторов для корпоративных сетей и центров обработки данных. От устройств доступа до магистральных решений.";

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

  const filteredSwitches = useMemo(() => {
    let filtered = switchesData;

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (switch_) =>
          switch_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          switch_.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [searchTerm]);

  const handleScrollToCard = (cardId: string) => {
    const element = document.getElementById(cardId);
    if (element) {
      // Убираем активный класс у всех карточек
      document.querySelectorAll(".switch-card-base.active").forEach((el) => {
        el.classList.remove("active");
      });

      // Скроллим к элементу
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Очищаем хеш из URL
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );

      // Добавляем класс активного состояния
      element.classList.add("active");

      // Снимаем класс через 2 секунды
      setTimeout(() => {
        element.classList.remove("active");
      }, 2000);
    }
  };

  const groupedSwitches = useMemo(() => {
    const corporate = filteredSwitches.filter((s) =>
      ["access", "distribution"].includes(s.category),
    );
    const dataCenter = filteredSwitches.filter((s) =>
      ["spine", "leaf"].includes(s.category),
    );

    return {
      corporateAccess: corporate.filter((s) => s.category === "access"),
      corporateDistribution: corporate.filter(
        (s) => s.category === "distribution",
      ),
      dataCenterSpine: dataCenter.filter((s) => s.category === "spine"),
      dataCenterLeaf: dataCenter.filter((s) => s.category === "leaf"),
    };
  }, [filteredSwitches]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto py-4 px-[35px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Продукты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Коммутаторы</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
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
                Коммутаторы для любых задач
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Левое меню навигации - только на десктопе */}
          {!isMobile && (
            <div className="w-96 flex-shrink-0">
              <CatalogNavigation onNavigate={handleScrollToCard} />
            </div>
          )}

          {/* Основной контент */}
          <div className="flex-1">
            {/* Поиск */}
            <SwitchesSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Коммутаторы для корпоративных ЛВС */}
            <section id="corporate-lan" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Коммутаторы для корпоративных ЛВС
              </h2>

              {/* Уровень доступа */}
              {groupedSwitches.corporateAccess.length > 0 && (
                <div id="access-level" className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#2E5BFF] rounded-full mr-3"></div>
                    Коммутаторы уровня доступа
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.corporateAccess.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}

              {/* Уровень распределения */}
              {groupedSwitches.corporateDistribution.length > 0 && (
                <div id="distribution-level">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full mr-3"></div>
                    Коммутаторы уровня распределения
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.corporateDistribution.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Коммутаторы для ЦОД */}
            <section id="data-center" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Центры обработки данных
              </h2>

              {/* Spine */}
              {groupedSwitches.dataCenterSpine.length > 0 && (
                <div id="spine-level" className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#10B981] rounded-full mr-3"></div>
                    Spine
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.dataCenterSpine.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}

              {/* Leaf */}
              {groupedSwitches.dataCenterLeaf.length > 0 && (
                <div id="leaf-level">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#8B5CF6] rounded-full mr-3"></div>
                    Leaf
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.dataCenterLeaf.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* CTA блок внизу */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Нужна помощь с подбором?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Наши специалисты помогут выбрать оптимальное решение для вашей
                инфраструктуры
              </p>
              <Button
                size="lg"
                className="bg-[#2E5BFF] hover:bg-[#1E4FFF]"
                asChild
              >
                <Link to="/partners">
                  Связаться с нами
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SwitchesCatalog;
