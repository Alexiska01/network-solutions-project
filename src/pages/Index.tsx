import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ProductHero from "@/components/ProductHero";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import WelcomeScreen from "@/components/WelcomeScreen";
import { ModelCache } from "@/utils/modelCache";


const Index = () => {
  const location = useLocation();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [isCheckingCache, setIsCheckingCache] = useState(true);

  useEffect(() => {
    if (location.hash === "#products") {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Проверяем кэш при загрузке страницы
  useEffect(() => {
    const checkCache = async () => {
      try {
        console.log('🔍 Index: Проверяем кэш моделей');
        const isCacheValid = await ModelCache.isCacheValid();
        
        if (!isCacheValid) {
          console.log('❌ Index: Кэш недействителен, показываем WelcomeScreen');
          setShowWelcomeScreen(true);
        } else {
          console.log('✅ Index: Кэш действителен, пропускаем WelcomeScreen');
          setShowWelcomeScreen(false);
        }
      } catch (error) {
        console.error('❌ Index: Ошибка проверки кэша:', error);
        // При ошибке показываем WelcomeScreen для безопасности
        setShowWelcomeScreen(true);
      } finally {
        setIsCheckingCache(false);
      }
    };

    checkCache();
  }, []);

  // Обработчик завершения WelcomeScreen
  const handleWelcomeComplete = async () => {
    console.log('✅ Index: WelcomeScreen завершён');
    setShowWelcomeScreen(false);
  };

  // Показываем загрузку во время проверки кэша
  if (isCheckingCache) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // Показываем WelcomeScreen если кэш недействителен
  if (showWelcomeScreen) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  // Показываем основной контент если кэш действителен
  return (
    <div className="min-h-screen">
      <Header />
      <ProductHero />
      <ProductsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;