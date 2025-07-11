import { useState } from "react";

type BlurImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string;
};

export function BlurImage({
  src,
  alt,
  placeholderSrc,
  className = "",
  ...props
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt={alt}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-contain rounded-lg
            transition-opacity duration-500 pointer-events-none
            ${loaded ? "opacity-0" : "opacity-100"} 
            blur-[16px] scale-105
          `}
          draggable={false}
        />
      )}
      {!placeholderSrc && !loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-lg blur-[16px] scale-105 z-10"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-full object-contain rounded-lg
          transition-opacity duration-500
          ${loaded ? "opacity-100" : "opacity-0"}
          relative z-20
        `}
        {...props}
      />
    </div>
  );
}
