import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import { navigationItems, productSubmenuItems } from "./navigationData";
import Icon from "@/components/ui/icon";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface MenuLevel {
  title: string;
  items: any[];
  parentPath?: string;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Spring анимация для драга
  const dragX = useSpring(0, { stiffness: 300, damping: 30 });
  const dragOpacity = useTransform(dragX, [0, 150], [1, 0.7]);

  // Инициализация главного меню
  useEffect(() => {
    if (isOpen && menuStack.length === 0) {
      setMenuStack([{ title: "Меню", items: navigationItems }]);
    }
  }, [isOpen, menuStack.length]);

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMenuStack([]);
        setActiveItem(null);
        setExpandedItems(new Set());
        dragX.set(0);
      }, 300);
    }
  }, [isOpen, dragX]);

  // Блокировка скролла body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
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

  const handleItemClick = (item: any, e: React.MouseEvent) => {
    setActiveItem(item.path);

    if (item.path === "/products" && item.hasSubmenu) {
      e.preventDefault();
      navigateToLevel({
        title: "Оборудование",
        items: productSubmenuItems,
      });
    } else if (item.path === "/contacts") {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        const contactsSection = document.getElementById("contacts-section");
        if (contactsSection) {
          contactsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
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
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStart.x;
    const diffY = Math.abs(currentY - touchStart.y);

    // Проверяем что это горизонтальный свайп
    if (Math.abs(diffX) > 10 && diffY < 50) {
      setIsDragging(true);
      if (diffX > 0) {
        // Свайп вправо
        dragX.set(Math.min(diffX, 200));
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging && dragX.get() > 80) {
      onClose();
    } else {
      dragX.set(0);
    }
    setTouchStart(null);
    setIsDragging(false);
  };

  const renderMenuItem = (item: any, level: number = 0, index: number = 0) => {
    const hasChildren =
      item.hasSubmenu ||
      item.submenuItems ||
      (item.items && item.items.length > 0);
    const isActive = activeItem === item.path;
    const isExpanded = expandedItems.has(item.path);
    const hasThirdLevel = item.hasThirdLevel && item.items;

    const MenuItem = hasChildren ? motion.button : motion(Link);
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
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: index * 0.08,
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="overflow-hidden"
      >
        <MenuItem
          {...menuItemProps}
          whileHover={{
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
          className={`
            group relative w-full flex items-center justify-between p-4 
            text-gray-700 transition-all duration-300 min-h-[56px] 
            border-b border-gray-50 last:border-b-0 rounded-lg mx-2 mb-1
            ${
              isActive
                ? "bg-gradient-to-r from-blue-50 via-blue-50 to-emerald-50 text-blue-700 shadow-sm border-blue-100"
                : "hover:bg-gray-25"
            }
            ${level > 0 ? "ml-6 border-l-2 border-blue-100" : ""}
          `}
          style={{
            paddingLeft: `${16 + level * 24}px`,
            background: isActive
              ? "linear-gradient(135deg, rgb(239 246 255) 0%, rgb(243 244 246) 50%, rgb(236 253 245) 100%)"
              : undefined,
          }}
        >
          <div className="flex items-center space-x-4 flex-1">
            {item.icon && level === 0 && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  p-2.5 rounded-xl transition-all duration-300 shadow-sm
                  ${
                    isActive
                      ? "bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-600 shadow-blue-200/50"
                      : "bg-white text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500 shadow-gray-200/50"
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
              </motion.div>
            )}
            <div className="flex-1">
              <motion.span
                className={`
                  text-base font-medium block transition-colors duration-300
                  ${isActive ? "text-blue-700" : "text-gray-700 group-hover:text-gray-900"}
                `}
                animate={{ x: isActive ? 2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.span>
              {level === 0 && (
                <motion.span
                  className="text-xs text-gray-500 block mt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.path === "/products" && "Коммутаторы и оборудование"}
                  {item.path === "/warranty-service" &&
                    "Поддержка и обслуживание"}
                  {item.path === "/software" && "Программное обеспечение"}
                  {item.path === "/documentation" && "Техническая документация"}
                  {item.path === "/partners" && "Партнерская сеть"}
                  {item.path === "/contacts" && "Свяжитесь с нами"}
                </motion.span>
              )}
            </div>
          </div>

          {hasChildren && (
            <motion.div
              animate={{
                rotate: hasThirdLevel && isExpanded ? 90 : 0,
                scale: isActive ? 1.1 : 1,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-100 text-blue-500 shadow-sm"
                    : "text-gray-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm"
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
          <AnimatePresence>
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full shadow-lg"
                initial={{ scaleY: 0, x: -4 }}
                animate={{ scaleY: 1, x: 0 }}
                exit={{ scaleY: 0, x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ originY: 0.5 }}
              />
            )}
          </AnimatePresence>

          {/* Ripple эффект */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ scale: 0, opacity: 0.5 }}
            whileTap={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            }}
          />
        </MenuItem>

        {/* Аккордеон для третьего уровня */}
        <AnimatePresence>
          {hasThirdLevel && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-25 to-blue-25 border-l-2 border-blue-200 ml-6 rounded-lg mt-2">
                {item.items.map((subItem: any, subIndex: number) =>
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
      {/* Супер гамбургер кнопка */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden group"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {/* Градиентный фон */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10"
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
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
                scale: isOpen ? 0.8 : 1,
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

        {/* Пульсирующий эффект */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-blue-400"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: isOpen ? 1.1 : 1, opacity: isOpen ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Улучшенный оверлей */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            onClick={onClose}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Супер мобильное меню */}
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
            style={{ x: dragX, opacity: dragOpacity }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="lg:hidden fixed top-0 right-0 w-full max-w-xs sm:max-w-sm h-screen bg-white/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col border-l border-gray-100"
          >
            {/* Премиальная шапка */}
            <motion.div
              className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {/* Декоративные элементы */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ x: 60, y: -60 }}
              />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full -translate-x-12 translate-y-12" />

              <div className="relative z-10 flex items-center justify-between h-16 px-4">
                <div className="flex items-center space-x-3">
                  <AnimatePresence>
                    {canGoBack && (
                      <motion.button
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255,255,255,0.3)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateBack}
                        className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm transition-all duration-200 flex items-center justify-center"
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
                      className="text-lg font-semibold"
                    >
                      {currentLevel?.title || "Меню"}
                    </motion.h2>
                    <motion.div
                      className="text-xs text-white/80 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      iDATA Navigation
                    </motion.div>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
                  aria-label="Закрыть меню"
                >
                  <Icon name="X" size={18} />
                </motion.button>
              </div>

              {/* Индикатор свайпа */}
              <motion.div
                className="absolute bottom-0 left-1/2 w-12 h-1 bg-white/30 rounded-full"
                style={{ x: "-50%" }}
                animate={{ scale: isDragging ? [1, 1.2, 1] : 1 }}
                transition={{
                  duration: 0.5,
                  repeat: isDragging ? Infinity : 0,
                }}
              />
            </motion.div>

            {/* Контент меню с улучшенным скроллом */}
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                key={menuStack.length}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <nav className="h-full overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div className="space-y-1">
                    {currentLevel?.items?.map((item, index) =>
                      renderMenuItem(item, 0, index),
                    )}
                  </div>

                  {/* Нижний отступ */}
                  <div className="h-20" />
                </nav>
              </motion.div>

              {/* Градиент фейд внизу */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Декоративная нижняя полоса */}
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
