import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeriesCatalog3530Component from "@/components/3530/SeriesCatalog3530";

const SeriesCatalog3530 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SeriesCatalog3530Component />
      <Footer />
    </div>
  );
};

export default SeriesCatalog3530;
