import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";
import type { MenuHeaderProps } from "./types";

const MenuHeader: React.FC<MenuHeaderProps> = memo(
  ({ currentLevel, canGoBack, onNavigateBack, onClose, isDragging }) => {
    return (
      <motion.div
        className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white overflow-hidden"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.25, ease: "easeOut" }}
      >
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full"
          style={{ transform: "translate(60px, -60px)" }}
        />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full -translate-x-12 translate-y-12" />

        <div className="relative z-10 flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            <AnimatePresence>
              {canGoBack && (
                <motion.button
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateBack();
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    onNavigateBack();
                  }}
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-200 flex items-center justify-center touch-manipulation"
                  aria-label="Назад"
                >
                  <Icon name="ArrowLeft" size={18} />
                </motion.button>
              )}
            </AnimatePresence>
            <div>
              <motion.h2
                key={currentLevel?.title}
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-lg font-semibold"
              >
                {currentLevel?.title || "Меню"}
              </motion.h2>
              <motion.div
                className="text-xs text-white/80 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                iDATA Navigation
              </motion.div>
            </div>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-200 flex items-center justify-center touch-manipulation"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={18} />
          </motion.button>
        </div>

        {/* Индикатор свайпа */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-12 h-1 bg-white/30 rounded-full"
          style={{ x: "-50%" }}
          animate={{ scale: isDragging ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
        />
      </motion.div>
    );
  },
);

MenuHeader.displayName = "MenuHeader";

export default MenuHeader;
