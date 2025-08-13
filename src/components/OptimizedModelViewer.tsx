import { memo } from 'react';

interface OptimizedModelViewerProps {
  src: string;
  alt: string;
  isMobile: boolean;
  onLoad: () => void;
  onError: () => void;
}

const OptimizedModelViewer = memo<OptimizedModelViewerProps>(({ 
  src, 
  alt, 
  isMobile, 
  onLoad, 
  onError 
}) => {
  // Общие свойства для всех устройств (одинаковые для всех серий)
  const commonProps = {
    src,
    alt,
    'auto-rotate': true,
    'auto-rotate-delay': '0',
    'exposure': '1.2',
    'shadow-intensity': '0.3',
    'environment-image': 'neutral',
    'interaction-prompt': 'none',
    loading: 'eager' as const,
    reveal: 'auto' as const,
    onLoad,
    onError,
  };

  // Свойства для мобильных устройств (одинаковые для всех серий)
  const mobileProps = {
    'rotation-per-second': '32deg',
    'camera-orbit': '0deg 80deg 1.1m',
    'min-camera-orbit': 'auto auto 1.1m',
    'max-camera-orbit': 'auto auto 1.1m',
    'field-of-view': '40deg',
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

  // Свойства для десктопа (одинаковые для всех серий)
  const desktopProps = {
    'rotation-per-second': '35deg',
    'camera-controls': true,
    'camera-orbit': '0deg 80deg 1.02m',
    'min-camera-orbit': 'auto auto 0.4m',
    'max-camera-orbit': 'auto auto 2.5m',
    'field-of-view': '35deg',
    exposure: '1.1',
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