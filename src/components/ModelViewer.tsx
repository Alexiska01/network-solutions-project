import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface ModelViewerProps {
  modelRef: React.RefObject<any>;
  modelPath: string;
  indicatorsOn: boolean;
  onToggleIndicators: () => void;
  modelLoaded?: boolean;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelRef,
  modelPath,
  indicatorsOn,
  onToggleIndicators,
  modelLoaded = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [background, setBackground] = useState("gradient");
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Проверка загрузки библиотеки model-viewer
    const checkLibrary = () => {
      if (
        typeof window !== "undefined" &&
        window.customElements &&
        window.customElements.get("model-viewer")
      ) {
        setIsLibraryLoaded(true);
      } else {
        // Повторная проверка через небольшой интервал
        setTimeout(checkLibrary, 100);
      }
    };

    checkLibrary();
  }, []);

  // Адаптивные настройки камеры для мобильных устройств
  const getCameraOrbit = () => {
    return isMobile ? "0deg 75deg 0.88m" : "0deg 75deg 0.8m";
  };

  const getMinCameraOrbit = () => {
    return isMobile ? "auto auto 0.55m" : "auto auto 0.5m";
  };

  const getMaxCameraOrbit = () => {
    return isMobile ? "auto auto 1.65m" : "auto auto 1.5m";
  };

  const getModelViewerProps = () => {
    const baseProps = {
      ref: modelRef,
      src: modelPath,
      "camera-controls": true,
      exposure: "1.0",
      "interaction-prompt": "none",
      "camera-orbit": getCameraOrbit(),
      "min-camera-orbit": getMinCameraOrbit(),
      "max-camera-orbit": getMaxCameraOrbit(),
      "field-of-view": "30deg",
      loading: "eager",
      reveal: "auto",
      "auto-rotate": !isMobile,
      style: {
        width: "100%",
        height: "100%",
        background: "transparent",
      },
      className: "w-full h-full",
    };

    return baseProps;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getBackgroundClass = () => {
    switch (background) {
      case "dark":
        return "bg-gray-900";
      case "light":
        return "bg-white";
      default:
        return "bg-gradient-hero";
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div
          className={`relative ${getBackgroundClass()} rounded-xl overflow-hidden`}
        >
          <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10] p-4 sm:p-6">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-lg transition-all duration-200 z-10"
            >
              <Icon name="Maximize" size={20} />
            </button>

            {(!modelLoaded || !isLibraryLoaded) && (
              <div className="absolute inset-4 sm:inset-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                    <p className="text-sm">
                      {!isLibraryLoaded
                        ? "Загрузка библиотеки..."
                        : "Загрузка 3D модели..."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isLibraryLoaded && <model-viewer {...getModelViewerProps()} />}
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-center gap-3">
            <button
              onClick={onToggleIndicators}
              disabled={!modelLoaded}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                modelLoaded
                  ? `${indicatorsOn ? "bg-yellow-400 text-yellow-900" : background === "light" ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "bg-white/10 text-white hover:bg-white/20"} cursor-pointer`
                  : background === "light"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white/5 text-white/50 cursor-not-allowed"
              }`}
              title="Индикаторы"
            >
              <Icon name="Zap" size={18} />
            </button>

            <button
              onClick={() => setBackground("dark")}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                background === "dark"
                  ? "bg-gray-700 text-gray-200"
                  : background === "light"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Темный фон"
            >
              <Icon name="Moon" size={18} />
            </button>

            <button
              onClick={() => setBackground("light")}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                background === "light"
                  ? "bg-white text-gray-700 shadow-sm"
                  : background === "dark"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Светлый фон"
            >
              <Icon name="Sun" size={18} />
            </button>

            <button
              onClick={() => setBackground("gradient")}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                background === "gradient"
                  ? "bg-blue-500 text-white"
                  : background === "light"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Градиентный фон"
            >
              <Icon name="Palette" size={18} />
            </button>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg transition-all duration-200 z-10"
            >
              <Icon name="X" size={24} />
            </button>
            {isLibraryLoaded ? (
              <model-viewer
                src={modelPath}
                camera-controls={true}
                auto-rotate={!isMobile}
                exposure="1.0"
                interaction-prompt="none"
                loading="lazy"
                camera-orbit="0deg 75deg 0.8m"
                min-camera-orbit="auto auto 0.5m"
                max-camera-orbit="auto auto 1.5m"
                field-of-view="30deg"
                style={{ width: "100%", height: "100%" }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-white text-center">
                  <div className="space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                    <p className="text-sm">Загрузка библиотеки...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModelViewer;
