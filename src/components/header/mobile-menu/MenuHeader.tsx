import React, { memo } from "react";
import Icon from "@/components/ui/icon";
import type { MenuHeaderProps } from "./types";

const MenuHeader: React.FC<MenuHeaderProps> = memo(
  ({ currentLevel, canGoBack, onNavigateBack, onClose, isDragging }) => {
    return (
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white overflow-hidden menu-header">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full decorative-circle-1"
          style={{ transform: "translate(60px, -60px)" }}
        />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full decorative-circle-2" />

        <div className="relative z-10 flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            {canGoBack && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateBack();
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  onNavigateBack();
                }}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 ease-gpu flex items-center justify-center touch-manipulation back-button"
                aria-label="Назад"
              >
                <Icon name="ArrowLeft" size={18} />
              </button>
            )}
            <div>
              <h2
                key={currentLevel?.title}
                className="text-lg font-semibold menu-title"
              >
                {currentLevel?.title || "Меню"}
              </h2>
              <div className="text-xs text-white/80 font-medium menu-subtitle">
                iDATA Navigation
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 ease-gpu flex items-center justify-center touch-manipulation close-button"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Swipe Indicator */}
        <div 
          className={`absolute bottom-0 left-1/2 w-12 h-1 bg-white/30 rounded-full swipe-indicator ${
            isDragging ? 'swipe-active' : ''
          }`}
          style={{ transform: 'translateX(-50%)' }}
        />

      </div>
    );
  },
);

MenuHeader.displayName = "MenuHeader";

export default MenuHeader;