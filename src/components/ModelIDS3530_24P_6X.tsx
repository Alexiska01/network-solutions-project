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
            variant="outline"
            onClick={() => navigate("/products/switches/ids3530")}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Icon name="ChevronLeft" className="mr-2" />
            Назад
          </Button>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6 md:mb-8 lg:mb-12 leading-tight">
              {ids353024p6xData.title}
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
            <div className="lg:col-span-2">
              <ModelViewer
                modelRef={modelViewerRef}
                modelPath={ids353024p6xData.modelPath}
                indicatorsOn={indicatorsOn}
                modelLoaded={modelLoaded}
                onToggleIndicators={toggleIndicators}
              />
            </div>

            <div className="lg:col-span-1">
              <SpecTable
                title="Основные характеристики"
                specs={ids353024p6xData.basicSpecs}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 mt-8 justify-center">
            <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-hero hover:text-white transition-all duration-300 font-sans min-h-[44px]">
              Скачать характеристики
            </button>
            <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-white hover:text-[#0065B3] transition-all duration-300 font-sans min-h-[44px]">
              Запросить цену
            </button>
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
            {ids353024p6xData.features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
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
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-6 font-sans w-[90%] md:w-[70%] mx-auto">
            Готовы внедрить {ids353024p6xData.title}?
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
