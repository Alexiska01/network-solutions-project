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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 max-w-[860px] mx-auto shadow-lg">
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-lg transition-all duration-200 z-10"
        >
          <Icon name="Maximize" size={20} />
        </button>

        <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative mb-4">
          {!modelLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Загрузка 3D модели...</p>
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
            camera-orbit="0deg 75deg 0.8m"
            min-camera-orbit="auto auto 0.5m"
            max-camera-orbit="auto auto 1.5m"
            field-of-view="30deg"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3C/svg%3E"
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={onToggleIndicators}
            disabled={!modelLoaded}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              modelLoaded
                ? "bg-white/10 hover:bg-white/20 cursor-pointer"
                : "bg-white/5 cursor-not-allowed opacity-50"
            }`}
          >
            <span className="text-white text-sm font-medium">
              Индикаторы {modelLoaded ? "" : "(загрузка...)"}
            </span>
            <div
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                indicatorsOn ? "bg-green-400" : "bg-gray-400"
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
              src={modelPath}
              camera-controls
              auto-rotate
              exposure="1.0"
              interaction-prompt="none"
              camera-orbit="0deg 75deg 0.8m"
              min-camera-orbit="auto auto 0.5m"
              max-camera-orbit="auto auto 1.5m"
              field-of-view="30deg"
              style={{ width: "100%", height: "100%" }}
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModelViewer;
