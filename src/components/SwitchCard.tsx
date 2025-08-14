import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { SwitchModel } from "@/data/switchesData";

// Импортируем созданные компоненты

import SwitchCardContent from "./switch-card/SwitchCardContent";
import SwitchCardMobile from "./switch-card/SwitchCardMobile";
import SwitchCardDialog from "./switch-card/SwitchCardDialog";

interface SwitchCardProps {
  switchData: SwitchModel;
}

const SwitchCard = ({ switchData }: SwitchCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      window.removeEventListener("resize", checkTablet);
    };
  }, []);

  const handleScrollToCard = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(switchData.id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Navigating to:', switchData.link);
    navigate(switchData.link);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "access":
        return "from-blue-500 to-blue-600";
      case "distribution":
        return "from-indigo-500 to-indigo-600";
      case "spine":
        return "from-purple-500 to-purple-600";
      case "leaf":
        return "from-emerald-500 to-emerald-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "access":
        return "Wifi";
      case "distribution":
        return "Network";
      case "spine":
        return "Router";
      case "leaf":
        return "Layers";
      default:
        return "Router";
    }
  };

  const specs = [
    { icon: "Plug", label: "Порты", value: switchData.specs.ports },
    { icon: "Zap", label: "Питание", value: switchData.specs.power },
    {
      icon: "Activity",
      label: "Пропускная способность",
      value: switchData.specs.throughput,
    },
  ];

  const CardContent = (
    <div
      id={switchData.id.toLowerCase()}
      className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleScrollToCard}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />



      {!isMobile && !isTablet ? (
        /* --- ДИСПЛЕЙ ДЛЯ ДЕСКТОПА --- */
        <div className="flex">
          <SwitchCardContent
            switchData={switchData}
            isHovered={isHovered}
            handleLinkClick={handleLinkClick}
            specs={specs}
          />
        </div>
      ) : (
        /* --- МОБИЛЬНАЯ ВЕРСИЯ --- */
        <SwitchCardMobile
          switchData={switchData}
          isHovered={isHovered}
          handleLinkClick={handleLinkClick}
          specs={specs}
          withButton={true}
        />
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/10" />
      </div>
    </div>
  );

  // Создаем содержимое карточки БЕЗ кнопки для мобильной версии
  const CardContentWithoutButton = (
    <div
      id={switchData.id.toLowerCase()}
      className={cn(
        "group relative cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300",
        isMobile 
          ? "mx-auto max-w-sm" 
          : isTablet 
            ? "h-auto" 
            : "h-full"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isTablet && !isMobile ? (
        /* --- ДЕСКТОПНАЯ ВЕРСИЯ --- */
        <div className="flex h-full">
          <SwitchCardContent
            switchData={switchData}
            isHovered={isHovered}
            handleLinkClick={handleLinkClick}
            specs={specs}
          />
        </div>
      ) : (
        /* --- МОБИЛЬНАЯ ВЕРСИЯ БЕЗ КНОПКИ --- */
        <SwitchCardMobile
          switchData={switchData}
          isHovered={isHovered}
          handleLinkClick={handleLinkClick}
          specs={specs}
          withButton={false}
        />
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/10" />
      </div>
    </div>
  );

  /* --- Возврат результата --- */
  if (isMobile) {
    // В мобильной версии возвращаем карточку без Dialog И отдельную кнопку
    return (
      <div className="space-y-4">
        {CardContentWithoutButton}
        <Button
          variant="outline"
          size="default"
          className="w-full h-12 group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile button clicked:', switchData.link);
            navigate(switchData.link);
          }}
        >
          <span className="mr-2 font-medium">Подробнее</span>
          <Icon
            name="ArrowRight"
            className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
          />
        </Button>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{CardContent}</DialogTrigger>
      <SwitchCardDialog
        switchData={switchData}
        isMobile={isMobile}
        getCategoryColor={getCategoryColor}
        getCategoryIcon={getCategoryIcon}
        specs={specs}
      />
    </Dialog>
  );
};

export default SwitchCard;