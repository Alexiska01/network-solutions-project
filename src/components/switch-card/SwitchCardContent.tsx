import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SwitchCardImage from "./SwitchCardImage";
import SwitchCardSpecs from "./SwitchCardSpecs";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardContentProps {
  switchData: SwitchModel;
  isHovered: boolean;
  handleLinkClick: (e: React.MouseEvent) => void;
  specs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

const SwitchCardContent = ({ 
  switchData, 
  isHovered, 
  handleLinkClick,
  specs
}: SwitchCardContentProps) => {
  return (
    <div className="flex h-full">
      {/* Image Section */}
      <SwitchCardImage
        src={switchData.image}
        alt={switchData.title}
        isHovered={isHovered}
        isDesktop={true}
      />

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <motion.h3
            className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {switchData.title}
          </motion.h3>


          {/* Specs Grid */}
          <SwitchCardSpecs
            specs={specs}
            isHovered={isHovered}
          />
        </div>

        {/* Action Button */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent shadow-sm hover:shadow-lg transition-all duration-300"
            onClick={handleLinkClick}
          >
            <span className="mr-2">Подробнее</span>
            <Icon
              name="ArrowRight"
              className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
            />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SwitchCardContent;