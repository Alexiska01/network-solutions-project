import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ProductHero from "@/components/ProductHero";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import WelcomeScreen from "@/components/WelcomeScreen";
import { modelCacheManager } from "@/utils/modelCacheManager";


const Index = () => {
  const location = useLocation();
  const [transitionOpacity, setTransitionOpacity] = useState(0.8);

  useEffect(() => {
    // Отмечаем посещение главной страницы для быстрого возврата
    modelCacheManager.markHomeVisit();
    
    if (location.hash === "#products") {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Scroll-triggered анимация для перехода
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const transitionPoint = windowHeight * 1.5; // Переход начинается после полутора экранов
      
      const opacity = Math.min(Math.max((scrollY - transitionPoint) / 200, 0.3), 1);
      setTransitionOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <>
      <WelcomeScreen />
      <div className="min-h-screen">
        <Header />
        <ProductHero />
        <ProductsSection />
        
        {/* Профессиональный переходный блок */}
        <div className="relative -mt-8 md:-mt-16 -mb-8 md:-mb-16 z-10 h-16 md:h-32 transition-all duration-700 ease-out">
          {/* Основной градиентный переход без размытия */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 md:via-white/60 to-transparent transition-opacity duration-700"
            style={{ opacity: transitionOpacity }}
          ></div>
          
          {/* Чистый слой без backdrop-blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-white/30 to-gray-50/15"></div>
          
          {/* Морфинг-эффект */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-gray-100/15 via-transparent to-gray-50/8 mix-blend-overlay transition-opacity duration-1000"
            style={{ opacity: transitionOpacity * 0.6 }}
          ></div>
          
          {/* Корпоративные сетевые линии - только на десктопе */}
          <div className="hidden md:block absolute inset-0 opacity-20">
            {/* Горизонтальные линии как у коммутаторов */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent"></div>
            <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
            
            {/* Вертикальные соединительные элементы */}
            <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-teal-400/40 to-transparent"></div>
          </div>
          
          {/* Корпоративные акценты - только на десктопе */}
          <div className="hidden md:block absolute inset-0 opacity-12">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-300/40 rounded-sm rotate-45"></div>
          </div>
        </div>
        
        <FeaturesSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;