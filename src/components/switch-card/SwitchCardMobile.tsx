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
    <div className="p-5">
      {/* Image */}
      <SwitchCardImage
        src={switchData.image}
        alt={switchData.title}
        isHovered={isHovered}
        isMobile={true}
      />

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
        {switchData.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
        {switchData.description}
      </p>

      {/* Specs */}
      <SwitchCardSpecs
        specs={specs}
        isMobile={true}
        isHovered={isHovered}
      />

      {/* Button (optional) */}
      {withButton && (
        <Button
          variant="outline"
          size="default"
          className="w-full h-12 group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={handleLinkClick}
        >
          <span className="mr-2 font-medium">Подробнее</span>
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