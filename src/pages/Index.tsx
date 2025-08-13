import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ProductHero from "@/components/home/ProductHero";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/Footer";
import WelcomeScreen from "@/components/WelcomeScreen";
import { modelCacheManager } from "@/utils/modelCacheManager";


const Index = () => {
  const location = useLocation();
  const [showMainContent, setShowMainContent] = useState(false);

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

  // Показываем контент сразу если WelcomeScreen не нужен
  useEffect(() => {
    const shouldShowWelcome = modelCacheManager.shouldShowWelcomeScreen();
    if (!shouldShowWelcome) {
      setShowMainContent(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    console.log('🏠 Index: WelcomeScreen завершен, показываем основной контент');
    setShowMainContent(true);
  };

  return (
    <>
      <WelcomeScreen onComplete={handleWelcomeComplete} />
      {showMainContent && (
        <div className="min-h-screen">
          <Header />
          <ProductHero />
          <ProductsSection />
          <FeaturesSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;