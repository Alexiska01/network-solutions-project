import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeriesCatalog3730Component from "@/components/SeriesCatalog3730";

const SeriesCatalog3730 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SeriesCatalog3730Component />
      <Footer />
    </div>
  );
};

export default SeriesCatalog3730;
