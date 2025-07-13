import React from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface TechSpecsOverlayProps {
  isVisible: boolean;
  onClose?: () => void;
}

const TechSpecsOverlay: React.FC<TechSpecsOverlayProps> = ({ 
  isVisible, 
  onClose 
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Технические характеристики
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            Подробная информация о технических характеристиках будет добавлена.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TechSpecsOverlay;