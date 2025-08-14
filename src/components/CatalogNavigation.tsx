import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";

interface NavigationItem {
  id: string;
  name: string;
  icon: keyof typeof LucideIcons;
  children?: NavigationItem[];
}

interface CatalogNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

const navigationData: NavigationItem[] = [
  {
    id: "corporate-lan",
    name: "Корпоративные ЛВС",
    icon: "Building2",
    children: [
      {
        id: "access-level",
        name: "Уровень доступа",
        icon: "Wifi",
        children: [
          { id: "ids3530", name: "IDS3530", icon: "Router" },
          { id: "ids3730", name: "IDS3730", icon: "Zap" },
          { id: "ids4530", name: "IDS4530", icon: "Network" },
          { id: "ids6012", name: "IDS6012", icon: "Shield" },
        ],
      },
      {
        id: "distribution-level",
        name: "Уровень распределения",
        icon: "GitBranch",
        children: [
          { id: "ids6010", name: "IDS6010", icon: "Server" },
          { id: "ids6030", name: "IDS6030", icon: "Layers" },
          { id: "ids6032", name: "IDS6032", icon: "Boxes" },
        ],
      },
    ],
  },
  {
    id: "data-center",
    name: "Центры обработки данных",
    icon: "Database",
    children: [
      {
        id: "spine-level",
        name: "Уровень Spine",
        icon: "TreePine",
        children: [
          { id: "ids8030", name: "IDS8030", icon: "HardDrive" },
          { id: "ids8010", name: "IDS8010", icon: "Server" },
        ],
      },
      {
        id: "leaf-level",
        name: "Уровень Leaf",
        icon: "TreeDeciduous",
        children: [
          { id: "ids6150", name: "IDS6150", icon: "Warehouse" },
          { id: "ids6130", name: "IDS6130", icon: "Layers" },
        ],
      },
    ],
  },
];

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({
  onNavigate,
  activeSection,
}) => {
  const isMobile = useIsMobile();
  const [openMap, setOpenMap] = React.useState<Record<number, string | null>>(
    {},
  );

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl" />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg" />

      {/* Content */}
      <div className="relative p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Каталог продуктов
          </h3>
          <p className="text-sm text-gray-600">
            Выберите категорию для навигации
          </p>
        </div>

        <nav className="space-y-1">
          {navigationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NavigationItem
                item={item}
                onNavigate={onNavigate}
                activeSection={activeSection}
                level={0}
                openMap={openMap}
                setOpenMap={setOpenMap}
              />
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

interface NavigationItemProps {
  item: NavigationItem;
  onNavigate: (id: string) => void;
  activeSection?: string;
  level: number;
  openMap: Record<number, string | null>;
  setOpenMap: React.Dispatch<
    React.SetStateAction<Record<number, string | null>>
  >;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  onNavigate,
  activeSection,
  level,
  openMap,
  setOpenMap,
}) => {
  const isOpen = openMap[level] === item.id;
  const isActive = activeSection === item.id;

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (item.children) {
      setOpenMap((prev) => {
        const next = {
          ...prev,
          [level]: prev[level] === item.id ? null : item.id,
        };
        Object.keys(next).forEach((key) => {
          if (Number(key) > level) delete next[Number(key)];
        });
        return next;
      });
    } else {
      e.preventDefault();
      onNavigate(item.id);

      const el = document.getElementById(item.id.toLowerCase());
      if (el) {
        document.querySelectorAll(".active").forEach((elem) => {
          elem.classList.remove("active");
        });

        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });

        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );

        el.classList.add("active");
        el.addEventListener(
          "animationend",
          () => el.classList.remove("active"),
          { once: true },
        );
      }
    }
  };

  const getIconColor = () => {
    if (isActive) return "text-blue-600";
    if (level === 0) return "text-gray-700";
    if (level === 1) return "text-gray-600";
    return "text-gray-500";
  };

  const getGradientForLevel = () => {
    if (level === 0) return "from-blue-500 to-indigo-600";
    if (level === 1) return "from-blue-400 to-blue-500";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div>
      <motion.button
        onClick={handleHeaderClick}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group w-full text-left
          ${level === 0 ? "px-4 py-3 rounded-xl font-bold text-base" : level === 1 ? "px-3 py-2 rounded-lg font-semibold text-sm max-w-[300px]" : "px-2 py-1.5 rounded-md font-medium text-sm max-w-[262px]"}
          transition-all duration-300 flex items-center justify-between relative overflow-hidden
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
              : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/50 hover:shadow-md"
          }
        `}
        style={{ marginLeft: `${level * 16}px` }}
      >
        {/* Background gradient on hover */}
        {!isActive && (
          <div
            className={`absolute inset-0 bg-gradient-to-r ${getGradientForLevel()} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />
        )}

        {/* Left border indicator */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 ${
            isActive
              ? "bg-white"
              : level === 0
                ? "bg-blue-500 scale-y-0 group-hover:scale-y-100"
                : level === 1
                  ? "bg-blue-400 scale-y-0 group-hover:scale-y-100"
                  : "bg-gray-400 scale-y-0 group-hover:scale-y-100"
          }`}
        />

          <div className="flex items-center gap-3 relative z-10">
            {/* Показываем иконку только для первого уровня */}
            {level === 0 && (
              <div
                className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white/20"
                    : "group-hover:bg-white/60 group-hover:shadow-sm"
                }`}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-white" : getIconColor()
                  }`}
                />
              </div>
            )}
            <span className="relative z-10">{item.name}</span>
          </div>

        {item.children && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`p-1 rounded-lg transition-all duration-300 ${
              isActive ? "bg-white/20" : "group-hover:bg-white/60"
            }`}
          >
            <Icon
              name="ChevronDown"
              size={14}
              className={`transition-colors duration-300 ${
                isActive ? "text-white" : "text-gray-500"
              }`}
            />
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {item.children && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1">
              {item.children.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <NavigationItem
                    item={child}
                    onNavigate={onNavigate}
                    activeSection={activeSection}
                    level={level + 1}
                    openMap={openMap}
                    setOpenMap={setOpenMap}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogNavigation;
