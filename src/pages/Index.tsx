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
    <div className="min-h-screen bg-white">
      <div className="p-4 bg-blue-100 text-blue-800">
        🧪 ТЕСТ БЕЗ WELCOMESCREEN - showMainContent = {String(showMainContent)}
      </div>
      <Header />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold">🚀 Главная страница IDATA</h1>
        <p className="text-lg mt-4">Корпоративная сеть нового поколения</p>
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <p>✅ Index.tsx рендерится корректно</p>
          <p>✅ Header загружается</p>
          <p>✅ Основной контент отображается</p>
        </div>
      </div>
    </div>
  );
};

export default Index;