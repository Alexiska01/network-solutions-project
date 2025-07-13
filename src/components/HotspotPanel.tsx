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
      className="absolute top-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm z-40"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 bg-gradient-to-r ${getHotspotColor(hotspot.type)} rounded-lg flex items-center justify-center`}>
          <Icon name={getHotspotIcon(hotspot.type)} size={20} className="text-white" />
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{hotspot.title}</h3>
      <p className="text-gray-600 mb-4">{hotspot.description}</p>
      
      {hotspot.details && (
        <div className="space-y-2">
          {hotspot.details.count && (
            <div className="flex justify-between">
              <span className="text-gray-500">Количество:</span>
              <span className="font-medium">{hotspot.details.count}</span>
            </div>
          )}
          {hotspot.details.speed && (
            <div className="flex justify-between">
              <span className="text-gray-500">Скорость:</span>
              <span className="font-medium">{hotspot.details.speed}</span>
            </div>
          )}
          {hotspot.details.power && (
            <div className="flex justify-between">
              <span className="text-gray-500">Мощность:</span>
              <span className="font-medium">{hotspot.details.power}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default HotspotPanel;