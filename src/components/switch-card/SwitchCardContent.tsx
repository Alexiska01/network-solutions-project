import SwitchCardImage from "./SwitchCardImage";
import SwitchCardSpecs from "./SwitchCardSpecs";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardContentProps {
  switchData: SwitchModel;
  specs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

const SwitchCardContent = ({ switchData, specs }: SwitchCardContentProps) => {
  return (
    <div className="flex h-full w-full">
      {/* Image Section (адаптивная ширина внутри SwitchCardImage) */}
      <SwitchCardImage
        src={switchData.image}
        alt={switchData.title}
        isDesktop={true}
      />
      {/* Content Section */}
  <div className="flex-1 px-6 py-5 xl:py-6 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <h3 className="text-[1.18rem] md:text-[1.34rem] lg:text-[1.48rem] font-semibold text-gray-900 mb-4 leading-snug tracking-tight transition-all duration-500 ease-out group-hover:text-blue-600 group-hover:translate-x-[3px] motion-reduce:transition-none">
          {switchData.title}
        </h3>
        <SwitchCardSpecs specs={specs} className="scale-font-up" />
      </div>
    </div>
  );
};

export default SwitchCardContent;