import React, { memo } from "react";
import Icon from "@/components/ui/icon";
import type { MenuHeaderProps } from "./types";

const MenuHeader: React.FC<MenuHeaderProps> = memo(
  ({ currentLevel, canGoBack, onNavigateBack, onClose, isDragging }) => {
    return (
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white overflow-hidden mobile-menu-header mobile-menu-gpu-layer">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full"
          style={{ transform: "translate(60px, -60px)" }}
        />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full -translate-x-12 translate-y-12" />

        <div className="relative z-10 flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            {canGoBack && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onNavigateBack();
                }}
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-300 flex items-center justify-center touch-manipulation mobile-back-button mobile-menu-gpu-layer hover:scale-115 hover:-translate-y-0.5 active:scale-95"
                aria-label="Назад"
              >
                <Icon name="ArrowLeft" size={18} />
              </button>
            )}
            <div>
              <h2
                key={currentLevel?.title}
                className="text-lg font-semibold mobile-menu-title mobile-menu-gpu-layer"
              >
                {currentLevel?.title || "Меню"}
              </h2>
              <div className="text-xs text-white/80 font-medium mobile-menu-subtitle mobile-menu-gpu-layer">
                iDATA Navigation
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-300 flex items-center justify-center touch-manipulation mobile-close-button mobile-menu-gpu-layer hover:scale-115 hover:rotate-90 hover:-translate-y-0.5 active:scale-95 active:rotate-180"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Индикатор свайпа */}
        <div 
          className={`absolute bottom-0 left-1/2 w-12 h-1 bg-white/30 rounded-full -translate-x-1/2 transition-all duration-300 mobile-swipe-indicator mobile-menu-gpu-layer ${
            isDragging ? 'animate-pulse scale-130 opacity-80' : 'opacity-30'
          }`}
        />
      </div>
    );
  },
);

MenuHeader.displayName = "MenuHeader";

export default MenuHeader;