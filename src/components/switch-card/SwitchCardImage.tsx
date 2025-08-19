import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SwitchCardImageProps {
  src: string;
  alt: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  className?: string;
}

const SwitchCardImage = ({
  src,
  alt,
  isMobile = false,
  isDesktop = false,
  className = "",
}: SwitchCardImageProps) => {
  const [imgErrored, setImgErrored] = useState(false);

  if (isDesktop) {
    return (
  <div className="relative flex-shrink-0 w-[51%] md:w-[49%] lg:w-[47%] xl:w-[46%] 2xl:w-[45%]">
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-l-2xl overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_25%,rgba(59,130,246,0.03)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.03)_75%)] bg-[length:30px_30px]" />
          
          <img
            src={src}
            alt={alt}
            className="relative z-10 w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            onError={() => setImgErrored(true)}
          />

          {imgErrored && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Icon
                  name="ImageOff"
                  size={32}
                  className="text-gray-400 mx-auto mb-2"
                />
                <span className="text-gray-500 text-sm">
                  Изображение недоступно
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="aspect-[4/3] mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden relative shadow-sm">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_25%,rgba(59,130,246,0.03)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.03)_75%)] bg-[length:20px_20px]" />

        <img
          src={src}
          alt={alt}
          className="relative z-10 w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          onError={() => setImgErrored(true)}
        />

        {imgErrored && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Icon
                name="ImageOff"
                size={28}
                className="text-gray-400 mx-auto mb-2"
              />
              <span className="text-gray-500 text-sm">
                Изображение недоступно
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default version for regular card
  return (
    <div className={`aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden p-4 ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]" />

      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-full object-contain drop-shadow-lg transition-transform duration-500 ease-out group-hover:scale-[1.08] group-hover:rotate-[1deg]"
        onError={() => setImgErrored(true)}
      />

      {imgErrored && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Icon
              name="ImageOff"
              size={32}
              className="text-gray-400 mx-auto mb-2"
            />
            <span className="text-gray-500 text-sm">
              Изображение недоступно
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchCardImage;