import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useState } from "react";
import Index from "./pages/Index";
import ProductHero from "./components/home/ProductHero";
import WelcomeScreen from "./components/WelcomeScreen";

// Model-viewer загружается в index.html через CDN

// Lazy loading для второстепенных страниц
const SeriesCatalog3730 = lazy(() => import("./pages/SeriesCatalog3730"));
const SeriesCatalog3530 = lazy(() => import("./pages/3530/SeriesCatalog3530"));
const SeriesCatalog4530 = lazy(() => import("./pages/SeriesCatalog4530"));
const SeriesCatalog6010 = lazy(() => import("./pages/SeriesCatalog6010"));
const SwitchesCatalog = lazy(() => import("./pages/SwitchesCatalog"));
const ModelIDS3530_24P_6X = lazy(() => import("./pages/3530/ModelIDS3530_24P_6X"));
const ModelIDS3530_48P_6X = lazy(() => import("./pages/3530/ModelIDS3530_48P_6X"));
const ModelIDS3530_48T_6X = lazy(() => import("./pages/3530/ModelIDS3530_48T_6X"));
const ModelIDS3530_24T_6X = lazy(() => import("./pages/3530/ModelIDS3530_24T_6X"));
const ModelIDS3530_24S_8T_6X = lazy(() => import("./pages/3530/ModelIDS3530_24S_8T_6X"));
const ModelIDS4530_48P_6X = lazy(() => import("./pages/4530/ModelIDS4530_48P_6X"));
const ModelIDS4530_48T_6X = lazy(() => import("./pages/4530/ModelIDS4530_48T_6X"));
const ModelIDS4530_24P_6X = lazy(() => import("./pages/4530/ModelIDS4530_24P_6X"));
const ModelIDS4530_24T_6X = lazy(() => import("./pages/4530/ModelIDS4530_24T_6X"));
const ModelIDS4530_24S_4X = lazy(() => import("./pages/4530/ModelIDS4530_24S_4X"));
const ModelIDS4530_48S_4X = lazy(() => import("./pages/4530/ModelIDS4530_48S_4X"));
const ModelIDS3730_24T_6X = lazy(() => import("./pages/ModelIDS3730_24T_6X"));
const ModelIDS3730_24P_6X = lazy(() => import("./pages/ModelIDS3730_24P_6X"));
const Partners = lazy(() => import("./pages/Partners"));
// const ProductHero = lazy(() => import("./pages/ProductHero")); // Заменён на прямой импорт
const NotFound = lazy(() => import("./pages/NotFound"));
const ContactsPage = lazy(() => import("./pages/Contacts"));
const AccessSwitchesPage = lazy(() => import("./components/dostup/AccessSwitchesPage"));
const WarrantyPage = lazy(() => import("./components/warranty/WarrantyPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут
      refetchOnWindowFocus: false,
    },
  },
});

// СУПЕР АГРЕССИВНАЯ ПРЕДЗАГРУЗКА для максимальной скорости

// Критические изображения (загружаем первыми)
const CRITICAL_IMAGES: string[] = [
  // Локальные логотипы партнеров
  "/img/сател.png",
  "/img/логотип.png",
  "/img/КРОК.png",
  "/img/Инфосэл.png",
  "/img/инлайн.png",
];

// Схемы и диаграммы (загружаем вторыми)
const SECONDARY_IMAGES = [
  "/img/Иерархия_3530.png",
  "/img/Иерархия_3730.png", 
  "/img/Иерархия_4530(1).png",
  "/img/Иерархия_4530(2).png",
  "/img/Иерархия_4530.png",
];

// 3D модели: только первая — реальный preload; остальные мягко prefetch
const FIRST_MODEL = "/models/3530all.glb";
const OTHER_PRIMARY_MODELS = [
  "/models/3730all.glb",
  "/models/4530all.glb",
];
// Второстепенные/варианты — только on-demand (prefetch позже)
const BACKGROUND_MODELS = [
  "/models/6010all.glb",
  "/models/IDS3530-24P.glb",
  "/models/IDS3530-24T.glb",
  "/models/IDS3530-24S.glb",
];

// Ключевые страницы для предзагрузки
const PRELOAD_ROUTES = [
  '/products/switches/ids3530',
  '/products/switches/ids3730', 
  '/products/switches/ids4530',
  '/partners',
  '/contacts'
];

// Компонент для сброса скролла (исключает нежелательный авто-восстановление)
const ScrollRestorationController = () => {
  const location = useLocation();
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // На каждой навигации (особенно на /) жёстко ставим в начало
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);
  return null;
};

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  // Отслеживание закрытия/открытия сайта
  useEffect(() => {
    const STORAGE_KEY = 'lastVisitTime';
    const ONE_HOUR = 60 * 60 * 1000; // 1 час в миллисекундах
    
    // При загрузке страницы проверяем последнее время посещения
    const lastVisit = localStorage.getItem(STORAGE_KEY);
    const currentTime = Date.now();
    
    if (!lastVisit) {
      // Первое посещение - показываем WelcomeScreen
      setShowWelcome(true);
    } else {
      const timeDifference = currentTime - parseInt(lastVisit);
      if (timeDifference >= ONE_HOUR) {
        setShowWelcome(true);
      }
    }
    
    // Сохраняем время при закрытии страницы
    const handleBeforeUnload = () => {
      localStorage.setItem(STORAGE_KEY, currentTime.toString());
    };
    
    // Сохраняем время при скрытии страницы (переключение вкладок)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // СУПЕР АГРЕССИВНАЯ ПРЕДЗАГРУЗКА для максимальной производительности
  useEffect(() => {
    // Этап 1: КРИТИЧЕСКИЕ ресурсы загружаем НЕМЕДЛЕННО
    const preloadCritical = () => {
      // Критические изображения с максимальным приоритетом
      CRITICAL_IMAGES.forEach((imageUrl) => {
        const img = new Image();
        img.loading = 'eager';
        img.fetchPriority = 'high';
        img.src = imageUrl;
        
        // DNS prefetch отключен из-за CORS проблем CDN
      });
      
      // Первая модель — реальный preload (если не продублирован index.html)
      const preloadExists = !!document.querySelector(`link[rel="preload"][href="${FIRST_MODEL}"]`);
      if (!preloadExists) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = FIRST_MODEL;
        link.as = 'fetch';
        link.type = 'model/gltf-binary';
        link.crossOrigin = 'anonymous';
        link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);
      }

      // Остальные модели — только prefetch (низкий приоритет), чтобы избежать warning
      OTHER_PRIMARY_MODELS.forEach((modelUrl) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = modelUrl;
        link.as = 'fetch';
        link.type = 'model/gltf-binary';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
      
      console.log('⚡ Критические ресурсы загружаются...');
    };

    // Этап 2: ВТОРОСТЕПЕННЫЕ ресурсы через 500мс
    const preloadSecondary = () => {
      setTimeout(() => {
        // Второстепенные изображения
        SECONDARY_IMAGES.forEach((imageUrl) => {
          const img = new Image();
          img.loading = 'lazy';
          img.src = imageUrl;
        });
        
        // Ключевые страницы для мгновенного перехода
        PRELOAD_ROUTES.forEach((route) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
        
        console.log('🔄 Второстепенные ресурсы загружаются...');
      }, 500);
    };

    // Этап 3: ФОНОВЫЕ модели через 2 секунды (когда пользователь уже взаимодействует)
    const preloadBackground = () => {
      setTimeout(() => {
        BACKGROUND_MODELS.forEach((modelUrl, index) => {
          // Загружаем с задержкой чтобы не блокировать основной поток
          setTimeout(() => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = modelUrl;
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
          }, index * 200); // Интервал между моделями
        });
        
        console.log('🎯 Фоновые модели загружаются...');
      }, 2000);
    };

    // Этап 4: Preconnect отключен из-за CORS проблем CDN
    const setupPreconnect = () => {
      // CDN временно недоступен
    };

    // Команда для тестирования WelcomeScreen (только для разработки)
    (window as any).testWelcomeAfterHour = () => {
      console.log('🕐 Тестирование: эмуляция возврата через час');
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      localStorage.setItem('lastVisitTime', oneHourAgo.toString());
      window.location.reload();
    };

    // ЗАПУСКАЕМ ВСЕ ЭТАПЫ ПРЕДЗАГРУЗКИ
    setupPreconnect();
    preloadCritical();
    preloadSecondary();
    preloadBackground();
    
    console.log('🚀 СУПЕР АГРЕССИВНАЯ предзагрузка запущена!');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showWelcome && (
          <WelcomeScreen
            forceShow={true}
            onComplete={() => {
              setShowWelcome(false);
              // Обновляем время последнего посещения при завершении Welcome
              localStorage.setItem('lastVisitTime', Date.now().toString());
            }}
          />
        )}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }
          >
      <ScrollRestorationController />
            <Routes>
              {/* Prefetch критических компонентов */}
              <Route path="/prefetch-critical" element={null} />
              <Route path="/" element={<Index />} />

              <Route path="/partners" element={<Partners />} />
              <Route
                path="/products/switches/ids3730"
                element={<SeriesCatalog3730 />}
              />
              <Route
                path="/products/switches/ids3530"
                element={<SeriesCatalog3530 />}
              />
              <Route
                path="/products/switches/ids4530"
                element={<SeriesCatalog4530 />}
              />
              <Route
                path="/products/switches/ids6010"
                element={<SeriesCatalog6010 />}
              />
              <Route
                path="/products/switches/ids3530/24p-6x"
                element={<ModelIDS3530_24P_6X />}
              />
              <Route
                path="/products/switches/ids3530/48p-6x"
                element={<ModelIDS3530_48P_6X />}
              />
              <Route
                path="/products/switches/ids3530/48t-6x"
                element={<ModelIDS3530_48T_6X />}
              />
              <Route
                path="/products/switches/ids3530/24t-6x"
                element={<ModelIDS3530_24T_6X />}
              />
              <Route
                path="/products/switches/ids3530/24s-8t-6x"
                element={<ModelIDS3530_24S_8T_6X />}
              />
              <Route
                path="/products/switches/ids4530/48p-6x"
                element={<ModelIDS4530_48P_6X />}
              />
              <Route
                path="/products/switches/ids4530/48t-6x"
                element={<ModelIDS4530_48T_6X />}
              />
              <Route
                path="/products/switches/ids4530/24p-6x"
                element={<ModelIDS4530_24P_6X />}
              />
              <Route
                path="/products/switches/ids4530/24t-6x"
                element={<ModelIDS4530_24T_6X />}
              />
              <Route
                path="/products/switches/ids4530/24s-4x"
                element={<ModelIDS4530_24S_4X />}
              />
              <Route
                path="/products/switches/ids4530/48s-4x"
                element={<ModelIDS4530_48S_4X />}
              />
              <Route
                path="/products/switches/ids3730/24t-6x"
                element={<ModelIDS3730_24T_6X />}
              />
              <Route
                path="/products/switches/ids3730/24p-6x"
                element={<ModelIDS3730_24P_6X />}
              />
              <Route path="/product-hero" element={<ProductHero />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/products/switches/access" element={<AccessSwitchesPage />} />
              <Route path="/warranty" element={<WarrantyPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/switches" element={<SwitchesCatalog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;