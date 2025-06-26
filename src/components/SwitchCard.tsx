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
import { ArrowRight } from "lucide-react";
import { SwitchModel } from "@/data/switchesData";

// Стили для подсветки и скролла
const highlightStyles = `
  .switch-card-base {
    position: relative;
    scroll-margin-block: 50vh; /* Чтобы при scrollIntoView элемент центрировался */
  }

  /* Отключаем стандартный outline браузера при focus/target */
  .switch-card-base:focus,
  .switch-card-base:target,
  .switch-card-base.active {
    outline: none !important;
  }

  /* Собственная тень при :target или классе active */
  .switch-card-base:target,
  .switch-card-base.active {
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.05),
      0 8px 16px rgba(0, 0, 0, 0.10);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    transform: scale(1.02);
  }

  /* Анимация исчезания тени через 2 секунды */
  @keyframes highlightFade {
    0% {
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.05),
        0 8px 16px rgba(0, 0, 0, 0.10);
      transform: scale(1.02);
    }
    80% {
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.02),
        0 2px 6px rgba(0, 0, 0, 0.04);
      transform: scale(1.00);
    }
    100% {
      box-shadow: none;
      transform: none;
    }
  }
`;

interface SwitchCardProps {
  switchData: SwitchModel;
}

const SwitchCard = ({ switchData }: SwitchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  // Добавляем стили и определяем размер экрана
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = highlightStyles;
    document.head.appendChild(styleElement);

    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
      window.removeEventListener("resize", checkTablet);
    };
  }, []);

  // Функция для плавного скролла и выделения
  const handleScrollToCard = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(switchData.id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("active");
      setTimeout(() => el.classList.remove("active"), 2000);
    }
  };

  // Функция для перехода по ссылке
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = switchData.link;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            id={switchData.id.toLowerCase()}
            tabIndex={0}
            className={cn(
              "bg-white rounded-xl border border-gray-200 p-4 transition-all duration-300 cursor-pointer switch-card-base focus:outline-none",
              "hover:-translate-y-1",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleScrollToCard}
          >
            {!isMobile && !isTablet ? (
              <div className="flex gap-4 items-center">
                <div className="w-2/5 flex-shrink-0">
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={switchData.image}
                      alt={switchData.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-300",
                        isHovered ? "scale-110" : "scale-100",
                      )}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {switchData.title}
                  </h3>
                  <p className="text-gray-600 text-base mb-4 leading-relaxed">
                    {switchData.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="text-xs">🔌</span>
                      {switchData.specs.ports}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="text-xs">⚡</span>
                      {switchData.specs.throughput}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit group hover:bg-[#2E5BFF] hover:text-white hover:border-[#2E5BFF]"
                    onClick={handleLinkClick}
                  >
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="aspect-video mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={switchData.image}
                    alt={switchData.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-300",
                      isHovered ? "scale-110" : "scale-100",
                    )}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {switchData.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {switchData.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group hover:bg-[#2E5BFF] hover:text-white hover:border-[#2E5BFF]"
                  onClick={handleLinkClick}
                >
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
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

export default SwitchCard;
