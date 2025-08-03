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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/90 to-purple-600/95" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            <div className="hero-badge mb-8">
              <Icon name="Wifi" className="h-5 w-5 text-blue-400" />
              <span className="text-blue-100 font-medium">Сетевое оборудование</span>
            </div>
            
            <h1 className="hero-title mb-6">
              Коммутаторы уровня доступа
            </h1>
            
            <p className="hero-description mb-12 max-w-3xl mx-auto">
              Надежные и производительные коммутаторы для подключения конечных устройств. 
              Поддержка PoE+, расширенные L2/L3 функции, энергоэффективность и простота управления 
              для корпоративных сетей любого масштаба.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="hero-button-primary group"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Смотреть каталог</span>
                <Icon name="ChevronDown" className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="hero-button-secondary group"
                onClick={() => navigate('/contacts')}
              >
                <Icon name="MessageCircle" className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Получить консультацию</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full hero-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-16 w-16 h-16 bg-white/10 rounded-full hero-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full hero-float" style={{ animationDelay: '4s' }} />
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Наше оборудование
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите коммутатор, который идеально подойдет для вашей сетевой инфраструктуры
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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