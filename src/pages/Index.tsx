import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Test3D from "@/components/Test3D";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
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
      <Hero />
      
      {/* Тест 3D */}
      <div className="py-8 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl text-white mb-4">Тест 3D:</h2>
          <Test3D />
        </div>
      </div>
      
      <ProductsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;