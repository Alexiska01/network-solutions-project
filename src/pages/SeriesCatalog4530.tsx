import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeriesCatalog4530Component from "@/components/SeriesCatalog4530";

const SeriesCatalog4530 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <SeriesCatalog4530Component />
      </main>
      <Footer />
    </div>
  );
};

export default SeriesCatalog4530;
