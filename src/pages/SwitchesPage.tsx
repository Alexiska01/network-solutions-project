import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwitchesHero from "@/components/SwitchesHero";
import SwitchesTabBar from "@/components/SwitchesTabBar";
import SwitchesSidebar from "@/components/SwitchesSidebar";
import SeriesGrid from "@/components/SeriesGrid";
import { useIsMobile } from "@/hooks/use-mobile";

const SwitchesPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Header />
      <SwitchesHero />
      <SwitchesTabBar />

      <div className="flex flex-col md:flex-row">
        <SwitchesSidebar />
        <main className="flex-1">
          <SeriesGrid />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SwitchesPage;
