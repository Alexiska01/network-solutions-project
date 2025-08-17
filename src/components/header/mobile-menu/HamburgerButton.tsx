import React from "react";
import type { HamburgerButtonProps } from "./types";

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
  onClick={onToggle}
      className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/90 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 ease-gpu focus:outline-none overflow-hidden group hamburger-button select-none touch-manipulation"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      type="button"
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

  {/* Inline styles removed - using global header-motion.css */}
    </button>
  );
};

export default HamburgerButton;