import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy loading для второстепенных страниц
const SeriesCatalog3730 = lazy(() => import("./pages/SeriesCatalog3730"));
const SeriesCatalog3530 = lazy(() => import("./pages/SeriesCatalog3530"));
const SeriesCatalog4530 = lazy(() => import("./pages/SeriesCatalog4530"));
const SeriesCatalog6010 = lazy(() => import("./pages/SeriesCatalog6010"));
const SwitchesCatalog = lazy(() => import("./pages/SwitchesCatalog"));
const ModelIDS3530_24P_6X = lazy(() => import("./pages/ModelIDS3530_24P_6X"));
const ModelIDS3530_48P_6X = lazy(() => import("./pages/ModelIDS3530_48P_6X"));
const Partners = lazy(() => import("./pages/Partners"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут
      refetchOnWindowFocus: false,
    },
  },
});

// Все изображения для предварительной загрузки
const PRELOAD_IMAGES = [
  // Логотипы партнеров
  "https://cdn.poehali.dev/files/71f08bb6-26da-4283-8bca-5f89f31db427.png", // Инфосэл
  "https://cdn.poehali.dev/files/8bc26615-50dc-4cf3-944f-5ee56b4eada8.png", // Инлайн ГРУП
  "https://cdn.poehali.dev/files/76dacccf-6833-4e57-9f96-4c08f84f93fa.png", // КРОК
  // Схемы из public/img
  "/img/Иерархия_3530.png",
  "/img/Иерархия_3730.png",
  "/img/Иерархия_4530(1).png",
  "/img/Иерархия_4530(2).png",
  "/img/Иерархия_4530.png",
];

const App = () => {
  // Предварительная загрузка всех изображений
  useEffect(() => {
    const preloadImages = () => {
      PRELOAD_IMAGES.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
      });
    };

    // Запускаем загрузку сразу после монтирования компонента
    preloadImages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <Routes>
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
                path="/models/ids3530-24p-6x"
                element={<ModelIDS3530_24P_6X />}
              />
              <Route
                path="/products/switches/ids3530/24p-6x"
                element={<ModelIDS3530_24P_6X />}
              />
              <Route
                path="/products/switches/ids3530/48p-6x"
                element={<ModelIDS3530_48P_6X />}
              />
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