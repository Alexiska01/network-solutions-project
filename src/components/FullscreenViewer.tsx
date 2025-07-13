import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { cameraPresets } from './ViewerConstants';

interface FullscreenViewerProps {
  isVisible: boolean;
  modelPath: string;
  cameraPreset: string;
  indicatorsOn: boolean;
  modelLoaded: boolean;
  onClose: () => void;
  onCameraViewChange: (preset: string) => void;
  onToggleIndicators: () => void;
  onResetView: () => void;
  onTakeScreenshot: () => void;
}

const FullscreenViewer: React.FC<FullscreenViewerProps> = ({
  isVisible,
  modelPath,
  cameraPreset,
  indicatorsOn,
  modelLoaded,
  onClose,
  onCameraViewChange,
  onToggleIndicators,
  onResetView,
  onTakeScreenshot,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    >
      <div className="relative w-full h-full">
        {/* Enhanced Close Button */}
        <div className="absolute top-4 right-4 z-[10000] flex gap-2">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-xl group"
            title="Закрыть полноэкранный режим"
          >
            <Icon name="X" size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all backdrop-blur-sm border border-white/20"
            title="Свернуть"
          >
            <Icon name="Minimize2" size={24} />
          </button>
        </div>

        {/* Fullscreen Title */}
        <div className="absolute top-4 left-4 z-[10000] bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#00B5AD] rounded-full animate-pulse"></div>
            <span className="text-white font-medium">IDS3530-24P-6X - Полноэкранный просмотр</span>
          </div>
        </div>
        
        <model-viewer
          src={modelPath}
          camera-controls
          exposure="1.2"
          interaction-prompt="none"
          camera-orbit={cameraPresets[cameraPreset as keyof typeof cameraPresets]}
          min-camera-orbit="auto auto 0.4m"
          max-camera-orbit="auto auto 2m"
          field-of-view="25deg"
          style={{ width: "100%", height: "100%" }}
          className="w-full h-full"
        />

        {/* Enhanced Fullscreen Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            {/* Camera Presets */}
            <div className="flex items-center gap-2 pr-3 border-r border-white/20">
              <span className="text-white text-sm font-medium">Вид:</span>
              <select
                value={cameraPreset}
                onChange={(e) => onCameraViewChange(e.target.value)}
                className="bg-white/10 text-white text-sm rounded-lg px-2 py-1 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00B5AD]"
              >
                <option value="default">По умолчанию</option>
                <option value="front">Спереди</option>
                <option value="back">Сзади</option>
                <option value="top">Сверху</option>
                <option value="ports">Порты</option>
                <option value="overview">Обзор</option>
              </select>
            </div>

            {/* Action Buttons */}
            <button
              onClick={onToggleIndicators}
              disabled={!modelLoaded}
              className={`p-2 rounded-lg transition-all ${
                indicatorsOn 
                  ? 'bg-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/30' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              } ${!modelLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={indicatorsOn ? "Выключить индикаторы" : "Включить индикаторы"}
            >
              <Icon name={indicatorsOn ? "Lightbulb" : "LightbulbOff"} size={16} />
            </button>
            
            <button
              onClick={onResetView}
              className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"
              title="Сбросить вид"
            >
              <Icon name="RotateCcw" size={16} />
            </button>
            
            <button
              onClick={onTakeScreenshot}
              className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"
              title="Сделать скриншот"
            >
              <Icon name="Camera" size={16} />
            </button>

            <div className="h-6 w-px bg-white/20 mx-1"></div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-all"
              title="Выйти из полноэкранного режима"
            >
              <Icon name="Minimize2" size={16} />
            </button>
          </div>
        </div>

        {/* ESC hint */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[10000] bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
          <span className="text-white/70 text-sm">Нажмите ESC для выхода</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FullscreenViewer;