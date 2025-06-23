import React, { useState } from "react";
import Icon from "@/components/ui/icon";

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
  const [background, setBackground] = useState("gradient"); // gradient, dark, light

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
      <div className="w-full px-4 sm:px-0 sm:max-w-4xl sm:mx-auto">
        <div
          className={`relative ${getBackgroundClass()} rounded-xl overflow-hidden`}
        >
          <div className="aspect-square sm:aspect-[4/3] lg:aspect-[16/10] p-3 sm:p-4 lg:p-6">
            <button
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/20 hover:bg-black/40 text-white p-1.5 sm:p-2 rounded-lg transition-all duration-200 z-10"
            >
              <Icon name="Maximize" size={16} className="sm:w-5 sm:h-5" />
            </button>

            {!modelLoaded && (
              <div className="absolute inset-3 sm:inset-4 lg:inset-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-xs sm:text-sm">Загрузка 3D модели...</p>
                </div>
              </div>
            )}

            <model-viewer
              ref={modelRef}
              src={modelPath}
              camera-controls
              auto-rotate
              exposure="1.0"
              interaction-prompt="none"
              loading="eager"
              reveal="auto"
              camera-orbit="0deg 75deg 1.8m"
              min-camera-orbit="auto auto 1.4m"
              max-camera-orbit="auto auto 2.5m"
              field-of-view="45deg"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='transparent'/%3E%3C/svg%3E"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              className="w-full h-full touch-pan-x touch-pan-y"
            />
          </div>

          <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 flex items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={onToggleIndicators}
              disabled={!modelLoaded}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 ${
                modelLoaded
                  ? `${indicatorsOn ? "bg-yellow-400 text-yellow-900" : background === "light" ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "bg-white/10 text-white hover:bg-white/20"} cursor-pointer`
                  : background === "light"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white/5 text-white/50 cursor-not-allowed"
              }`}
              title="Индикаторы"
            >
              <Icon
                name="Lightbulb"
                size={14}
                className="sm:w-[18px] sm:h-[18px]"
              />
            </button>

            <button
              onClick={() => setBackground("dark")}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 ${
                background === "dark"
                  ? "bg-gray-700 text-gray-200"
                  : background === "light"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Темный фон"
            >
              <Icon name="Moon" size={14} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <button
              onClick={() => setBackground("light")}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 ${
                background === "light"
                  ? "bg-white text-gray-700 shadow-sm"
                  : background === "light"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Светлый фон"
            >
              <Icon name="Sun" size={14} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <button
              onClick={() => setBackground("gradient")}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 ${
                background === "gradient"
                  ? "bg-blue-500 text-white"
                  : background === "light"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="Градиентный фон"
            >
              <Icon
                name="Palette"
                size={14}
                className="sm:w-[18px] sm:h-[18px]"
              />
            </button>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-6xl aspect-square sm:aspect-video">
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-lg transition-all duration-200 z-10"
            >
              <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
            </button>
            <model-viewer
              src={modelPath}
              camera-controls
              auto-rotate
              exposure="1.0"
              interaction-prompt="none"
              camera-orbit="0deg 75deg 1.2m"
              min-camera-orbit="auto auto 0.8m"
              max-camera-orbit="auto auto 2m"
              field-of-view="35deg"
              style={{ width: "100%", height: "100%" }}
              className="w-full h-full rounded-lg touch-pan-x touch-pan-y"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModelViewer;
