import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useModelViewer } from "@/hooks/useModelViewer";
import ModelViewer from "@/components/ModelViewer";
import SpecTable from "@/components/SpecTable";
import FeatureCard from "@/components/FeatureCard";
import DetailedSpecCard from "@/components/DetailedSpecCard";
import { ids353024p6xData } from "@/data/ids3530-24p-6x";

const ModelIDS3530_24P_6XComponent = () => {
  const navigate = useNavigate();
  const { modelViewerRef, indicatorsOn, modelLoaded, toggleIndicators } =
    useModelViewer();

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Model */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            onClick={() => navigate("/products/switches/ids3530")}
            className="bg-transparent hover:bg-white/10 border-0 text-white hover:text-white p-2"
          >
            <Icon name="ChevronLeft" className="h-5 w-5" />
          </Button>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center h-full text-center">
            {/* Заголовок на две строки */}
            <h1 className="text-white mb-6 leading-tight">
              <span className="block text-6xl md:text-8xl font-bold">
                IDS3530
              </span>
              <span className="block text-2xl md:text-3xl font-normal mt-2">
                — надёжные L2+/L3-коммутаторы
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              для промышленной инфраструктуры
            </p>

            {/* Сабтайтл */}
            <div className="text-center mb-8">
              <p className="text-base md:text-lg text-white/90 mb-6">
                «До 760 Вт PoE+, модульные блоки питания, uplink 10G — всё в
                одной платформе»
              </p>
            </div>

            {/* Иконки преимуществ */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Zap" className="h-5 w-5" />
                <span className="text-sm">PoE</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Network" className="h-5 w-5" />
                <span className="text-sm">10G uplink</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Snowflake" className="h-5 w-5" />
                <span className="text-sm">охлаждение</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Shield" className="h-5 w-5" />
                <span className="text-sm">L3</span>
              </div>
            </div>

            {/* Кнопки-фильтры */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm px-6 py-3"
              >
                Только с PoE
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm px-6 py-3"
              >
                Только с SFP
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Ключевые характеристики
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ids353024p6xData.features.map((feature, index) => {
              const gradientStyles = [
                { background: "linear-gradient(to right, #003A85, #0063C2)" }, // синий
                {
                  background:
                    "linear-gradient(to right, #0093B9, #00AEB4, #00B9A8)",
                }, // зеленый
                { background: "linear-gradient(to right, #553C9A, #B794F4)" }, // фиолетовый
                { background: "linear-gradient(to right, #FF6B35, #F7931E)" }, // оранжевый
                { background: "linear-gradient(to right, #DC2626, #EF4444)" }, // красный
                { background: "linear-gradient(to right, #4338CA, #6366F1)" }, // индиго
              ];
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={gradientStyles[index % gradientStyles.length]}
                    >
                      <Icon
                        name={feature.icon}
                        className="h-6 w-6 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Technical Specifications */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Полные технические характеристики
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ids353024p6xData.specGroups.map((specGroup, index) => (
              <DetailedSpecCard key={index} specGroup={specGroup} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-[34px] font-semibold text-gray-900 mb-6 font-sans w-[90%] md:w-[70%] mx-auto">
            Хотите получить КП по IDS3530-24P-6X?
          </h2>
          <p className="text-sm md:text-[16px] text-gray-600 mb-8 font-sans w-[90%] md:w-[70%] mx-auto">
            Оставьте заявку — мы подготовим коммерческое предложение и расчёт
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/partners")}
              className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
            >
              Получить КП
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-medium transition-all duration-300 px-8 py-3"
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelIDS3530_24P_6XComponent;
