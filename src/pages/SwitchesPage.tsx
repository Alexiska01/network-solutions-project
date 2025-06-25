import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwitchesHero from "@/components/SwitchesHero";
import SwitchesTabBar from "@/components/SwitchesTabBar";
import SwitchesSidebar from "@/components/SwitchesSidebar";
import SeriesGrid from "@/components/SeriesGrid";
import { useIsMobile } from "@/hooks/use-mobile";

export type FilterType = "all" | "corporate" | "datacenter" | "certified";

const SwitchesPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Header />
      <SwitchesHero />
      <SwitchesTabBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="flex">
        {!isMobile && <SwitchesSidebar activeFilter={activeFilter} />}
        <div className="flex-1">
          {isMobile && <SwitchesSidebar activeFilter={activeFilter} />}
          <SeriesGrid activeFilter={activeFilter} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SwitchesPage;
