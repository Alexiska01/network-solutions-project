import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ProductHero from "@/components/home/ProductHero";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AwardsSection from "@/components/home/AwardsSection";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen">
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