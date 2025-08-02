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
  useEffect(() => {
    // Отмечаем посещение главной страницы для быстрого возврата
    modelCacheManager.markHomeVisit();
    
    if (location.hash === "#products") {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <WelcomeScreen />
      <div className="min-h-screen">
        <Header />
        <ProductHero />
        <ProductsSection />
        
        {/* Простой статичный переходный блок */}
        <div className="relative -mt-8 md:-mt-16 -mb-8 md:-mb-16 z-10 h-16 md:h-32">
          {/* Основной статичный градиентный переход */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
          
          {/* Дополнительный слой для глубины */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-white/30 to-gray-50/15"></div>
        </div>
        
        <FeaturesSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;