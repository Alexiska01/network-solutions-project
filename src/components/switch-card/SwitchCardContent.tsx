import { motion } from "framer-motion";
import SwitchCardImage from "./SwitchCardImage";
import SwitchCardSpecs from "./SwitchCardSpecs";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardContentProps {
  switchData: SwitchModel;
  isHovered: boolean;
  specs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

const SwitchCardContent = ({ 
  switchData, 
  isHovered, 
  specs
}: SwitchCardContentProps) => {
  return (
    <div className="flex h-full w-full">
      {/* Image Section (адаптивная ширина внутри SwitchCardImage) */}
      <SwitchCardImage
        src={switchData.image}
        alt={switchData.title}
        isHovered={isHovered}
        isDesktop={true}
      />
      {/* Content Section */}
      <div className="flex-1 px-6 py-5 xl:py-6 flex flex-col justify-center">
        <motion.h3
          className="text-[1.2rem] md:text-[1.38rem] lg:text-[1.54rem] font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-snug tracking-tight"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {switchData.title}
        </motion.h3>
        <SwitchCardSpecs specs={specs} className="scale-font-up" />
      </div>
    </div>
  );
};

export default SwitchCardContent;