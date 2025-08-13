import { memo } from 'react';

interface OptimizedModelViewerProps {
  src: string;
  alt: string;
  isMobile: boolean;
  onLoad: () => void;
  onError: () => void;
  series?: string;
}

const OptimizedModelViewer = memo<OptimizedModelViewerProps>(({ 
  src, 
  alt, 
  isMobile, 
  onLoad, 
  onError,
  series 
}) => {
  // Специальные настройки для проблемной модели 3730
  const is3730 = series === '3730';
  
  // Общие свойства для всех устройств
  const commonProps = {
    src,
    alt,
    'auto-rotate': true,
    'auto-rotate-delay': is3730 ? '500' : '0',
    'exposure': is3730 ? '1.0' : '1.2',
    'shadow-intensity': is3730 ? '0.2' : '0.3',
    'environment-image': 'neutral',
    'interaction-prompt': 'none',
    loading: 'lazy' as const, // Изменено с eager на lazy для лучшей производительности
    reveal: 'auto' as const,
    onLoad,
    onError,
  };

  // Свойства для мобильных устройств
  const mobileProps = {
    'rotation-per-second': is3730 ? '28deg' : '32deg', // Медленнее для 3730
    'camera-orbit': is3730 ? '0deg 75deg 1.2m' : '0deg 80deg 1.1m', // Дальше для 3730
    'min-camera-orbit': is3730 ? 'auto auto 1.2m' : 'auto auto 1.1m',
    'max-camera-orbit': is3730 ? 'auto auto 1.2m' : 'auto auto 1.1m',
    'field-of-view': is3730 ? '35deg' : '40deg', // Меньший угол для 3730
    style: {
      width: '100%',
      height: '100%',
      background: 'transparent',
      borderRadius: '1rem',
      '--progress-bar-color': 'transparent',
      '--progress-mask': 'transparent',
      pointerEvents: 'none' as const,
    },
  };

  // Свойства для десктопа
  const desktopProps = {
    'rotation-per-second': is3730 ? '30deg' : '35deg', // Медленнее для 3730
    'camera-controls': true,
    'camera-orbit': is3730 ? '0deg 75deg 1.1m' : '0deg 80deg 1.02m', // Оптимизированы для 3730
    'min-camera-orbit': is3730 ? 'auto auto 0.5m' : 'auto auto 0.4m',
    'max-camera-orbit': is3730 ? 'auto auto 2.2m' : 'auto auto 2.5m',
    'field-of-view': is3730 ? '30deg' : '35deg', // Меньший угол для 3730
    exposure: is3730 ? '1.0' : '1.1', // Меньшая экспозиция для 3730
    style: {
      width: '90%',
      height: '90%',
      background: 'transparent',
      borderRadius: '0rem',
      '--progress-bar-color': 'transparent',
      '--progress-mask': 'transparent',
      pointerEvents: 'none' as const,
    },
  };

  const props = {
    ...commonProps,
    ...(isMobile ? mobileProps : desktopProps),
  };

  return <model-viewer {...props} />;
});

OptimizedModelViewer.displayName = 'OptimizedModelViewer';

export default OptimizedModelViewer;