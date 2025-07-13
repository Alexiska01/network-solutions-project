import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface Hotspot {
  id: string;
  position: string;
  title: string;
  description: string;
  type: 'port' | 'feature' | 'info';
  details?: {
    count?: number;
    speed?: string;
    power?: string;
  };
}

interface Professional3DViewerProps {
  modelRef: React.RefObject<any>;
  modelPath: string;
  indicatorsOn: boolean;
  onToggleIndicators: () => void;
  modelLoaded?: boolean;
}

const Professional3DViewer: React.FC<Professional3DViewerProps> = ({
  modelRef,
  modelPath,
  indicatorsOn,
  onToggleIndicators,
  modelLoaded = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [background, setBackground] = useState("studio");
  const [viewMode, setViewMode] = useState("explore"); // explore, annotate, analyze
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [cameraPreset, setCameraPreset] = useState("default");
  const [isRotating, setIsRotating] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  
  const modelViewerRef = useRef<any>(null);

  // Hotspots data for IDS3530-24P-6X
  const hotspots: Hotspot[] = [
    {
      id: "ethernet-ports",
      position: "0.3m 0.1m 0.4m",
      title: "24x Gigabit Ethernet",
      description: "24 порта 10/100/1000 Base-T с поддержкой PoE+",
      type: "port",
      details: { count: 24, speed: "1 Гбит/с", power: "30W/порт" }
    },
    {
      id: "sfp-ports", 
      position: "-0.3m 0.1m 0.4m",
      title: "6x SFP+ Uplink",
      description: "Высокоскоростные порты для аплинка",
      type: "port",
      details: { count: 6, speed: "10 Гбит/с" }
    },
    {
      id: "power-supply",
      position: "0m -0.2m -0.4m",
      title: "Источник питания",
      description: "Резервируемый блок питания",
      type: "feature",
      details: { power: "380W" }
    },
    {
      id: "console-port",
      position: "-0.4m 0m 0.2m", 
      title: "Консольный порт",
      description: "RJ45 консоль для управления",
      type: "info"
    }
  ];

  const cameraPresets = {
    default: "0deg 75deg 0.88m",
    front: "0deg 90deg 0.88m",
    back: "180deg 90deg 0.88m", 
    top: "0deg 0deg 1.2m",
    ports: "45deg 85deg 0.7m",
    overview: "25deg 65deg 1.1m"
  };

  const backgrounds = {
    studio: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    neutral: "#f8f9fa",
    dark: "#1a1a1a",
    tech: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    white: "#ffffff"
  };

  useEffect(() => {
    if (modelViewerRef.current) {
      modelViewerRef.current.addEventListener('load', () => {
        console.log('Model loaded successfully');
      });
    }

    // ESC key handler for fullscreen
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);

  const setCameraView = (preset: string) => {
    setCameraPreset(preset);
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = cameraPresets[preset as keyof typeof cameraPresets];
    }
  };

  const resetView = () => {
    setCameraView("default");
    setIsRotating(true);
    setSelectedHotspot(null);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
    if (modelViewerRef.current) {
      modelViewerRef.current.autoRotate = !isRotating;
    }
  };

  const takeScreenshot = () => {
    if (modelViewerRef.current) {
      const screenshot = modelViewerRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'ids3530-24p-6x-3d.png';
      link.href = screenshot;
      link.click();
    }
  };

  const getHotspotIcon = (type: string) => {
    switch (type) {
      case 'port': return 'Cable';
      case 'feature': return 'Zap';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const getHotspotColor = (type: string) => {
    switch (type) {
      case 'port': return 'from-[#00B5AD] to-[#0065B3]';
      case 'feature': return 'from-[#0065B3] to-[#1A2980]';
      case 'info': return 'from-[#1A2980] to-[#00B5AD]';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <>
      <div className="relative">
        {/* Main 3D Viewer Container */}
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: backgrounds[background as keyof typeof backgrounds] }}
        >
          {/* Loading Overlay */}
          {!modelLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm">
              <div className="text-white text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Box" className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-lg font-medium">Загрузка 3D модели...</p>
                <p className="text-sm text-white/70 mt-1">Подготовка интерактивного просмотра</p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-4 right-4 z-30 flex justify-between items-start"
              >
                {/* Left Controls */}
                <div className="flex flex-col gap-2">
                  <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Eye" className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">Режим просмотра</span>
                    </div>
                    <div className="flex gap-1">
                      {['explore', 'annotate', 'analyze'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setViewMode(mode)}
                          className={`px-2 py-1 rounded-lg text-xs transition-all ${
                            viewMode === mode 
                              ? 'bg-[#00B5AD] text-white' 
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {mode === 'explore' ? 'Обзор' : mode === 'annotate' ? 'Аннотации' : 'Анализ'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowControls(false)}
                    className="bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10 text-white hover:bg-black/30 transition-all"
                    title="Скрыть панель"
                  >
                    <Icon name="EyeOff" size={18} />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10 text-white hover:bg-black/30 transition-all"
                    title="Полноэкранный режим"
                  >
                    <Icon name="Maximize" size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show Controls Button (when hidden) */}
          {!showControls && (
            <button
              onClick={() => setShowControls(true)}
              className="absolute top-4 right-4 z-30 bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10 text-white hover:bg-black/30 transition-all"
            >
              <Icon name="Settings" size={18} />
            </button>
          )}

          {/* 3D Model */}
          <div className="aspect-[16/10] p-6">
            <model-viewer
              ref={modelViewerRef}
              src={modelPath}
              camera-controls
              auto-rotate={isRotating}
              exposure="1.2"
              interaction-prompt="none"
              loading="eager"
              reveal="auto"
              camera-orbit={cameraPresets[cameraPreset as keyof typeof cameraPresets]}
              min-camera-orbit="auto auto 0.4m"
              max-camera-orbit="auto auto 2m"
              field-of-view="25deg"
              shadow-intensity="0.3"
              environment-image="neutral"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              className="w-full h-full"
            >
              {/* Hotspots */}
              {viewMode === 'annotate' && hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  slot="hotspot"
                  data-position={hotspot.position}
                  data-normal="0m 1m 0m"
                  className={`hotspot-button bg-gradient-to-r ${getHotspotColor(hotspot.type)} w-8 h-8 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center`}
                  onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                >
                  <Icon name={getHotspotIcon(hotspot.type)} size={14} className="text-white" />
                </button>
              ))}
            </model-viewer>
          </div>

          {/* Bottom Controls Panel */}
          <div className="bg-white/5 backdrop-blur-md border-t border-white/10 p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Camera Presets */}
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium min-w-max">Ракурс:</span>
                <div className="flex gap-1">
                  {Object.keys(cameraPresets).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setCameraView(preset)}
                      className={`px-2 py-1 rounded-lg text-xs transition-all ${
                        cameraPreset === preset 
                          ? 'bg-[#0065B3] text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {preset === 'default' ? 'По умолчанию' :
                       preset === 'front' ? 'Спереди' :
                       preset === 'back' ? 'Сзади' :
                       preset === 'top' ? 'Сверху' :
                       preset === 'ports' ? 'Порты' : 'Обзор'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleRotation}
                  className={`p-2 rounded-lg transition-all ${
                    isRotating 
                      ? 'bg-[#00B5AD] text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  title={isRotating ? "Остановить вращение" : "Запустить вращение"}
                >
                  <Icon name={isRotating ? "Pause" : "Play"} size={16} />
                </button>

                <button
                  onClick={onToggleIndicators}
                  disabled={!modelLoaded}
                  className={`p-2 rounded-lg transition-all ${
                    indicatorsOn 
                      ? 'bg-yellow-500 text-yellow-900' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  } ${!modelLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Переключить индикаторы"
                >
                  <Icon name="Lightbulb" size={16} />
                </button>

                <button
                  onClick={takeScreenshot}
                  className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                  title="Сделать скриншот"
                >
                  <Icon name="Camera" size={16} />
                </button>

                <button
                  onClick={resetView}
                  className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                  title="Сбросить вид"
                >
                  <Icon name="RotateCcw" size={16} />
                </button>
              </div>
            </div>

            {/* Background Controls */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <span className="text-white text-sm font-medium min-w-max">Фон:</span>
              {Object.keys(backgrounds).map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    background === bg ? 'border-white scale-110' : 'border-white/30'
                  }`}
                  style={{ background: backgrounds[bg as keyof typeof backgrounds] }}
                  title={bg === 'studio' ? 'Студийный' :
                         bg === 'neutral' ? 'Нейтральный' :
                         bg === 'dark' ? 'Темный' :
                         bg === 'tech' ? 'Технический' : 'Белый'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hotspot Information Panel */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="absolute top-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm z-40"
            >
              {(() => {
                const hotspot = hotspots.find(h => h.id === selectedHotspot);
                if (!hotspot) return null;
                
                return (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getHotspotColor(hotspot.type)} rounded-lg flex items-center justify-center`}>
                        <Icon name={getHotspotIcon(hotspot.type)} size={20} className="text-white" />
                      </div>
                      <button
                        onClick={() => setSelectedHotspot(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{hotspot.title}</h3>
                    <p className="text-gray-600 mb-4">{hotspot.description}</p>
                    
                    {hotspot.details && (
                      <div className="space-y-2">
                        {hotspot.details.count && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Количество:</span>
                            <span className="font-medium">{hotspot.details.count}</span>
                          </div>
                        )}
                        {hotspot.details.speed && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Скорость:</span>
                            <span className="font-medium">{hotspot.details.speed}</span>
                          </div>
                        )}
                        {hotspot.details.power && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Мощность:</span>
                            <span className="font-medium">{hotspot.details.power}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Specs Overlay */}
        <AnimatePresence>
          {showSpecs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-xl p-4 max-w-xs z-40"
            >
              <h4 className="font-bold text-gray-900 mb-3">Технические характеристики</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Порты Ethernet:</span>
                  <span className="font-medium">24x 1Гбит/с</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Порты SFP+:</span>
                  <span className="font-medium">6x 10Гбит/с</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PoE+ мощность:</span>
                  <span className="font-medium">380W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Уровень:</span>
                  <span className="font-medium">Layer 3</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg hover:bg-white transition-all group"
            title="Технические характеристики"
          >
            <Icon name="Info" size={18} className="text-gray-700 group-hover:text-[#0065B3]" />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
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
                  onClick={() => setIsFullscreen(false)}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-xl group"
                  title="Закрыть полноэкранный режим"
                >
                  <Icon name="X" size={24} className="group-hover:rotate-90 transition-transform" />
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
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
                auto-rotate={isRotating}
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
                      onChange={(e) => setCameraView(e.target.value)}
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
                    onClick={toggleRotation}
                    className={`p-2 rounded-lg transition-all ${
                      isRotating ? 'bg-[#00B5AD] text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    title={isRotating ? "Остановить вращение" : "Запустить вращение"}
                  >
                    <Icon name={isRotating ? "Pause" : "Play"} size={16} />
                  </button>
                  
                  <button
                    onClick={resetView}
                    className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"
                    title="Сбросить вид"
                  >
                    <Icon name="RotateCcw" size={16} />
                  </button>
                  
                  <button
                    onClick={takeScreenshot}
                    className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"
                    title="Сделать скриншот"
                  >
                    <Icon name="Camera" size={16} />
                  </button>

                  <div className="h-6 w-px bg-white/20 mx-1"></div>

                  <button
                    onClick={() => setIsFullscreen(false)}
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
        )}
      </AnimatePresence>
    </>
  );
};

export default Professional3DViewer;