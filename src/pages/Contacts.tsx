import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const Contacts = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
              Контакты
            </h1>
            <p className="text-gray-600 mb-8 text-base sm:text-lg">
              Свяжитесь с нами: техническая поддержка, коммерческие запросы, партнёрство.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-600 text-white px-6 py-3 text-sm font-medium shadow-sm hover:shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                type="button"
              >
                <span>Заполнить форму</span>
              </button>
              <a
                href="tel:+78001234567"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-700 bg-white px-6 py-3 text-sm font-medium shadow-sm hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Позвонить
              </a>
            </div>
          </div>
        </section>
  <ContactModal open={open} onClose={() => setOpen(false)} />
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;