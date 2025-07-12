import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

interface SwitchCardProps {
  switchData: SwitchModel;
  onSpecFilter?: (filterKey: string, value: string) => void;
}

const SwitchCard = ({ switchData, onSpecFilter }: SwitchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgErrored, setImgErrored] = useState(false);
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
    e.stopPropagation();
    window.location.href = switchData.link;
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
        return "GitBranch";
      case "spine":
        return "TreePine";
      case "leaf":
        return "TreeDeciduous";
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
    <motion.div
      id={switchData.id.toLowerCase()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleScrollToCard}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(switchData.category)} text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}
        >
          <Icon name={getCategoryIcon(switchData.category)} size={12} />
          <span className="capitalize">{switchData.category}</span>
        </div>
      </div>

      {!isMobile && !isTablet ? (
        /* --- ДИСПЛЕЙ ДЛЯ ДЕСКТОПА --- */
        <div className="flex">
          {/* Image Section */}
          <div className="w-2/5 relative">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]" />

              <motion.img
                src={switchData.image}
                alt={`${switchData.title} - коммутатор`}
                className="relative z-10 w-4/5 h-4/5 object-contain drop-shadow-lg"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotateY: isHovered ? 15 : 0,
                }}
                transition={{ duration: 0.3 }}
                onError={() => setImgErrored(true)}
              />

              {imgErrored && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Icon
                      name="ImageOff"
                      size={32}
                      className="text-gray-400 mx-auto mb-2"
                    />
                    <span className="text-gray-500 text-sm">
                      Изображение недоступно
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

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

              <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-3">
                {switchData.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300">
                      <Icon
                        name={spec.icon as any}
                        size={16}
                        className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {spec.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
      ) : (
        /* --- МЕДИА ДЛЯ МОБИЛЬНЫХ --- */
        <div className="p-4">
          <div className="aspect-video mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:15px_15px]" />

            <motion.img
              src={switchData.image}
              alt={switchData.title}
              className="relative z-10 w-full h-full object-contain p-4"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              onError={() => setImgErrored(true)}
            />

            {imgErrored && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Icon
                    name="ImageOff"
                    size={24}
                    className="text-gray-400 mx-auto mb-1"
                  />
                  <span className="text-gray-500 text-xs">
                    Изображение недоступно
                  </span>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {switchData.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {switchData.description}
          </p>

          {/* Mobile specs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex-shrink-0 bg-gray-50 rounded-lg px-3 py-2 min-w-fit"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name={spec.icon as any}
                    size={14}
                    className="text-gray-500"
                  />
                  <span className="text-xs font-medium text-gray-900">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300"
            onClick={handleLinkClick}
          >
            <span className="mr-2">Подробнее</span>
            <Icon
              name="ArrowRight"
              className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
            />
          </Button>
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/10" />
      </div>
    </motion.div>
  );

  /* --- Модалка со спецификациями --- */
  return (
    <Dialog>
      <DialogTrigger asChild>{CardContent}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCategoryColor(switchData.category)} flex items-center justify-center`}
          >
            <Icon
              name={getCategoryIcon(switchData.category)}
              size={20}
              className="text-white"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{switchData.title}</h3>
            <p className="text-sm text-gray-500 capitalize">
              Спецификации {switchData.category}
            </p>
          </div>
        </DialogTitle>

        <div className="space-y-4 mt-6">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Icon
                  name={spec.icon as any}
                  size={18}
                  className="text-gray-600"
                />
                <span className="font-medium text-gray-900">{spec.label}</span>
              </div>
              <span className="text-gray-700 font-semibold">{spec.value}</span>
            </div>
          ))}

          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Settings" size={18} className="text-blue-600" />
              <span className="font-medium text-gray-900">Функции</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {switchData.specs.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Закрыть
            </Button>
          </DialogClose>
          <Button
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            onClick={handleLinkClick}
          >
            Подробнее
            <Icon name="ExternalLink" className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchCard;
