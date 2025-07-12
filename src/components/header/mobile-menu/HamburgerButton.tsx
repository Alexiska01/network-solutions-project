import React from "react";
import { motion } from "framer-motion";
import type { HamburgerButtonProps } from "./types";

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none overflow-hidden group"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    >
      {/* Градиентный фон */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10"
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.span
            className="block h-0.5 w-5 bg-gray-700 rounded-full"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5"
            animate={{
              opacity: isOpen ? 0 : 1,
              x: isOpen ? 10 : 0,
              scale: isOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-0.5 w-5 bg-gray-700 rounded-full mt-1.5"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.button>
  );
};

export default HamburgerButton;
