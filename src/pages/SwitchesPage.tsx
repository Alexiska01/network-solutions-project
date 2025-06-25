import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwitchesHero from "@/components/SwitchesHero";
import SwitchesTabBar from "@/components/SwitchesTabBar";
import SwitchesCatalog from "@/components/SwitchesCatalog";
import Icon from "@/components/ui/icon";

const SwitchesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <SwitchesHero />
      <SwitchesTabBar />
      <SwitchesCatalog />
      <Footer />
    </div>
  );
};

export default SwitchesPage;
