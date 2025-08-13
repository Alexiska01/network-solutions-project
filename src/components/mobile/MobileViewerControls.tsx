import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';
import { cameraPresets, backgrounds } from '../3d-viewer/ViewerConstants';

interface MobileViewerControlsProps {
  background: string;
  cameraPreset: string;
  indicatorsOn: boolean;
  modelLoaded: boolean;
  onCameraViewChange: (preset: string) => void;
  onBackgroundChange: (bg: string) => void;
  onToggleIndicators: () => void;
  onTakeScreenshot: () => void;
  onResetView: () => void;
}

const MobileViewerControls: React.FC<MobileViewerControlsProps> = ({
  background,
  cameraPreset,
  indicatorsOn,
  modelLoaded,
  onCameraViewChange,
  onBackgroundChange,
  onToggleIndicators,
  onTakeScreenshot,
  onResetView,
}) => {
  const [showCameraMenu, setShowCameraMenu] = useState(false);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);

  const getCameraPresetLabel = (preset: string) => {
    switch (preset) {
      case 'default': return 'Обзор';
      case 'front': return 'Спереди';
      case 'back': return 'Сзади';
      case 'top': return 'Сверху';
      case 'ports': return 'Порты';
      case 'overview': return 'Детали';
      default: return preset;
    }
  };

  const getBackgroundTitle = (bg: string) => {
    switch (bg) {
      case 'studio': return 'Студия';
      case 'neutral': return 'Белый';
      case 'dark': return 'Темный';
      case 'tech': return 'Техно';
      default: return bg;
    }
  };

  return (
    <>
      {/* Bottom Control Bar - Mobile Optimized */}
      <div className="bg-black/80 backdrop-blur-md border-t border-white/10 p-3">
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCameraMenu(!showCameraMenu)}
              className="flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-xl text-sm font-medium"
            >
              <Icon name="Camera" size={16} />
              <span className="hidden xs:inline">{getCameraPresetLabel(cameraPreset)}</span>
              <Icon name="ChevronUp" size={14} className={`transition-transform ${showCameraMenu ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => setShowBackgroundMenu(!showBackgroundMenu)}
              className="flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-xl text-sm font-medium"
            >
              <div 
                className="w-4 h-4 rounded border border-white/30"
                style={{ background: backgrounds[background as keyof typeof backgrounds] }}
              />
              <span className="hidden xs:inline">{getBackgroundTitle(background)}</span>
              <Icon name="ChevronUp" size={14} className={`transition-transform ${showBackgroundMenu ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleIndicators}
              disabled={!modelLoaded}
              className={`p-2.5 rounded-xl transition-all ${
                indicatorsOn 
                  ? 'bg-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/30' 
                  : 'bg-white/10 text-white/70'
              } ${!modelLoaded ? 'opacity-50' : ''}`}
              title={indicatorsOn ? "Выключить индикаторы" : "Включить индикаторы"}
            >
              <Icon name={indicatorsOn ? "Lightbulb" : "LightbulbOff"} size={18} />
            </button>

            <button
              onClick={onResetView}
              className="p-2.5 rounded-xl bg-white/10 text-white/70 active:bg-white/20 transition-all"
              title="Сбросить вид"
            >
              <Icon name="RotateCcw" size={18} />
            </button>

            <button
              onClick={onTakeScreenshot}
              className="p-2.5 rounded-xl bg-white/10 text-white/70 active:bg-white/20 transition-all"
              title="Сделать фото"
            >
              <Icon name="Download" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Camera Menu */}
      <AnimatePresence>
        {showCameraMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 left-3 right-3 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 p-4 z-40"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Ракурс камеры</h4>
              <button
                onClick={() => setShowCameraMenu(false)}
                className="text-white/60 hover:text-white"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(cameraPresets).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    onCameraViewChange(preset);
                    setShowCameraMenu(false);
                  }}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    cameraPreset === preset
                      ? 'bg-[#0065B3] text-white'
                      : 'bg-white/10 text-white/80 active:bg-white/20'
                  }`}
                >
                  {getCameraPresetLabel(preset)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Menu */}
      <AnimatePresence>
        {showBackgroundMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 left-3 right-3 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 p-4 z-40"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Фон</h4>
              <button
                onClick={() => setShowBackgroundMenu(false)}
                className="text-white/60 hover:text-white"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(backgrounds).map((bg) => (
                <button
                  key={bg}
                  onClick={() => {
                    onBackgroundChange(bg);
                    setShowBackgroundMenu(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                    background === bg
                      ? 'bg-[#0065B3] text-white'
                      : 'bg-white/10 text-white/80 active:bg-white/20'
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded border-2 border-white/30"
                    style={{ background: backgrounds[bg as keyof typeof backgrounds] }}
                  />
                  {getBackgroundTitle(bg)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close menus */}
      {(showCameraMenu || showBackgroundMenu) && (
        <div
          className="absolute inset-0 z-30"
          onClick={() => {
            setShowCameraMenu(false);
            setShowBackgroundMenu(false);
          }}
        />
      )}
    </>
  );
};

export default MobileViewerControls;