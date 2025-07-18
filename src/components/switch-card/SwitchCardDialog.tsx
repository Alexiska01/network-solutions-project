import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { SwitchModel } from "@/data/switchesData";

interface SwitchCardDialogProps {
  switchData: SwitchModel;
  isMobile: boolean;
  getCategoryColor: (category: string) => string;
  getCategoryIcon: (category: string) => string;
  specs: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

const SwitchCardDialog = ({ 
  switchData, 
  isMobile, 
  getCategoryColor,
  getCategoryIcon,
  specs
}: SwitchCardDialogProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log('Modal button clicked:', switchData.link);
    // Небольшая задержка для корректного закрытия модального окна
    setTimeout(() => {
      navigate(switchData.link);
    }, 100);
  };

  return (
    <DialogContent className={cn(
      "max-w-lg",
      isMobile && "max-w-[95vw] mx-2"
    )}>
      <DialogTitle className={cn(
        "flex gap-3",
        isMobile ? "flex-col items-center text-center" : "items-center"
      )}>
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${getCategoryColor(switchData.category)} flex items-center justify-center ${isMobile ? 'mb-2' : ''}`}
        >
          <Icon
            name={getCategoryIcon(switchData.category)}
            size={22}
            className="text-white"
          />
        </div>
        <div>
          <h3 className={cn(
            "font-bold",
            isMobile ? "text-lg text-center" : "text-lg"
          )}>{switchData.title}</h3>
          <p className={cn(
            "text-sm text-gray-500 capitalize",
            isMobile && "text-center"
          )}>
            Спецификации {switchData.category}
          </p>
        </div>
      </DialogTitle>

      <div className={cn(
        "space-y-4",
        isMobile ? "mt-4" : "mt-6"
      )}>
        {specs.map((spec) => (
          <div
            key={spec.label}
            className={cn(
              "p-3 bg-gray-50 rounded-lg",
              isMobile 
                ? "flex flex-col gap-2" 
                : "flex items-center justify-between"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon
                name={spec.icon as any}
                size={18}
                className="text-gray-600"
              />
              <span className="font-medium text-gray-900">{spec.label}</span>
            </div>
            <span className={cn(
              "text-gray-700 font-semibold",
              isMobile && "ml-9"
            )}>{spec.value}</span>
          </div>
        ))}

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Settings" size={18} className="text-blue-600" />
            <span className="font-medium text-gray-900">Функции</span>
          </div>
          <div className={cn(
            "flex flex-wrap",
            isMobile ? "gap-2" : "gap-1"
          )}>
            {switchData.specs.features.map((feature, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block bg-blue-100 text-blue-800 rounded-md",
                  isMobile ? "text-xs px-3 py-1.5" : "text-xs px-2 py-1"
                )}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(
        "flex gap-3",
        isMobile ? "mt-5 flex-col" : "mt-6"
      )}>
        <DialogClose asChild>
          <Button variant="outline" className="flex-1">
            Закрыть
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            onClick={handleNavigate}
          >
            Подробнее
            <Icon name="ExternalLink" className="ml-2 h-4 w-4" />
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default SwitchCardDialog;