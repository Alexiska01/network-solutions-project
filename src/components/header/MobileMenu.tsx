import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  navigationItems,
  productSubmenuItems,
  type NavItem,
} from "./navigationData";
import Icon from "@/components/ui/icon";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface MenuLevel {
  title: string;
  items: NavItem[];
  parentPath?: string;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && menuStack.length === 0) {
      setMenuStack([{ title: "Меню", items: navigationItems }]);
    }
  }, [isOpen, menuStack.length]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setMenuStack([]);
        setActiveItem(null);
        setExpandedItems(new Set());
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigateToLevel = (newLevel: MenuLevel) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuStack((prev) => [...prev, newLevel]);
      setIsTransitioning(false);
    }, 150);
  };

  const navigateBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuStack((prev) => prev.slice(0, -1));
      setIsTransitioning(false);
    }, 150);
  };

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    setActiveItem(item.path);

    if (item.path === "/products" && item.hasSubmenu) {
      e.preventDefault();
      navigateToLevel({
        title: "Оборудование iDATA",
        items: productSubmenuItems,
      });
    } else if (item.path === "/contacts") {
      e.preventDefault();
      onClose();
      // Скролл к секции контактов с небольшой задержкой для закрытия меню
      setTimeout(() => {
        const contactsSection = document.getElementById("contacts-section");
        if (contactsSection) {
          contactsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          // Если секции нет на странице, переходим к концу страницы
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    } else if (item.hasThirdLevel && item.items) {
      e.preventDefault();
      toggleExpanded(item.path);
    } else if (item.submenuItems) {
      e.preventDefault();
      navigateToLevel({
        title: item.name,
        items: item.submenuItems,
        parentPath: item.path,
      });
    } else if (item.items && item.items.length > 0) {
      e.preventDefault();
      navigateToLevel({
        title: item.name,
        items: item.items,
        parentPath: item.path,
      });
    } else if (!item.hasSubmenu && !item.submenuItems && !item.items) {
      onClose();
    }
  };

  // Обработка свайпа для закрытия
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStart;

    if (diffX > 50) {
      // Свайп вправо
      onClose();
    }
  };

  const renderMenuItem = (
    item: NavItem,
    level: number = 0,
    index: number = 0,
  ) => {
    const hasChildren =
      item.hasSubmenu ||
      item.submenuItems ||
      (item.items && item.items.length > 0);
    const isActive = activeItem === item.path;
    const isExpanded = expandedItems.has(item.path);
    const hasThirdLevel = item.hasThirdLevel && item.items;

    const MenuItem = hasChildren ? "button" : Link;
    const menuItemProps = hasChildren
      ? {
          onClick: (e: React.MouseEvent) => handleItemClick(item, e),
        }
      : {
          to: item.path,
          onClick: (e: React.MouseEvent) => handleItemClick(item, e),
        };

    return (
      <motion.div
        key={item.path}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.05,
          duration: 0.3,
          ease: "easeOut",
        }}
        className="overflow-hidden"
      >
        <MenuItem
          {...menuItemProps}
          className={`
            group relative w-full flex items-center justify-between p-4 
            text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50
            active:scale-95 transition-all duration-200 min-h-[56px] 
            border-b border-gray-50 last:border-b-0
            ${isActive ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm" : ""}
            ${level > 0 ? "ml-4 border-l-2 border-blue-100" : ""}
          `}
          style={{ paddingLeft: `${16 + level * 20}px` }}
        >
          <div className="flex items-center space-x-3 flex-1">
            {item.icon && level === 0 && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  p-2 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 shadow-sm"
                      : "bg-gray-50 text-gray-500 group-hover:bg-white group-hover:text-blue-500"
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
              </motion.div>
            )}
            <div className="flex-1">
              <span
                className={`
                text-base font-medium block transition-colors duration-200
                ${isActive ? "text-blue-700" : "text-gray-700 group-hover:text-gray-900"}
              `}
              >
                {item.name}
              </span>
              {level === 0 && (
                <span className="text-xs text-gray-500 block mt-0.5">
                  {item.path === "/products" && "Коммутаторы, маршрутизаторы"}
                  {item.path === "/warranty-service" &&
                    "Техподдержка и обслуживание"}
                  {item.path === "/software" && "ОС iDATA и утилиты"}
                  {item.path === "/documentation" &&
                    "Руководства и спецификации"}
                  {item.path === "/partners" && "Сертифицированные партнеры"}
                  {item.path === "/contacts" && "Связаться с нами"}
                </span>
              )}
            </div>
          </div>

          {hasChildren && (
            <motion.div
              animate={{
                rotate: hasThirdLevel && isExpanded ? 90 : 0,
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`
                p-1.5 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
                }
              `}
            >
              <Icon
                name={hasThirdLevel ? "ChevronRight" : "ChevronRight"}
                size={16}
              />
            </motion.div>
          )}

          {/* Активный индикатор */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </MenuItem>

        {/* Аккордеон для третьего уровня */}
        <AnimatePresence>
          {hasThirdLevel && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-gradient-to-r from-gray-25 to-blue-25"
            >
              <div className="border-l-2 border-blue-200 ml-6">
                {item.items?.map((subItem: NavItem, subIndex: number) =>
                  renderMenuItem(subItem, level + 1, subIndex),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const currentLevel = menuStack[menuStack.length - 1];
  const canGoBack = menuStack.length > 1;

  return (
    <>
      {/* Гамбургер кнопка с продвинутой анимацией */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden relative w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {/* Градиентный фон при ховере */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-4 flex flex-col justify-center relative">
            <motion.span
              className="block h-0.5 w-5 bg-gray-700 rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 6 : 0,
                backgroundColor: isOpen ? "#3b82f6" : "#374151",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5"
              animate={{
                opacity: isOpen ? 0 : 1,
                x: isOpen ? 10 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -6 : 0,
                backgroundColor: isOpen ? "#3b82f6" : "#374151",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.button>

      {/* Оверлей с анимацией */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Само мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="lg:hidden fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Шапка меню с градиентом */}
            <motion.div
              className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white relative overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Декоративные элементы */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

              <div className="flex items-center space-x-3 relative z-10">
                <AnimatePresence>
                  {canGoBack && (
                    <motion.button
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={navigateBack}
                      className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
                      aria-label="Назад"
                    >
                      <Icon name="ArrowLeft" size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <div>
                  <motion.h2
                    key={currentLevel?.title}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-lg font-semibold truncate"
                  >
                    {currentLevel?.title || "Меню"}
                  </motion.h2>
                  <div className="text-xs text-white/70">iDATA Navigation</div>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 flex items-center justify-center relative z-10"
                aria-label="Закрыть меню"
              >
                <Icon name="X" size={18} />
              </motion.button>
            </motion.div>

            {/* Контент меню */}
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                key={menuStack.length}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <nav className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
                  <div className="py-2">
                    {currentLevel?.items?.map((item, index) =>
                      renderMenuItem(item, 0, index),
                    )}
                  </div>

                  {/* Нижний padding для лучшего скролла */}
                  <div className="h-20" />
                </nav>
              </motion.div>
            </div>

            {/* Нижняя декоративная полоса */}
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
