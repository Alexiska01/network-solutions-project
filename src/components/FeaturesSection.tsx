import React from "react";
import Icon from "@/components/ui/icon";

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
