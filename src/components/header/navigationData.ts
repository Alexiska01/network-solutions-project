// src/components/header/navigationData.ts

import type * as LucideIcons from "lucide-react";

/** Описание пункта меню */
export interface NavItem {
  name: string;
  path: string;
  icon?: keyof typeof LucideIcons;
  hasSubmenu?: boolean;
  hasNestedSubmenu?: boolean;
  hasThirdLevel?: boolean;
  submenuItems?: NavItem[];
  items?: NavItem[];
  description?: string;
  badge?: string;
  isNew?: boolean;
  isPopular?: boolean;
  image?: string;
  category?: string;
}

/** Главные пункты хедера */
export const navigationItems: NavItem[] = [
  {
    name: "Оборудование iDATA",
    path: "/products",
    hasSubmenu: true,
    icon: "Network",
  },
  { name: "Гарантия и сервис", path: "/warranty-service", icon: "ShieldCheck" },
  { name: "Программное обеспечение", path: "/software", icon: "Settings" },
  { name: "Документация", path: "/documentation", icon: "FileText" },
  { name: "Партнеры", path: "/partners", icon: "Users" },
  { name: "Контакты", path: "/contacts", icon: "Phone" },
];

/** Всё, что в "Оборудование" */
export const productSubmenuItems: NavItem[] = [
  {
    name: "Коммутаторы",
    path: "/switches",
    hasNestedSubmenu: true,
    icon: "Network",
    description: "Управляемые коммутаторы для корпоративных сетей и ЦОД",
    category: "Сетевое оборудование",
    isPopular: true,
    submenuItems: [
      {
        name: "Корпоративные ЛВС",
        path: "/products/switches/corporate-lan",
        hasThirdLevel: true,
        description: "Решения для корпоративных локальных сетей",
        icon: "Building2",
        items: [
          {
            name: "Уровень доступа",
            path: "/products/switches/corporate-lan/access-level",
            description: "Коммутаторы для подключения конечных устройств",
            icon: "Wifi",
            badge: "24-48 портов",
            items: [
              {
                name: "Коммутаторы серии IDS3530",
                path: "/products/switches/ids3530",
                description: "24-портовые управляемые коммутаторы с PoE+",
                badge: "PoE+",
                isNew: true,
              },
              {
                name: "Коммутаторы серии IDS3730",
                path: "/products/switches/ids3730",
                description: "48-портовые коммутаторы уровня доступа",
                badge: "48 портов",
              },
              {
                name: "Коммутаторы серии IDS4530",
                path: "/products/switches/ids4530",
                description: "Высокопроизводительные коммутаторы доступа",
                badge: "Layer 3",
                isPopular: true,
              },
              {
                name: "Коммутаторы серии IDS6012",
                path: "/products/switches/ids6012",
                description: "Компактные коммутаторы для малых офисов",
                badge: "12 портов",
              },
            ],
          },
          {
            name: "Уровень распределения",
            path: "/products/switches/corporate-lan/distribution-level",
            description: "Агрегация трафика и маршрутизация между сегментами",
            icon: "Network",
            badge: "Layer 3",
            items: [
              {
                name: "Коммутаторы серии IDS6010",
                path: "/products/switches/ids6010",
                description: "Модульные коммутаторы уровня распределения",
                badge: "Модульные",
              },
              {
                name: "Коммутаторы серии IDS6030",
                path: "/products/switches/ids6030",
                description: "Высокопроизводительные коммутаторы L3",
                badge: "40G uplink",
                isPopular: true,
              },
              {
                name: "Коммутаторы серии IDS6032",
                path: "/products/switches/ids6032",
                description: "Стекируемые коммутаторы распределения",
                badge: "Стекинг",
              },
            ],
          },
          {
            name: "Уровень ядра",
            path: "/products/switches/corporate-lan/core-level",
            description:
              "Коммутаторы ядра сети с максимальной производительностью",
            icon: "Zap",
            badge: "100G",
            items: [
              {
                name: "Коммутаторы серии IDS8040",
                path: "/products/switches/ids8040",
                description: "Флагманские коммутаторы ядра с поддержкой 100G",
                badge: "100G Ready",
                isNew: true,
              },
            ],
          },
        ],
      },
      {
        name: "Центры обработки данных",
        path: "/products/switches/data-centers",
        hasThirdLevel: true,
        description: "Специализированные решения для ЦОД",
        icon: "Server",
        items: [
          {
            name: "Уровень Spine",
            path: "/products/switches/data-centers/spine-level",
            description:
              "Коммутаторы верхнего уровня для архитектуры Leaf-Spine",
            icon: "GitBranch",
            badge: "Spine",
            items: [
              {
                name: "Коммутаторы серии IDS8030",
                path: "/products/switches/ids8030",
                description: "Высокопроизводительные spine-коммутаторы",
                badge: "400G",
                isNew: true,
              },
              {
                name: "Коммутаторы серии IDS8010",
                path: "/products/switches/ids8010",
                description: "Компактные spine-коммутаторы для средних ЦОД",
                badge: "100G",
              },
              {
                name: "Коммутаторы серии IDS6150",
                path: "/products/switches/ids6150",
                description: "Универсальные коммутаторы для ЦОД",
                badge: "Гибридный",
              },
            ],
          },
          {
            name: "Уровень Leaf",
            path: "/products/switches/data-centers/leaf-level",
            description: "Коммутаторы нижнего уровня для подключения серверов",
            icon: "HardDrive",
            badge: "Leaf",
            items: [
              {
                name: "Коммутаторы серии IDS6130",
                path: "/products/switches/ids6130",
                description: "Оптимизированные leaf-коммутаторы для серверов",
                badge: "25G/100G",
                isPopular: true,
              },
            ],
          },
        ],
      },
      {
        name: "Сертифицированные ТОРП",
        path: "/products/switches/torp-certified",
        description: "Оборудование с сертификацией ТОРП",
        icon: "Shield",
        badge: "ТОРП",
        items: [],
      },
    ],
  },
  {
    name: "Маршрутизаторы",
    path: "/products/routers",
    hasNestedSubmenu: true,
    icon: "Route",
    description: "Высокопроизводительные маршрутизаторы для WAN",
    category: "Сетевое оборудование",
    submenuItems: [
      {
        name: "Распределенные сети",
        path: "/products/routers/distributed-networks",
        description: "Решения для построения распределенных сетей",
        icon: "Globe",
        badge: "WAN",
        items: [],
      },
    ],
  },
  {
    name: "Беспроводное оборудование",
    path: "/products/wireless",
    icon: "Wifi",
    description: "Wi-Fi решения корпоративного класса",
    category: "Беспроводные технологии",
    badge: "Wi-Fi 6E",
    isNew: true,
  },
  {
    name: "Программное обеспечение",
    path: "/products/software",
    icon: "Code",
    description: "ПО для управления сетевой инфраструктурой",
    category: "Программное обеспечение",
    badge: "Cloud Ready",
  },
  {
    name: "Кабельные сборки и трансиверы",
    path: "/products/cables-transceivers",
    icon: "Cable",
    description: "Оптические модули и кабельные решения",
    category: "Аксессуары",
    badge: "400G",
  },
];

// --- Для SwitchesSubmenu ---

export const switchesSubmenuItems: NavItem[] =
  productSubmenuItems[0]?.submenuItems || [];

export const corporateLanItems: NavItem[] =
  switchesSubmenuItems[0]?.items || [];

export const dataCentersItems: NavItem[] = switchesSubmenuItems[1]?.items || [];

export const accessLevelSeries: NavItem[] = corporateLanItems[0]?.items || [];

export const distributionLevelSeries: NavItem[] =
  corporateLanItems[1]?.items || [];

export const spineLevelSeries: NavItem[] = dataCentersItems[0]?.items || [];

export const leafLevelSeries: NavItem[] = dataCentersItems[1]?.items || [];
