import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwitchesHero from "@/components/SwitchesHero";
import SwitchesTabBar from "@/components/SwitchesTabBar";
import SwitchesSidebar from "@/components/SwitchesSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const SwitchesPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Header />
      <SwitchesHero />
      <SwitchesTabBar />

      <div className="flex">
        <SwitchesSidebar />
        <main className={`flex-1 ${isMobile ? "w-full" : "ml-0"}`}>
          <div className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Каталог коммутаторов
              </h2>
              <p className="text-gray-600">
                Выберите раздел в меню слева для просмотра продукции
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SwitchesPage;
