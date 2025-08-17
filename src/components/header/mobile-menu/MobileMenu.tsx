import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { productSubmenuItems } from "../navigationData";
import HamburgerButton from "./HamburgerButton";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useTouchGestures } from "./hooks/useTouchGestures";
import { handleMenuItemClick } from "./utils/menuLogic";
import type { MobileMenuProps, NavItem } from "./types";

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle, onClose }) => {
  // Управляем монтированием портала, чтобы после закрытия элементы удалялись и не перекрывали кнопку
  const [mounted, setMounted] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(false), 320); // чуть больше, чем время анимации
      return () => clearTimeout(t);
    }
  }, [isOpen]);
  const {
    menuStack,
    expandedItems,
    activeItem,
    touchStart,
    isDragging,
    menuRef,
  dragXValue,
  dragOpacityValue,
  setDragXValue,
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
      dragXValue,
      setDragXValue,
      onClose,
    });

  const onItemClick = (item: NavItem, e: React.MouseEvent) => {
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

  // Навигационный контейнер
  const navRef = useRef<HTMLElement | null>(null);

  // Гарантируем ширину панели = фактической ширине viewport (учёт zoom/iOS, особенно iOS Safari)
  useEffect(() => {
    if (!isOpen) return;
    const el = menuRef.current;
    if (!el) return;
    const applyWidth = () => {
      el.style.width = `${window.innerWidth}px`;
      el.style.left = "0px";
      el.style.right = "0px";
    };
    applyWidth();
    window.addEventListener("resize", applyWidth);
    return () => window.removeEventListener("resize", applyWidth);
  }, [isOpen, menuRef]);

  const portalContent = (
    <>
      {/* Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ease-out ${
          isOpen ? 'overlay-open' : 'overlay-closed pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 to-emerald-900/15" />
      </div>
      {/* Panel */}
      <div
        id="mobile-menu-panel"
        ref={menuRef}
  className={`lg:hidden fixed inset-0 w-screen h-screen z-[80] flex flex-col transition-transform duration-240 ease-gpu ${
          isOpen ? "menu-open" : "menu-closed"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          // При перетаскивании тянем панель влево (открыта справа). dragXValue отрицательный
          transform: isDragging ? `translateX(${dragXValue}px)` : undefined,
          opacity: isDragging ? dragOpacityValue : undefined,
          right: 0,
          left: 'auto'
        }}
      >
        <div className="absolute inset-0 bg-white -z-10" />
        <MenuHeader
          currentLevel={currentLevel}
          canGoBack={canGoBack}
          onNavigateBack={navigateBack}
          onClose={onClose}
          isDragging={isDragging}
        />
        <div className="flex-1 overflow-hidden relative">
          <div key={menuStack.length} className="h-full menu-content-transition">
            <nav ref={navRef} className="h-full overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
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
              <div className="h-20" />
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none fade-gradient" />
        </div>
        <div className="relative h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 progress-bar" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shine-effect" />
        </div>
      </div>
    </>
  );

  return (
    <>
      {mounted && typeof document !== 'undefined' && createPortal(portalContent, document.body)}
      <div className="relative z-[100] inline-flex">{/* Кнопка всегда выше */}
        <HamburgerButton isOpen={isOpen} onToggle={onToggle} />
      </div>
    </>
  );
};

export default MobileMenu;