import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      navigate,
    });
  };

  return (
    <>
      {/* Супер гамбургер кнопка */}
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />

      {/* Улучшенный оверлей */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40 mobile-menu-overlay mobile-menu-gpu-layer"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-emerald-900/10 mobile-menu-overlay-gradient" />
        </div>
      )}

      {/* Супер мобильное меню */}
      {isOpen && (
        <div
          ref={menuRef}
          style={{ transform: `translateX(${dragX.get()}px)`, opacity: dragOpacity.get() }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
          className="lg:hidden fixed top-0 right-0 w-full max-w-xs sm:max-w-sm h-screen bg-white/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col border-l border-gray-100 mobile-menu-panel mobile-menu-gpu-layer"
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
              <div
                key={menuStack.length}
                className="h-full mobile-menu-content mobile-menu-gpu-layer"
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
                        navigate={navigate}
                      />
                    ))}
                  </div>

                  {/* Нижний отступ */}
                  <div className="h-20" />
                </nav>
              </div>

              {/* Улучшенный градиент фейд */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none gradientFadeIn" />
            </div>

            {/* Премиальная декоративная полоса */}
            <div className="relative h-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 progress-bar" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent progress-bar-shine" />
            </div>
          </div>
        )}
    </>
  );
};

export default MobileMenu;