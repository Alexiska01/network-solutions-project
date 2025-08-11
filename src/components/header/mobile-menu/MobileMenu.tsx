import React, { useEffect } from "react";
import { productSubmenuItems } from "../navigationData";
import HamburgerButton from "./HamburgerButton";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useTouchGestures } from "./hooks/useTouchGestures";
import { handleMenuItemClick } from "./utils/menuLogic";
import type { MobileMenuProps, NavItem } from "./types";
import "../mobile-menu.css";

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

  // Блокировка скролла body при открытии меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
      {/* Hamburger Button */}
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />

      {/* Backdrop Overlay */}
      <div
        className={`mobile-menu-backdrop lg:hidden ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        style={{
          opacity: isDragging ? 0.5 : undefined,
        }}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`mobile-menu-panel mobile-menu-container lg:hidden ${isOpen ? 'open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isDragging
            ? `translateX(${dragX.get()}px)`
            : undefined,
          opacity: isDragging ? dragOpacity.get() : undefined,
        }}
      >
        {/* Header */}
        <div className="mobile-menu-header">
          <MenuHeader
            currentLevel={currentLevel}
            canGoBack={canGoBack}
            onNavigateBack={navigateBack}
            onClose={onClose}
            isDragging={isDragging}
          />
        </div>

        {/* Content */}
        <div className="mobile-menu-content">
          <nav className="mobile-menu-nav">
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
          </nav>
        </div>

        {/* Bottom accent */}
        <div className="mobile-menu-accent" />
      </div>
    </>
  );
};

export default MobileMenu;