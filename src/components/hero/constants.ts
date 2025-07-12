import type { HeroMetric, HeroDevice } from "./types";

// Анимационные константы
export const ANIMATION_DELAYS = {
  IDATA_SHOW: 800,
  TYPING_SPEED: 15,
  STAGGER_CHILDREN: 0.1,
  BUTTON_DELAY: 1.8,
} as const;

// Parallax константы
export const PARALLAX_RANGES = {
  BACKGROUND: [0, 500, 0, 150],
  CONTENT: [0, 500, 0, -50],
} as const;

// Текст для типизации
export const COMPANY_DESCRIPTION =
  " — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

// Метрики для мобильной версии
export const MOBILE_METRICS: HeroMetric[] = [
  {
    icon: "Activity",
    value: "99.9%",
    label: "Uptime",
    color: "emerald",
    gradient: "from-emerald-500/20 to-green-600/10",
  },
  {
    icon: "Zap",
    value: "0.8ms",
    label: "Latency",
    color: "blue",
    gradient: "from-blue-500/20 to-cyan-600/10",
  },
  {
    icon: "Database",
    value: "1.2TB",
    label: "Traffic",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-600/10",
  },
  {
    icon: "Users",
    value: "3,247",
    label: "Devices",
    color: "orange",
    gradient: "from-orange-500/20 to-amber-600/10",
  },
];

// Метрики для десктопной версии
export const DESKTOP_METRICS: HeroMetric[] = [
  {
    icon: "Activity",
    value: "99.9%",
    label: "Uptime",
    color: "emerald",
    trend: "+0.2%",
  },
  {
    icon: "Zap",
    value: "0.8ms",
    label: "Latency",
    color: "blue",
    trend: "-15%",
  },
  {
    icon: "Database",
    value: "1.2TB",
    label: "Traffic",
    color: "purple",
    trend: "+24%",
  },
  {
    icon: "Users",
    value: "3,247",
    label: "Devices",
    color: "orange",
    trend: "+12%",
  },
];

// Устройства
export const HERO_DEVICES: HeroDevice[] = [
  {
    icon: "Router",
    label: "Router",
    status: "active",
    color: "emerald",
  },
  {
    icon: "Network",
    label: "Switch",
    status: "active",
    color: "blue",
  },
  {
    icon: "Shield",
    label: "Firewall",
    status: "warning",
    color: "amber",
  },
];

// Простые устройства для мобильной версии
export const MOBILE_DEVICES: HeroDevice[] = [
  { icon: "Router", label: "Router", color: "emerald" },
  { icon: "Network", label: "Switch", color: "blue" },
  { icon: "Shield", label: "Firewall", color: "amber" },
];
