import React from 'react';
import Icon from '@/components/ui/icon';
import { cameraPresets, backgrounds, getTextColor, getButtonColor } from './ViewerConstants';

interface ViewerControlsProps {
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

const ViewerControls: React.FC<ViewerControlsProps> = ({
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
  const getCameraPresetLabel = (preset: string) => {
    switch (preset) {
      case 'default': return 'По умолчанию';
      case 'front': return 'Спереди';
      case 'back': return 'Сзади';
      case 'top': return 'Сверху';
      case 'ports': return 'Порты';
      case 'overview': return 'Обзор';
      default: return preset;
    }
  };

  const getBackgroundTitle = (bg: string) => {
    switch (bg) {
      case 'studio': return 'Студийный';
      case 'neutral': return 'Нейтральный';
      case 'dark': return 'Темный';
      case 'tech': return 'Технический';
      default: return bg;
    }
  };

  return (
    <div className={`${background === 'neutral' ? 'bg-white/90' : 'bg-white/5'} backdrop-blur-md border-t ${background === 'neutral' ? 'border-gray-200' : 'border-white/10'} p-4`}>
      <div className="flex items-center justify-between gap-4">
        {/* Camera Presets */}
        <div className="flex items-center gap-2">
          <span className={`${getTextColor(background)} text-sm font-medium min-w-max`}>Ракурс:</span>
          <div className="flex gap-1">
            {Object.keys(cameraPresets).map((preset) => (
              <button
                key={preset}
                onClick={() => onCameraViewChange(preset)}
                className={`px-2 py-1 rounded-lg text-xs transition-all ${getButtonColor(background, cameraPreset === preset)}`}
              >
                {getCameraPresetLabel(preset)}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleIndicators}
            disabled={!modelLoaded}
            className={`p-2 rounded-lg transition-all ${
              indicatorsOn 
                ? 'bg-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/30' 
                : getButtonColor(background, false)
            } ${!modelLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={indicatorsOn ? "Выключить индикаторы" : "Включить индикаторы"}
          >
            <Icon name={indicatorsOn ? "Lightbulb" : "LightbulbOff"} size={16} />
          </button>

          <button
            onClick={onTakeScreenshot}
            className={`p-2 rounded-lg transition-all ${getButtonColor(background, false)}`}
            title="Сделать скриншот"
          >
            <Icon name="Camera" size={16} />
          </button>

          <button
            onClick={onResetView}
            className={`p-2 rounded-lg transition-all ${getButtonColor(background, false)}`}
            title="Сбросить вид"
          >
            <Icon name="RotateCcw" size={16} />
          </button>
        </div>
      </div>

      {/* Background Controls */}
      <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${background === 'neutral' ? 'border-gray-200' : 'border-white/10'}`}>
        <span className={`${getTextColor(background)} text-sm font-medium min-w-max`}>Фон:</span>
        {Object.keys(backgrounds).map((bg) => (
          <button
            key={bg}
            onClick={() => onBackgroundChange(bg)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              background === bg 
                ? `${background === 'neutral' ? 'border-[#0065B3]' : 'border-white'} scale-110` 
                : `${background === 'neutral' ? 'border-gray-300' : 'border-white/30'}`
            }`}
            style={{ background: backgrounds[bg as keyof typeof backgrounds] }}
            title={getBackgroundTitle(bg)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewerControls;