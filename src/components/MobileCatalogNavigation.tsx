import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

interface MobileNavigationItem {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  category: "corporate" | "datacenter";
  subcategory?: "access" | "distribution" | "spine" | "leaf";
  color: string;
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
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "access-level",
    name: "Уровень доступа",
    shortName: "Доступ",
    icon: "Wifi",
    category: "corporate",
    subcategory: "access",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "distribution-level",
    name: "Распределение",
    shortName: "Распределение",
    icon: "GitBranch",
    category: "corporate",
    subcategory: "distribution",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: "data-center",
    name: "Центры обработки данных",
    shortName: "ЦОД",
    icon: "Database",
    category: "datacenter",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "spine-level",
    name: "Spine коммутаторы",
    shortName: "Spine",
    icon: "TreePine",
    category: "datacenter",
    subcategory: "spine",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: "leaf-level",
    name: "Leaf коммутаторы",
    shortName: "Leaf",
    icon: "TreeDeciduous",
    category: "datacenter",
    subcategory: "leaf",
    color: "from-emerald-400 to-emerald-600",
  },
];

const MobileCatalogNavigation: React.FC<MobileCatalogNavigationProps> = ({
  onNavigate,
  activeSection,
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Убираем hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Не показывать на десктопе или пока не смонтировано
  if (!mounted || !isMobile) {
    return null;
  }

  // Отслеживание скролла для динамического поведения
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
    
    // Небольшая задержка для плавности
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth", 
          block: "start",
          inline: "nearest"
        });
      }
    }, 100);
  };

  return (
    <>
      {/* Верхняя липкая навигация */}
      <motion.div 
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrollY > 100 
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200" 
            : "bg-white/80 backdrop-blur-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-3">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
              isOpen
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg"
            )}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Icon 
                  name={isOpen ? "X" : "Navigation"} 
                  size={16} 
                  className="text-white" 
                />
              </div>
              <span>{isOpen ? "Закрыть меню" : "Быстрая навигация"}</span>
            </div>
            
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="ChevronDown" size={16} className="text-white/80" />
            </motion.div>
          </motion.button>
        </div>

        {/* Выпадающее меню */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white"
            >
              <div className="px-4 py-4">
                {/* Основные категории */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Основные разделы
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {mobileNavigationData
                      .filter(item => !item.subcategory)
                      .map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => handleNavigate(item.id)}
                          className={cn(
                            "group relative overflow-hidden flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-300 border-2",
                            activeSection === item.id
                              ? `bg-gradient-to-br ${item.color} text-white border-transparent shadow-lg`
                              : "bg-white text-gray-700 hover:shadow-md border-gray-200 hover:border-gray-300"
                          )}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Фоновый эффект */}
                          {activeSection !== item.id && (
                            <div className={cn(
                              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                              item.color
                            )} />
                          )}
                          
                          <div className={cn(
                            "p-2 rounded-xl transition-all duration-300",
                            activeSection === item.id
                              ? "bg-white/20"
                              : "bg-gray-100 group-hover:bg-gray-200"
                          )}>
                            <Icon
                              name={item.icon as any}
                              size={20}
                              className={cn(
                                "transition-colors duration-300",
                                activeSection === item.id
                                  ? "text-white"
                                  : "text-gray-600"
                              )}
                            />
                          </div>
                          <span className="text-center leading-tight">{item.shortName}</span>
                        </motion.button>
                      ))}
                  </div>
                </div>

                {/* Подкатегории */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Уровни сети
                  </h4>
                  <div className="space-y-2">
                    {mobileNavigationData
                      .filter(item => item.subcategory)
                      .map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                          onClick={() => handleNavigate(item.id)}
                          className={cn(
                            "group w-full flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-all duration-300 border",
                            activeSection === item.id
                              ? `bg-gradient-to-r ${item.color} text-white border-transparent shadow-md`
                              : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm border-gray-200"
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Индикатор слева */}
                          <div className={cn(
                            "w-1 h-8 rounded-full transition-all duration-300",
                            activeSection === item.id
                              ? "bg-white"
                              : "bg-gray-300 group-hover:bg-gray-400"
                          )} />
                          
                          <div className={cn(
                            "p-1.5 rounded-lg transition-all duration-300",
                            activeSection === item.id
                              ? "bg-white/20"
                              : "bg-gray-100 group-hover:bg-gray-200"
                          )}>
                            <Icon
                              name={item.icon as any}
                              size={16}
                              className={cn(
                                "transition-colors duration-300",
                                activeSection === item.id
                                  ? "text-white"
                                  : "text-gray-600"
                              )}
                            />
                          </div>
                          <span className="flex-1 text-left">{item.name}</span>
                          
                          {activeSection === item.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </motion.button>
                      ))}
                  </div>
                </div>

                {/* Действия */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex gap-3">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-gray-600 bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:shadow-sm"
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon name="ArrowUp" size={16} />
                      <span>Наверх</span>
                    </motion.button>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon name="X" size={16} />
                      <span>Закрыть</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Плавающая кнопка быстрого доступа */}
      <AnimatePresence>
        {scrollY > 300 && !isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-4 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon name="Navigation" size={24} />
            </motion.button>
            
            {/* Пульсирующий эффект */}
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileCatalogNavigation;