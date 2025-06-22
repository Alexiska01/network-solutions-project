import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ModelIDS3530_24P_6XComponent = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                IDS3530-24P-6X
              </h1>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
                24×1G Base-T + 6×10G SFP+, PoE+ 380 Вт — оптимальная
                производительность для среднего бизнеса
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
                <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-hero hover:text-white transition-all duration-300 font-sans min-h-[44px]">
                  Скачать характеристики
                </button>
                <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-white hover:text-[#0065B3] transition-all duration-300 font-sans min-h-[44px]">
                  Запросить цену
                </button>
              </div>
            </div>
            <div className="relative mt-6 md:mt-8 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon
                      name="Box"
                      size={48}
                      className="mx-auto mb-4 text-blue-200"
                    />
                    <p className="text-sm text-blue-200">
                      3D-модель коммутатора
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Ключевые возможности
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                PoE+ 380 Вт
              </h3>
              <p className="text-gray-600 font-sans">
                Надежное питание IP-камер, точек доступа и других устройств
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Network" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                6×10G SFP+
              </h3>
              <p className="text-gray-600 font-sans">
                Высокоскоростные аплинки для подключения к серверам и магистрали
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                L2+/L3 функции
              </h3>
              <p className="text-gray-600 font-sans">
                Продвинутая маршрутизация и функции безопасности
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Технические характеристики
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans">
                Порты и интерфейсы
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Порты 1G Base-T:
                  </span>
                  <span className="font-medium font-sans">24 (PoE+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Порты 10G SFP+:
                  </span>
                  <span className="font-medium font-sans">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Консольный порт:
                  </span>
                  <span className="font-medium font-sans">RJ45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Управление:</span>
                  <span className="font-medium font-sans">OOBM</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans">
                Питание и PoE
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Общая мощность PoE+:
                  </span>
                  <span className="font-medium font-sans">380 Вт</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Мощность на порт:
                  </span>
                  <span className="font-medium font-sans">До 30 Вт</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Потребление:</span>
                  <span className="font-medium font-sans">45 Вт (без PoE)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Питание:</span>
                  <span className="font-medium font-sans">AC 100-240V</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans">
                Производительность
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Пропускная способность:
                  </span>
                  <span className="font-medium font-sans">168 Гбит/с</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Скорость пересылки:
                  </span>
                  <span className="font-medium font-sans">125 Мпакет/с</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">MAC-таблица:</span>
                  <span className="font-medium font-sans">32K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">
                    Буфер пакетов:
                  </span>
                  <span className="font-medium font-sans">12 Мб</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans">
                Физические параметры
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Размеры:</span>
                  <span className="font-medium font-sans">440×330×44 мм</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Вес:</span>
                  <span className="font-medium font-sans">4.5 кг</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Монтаж:</span>
                  <span className="font-medium font-sans">19" стойка, 1U</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-sans">Охлаждение:</span>
                  <span className="font-medium font-sans">Активное</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Применение
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Building" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                Офисные сети
              </h3>
              <p className="text-gray-600 font-sans">
                Идеален для корпоративных офисов среднего размера с высокими
                требованиями к PoE
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Camera" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                Системы видеонаблюдения
              </h3>
              <p className="text-gray-600 font-sans">
                Поддержка IP-камер высокого разрешения с достаточной мощностью
                PoE+
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Wifi" size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                Wi-Fi инфраструктура
              </h3>
              <p className="text-gray-600 font-sans">
                Питание современных точек доступа Wi-Fi 6 с высоким
                энергопотреблением
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-6 font-sans w-[90%] md:w-[70%] mx-auto">
            Готовы внедрить IDS3530-24P-6X?
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-8 font-sans w-[90%] md:w-[70%] mx-auto">
            Получите персональное предложение и техническую консультацию от
            наших инженеров
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
            >
              <Icon name="Download" className="mr-2" />
              Скачать спецификацию
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-medium transition-all duration-300 px-8 py-3"
            >
              <Icon name="MessageCircle" className="mr-2" />
              Связаться с инженером
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelIDS3530_24P_6XComponent;
