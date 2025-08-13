import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
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
    console.log('🏠 Index: shouldShowWelcome =', shouldShowWelcome);
    if (!shouldShowWelcome) {
      console.log('🏠 Index: WelcomeScreen не нужен, показываем контент сразу');
      setShowMainContent(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    console.log('🏠 Index: WelcomeScreen завершен, показываем основной контент');
    setShowMainContent(true);
  };

  console.log('🎬 Index: Рендер компонента, showMainContent =', showMainContent);

  return (
    <>
      <WelcomeScreen onComplete={handleWelcomeComplete} />
      {showMainContent ? (
        <div className="min-h-screen bg-white">
          <div className="p-4 bg-green-100 text-green-800">
            ✅ ГЛАВНАЯ СТРАНИЦА ЗАГРУЖЕНА - showMainContent = {String(showMainContent)}
          </div>
          <Header />
          <div className="p-8 text-center">
            <h1 className="text-4xl font-bold">🚀 Главная страница IDATA</h1>
            <p className="text-lg mt-4">Корпоративная сеть нового поколения</p>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-red-100 text-red-800 p-4 z-[999]">
          ❌ КОНТЕНТ НЕ ПОКАЗАН - showMainContent = {String(showMainContent)}
        </div>
      )}
    </>
  );
};

export default Index;