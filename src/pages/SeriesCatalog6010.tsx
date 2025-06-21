import SeriesCatalog6010Component from "@/components/SeriesCatalog6010";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SeriesCatalog6010 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SeriesCatalog6010Component />
      </main>
      <Footer />
    </div>
  );
};

export default SeriesCatalog6010;
