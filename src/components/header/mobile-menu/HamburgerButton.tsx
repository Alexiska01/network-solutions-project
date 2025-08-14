import React from "react";
import type { HamburgerButtonProps } from "./types";

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/90 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 ease-gpu focus:outline-none overflow-hidden group hamburger-button"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-emerald-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-gpu gradient-bg" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-240 ease-gpu line-top ${
              isOpen ? 'line-open-top' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5 transition-all duration-200 ease-gpu line-middle ${
              isOpen ? 'line-open-middle' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5 transition-all duration-240 ease-gpu line-bottom ${
              isOpen ? 'line-open-bottom' : ''
            }`}
          />
        </div>
      </div>

      {/* GPU-FIRST Styles */}
      <style>{`
        /* GPU Performance Tokens */
        .ease-gpu {
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        /* Button Hover Animation */
        .hamburger-button {
          will-change: transform, box-shadow;
          transition: transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1),
                      box-shadow 200ms ease-gpu;
        }

        .hamburger-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
        }

        .hamburger-button:active {
          transform: translateY(0) scale(0.95);
          transition-duration: 80ms;
        }

        /* Gradient Background Animation */
        .gradient-bg {
          will-change: opacity, transform;
          transform: scale(0.8);
          transition: opacity 200ms ease-gpu, 
                      transform 240ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .group:hover .gradient-bg {
          transform: scale(1.1);
        }

        /* Line Animations - GPU Only */
        .line-top {
          will-change: transform;
          transform-origin: center;
        }

        .line-open-top {
          transform: rotate(45deg) translateY(6px) scale(1.1);
        }

        .line-middle {
          will-change: transform, opacity;
          transform-origin: center;
        }

        .line-open-middle {
          opacity: 0;
          transform: translateX(15px) rotate(180deg) scale(0.6);
        }

        .line-bottom {
          will-change: transform;
          transform-origin: center;
        }

        .line-open-bottom {
          transform: rotate(-45deg) translateY(-6px) scale(1.1);
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .hamburger-button {
            transition-duration: 160ms;
          }
          
          .line-top,
          .line-bottom {
            transition-duration: 200ms;
          }
          
          .line-middle {
            transition-duration: 160ms;
          }
        }

        /* High-refresh display optimization */
        @media (min-resolution: 120dpi) and (min-width: 1024px) {
          .hamburger-button {
            transition-duration: 140ms;
          }
          
          .line-top,
          .line-bottom {
            transition-duration: 180ms;
          }
          
          .line-middle {
            transition-duration: 140ms;
          }
        }

        /* Remove will-change after hover */
        .hamburger-button:not(:hover):not(:focus) {
          will-change: auto;
        }

        .hamburger-button:not(:hover) .gradient-bg {
          will-change: auto;
        }

        .line-top:not(.line-open-top),
        .line-middle:not(.line-open-middle),
        .line-bottom:not(.line-open-bottom) {
          will-change: auto;
        }
      `}</style>
    </button>
  );
};

export default HamburgerButton;