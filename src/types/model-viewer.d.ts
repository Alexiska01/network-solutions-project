declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      'auto-rotate'?: boolean;
      'auto-rotate-delay'?: string;
      'rotation-per-second'?: string;
      'camera-controls'?: boolean;
      'disable-zoom'?: boolean;
      'camera-orbit'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      'field-of-view'?: string;
      'interaction-prompt'?: string;
      loading?: 'auto' | 'lazy' | 'eager';
      reveal?: 'auto' | 'interaction' | 'manual';
      exposure?: string;
      'shadow-intensity'?: string;
      'environment-image'?: string;
      onLoad?: () => void;
      onError?: (event: any) => void;
    };
  }
}