import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ProductHero from "@/components/home/ProductHero";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AwardsSection from "@/components/home/AwardsSection";
import Footer from "@/components/Footer";
import { modelCacheManager } from "@/utils/modelCacheManager";
import WelcomeScreen from "@/components/welcome/WelcomeScreen";


const Index = () => {
  const location = useLocation();
  const initialShow = useMemo(() => {
    try {
      return modelCacheManager.shouldShowWelcomeScreen();
    } catch {
      return false;
    }
  }, []);
  const [showWelcome, setShowWelcome] = useState<boolean>(initialShow);

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

  // Блокируем скролл, пока показан WelcomeScreen
  useEffect(() => {
    if (showWelcome) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showWelcome]);

  return (
    <div className="min-h-screen">
      {showWelcome && (
        <WelcomeScreen
          onComplete={() => {
            modelCacheManager.markWelcomeScreenComplete();
            setShowWelcome(false);
          }}
        />
      )}
      <Header />
      <ProductHero />
      <ProductsSection />
      <FeaturesSection />
  <AwardsSection />
      <Footer />
    </div>
  );
};

export default Index;