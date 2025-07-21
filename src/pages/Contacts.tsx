import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contacts = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Контакты</h1>
            <p className="text-gray-600 mb-12">
              Свяжитесь с нами для получения консультации по оборудованию iDATA
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;