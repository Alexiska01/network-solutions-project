import React from "react";
import type { HamburgerButtonProps } from "./types";

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg hover:shadow-xl focus:outline-none overflow-hidden group hamburger-button mobile-menu-gpu-layer"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    >
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-emerald-500/15 transition-all duration-400 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-110" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 hamburger-line-top mobile-menu-gpu-layer ${isOpen ? 'active' : ''}`} />
          <span className={`block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5 transition-all duration-250 hamburger-line-middle mobile-menu-gpu-layer ${isOpen ? 'active' : ''}`} />
          <span className={`block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5 transition-all duration-300 hamburger-line-bottom mobile-menu-gpu-layer ${isOpen ? 'active' : ''}`} />
        </div>
      </div>
    </button>
  );
};

export default HamburgerButton;