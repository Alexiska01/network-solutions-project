// Global type declarations for model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export interface Hotspot {
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

export interface Professional3DViewerProps {
  modelRef: React.RefObject<any>;
  modelPath: string;
  indicatorsOn: boolean;
  onToggleIndicators: () => void;
}

export interface ViewerState {
  isFullscreen: boolean;
  background: string;
  viewMode: string;
  selectedHotspot: string | null;
  showControls: boolean;
  cameraPreset: string;
  showWireframe: boolean;
  showSpecs: boolean;
  modelLoaded: boolean;
}

export type BackgroundType = 'studio' | 'neutral' | 'dark' | 'tech';
export type CameraPresetType = 'default' | 'front' | 'back' | 'top' | 'ports' | 'overview';