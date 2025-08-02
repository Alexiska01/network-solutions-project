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
        <FeaturesSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;