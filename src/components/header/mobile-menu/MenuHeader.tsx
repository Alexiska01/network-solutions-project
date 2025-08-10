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

        {/* GPU-FIRST Styles */}
        <style jsx>{`
          /* Performance Tokens */
          .ease-gpu {
            transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          }

          /* Header Entry Animation */
          .menu-header {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
            animation: headerEntry 280ms cubic-bezier(0.25, 0.1, 0.25, 1) 50ms both;
            will-change: transform, opacity;
          }

          @keyframes headerEntry {
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Decorative Circles */
          .decorative-circle-1,
          .decorative-circle-2 {
            opacity: 0;
            animation: circleEntry 400ms ease-gpu 200ms both;
          }

          .decorative-circle-2 {
            transform: translate(-48px, 48px);
            animation-delay: 300ms;
          }

          @keyframes circleEntry {
            to {
              opacity: 1;
            }
          }

          /* Back Button Animation */
          .back-button {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
            animation: backButtonEntry 320ms cubic-bezier(0.16, 1, 0.3, 1) 150ms both;
            will-change: transform, opacity;
          }

          @keyframes backButtonEntry {
            to {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          /* Button Hover Effects */
          .back-button,
          .close-button {
            will-change: transform, background-color, box-shadow;
            transition: transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1),
                        background-color 200ms ease-gpu,
                        box-shadow 200ms ease-gpu;
          }

          .back-button:hover,
          .close-button:hover {
            transform: translateY(-1px) scale(1.1);
            box-shadow: 0 4px 15px rgba(255,255,255,0.2);
          }

          .back-button:active,
          .close-button:active {
            transform: translateY(0) scale(0.95);
            transition-duration: 80ms;
          }

          .close-button:hover {
            transform: translateY(-1px) scale(1.1) rotate(90deg);
          }

          .close-button:active {
            transform: translateY(0) scale(0.95) rotate(180deg);
            transition-duration: 120ms;
          }

          /* Title Animation */
          .menu-title {
            opacity: 0;
            transform: translateX(20px);
            animation: titleEntry 240ms cubic-bezier(0.25, 0.1, 0.25, 1) 180ms both;
          }

          @keyframes titleEntry {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Subtitle Animation */
          .menu-subtitle {
            opacity: 0;
            animation: subtitleEntry 200ms ease-gpu 320ms both;
          }

          @keyframes subtitleEntry {
            to {
              opacity: 1;
            }
          }

          /* Swipe Indicator */
          .swipe-indicator {
            opacity: 0.3;
            transform: translateX(-50%) scaleX(1);
            transition: transform 200ms ease-gpu, opacity 200ms ease-gpu;
          }

          .swipe-active {
            opacity: 0.8;
            transform: translateX(-50%) scaleX(1.3);
            animation: swipePulse 800ms ease-in-out infinite;
          }

          @keyframes swipePulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: translateX(-50%) scaleX(1); 
            }
            50% { 
              opacity: 0.8; 
              transform: translateX(-50%) scaleX(1.3); 
            }
          }

          /* Mobile Optimization */
          @media (max-width: 768px) {
            .menu-header {
              animation-duration: 240ms;
            }
            
            .back-button {
              animation-duration: 280ms;
            }
            
            .menu-title {
              animation-duration: 200ms;
            }
          }

          /* High-refresh display optimization */
          @media (min-resolution: 120dpi) and (min-width: 1024px) {
            .menu-header {
              animation-duration: 220ms;
            }
            
            .back-button,
            .close-button {
              transition-duration: 140ms;
            }
            
            .menu-title {
              animation-duration: 180ms;
            }
          }

          /* Remove will-change after animations */
          .menu-header:not(.animating) {
            will-change: auto;
          }

          .back-button:not(:hover):not(:focus),
          .close-button:not(:hover):not(:focus) {
            will-change: auto;
          }
        `}</style>
      </div>
    );
  },
);

MenuHeader.displayName = "MenuHeader";

export default MenuHeader;