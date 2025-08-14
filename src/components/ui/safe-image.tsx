import React, { useState, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NSA4NUgxMTVWMTE1SDg1Vjg1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
  alt,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <img
        {...props}
        src={fallback}
        alt={alt}
        onError={() => {}}
        onLoad={() => {}}
      />
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      crossOrigin="anonymous"
      style={{
        ...props.style,
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};