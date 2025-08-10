import React from "react";
import { productSubmenuItems, switchesSubmenuItems, corporateLanItems } from "../navigationData";
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

    // Специальная обработка для коммутаторов  
    if (item.path === "/switches" && item.hasNestedSubmenu) {
      setActiveItem(item.path);
      e.preventDefault();
      navigateToLevel({
        title: "Коммутаторы",
        items: switchesSubmenuItems,
      });
      return;
    }

    // Специальная обработка для корпоративных ЛВС
    if (item.path === "/products/switches/corporate-lan" && item.hasThirdLevel) {
      setActiveItem(item.path);
      e.preventDefault();
      navigateToLevel({
        title: "Корпоративные ЛВС",
        items: corporateLanItems,
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
      {/* GPU-FIRST Hamburger Button */}
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />

      {/* GPU-OPTIMIZED Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          isOpen ? 'overlay-open' : 'overlay-closed pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-emerald-900/10" />
      </div>

      {/* GPU-FIRST Mobile Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 w-full max-w-xs sm:max-w-sm h-screen z-50 shadow-2xl flex flex-col border-l border-gray-100 transition-transform duration-240 ease-gpu ${
          isOpen ? 'menu-open' : 'menu-closed'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isDragging ? `translateX(${dragX.get()}px)` : undefined,
          opacity: isDragging ? dragOpacity.get() : undefined,
        }}
      >
        {/* Background with GPU layer */}
        <div className="absolute inset-0 bg-white/95 -z-10" />

        {/* Premium Header */}
        <MenuHeader
          currentLevel={currentLevel}
          canGoBack={canGoBack}
          onNavigateBack={navigateBack}
          onClose={onClose}
          isDragging={isDragging}
        />

        {/* GPU-Optimized Content */}
        <div className="flex-1 overflow-hidden relative">
          <div
            key={menuStack.length}
            className="h-full menu-content-transition"
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

              {/* Bottom spacing */}
              <div className="h-20" />
            </nav>
          </div>

          {/* GPU-Optimized fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none fade-gradient" />
        </div>

        {/* GPU-First decorative strip */}
        <div className="relative h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 progress-bar" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shine-effect" />
        </div>
      </div>

      {/* GPU-FIRST Styles */}
      <style jsx>{`
        /* GPU Performance Tokens */
        :root {
          --dur-fast: 160ms;
          --dur-base: 240ms;
          --dur-slow: 320ms;
          --ease-gpu: cubic-bezier(0.25, 0.1, 0.25, 1);
          --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
          --dist-sm: 8px;
          --dist-base: 16px;
          --dist-lg: 24px;
        }

        /* GPU-Only Animations */
        .overlay-open {
          opacity: 1;
          will-change: opacity;
        }
        .overlay-closed {
          opacity: 0;
          will-change: auto;
        }

        .menu-open {
          transform: translateX(0);
          opacity: 1;
          will-change: transform, opacity;
        }
        .menu-closed {
          transform: translateX(100%);
          opacity: 0;
          will-change: auto;
        }

        .menu-content-transition {
          transform: translateX(0);
          opacity: 1;
          transition: transform var(--dur-base) var(--ease-gpu), 
                      opacity var(--dur-fast) var(--ease-gpu);
        }

        .fade-gradient {
          opacity: 1;
          transition: opacity 200ms var(--ease-gpu) 80ms;
        }

        .progress-bar {
          transform: translateX(0);
          animation: progressEntry var(--dur-slow) var(--ease-gpu) 120ms both;
        }

        .shine-effect {
          transform: translateX(-100%);
          animation: shineLoop 2s var(--ease-gpu) 1s infinite;
        }

        /* GPU Keyframes */
        @keyframes progressEntry {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes shineLoop {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        /* Mobile Performance Optimization */
        @media (max-width: 768px) {
          :root {
            --dur-fast: 140ms;
            --dur-base: 200ms;
            --dur-slow: 280ms;
            --dist-sm: 6px;
            --dist-base: 12px;
            --dist-lg: 18px;
          }
        }

        /* High-refresh display optimization */
        @media (min-resolution: 120dpi) and (min-width: 1024px) {
          :root {
            --dur-fast: 120ms;
            --dur-base: 180ms;
            --dur-slow: 240ms;
            --dist-sm: 6px;
            --dist-base: 14px;
            --dist-lg: 20px;
          }
        }

        /* GPU Transition Classes */
        .ease-gpu {
          transition-timing-function: var(--ease-gpu);
        }

        .duration-240 {
          transition-duration: var(--dur-base);
        }

        /* Performance: Remove will-change after animation */
        .menu-content-transition:not(.transitioning) {
          will-change: auto;
        }
      `}</style>
    </>
  );
};

export default MobileMenu;