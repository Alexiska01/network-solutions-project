import SwitchCardImage from "./SwitchCardImage";
import SwitchCardSpecs from "./SwitchCardSpecs";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardMobileProps {
  switchData: SwitchModel;
  isHovered: boolean;
  specs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

const SwitchCardMobile = ({ 
  switchData, 
  isHovered, 
  specs,
}: SwitchCardMobileProps) => {
  return (
  <div className="px-4 py-3 sm:px-5 sm:py-4">
      {/* Image */}
      <SwitchCardImage
        src={switchData.image}
        alt={switchData.title}
        isHovered={isHovered}
        isMobile={true}
      />

      {/* Title */}
  <h3 className="text-[1.1rem] sm:text-[1.2rem] font-semibold text-gray-900 mb-2 leading-snug tracking-tight">
        {switchData.title}
      </h3>

  {/* Описание скрыто в мобильной версии по требованию */}

      {/* Specs */}
      <SwitchCardSpecs
        specs={specs}
        isMobile={true}
        className="scale-font-up"
      />

  {/* Кнопка удалена – кликаем по всей карточке */}
    </div>
  );
};

export default SwitchCardMobile;