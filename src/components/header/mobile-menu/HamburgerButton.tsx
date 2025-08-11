import React from "react";
import type { HamburgerButtonProps } from "./types";

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/90 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none overflow-hidden group"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-emerald-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 transform-gpu ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5 transition-all duration-200 ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5 transition-all duration-300 transform-gpu ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </div>
    </button>
  );
};

export default HamburgerButton;