import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardProps {
  switchData: SwitchModel;
}

const SwitchCard = ({ switchData }: SwitchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] hover:border-[#2E5BFF]/30 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="aspect-video mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={switchData.image}
                alt={switchData.title}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300",
                  isHovered ? "scale-110" : "scale-100",
                )}
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {switchData.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {switchData.description}
            </p>

            <Button
              variant="outline"
              size="sm"
              className="w-full group hover:bg-[#2E5BFF] hover:text-white hover:border-[#2E5BFF]"
              onClick={() => (window.location.href = switchData.link)}
            >
              Подробнее
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </TooltipTrigger>

        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="font-medium">{switchData.id}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Порты:</span>{" "}
                {switchData.specs.ports}
              </div>
              <div>
                <span className="font-medium">Питание:</span>{" "}
                {switchData.specs.power}
              </div>
              <div>
                <span className="font-medium">Производительность:</span>{" "}
                {switchData.specs.throughput}
              </div>
            </div>
            <div className="text-xs">
              <span className="font-medium">Функции:</span>{" "}
              {switchData.specs.features.join(", ")}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default SwitchCard;
