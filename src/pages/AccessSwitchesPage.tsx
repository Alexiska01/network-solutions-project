import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { switchesData } from "@/data/switchesData";
import "./AccessSwitchesPage.css";

const AccessSwitchesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const accessSwitches = switchesData.filter((s) => s.category === "access");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h1 className="hero-main-title mb-6 sm:mb-8">
              Управляемые коммутаторы доступа — надёжность и масштабируемость вашей ЛВС
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mb-8 sm:mb-10">
              Гарантированная производительность, поддержка PoE и высокая отказоустойчивость — всё, что нужно вашей IT-инфраструктуре.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-buttons">
              <button 
                className="hero-btn-primary"
                onClick={() => {
                  const element = document.querySelector('#products');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Подробнее
              </button>
              <button className="hero-btn-secondary">
                Скачать PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {accessSwitches.map((switchData, index) => (
              <div
                key={switchData.id}
                className="product-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-card-inner">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={switchData.image}
                      alt={switchData.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full">
                        <Icon name="Wifi" className="h-4 w-4" />
                        <span>Доступ</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {switchData.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {switchData.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="spec-item">
                        <Icon name="Plug" className="h-4 w-4 text-blue-600 mb-1" />
                        <div className="text-sm text-gray-500">Порты</div>
                        <div className="font-semibold text-gray-900">{switchData.specs.ports}</div>
                      </div>
                      
                      <div className="spec-item">
                        <Icon name="Zap" className="h-4 w-4 text-blue-600 mb-1" />
                        <div className="text-sm text-gray-500">Питание</div>
                        <div className="font-semibold text-gray-900">{switchData.specs.power}</div>
                      </div>
                      
                      <div className="spec-item">
                        <Icon name="Activity" className="h-4 w-4 text-blue-600 mb-1" />
                        <div className="text-sm text-gray-500">Пропускная способность</div>
                        <div className="font-semibold text-gray-900">{switchData.specs.throughput}</div>
                      </div>
                      
                      <div className="spec-item">
                        <Icon name="Settings" className="h-4 w-4 text-blue-600 mb-1" />
                        <div className="text-sm text-gray-500">Функции</div>
                        <div className="font-semibold text-gray-900">{switchData.specs.features.length} шт</div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {switchData.specs.features.slice(0, 4).map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Button */}
                    <Button
                      className="w-full group/btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                      onClick={() => navigate(switchData.link)}
                    >
                      <span>Подробнее</span>
                      <Icon name="ArrowRight" className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AccessSwitchesPage;