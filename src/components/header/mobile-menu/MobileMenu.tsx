import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productSubmenuItems } from "../navigationData";
import HamburgerButton from "./HamburgerButton";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useTouchGestures } from "./hooks/useTouchGestures";
import { handleMenuItemClick } from "./utils/menuLogic";
import type { MobileMenuProps, NavItem } from "./types";

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  const {
    menuStack,
    expandedItems,
    activeItem,
    touchStart,
    isDragging,
    menuRef,
    dragX,
    dragOpacity,
    currentLevel,
    canGoBack,
    setActiveItem,
    setTouchStart,
    setIsDragging,
    navigateToLevel,
    navigateBack,
    toggleExpanded,
  } = useMobileMenu(isOpen);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchGestures({
      touchStart,
      isDragging,
      setTouchStart,
      setIsDragging,
      dragX,
      onClose,
    });

  const onItemClick = (item: NavItem, e: React.MouseEvent) => {
    // Специальная обработка для продуктов
    if (item.path === "/products" && item.hasSubmenu) {
      setActiveItem(item.path);
      e.preventDefault();
      navigateToLevel({
        title: "Оборудование",
        items: productSubmenuItems,
      });
      return;
    }

    handleMenuItemClick(item, e, {
      setActiveItem,
      onClose,
      navigateToLevel,
      toggleExpanded,
    });
  };

  return (
    <>
      {/* Супер гамбургер кнопка */}
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />

      {/* Улучшенный оверлей */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-emerald-900/10"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Супер мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%", opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "100%", opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.4,
              duration: 0.25,
            }}
            style={{ x: dragX, opacity: dragOpacity }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="lg:hidden fixed top-0 right-0 w-full max-w-xs sm:max-w-sm h-screen bg-white/98 backdrop-blur-2xl z-50 shadow-[0_0_100px_rgba(0,0,0,0.15)] flex flex-col border-l border-white/50 will-change-transform"
          >
            {/* Премиальная шапка */}
            <MenuHeader
              currentLevel={currentLevel}
              canGoBack={canGoBack}
              onNavigateBack={navigateBack}
              onClose={onClose}
              isDragging={isDragging}
            />

            {/* Контент меню с улучшенным скроллом */}
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                key={menuStack.length}
                initial={{ x: 20, opacity: 0, filter: "blur(4px)" }}
                animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ x: -20, opacity: 0, filter: "blur(4px)" }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 0.3 },
                  filter: { duration: 0.3 }
                }}
                className="h-full"
              >
                <nav className="h-full overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div className="space-y-1">
                    {currentLevel?.items?.map((item, index) => (
                      <MenuItem
                        key={item.path}
                        item={item}
                        level={0}
                        index={index}
                        activeItem={activeItem}
                        expandedItems={expandedItems}
                        onItemClick={onItemClick}
                        onToggleExpanded={toggleExpanded}
                        onNavigateToLevel={navigateToLevel}
                        onClose={onClose}
                        setActiveItem={setActiveItem}
                      />
                    ))}
                  </div>

                  {/* Нижний отступ */}
                  <div className="h-20" />
                </nav>
              </motion.div>

              {/* Улучшенный градиент фейд */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </div>

            {/* Премиальная декоративная полоса */}
            <motion.div
              className="relative h-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ 
                  delay: 1.1, 
                  duration: 1.5, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;