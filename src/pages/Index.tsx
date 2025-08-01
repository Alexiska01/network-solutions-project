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
        <div className="relative -mt-16 -mb-16 z-10 h-32 transition-all duration-700 ease-out">
          {/* Основной градиентный переход */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-transparent transition-opacity duration-700"
            style={{ opacity: transitionOpacity }}
          ></div>
          
          {/* Размытый слой для мягкости */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-gray-50/30 via-white/40 to-gray-50/20"></div>
          
          {/* Морфинг-эффект */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-gray-100/20 via-transparent to-gray-50/10 mix-blend-overlay transition-opacity duration-1000"
            style={{ opacity: transitionOpacity * 0.7 }}
          ></div>
          
          {/* Декоративные элементы для премиальности */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute top-1/2 left-1/4 w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"
              style={{ transform: `scale(${transitionOpacity})` }}
            ></div>
            <div 
              className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full animate-pulse delay-1000"
              style={{ transform: `scale(${transitionOpacity * 0.8})` }}
            ></div>
            <div 
              className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full animate-pulse delay-500"
              style={{ transform: `scale(${transitionOpacity * 1.2})` }}
            ></div>
          </div>
        </div>
        
        <FeaturesSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;