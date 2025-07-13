import React from 'react';
import { motion } from 'framer-motion';

interface TechSpecsOverlayProps {
  isVisible: boolean;
}

const TechSpecsOverlay: React.FC<TechSpecsOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-xl p-4 max-w-xs z-40"
    >
      <h4 className="font-bold text-gray-900 mb-3">Технические характеристики</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Порты Ethernet:</span>
          <span className="font-medium">24x 1Гбит/с</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Порты SFP+:</span>
          <span className="font-medium">6x 10Гбит/с</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">PoE+ мощность:</span>
          <span className="font-medium">380W</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Уровень:</span>
          <span className="font-medium">Layer 3</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TechSpecsOverlay;