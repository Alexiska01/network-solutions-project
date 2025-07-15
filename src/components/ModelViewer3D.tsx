import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface ModelViewer3DProps {
  src: string;
  alt: string;
}

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setIsLoading(true);
      setHasError(false);
      
      const modelViewerHTML = `
        <model-viewer
          src="${src}"
          alt="${alt}"
          auto-rotate
          auto-rotate-delay="1000"
          rotation-per-second="30deg"
          camera-controls
          style="width: 100%; height: 100%; background: transparent; border-radius: 1rem;"
          loading="eager"
          reveal="auto"
          exposure="1.2"
          shadow-intensity="0.3"
          environment-image="neutral">
          <div slot="poster" style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)); border-radius: 1rem;">
            <div style="text-align: center; color: white;">
              <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: linear-gradient(45deg, #3b82f6, #9333ea); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px;">📡</div>
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${alt}</div>
              <div style="font-size: 14px; opacity: 0.7;">Загрузка 3D модели...</div>
            </div>
          </div>
        </model-viewer>
      `;
      
      containerRef.current.innerHTML = modelViewerHTML;
      
      const modelViewer = containerRef.current.querySelector('model-viewer');
      
      if (modelViewer) {
        modelViewer.addEventListener('load', () => {
          setIsLoading(false);
          console.log('3D модель загружена:', src);
        });
        
        modelViewer.addEventListener('error', (e) => {
          setHasError(true);
          setIsLoading(false);
          console.error('Ошибка загрузки 3D модели:', e, src);
        });
      }
    }
  }, [src, alt]);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Icon name="AlertTriangle" size={48} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{alt}</h3>
            <p className="text-red-200 text-sm">Ошибка загрузки 3D модели</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full"
    />
  );
};

export default ModelViewer3D;