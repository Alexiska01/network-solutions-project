import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { Hotspot } from './ViewerTypes';
import { getHotspotIcon, getHotspotColor } from './ViewerConstants';

interface HotspotPanelProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

const HotspotPanel: React.FC<HotspotPanelProps> = ({ hotspot, onClose }) => {
  if (!hotspot) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="absolute top-3 right-3 md:top-6 md:right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 md:p-6 max-w-xs md:max-w-sm z-40"
    >
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${getHotspotColor(hotspot.type)} rounded-lg flex items-center justify-center`}>
          <Icon name={getHotspotIcon(hotspot.type)} size={16} className="text-white md:w-5 md:h-5" />
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors p-1"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      
      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{hotspot.title}</h3>
      <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{hotspot.description}</p>
      
      {hotspot.details && (
        <div className="space-y-2">
          {hotspot.details.count && (
            <div className="flex justify-between">
              <span className="text-xs md:text-sm text-gray-500">Количество:</span>
              <span className="text-xs md:text-sm font-medium">{hotspot.details.count}</span>
            </div>
          )}
          {hotspot.details.speed && (
            <div className="flex justify-between">
              <span className="text-xs md:text-sm text-gray-500">Скорость:</span>
              <span className="text-xs md:text-sm font-medium">{hotspot.details.speed}</span>
            </div>
          )}
          {hotspot.details.power && (
            <div className="flex justify-between">
              <span className="text-xs md:text-sm text-gray-500">Мощность:</span>
              <span className="text-xs md:text-sm font-medium">{hotspot.details.power}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default HotspotPanel;