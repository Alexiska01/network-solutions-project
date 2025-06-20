import React from "react";
import Icon from "@/components/ui/icon";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Профессиональные решения для сетевой инфраструктуры
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              iDATA — ведущий производитель коммутаторов, маршрутизаторов и
              беспроводного оборудования для корпоративных сетей любой
              сложности.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Посмотреть продукты
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Наши преимущества
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Технологические решения для построения надежной сетевой
              инфраструктуры
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Wifi" size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Высокая производительность
              </h3>
              <p className="text-gray-600">
                Оборудование с поддержкой высокоскоростной передачи данных для
                максимальной эффективности сети
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Надежная защита
              </h3>
              <p className="text-gray-600">
                Встроенные системы безопасности и защиты от киберугроз для
                корпоративных сетей
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Settings" size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Простое управление
              </h3>
              <p className="text-gray-600">
                Интуитивный интерфейс управления и централизованный мониторинг
                всей сетевой инфраструктуры
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Готовы модернизировать свою сеть?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нашими специалистами для консультации и подбора
            оптимального решения
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Получить консультацию
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
