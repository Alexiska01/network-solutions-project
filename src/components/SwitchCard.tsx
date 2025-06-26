import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import { SwitchModel } from "@/data/switchesData";

// Базовые стили для карточек
const baseStyles = `
  .switch-card-base {
    position: relative;
    scroll-margin-block: 50vh;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .switch-card-base:focus,
  .switch-card-base:focus-visible {
    outline: none !important;
  }

  .switch-card-base:hover,
  .switch-card-base.active {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-4px) scale(1.02);
  }
`;

interface SwitchCardProps {
  switchData: SwitchModel;
}

const SwitchCard = ({ switchData }: SwitchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Внедряем базовые стили
    const styleElement = document.createElement("style");
    styleElement.textContent = baseStyles;
    document.head.appendChild(styleElement);

    // Определяем tablet
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      window.removeEventListener("resize", checkTablet);
      document.head.removeChild(styleElement);
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "access":
        return "bg-[#2E5BFF]";
      case "distribution":
        return "bg-[#FF6B35]";
      case "spine":
        return "bg-[#10B981]";
      case "leaf":
        return "bg-[#8B5CF6]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      id={switchData.id}
      className={cn(
        "switch-card-base bg-white rounded-xl border border-gray-200 p-6",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div
              className={cn(
                "w-3 h-3 rounded-full mr-3",
                getCategoryColor(switchData.category),
              )}
            ></div>
            <h3 className="text-xl font-bold text-gray-900">
              {switchData.title}
            </h3>
          </div>

          <p className="text-gray-600 mb-4">{switchData.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {switchData.specs.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {spec.value}
                </div>
                <div className="text-sm text-gray-500">{spec.label}</div>
              </div>
            ))}
          </div>

          {switchData.features && (
            <div className="flex flex-wrap gap-2 mb-4">
              {switchData.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-6 flex-shrink-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-[#2E5BFF] hover:text-white"
                >
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Подробнее о {switchData.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SwitchCard;
