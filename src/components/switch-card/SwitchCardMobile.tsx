import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SwitchCardImage from "./SwitchCardImage";
import SwitchCardSpecs from "./SwitchCardSpecs";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardMobileProps {
  switchData: SwitchModel;
  isHovered: boolean;
  handleLinkClick: (e: React.MouseEvent) => void;
  specs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
  withButton?: boolean;
}

const SwitchCardMobile = ({ 
  switchData, 
  isHovered, 
  handleLinkClick,
  specs,
  withButton = false
}: SwitchCardMobileProps) => {
  return (
  <div className="px-3 py-3 sm:px-4 sm:py-4">
      {/* Image */}
      <SwitchCardImage
        src={switchData.image}
        alt={switchData.title}
        isHovered={isHovered}
        isMobile={true}
      />

      {/* Title */}
  <h3 className="text-[0.95rem] sm:text-[1.05rem] font-semibold text-gray-900 mb-2 leading-snug tracking-tight">
        {switchData.title}
      </h3>

      {/* Description */}
  <p className="text-gray-600 text-[0.72rem] sm:text-[0.8rem] leading-snug sm:leading-tight mb-3 line-clamp-2">
        {switchData.description}
      </p>

      {/* Specs */}
      <SwitchCardSpecs
        specs={specs}
        isMobile={true}
      />

      {/* Button (optional) */}
    {withButton && (
        <Button
      variant="outline"
      size="sm"
      className="w-full h-10 sm:h-11 text-[0.8rem] sm:text-[0.85rem] font-medium group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={handleLinkClick}
        >
      <span className="mr-2">Подробнее</span>
          <Icon
            name="ArrowRight"
            className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
          />
        </Button>
      )}
    </div>
  );
};

export default SwitchCardMobile;