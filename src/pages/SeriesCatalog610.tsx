import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeriesCatalog610Component from "@/components/SeriesCatalog610";

const SeriesCatalog610 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SeriesCatalog610Component />
      <Footer />
    </div>
  );
};

export default SeriesCatalog610;
