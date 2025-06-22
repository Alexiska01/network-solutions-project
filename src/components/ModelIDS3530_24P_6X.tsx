import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

const ModelIDS3530_24P_6XComponent = () => {
  const navigate = useNavigate();
  const modelViewerRef = useRef<any>(null);
  const [indicatorsOn, setIndicatorsOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    // Загружаем модель при монтировании компонента
    if (modelViewerRef.current) {
      modelViewerRef.current.src =
        "https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24P.glb";
    }
  }, []);

  const toggleIndicators = () => {
    if (modelViewerRef.current && modelViewerRef.current.model) {
      const threeModel = modelViewerRef.current.model;
      if (!threeModel.materials) return;

      const mat1 = threeModel.materials.find(
        (m: any) => m.name === "Material_Indicator",
      );
      const mat2 = threeModel.materials.find(
        (m: any) => m.name === "Material_Indicator2",
      );

      if (mat1) {
        mat1.pbrMetallicRoughness.setEmissiveFactor(
          indicatorsOn ? [0.27, 0.27, 0.27] : [0.2, 1.0, 0.5],
        );
      }
      if (mat2) {
        mat2.pbrMetallicRoughness.setEmissiveFactor(
          indicatorsOn ? [0.27, 0.27, 0.27] : [1.0, 0.9, 0.3],
        );
      }

      setIndicatorsOn(!indicatorsOn);
    }
  };

  const toggleRotation = () => {
    if (modelViewerRef.current) {
      if (isRotating) {
        modelViewerRef.current.removeAttribute("auto-rotate");
      } else {
        modelViewerRef.current.setAttribute("auto-rotate", "");
      }
      setIsRotating(!isRotating);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleSpecs = () => {
    setShowSpecs(!showSpecs);
  };

  const themeClasses = isDarkTheme
    ? "bg-gray-900 text-white"
    : "bg-gradient-hero text-white";

  return (
    <div
      className={`min-h-screen ${isDarkTheme ? "bg-gray-900" : "bg-gradient-hero"}`}
    >
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          onClick={() => navigate("/products/switches/ids3530")}
          className={`${isDarkTheme ? "bg-gray-800/90 text-white border-gray-600" : "bg-white/90 text-gray-900"} backdrop-blur-sm hover:bg-opacity-100`}
        >
          <Icon name="ArrowLeft" className="mr-2" />
          Назад
        </Button>
      </div>

      {/* Hero Section with 3D Model */}
      <section className={`${themeClasses} py-8 md:py-12 lg:py-16 xl:py-20`}>
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

          {/* 3D Model Container */}
          <div className="max-w-4xl mx-auto">
            <div
              className={`relative ${isDarkTheme ? "bg-gray-800/50" : "bg-white/10"} backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8`}
            >
              {/* Top Controls */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={toggleRotation}
                    className={`${isDarkTheme ? "bg-gray-700 hover:bg-gray-600" : "bg-black/20 hover:bg-black/40"} text-white p-2 rounded-lg transition-all duration-200`}
                    title="Автоповорот"
                  >
                    <Icon name={isRotating ? "Pause" : "Play"} size={20} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={toggleTheme}
                    className={`${isDarkTheme ? "bg-gray-700 hover:bg-gray-600" : "bg-black/20 hover:bg-black/40"} text-white p-2 rounded-lg transition-all duration-200`}
                    title="Переключить тему"
                  >
                    <Icon name={isDarkTheme ? "Sun" : "Moon"} size={20} />
                  </button>

                  <button
                    onClick={toggleIndicators}
                    className={`${indicatorsOn ? "bg-green-500/80 hover:bg-green-500" : isDarkTheme ? "bg-gray-700 hover:bg-gray-600" : "bg-black/20 hover:bg-black/40"} text-white p-2 rounded-lg transition-all duration-200`}
                    title="Подсветка индикаторов"
                  >
                    <Icon name="Lightbulb" size={20} />
                  </button>

                  <button
                    onClick={toggleSpecs}
                    className={`${isDarkTheme ? "bg-gray-700 hover:bg-gray-600" : "bg-black/20 hover:bg-black/40"} text-white p-2 rounded-lg transition-all duration-200`}
                    title="Показать характеристики"
                  >
                    <Icon name="Info" size={20} />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className={`${isDarkTheme ? "bg-gray-700 hover:bg-gray-600" : "bg-black/20 hover:bg-black/40"} text-white p-2 rounded-lg transition-all duration-200`}
                    title="Полноэкранный режим"
                  >
                    <Icon name="Maximize" size={20} />
                  </button>
                </div>
              </div>

              {/* 3D Model Viewer */}
              <div
                className={`aspect-video ${isDarkTheme ? "bg-gray-800/50" : "bg-white/5"} rounded-lg overflow-hidden`}
              >
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

              {/* Specifications Panel */}
              {showSpecs && (
                <div
                  className={`mt-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg p-4 transition-all duration-300`}
                >
                  <h3
                    className={`text-lg font-semibold mb-3 ${isDarkTheme ? "text-white" : "text-gray-900"}`}
                  >
                    Основные характеристики
                  </h3>
                  <div
                    className={`space-y-2 text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
                  >
                    <div>• 24×1000M Base-T ports</div>
                    <div>• 6×10G SFP+ slots</div>
                    <div>• PoE/PoE+ Support: 380W</div>
                    <div>• Performance: 168 Gbps</div>
                    <div>• Fixed One AC Power Supply</div>
                    <div>• RJ45 Console / RJ45 Management / USB2.0 Port</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 mt-8 justify-center">
            <button
              className={`${isDarkTheme ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-[#0065B3] hover:bg-gradient-hero hover:text-white"} px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium transition-all duration-300 font-sans min-h-[44px]`}
            >
              Скачать характеристики
            </button>
            <button
              className={`border ${isDarkTheme ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-white text-white hover:bg-white hover:text-[#0065B3]"} px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium transition-all duration-300 font-sans min-h-[44px]`}
            >
              Запросить цену
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
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
              auto-rotate={isRotating}
              style={{ width: "100%", height: "100%" }}
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Key Features */}
      <section
        className={`py-16 px-6 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-xl md:text-2xl lg:text-3xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"} mb-4 font-sans`}
            >
              Ключевые возможности
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3
                className={`text-lg font-semibold mb-2 font-sans ${isDarkTheme ? "text-white" : "text-gray-900"}`}
              >
                PoE+ 380 Вт
              </h3>
              <p
                className={`${isDarkTheme ? "text-gray-300" : "text-gray-600"} font-sans`}
              >
                Надежное питание IP-камер, точек доступа и других устройств
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Network" size={32} className="text-white" />
              </div>
              <h3
                className={`text-lg font-semibold mb-2 font-sans ${isDarkTheme ? "text-white" : "text-gray-900"}`}
              >
                6×10G SFP+
              </h3>
              <p
                className={`${isDarkTheme ? "text-gray-300" : "text-gray-600"} font-sans`}
              >
                Высокоскоростные аплинки для подключения к серверам и магистрали
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3
                className={`text-lg font-semibold mb-2 font-sans ${isDarkTheme ? "text-white" : "text-gray-900"}`}
              >
                L2+/L3 функции
              </h3>
              <p
                className={`${isDarkTheme ? "text-gray-300" : "text-gray-600"} font-sans`}
              >
                Продвинутая маршрутизация и функции безопасности
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 px-6 ${isDarkTheme ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"} mb-6 font-sans w-[90%] md:w-[70%] mx-auto`}
          >
            Готовы внедрить IDS3530-24P-6X?
          </h2>
          <p
            className={`text-sm md:text-base lg:text-lg xl:text-xl ${isDarkTheme ? "text-gray-300" : "text-gray-600"} mb-8 font-sans w-[90%] md:w-[70%] mx-auto`}
          >
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
