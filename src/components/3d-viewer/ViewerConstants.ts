import { Hotspot } from '../ViewerTypes';

export const cameraPresets = {
  front: "0deg 90deg 0.88m",
  back: "180deg 90deg 0.88m", 
  top: "0deg 0deg 1.2m",
  overview: "25deg 65deg 1.1m"
};

export const backgrounds = {
  studio: "linear-gradient(135deg, #1A2980 0%, #0065B3 50%, #00B5AD 100%)",
  neutral: "#f8f9fa",
  dark: "#1a1a1a",
  tech: "linear-gradient(135deg, #1A2980 0%, #0065B3 100%)"
};

export const hotspots: Hotspot[] = [
  {
    id: "ethernet-ports",
    position: "0.3m 0.1m 0.4m",
    title: "24x Gigabit Ethernet",
    description: "24 порта 10/100/1000 Base-T с поддержкой PoE+",
    type: "port",
    details: { count: 24, speed: "1 Гбит/с", power: "30W/порт" }
  },
  {
    id: "sfp-ports", 
    position: "-0.3m 0.1m 0.4m",
    title: "6x SFP+ Uplink",
    description: "Высокоскоростные порты для аплинка",
    type: "port",
    details: { count: 6, speed: "10 Гбит/с" }
  },
  {
    id: "power-supply",
    position: "0m -0.2m -0.4m",
    title: "Источник питания",
    description: "Резервируемый блок питания",
    type: "feature",
    details: { power: "380W" }
  },
  {
    id: "console-port",
    position: "-0.4m 0m 0.2m", 
    title: "Консольный порт",
    description: "RJ45 консоль для управления",
    type: "info"
  }
];

export const getHotspotIcon = (type: string) => {
  switch (type) {
    case 'port': return 'Cable';
    case 'feature': return 'Zap';
    case 'info': return 'Info';
    default: return 'Circle';
  }
};

export const getHotspotColor = (type: string) => {
  switch (type) {
    case 'port': return 'from-[#00B5AD] to-[#0065B3]';
    case 'feature': return 'from-[#0065B3] to-[#1A2980]';
    case 'info': return 'from-[#1A2980] to-[#00B5AD]';
    default: return 'from-gray-400 to-gray-600';
  }
};

export const getTextColor = (bg: string) => {
  if (bg === 'neutral') return 'text-gray-900';
  return 'text-white';
};

export const getButtonColor = (bg: string, active: boolean = false) => {
  if (bg === 'neutral') {
    return active 
      ? 'bg-[#0065B3] text-white' 
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  }
  return active 
    ? 'bg-[#0065B3] text-white' 
    : 'bg-white/10 text-white/70 hover:bg-white/20';
};