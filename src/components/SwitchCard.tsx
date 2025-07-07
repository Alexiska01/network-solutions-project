import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { SwitchModel } from "@/data/switchesData";

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
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-4px) scale(1.02);
  }
`;

interface SwitchCardProps {
  switchData: SwitchModel;
  onSpecFilter?: (filterKey: string, value: string) => void;
}

const SwitchCard = ({ switchData, onSpecFilter }: SwitchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = baseStyles;
    document.head.appendChild(styleElement);

    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      document.head.removeChild(styleElement);
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
    e.stopPropagation();
    window.location.href = switchData.link;
  };

  const CardContent = (
    <div
      id={switchData.id.toLowerCase()}
      tabIndex={0}
      className={cn(
        "switch-card-base bg-white rounded-xl border border-gray-200 p-4 cursor-pointer focus:outline-none",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleScrollToCard}
    >
      {!isMobile && !isTablet ? (
        <div className="flex gap-4 items-center">
          <div className="w-2/5 flex-shrink-0">
            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={switchData.image}
                alt={`${switchData.title} - коммутатор`}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300",
                  isHovered ? "scale-110" : "scale-100",
                )}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  Изображение недоступно
                </span>
              </div>
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
                {switchData.specs.power}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                <span className="text-xs">📊</span>
                {switchData.specs.throughput}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit group hover:bg-gray-800 hover:text-white hover:border-gray-800"
              onClick={handleLinkClick}
            >
              Подробнее
              <Icon
                name="ArrowRight"
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="aspect-video mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={switchData.image}
              alt={switchData.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                isHovered ? "scale-110" : "scale-100",
              )}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                Изображение недоступно
              </span>
            </div>
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
            className="w-full group hover:bg-gray-800 hover:text-white hover:border-gray-800"
            onClick={handleLinkClick}
          >
            Подробнее
            <Icon
              name="ArrowRight"
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{CardContent}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle>{switchData.title} — спецификации</DialogTitle>
        <ul className="space-y-2 mt-4">
          <li>
            <strong>Порты:</strong>{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onSpecFilter?.("ports", switchData.specs.ports)}
            >
              {switchData.specs.ports}
            </button>
          </li>
          <li>
            <strong>Питание:</strong>{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onSpecFilter?.("power", switchData.specs.power)}
            >
              {switchData.specs.power}
            </button>
          </li>
          <li>
            <strong>Пропускная способность:</strong>{" "}
            <span>{switchData.specs.throughput}</span>
          </li>
          <li>
            <strong>Функции:</strong>{" "}
            <span>{switchData.specs.features.join(", ")}</span>
          </li>
          <li>
            <strong>Категория:</strong>{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onSpecFilter?.("category", switchData.category)}
            >
              {switchData.category}
            </button>
          </li>
        </ul>
        <DialogClose asChild>
          <Button variant="ghost" className="mt-4">
            Закрыть
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchCard;
