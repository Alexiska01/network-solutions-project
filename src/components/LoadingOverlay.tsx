import React from 'react';
import Icon from '@/components/ui/icon';

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
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
  );
};

export default LoadingOverlay;