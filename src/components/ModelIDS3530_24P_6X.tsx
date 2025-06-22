import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import "@google/model-viewer";

// Добавляем типизацию для model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        "camera-controls"?: boolean;
        exposure?: string;
        "interaction-prompt"?: string;
        ref?: React.Ref<any>;
      };
    }
  }
}

const ModelIDS3530_24P_6XComponent = () => {
  const navigate = useNavigate();
  const modelViewerRef = useRef<any>(null);
  const [indicatorsOn, setIndicatorsOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    console.log("ModelIDS3530_24P_6X компонент загружен");

    const handleModelLoad = () => {
      console.log("3D модель загружена");
      setModelLoaded(true);
    };

    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.addEventListener("load", handleModelLoad);
      return () => modelViewer.removeEventListener("load", handleModelLoad);
    }
  }, []);

  const toggleIndicators = () => {
    if (modelViewerRef.current) {
      const model = modelViewerRef.current;
      const newState = !indicatorsOn;

      // Управление материалами индикаторов
      const materials = ["Material_Indicator", "Material_Indicator2"];
      materials.forEach((materialName) => {
        const material = model.model?.materials?.find(
          (m: any) => m.name === materialName,
        );
        if (material) {
          if (newState) {
            material.pbrMetallicRoughness.setEmissiveFactor([0, 1, 0]);
          } else {
            material.pbrMetallicRoughness.setEmissiveFactor([0, 0, 0]);
          }
        }
      });

      setIndicatorsOn(newState);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          onClick={() => navigate("/products/switches/ids3530")}
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name="ArrowLeft" className="mr-2" />
          Назад
        </Button>
      </div>

      {/* Hero Section with 3D Model */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
              IDS3530-24P-6X
            </h1>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
              24×1G Base-T + 6×10G SFP+, PoE+ 380 Вт — оптимальная
              производительность для среднего бизнеса
            </p>
          </div>

          {/* 3D Model and Specs Container */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* 3D Model */}
            <div className="lg:col-span-2">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-lg transition-all duration-200 z-10"
                >
                  <Icon name="Maximize" size={20} />
                </button>

                <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                  <model-viewer
                    ref={modelViewerRef}
                    src="https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24P.glb"
                    camera-controls
                    exposure="1.0"
                    interaction-prompt="none"
                    style={{ width: "100%", height: "100%" }}
                    className="w-full h-full"
                  />
                </div>

                {/* Indicators Toggle */}
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={toggleIndicators}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    <span className="text-white text-sm font-medium">
                      Индикаторы
                    </span>
                    <div
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        indicatorsOn ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                          indicatorsOn ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans">
                  Основные характеристики
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-sans text-sm">
                      Порты:
                    </span>
                    <span className="font-medium font-sans text-sm">
                      24×1000M Base-T
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-sans text-sm">
                      Слоты:
                    </span>
                    <span className="font-medium font-sans text-sm">
                      6×10G SFP+
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-sans text-sm">
                      Поддержка PoE&PoE+:
                    </span>
                    <span className="font-medium font-sans text-sm">380W</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-sans text-sm">
                      Производительность:
                    </span>
                    <span className="font-medium font-sans text-sm">
                      168 Gbps
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-sans text-sm">
                      Питание:
                    </span>
                    <span className="font-medium font-sans text-sm">
                      Fixed One AC Power Supply
                    </span>
                  </div>
                </div>
              </div>
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

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg transition-all duration-200 z-10"
            >
              <Icon name="X" size={24} />
            </button>
            <model-viewer
              src="https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24P.glb"
              camera-controls
              exposure="1.0"
              interaction-prompt="none"
              style={{ width: "100%", height: "100%" }}
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

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
