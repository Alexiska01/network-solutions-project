import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";
import LoadingOverlay from "./LoadingOverlay";
import ViewerControls from "./3d-viewer/ViewerControls";
import MobileViewerControls from "./MobileViewerControls";
import HotspotPanel from "./HotspotPanel";
import FullscreenViewer from "./FullscreenViewer";

import { Professional3DViewerProps } from "./ViewerTypes";
import { cameraPresets, backgrounds, hotspots, getHotspotIcon, getHotspotColor } from "./3d-viewer/ViewerConstants";

const Professional3DViewer: React.FC<Professional3DViewerProps> = ({
  modelRef,
  modelPath,
  indicatorsOn,
  onToggleIndicators,
  modelLoaded = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [background, setBackground] = useState("studio");
  const [viewMode, setViewMode] = useState("explore");
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [cameraPreset, setCameraPreset] = useState("default");
  const [showSpecs, setShowSpecs] = useState(false);

  // Debug modelLoaded prop changes
  useEffect(() => {
    console.log('🔍 Professional3DViewer: modelLoaded prop changed:', modelLoaded);
  }, [modelLoaded]);

  // Отладка изменения modelPath
  useEffect(() => {
    console.log('🔍 Professional3DViewer: modelPath изменился:', modelPath);
  }, [modelPath]);

  // ESC key handler for fullscreen
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);

  // Camera control functions
  const setCameraView = (preset: string) => {
    setCameraPreset(preset);
    if (modelRef.current) {
      const orbitValue = cameraPresets[preset as keyof typeof cameraPresets];
      modelRef.current.cameraOrbit = orbitValue;
      modelRef.current.jumpCameraToGoal();
    }
  };

  const resetView = () => {
    setCameraPreset("default");
    setSelectedHotspot(null);
    if (modelRef.current) {
      modelRef.current.cameraOrbit = cameraPresets.default;
      modelRef.current.fieldOfView = "25deg";
      
      const mv = modelRef.current as any;
      if (mv.resetTurntableRotation) {
        mv.resetTurntableRotation();
      }
      
      setTimeout(() => {
        if (modelRef.current) {
          modelRef.current.cameraOrbit = cameraPresets.default;
          modelRef.current.fieldOfView = "25deg";
          modelRef.current.jumpCameraToGoal();
        }
      }, 10);
    }
  };

  const resetViewMobile = () => {
    setCameraPreset("default");
    setSelectedHotspot(null);
    if (modelRef.current) {
      // Полный сброс для мобильной версии
      const mv = modelRef.current as any;
      
      // Сбрасываем все параметры камеры
      modelRef.current.cameraOrbit = cameraPresets.default;
      modelRef.current.fieldOfView = "25deg";
      
      // Сбрасываем zoom к начальным границам
      modelRef.current.minCameraOrbit = "auto auto 0.4m";
      modelRef.current.maxCameraOrbit = "auto auto 2m";
      
      // Принудительно устанавливаем камеру на минимальное расстояние
      const [theta, phi] = cameraPresets.default.split(' ');
      modelRef.current.cameraOrbit = `${theta} ${phi} 0.8m`;
      
      if (mv.resetTurntableRotation) {
        mv.resetTurntableRotation();
      }
      
      // Принудительный переход к цели
      modelRef.current.jumpCameraToGoal();
      
      // Дополнительный сброс через небольшую задержку
      setTimeout(() => {
        if (modelRef.current) {
          modelRef.current.cameraOrbit = `${theta} ${phi} 0.8m`;
          modelRef.current.fieldOfView = "25deg";
          modelRef.current.jumpCameraToGoal();
        }
      }, 50);
    }
  };

  const takeScreenshot = () => {
    if (modelRef.current) {
      const screenshot = modelRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'ids3530-24p-6x-3d.png';
      link.href = screenshot;
      link.click();
    }
  };

  const selectedHotspotData = selectedHotspot 
    ? hotspots.find(h => h.id === selectedHotspot) 
    : null;

  return (
    <>
      <div className="relative">
        {/* Main 3D Viewer Container */}
        <div 
          className="relative rounded-2xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: backgrounds[background as keyof typeof backgrounds] }}
        >
          {/* Loading Overlay */}
          <LoadingOverlay isVisible={!modelLoaded} />

          {/* Top Controls */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-30 flex gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="hidden md:flex bg-black/20 backdrop-blur-md rounded-lg p-2 md:p-2 border border-white/10 text-white hover:bg-black/30 active:bg-black/40 transition-all"
              title="Полноэкранный режим"
            >
              <Icon name="Maximize" size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>

          {/* 3D Model */}
          <div className="aspect-[4/3] md:aspect-[16/10] p-4 md:p-6">
            <model-viewer
              ref={modelRef}
              src={modelPath}
              camera-controls
              exposure="1.2"
              interaction-prompt="none"
              loading="eager"
              reveal="auto"
              camera-orbit={cameraPresets[cameraPreset as keyof typeof cameraPresets]}
              min-camera-orbit="auto auto 0.4m"
              max-camera-orbit="auto auto 2m"
              field-of-view="25deg"
              min-field-of-view="15deg"
              max-field-of-view="45deg"
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
                  className={`hotspot-button bg-gradient-to-r ${getHotspotColor(hotspot.type)} w-10 h-10 md:w-8 md:h-8 rounded-full border-2 border-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center`}
                  onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                >
                  <Icon name={getHotspotIcon(hotspot.type)} size={16} className="text-white md:w-[14px] md:h-[14px]" />
                </button>
              ))}
            </model-viewer>
          </div>

          {/* Bottom Controls Panel */}
          <div className="hidden md:block">
            <ViewerControls
              background={background}
              cameraPreset={cameraPreset}
              indicatorsOn={indicatorsOn}
              modelLoaded={modelLoaded}
              onCameraViewChange={setCameraView}
              onBackgroundChange={setBackground}
              onToggleIndicators={onToggleIndicators}
              onTakeScreenshot={takeScreenshot}
              onResetView={resetView}
            />
          </div>
          
          {/* Mobile Controls */}
          <div className="block md:hidden">
            <MobileViewerControls
              background={background}
              cameraPreset={cameraPreset}
              indicatorsOn={indicatorsOn}
              modelLoaded={modelLoaded}
              onCameraViewChange={setCameraView}
              onBackgroundChange={setBackground}
              onToggleIndicators={onToggleIndicators}
              onTakeScreenshot={takeScreenshot}
              onResetView={resetViewMobile}
            />
          </div>
        </div>

        {/* Hotspot Information Panel */}
        <AnimatePresence>
          {selectedHotspotData && (
            <HotspotPanel
              hotspot={selectedHotspotData}
              onClose={() => setSelectedHotspot(null)}
            />
          )}
        </AnimatePresence>


      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <FullscreenViewer
            isVisible={isFullscreen}
            modelPath={modelPath}
            cameraPreset={cameraPreset}
            indicatorsOn={indicatorsOn}
            modelLoaded={modelLoaded}
            onClose={() => setIsFullscreen(false)}
            onCameraViewChange={setCameraView}
            onToggleIndicators={onToggleIndicators}
            onResetView={resetView}
            onTakeScreenshot={takeScreenshot}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Professional3DViewer;