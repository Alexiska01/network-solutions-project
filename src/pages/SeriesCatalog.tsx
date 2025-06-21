import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeriesCatalogComponent from "@/components/SeriesCatalog";

const SeriesCatalog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SeriesCatalogComponent />
      <Footer />
    </div>
  );
};

export default SeriesCatalog;
