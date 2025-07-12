import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

interface MobileNavigationItem {
  id: string;
  name: string;
  shortName: string; // Краткое название для мобильной версии
  icon: string;
  category: "corporate" | "datacenter";
  subcategory?: "access" | "distribution" | "spine" | "leaf";
}

interface MobileCatalogNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

const mobileNavigationData: MobileNavigationItem[] = [
  {
    id: "corporate-lan",
    name: "Корпоративные ЛВС",
    shortName: "Корпоративные",
    icon: "Building2",
    category: "corporate",
  },
  {
    id: "access-level",
    name: "Уровень доступа",
    shortName: "Доступ",
    icon: "Wifi",
    category: "corporate",
    subcategory: "access",
  },
  {
    id: "distribution-level",
    name: "Уровень распределения",
    shortName: "Распределение",
    icon: "GitBranch",
    category: "corporate",
    subcategory: "distribution",
  },
  {
    id: "data-center",
    name: "Центры обработки данных",
    shortName: "ЦОД",
    icon: "Database",
    category: "datacenter",
  },
  {
    id: "spine-level",
    name: "Уровень Spine",
    shortName: "Spine",
    icon: "TreePine",
    category: "datacenter",
    subcategory: "spine",
  },
  {
    id: "leaf-level",
    name: "Уровень Leaf",
    shortName: "Leaf",
    icon: "TreeDeciduous",
    category: "datacenter",
    subcategory: "leaf",
  },
];

const MobileCatalogNavigation: React.FC<MobileCatalogNavigationProps> = ({
  onNavigate,
  activeSection,
}) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);


  // Не показывать на десктопе
  if (!isMobile) {
    return null;
  }

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    
    // Прокрутка к элементу
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "corporate":
        return "from-blue-500 to-indigo-600";
      case "datacenter":
        return "from-purple-500 to-purple-700";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getSubcategoryColor = (subcategory?: string) => {
    switch (subcategory) {
      case "access":
        return "from-blue-400 to-blue-600";
      case "distribution":
        return "from-indigo-400 to-indigo-600";
      case "spine":
        return "from-purple-400 to-purple-600";
      case "leaf":
        return "from-emerald-400 to-emerald-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };



  return (
    <>
      {/* Компактная липкая навигация */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3">
          {/* Основная кнопка навигации */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Icon name="Navigation" size={16} className="text-white" />
              </div>
              <span>Быстрая навигация</span>
            </div>
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="ChevronDown" size={16} className="text-white/80" />
            </motion.div>
          </motion.button>
        </div>

        {/* Расширенное меню */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="px-4 py-3 bg-gray-50/50">
                <div className="grid grid-cols-2 gap-2">
                  {mobileNavigationData.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => {
                        handleNavigate(item.id);
                        setIsExpanded(false);
                      }}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg font-medium text-sm transition-all duration-300",
                        activeSection === item.id
                          ? `bg-gradient-to-r ${item.subcategory ? getSubcategoryColor(item.subcategory) : getCategoryColor(item.category)} text-white shadow-md`
                          : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-lg transition-all duration-300",
                        activeSection === item.id
                          ? "bg-white/20"
                          : "bg-gray-100"
                      )}>
                        <Icon
                          name={item.icon as any}
                          size={14}
                          className={cn(
                            "transition-colors duration-300",
                            activeSection === item.id
                              ? "text-white"
                              : "text-gray-600"
                          )}
                        />
                      </div>
                      <span className="text-xs leading-tight">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Кнопка "Наверх" */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: mobileNavigationData.length * 0.05 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsExpanded(false);
                  }}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm text-gray-600 bg-white hover:bg-gray-100 transition-all duration-300 border border-gray-200"
                >
                  <Icon name="ArrowUp" size={16} />
                  <span>Наверх страницы</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Плавающая кнопка навигации */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 right-4 z-50"
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon name={isExpanded ? "X" : "Menu"} size={24} />
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
  );
};

export default MobileCatalogNavigation;