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
  disabled?: boolean; // заглушка / нет реакции
}

/** Главные пункты хедера */
export const navigationItems: NavItem[] = [
  {
    name: "Оборудование iDATA",
    path: "/products",
    hasSubmenu: true,
    icon: "Network",
  },
  { name: "Гарантия и сервис", path: "/warranty", icon: "ShieldCheck" },
  { name: "Программное обеспечение", path: "#", icon: "Code", disabled: true },
  { name: "Документация", path: "/documentation", icon: "FileText", disabled: true },
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
    category: "Сетевое оборудование",
    isPopular: true,
    submenuItems: [
      {
        name: "Корпоративные ЛВС",
        path: "/products/switches/corporate-lan",
        hasThirdLevel: true,
        icon: "Building2",
    disabled: true,
        items: [
          {
            name: "Уровень доступа",
            path: "/products/switches/access",
            badge: "24-48 портов",
            items: [
              {
                name: "Коммутаторы серии IDS3530",
                path: "/products/switches/ids3530",
                badge: "PoE+",
                isNew: true,
              },
              {
                name: "Коммутаторы серии IDS3730",
                path: "/products/switches/ids3730",
                badge: "48 портов",
              },
              {
                name: "Коммутаторы серии IDS4530",
                path: "/products/switches/ids4530",
                badge: "Layer 3",
                isPopular: true,
              },
              {
                name: "Коммутаторы серии IDS6012",
                path: "/products/switches/ids6012",
                badge: "12 портов",
              },
            ],
          },
          {
            name: "Уровень распределения",
            path: "/products/switches/corporate-lan/distribution-level",
            badge: "Layer 3",
            items: [
              {
                name: "Коммутаторы серии IDS6010",
                path: "/products/switches/ids6010",
                badge: "Модульные",
              },
              {
                name: "Коммутаторы серии IDS6030",
                path: "/products/switches/ids6030",
                badge: "40G uplink",
                isPopular: true,
              },
              {
                name: "Коммутаторы серии IDS6032",
                path: "/products/switches/ids6032",
                badge: "Стекинг",
              },
            ],
          },
          {
            name: "Уровень ядра",
            path: "/products/switches/corporate-lan/core-level",
            badge: "100G",
            items: [
              {
                name: "Коммутаторы серии IDS8040",
                path: "/products/switches/ids8040",
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
        icon: "Server",
  disabled: true,
        items: [
          {
            name: "Уровень Spine",
            path: "/products/switches/data-centers/spine-level",
            badge: "Spine",
            items: [
              {
                name: "Коммутаторы серии IDS8030",
                path: "/products/switches/ids8030",
                badge: "400G",
                isNew: true,
              },
              {
                name: "Коммутаторы серии IDS8010",
                path: "/products/switches/ids8010",
                badge: "100G",
              },
              {
                name: "Коммутаторы серии IDS6150",
                path: "/products/switches/ids6150",
                badge: "Гибридный",
              },
            ],
          },
          {
            name: "Уровень Leaf",
            path: "/products/switches/data-centers/leaf-level",
            badge: "Leaf",
            items: [
              {
                name: "Коммутаторы серии IDS6130",
                path: "/products/switches/ids6130",
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
        icon: "Shield",
        badge: "ТОРП",
    disabled: true,
        items: [],
      },
    ],
  },
  {
    name: "Маршрутизаторы",
    path: "/products/routers",
    hasNestedSubmenu: true,
    icon: "Route",
    category: "Сетевое оборудование",
    submenuItems: [
      {
        name: "Распределенные сети",
        path: "/products/routers/distributed-networks",
        icon: "Globe",
        badge: "WAN",
    disabled: true,
        items: [],
      },
    ],
  },
  {
    name: "Беспроводное оборудование",
    path: "/products/wireless",
    icon: "Wifi",
    category: "Беспроводные технологии",
    badge: "Wi-Fi 6E",
    isNew: true,
  },
  {
    name: "Программное обеспечение",
    path: "#",
    icon: "Code",
    category: "Программное обеспечение",
    badge: "В разработке",
  },
  {
    name: "Кабельные сборки и трансиверы",
    path: "/products/cables-transceivers",
    icon: "Cable",
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