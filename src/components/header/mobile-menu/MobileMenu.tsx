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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-emerald-900/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Супер мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.6,
              duration: 0.3,
            }}
            style={{ x: dragX, opacity: dragOpacity }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="lg:hidden fixed top-0 right-0 w-full max-w-xs sm:max-w-sm h-screen bg-white/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col border-l border-gray-100 will-change-transform"
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
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -15, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
