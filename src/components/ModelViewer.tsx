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
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelRef,
  modelPath,
  indicatorsOn,
  onToggleIndicators,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-lg transition-all duration-200 z-10"
        >
          <Icon name="Maximize" size={20} />
        </button>

        <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
          <model-viewer
            ref={modelRef}
            src={modelPath}
            camera-controls
            exposure="1.0"
            interaction-prompt="none"
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full"
          />
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={onToggleIndicators}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <span className="text-white text-sm font-medium">Индикаторы</span>
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
              exposure="1.0"
              interaction-prompt="none"
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
