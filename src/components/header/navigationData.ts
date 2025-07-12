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
    path: "/products/switches",
    hasNestedSubmenu: true,
    icon: "Network",
    submenuItems: [
      {
        name: "Корпоративные ЛВС",
        path: "/products/switches/corporate-lan",
        hasThirdLevel: true,
        items: [
          {
            name: "Уровень доступа",
            path: "/products/switches/corporate-lan/access-level",
            items: [
              {
                name: "Коммутаторы серии IDS3530",
                path: "/products/switches/ids3530",
              },
              {
                name: "Коммутаторы серии IDS3730",
                path: "/products/switches/ids3730",
              },
              {
                name: "Коммутаторы серии IDS4530",
                path: "/products/switches/ids4530",
              },
              {
                name: "Коммутаторы серии IDS6012",
                path: "/products/switches/ids6012",
              },
            ],
          },
          {
            name: "Уровень распределения",
            path: "/products/switches/corporate-lan/distribution-level",
            items: [
              {
                name: "Коммутаторы серии IDS6010",
                path: "/products/switches/ids6010",
              },
              {
                name: "Коммутаторы серии IDS6030",
                path: "/products/switches/ids6030",
              },
              {
                name: "Коммутаторы серии IDS6032",
                path: "/products/switches/ids6032",
              },
            ],
          },
          {
            name: "Уровень ядра",
            path: "/products/switches/corporate-lan/core-level",
            items: [
              {
                name: "Коммутаторы серии IDS8040",
                path: "/products/switches/ids8040",
              },
            ],
          },
        ],
      },
      {
        name: "Центры обработки данных",
        path: "/products/switches/data-centers",
        hasThirdLevel: true,
        items: [
          {
            name: "Уровень Spine",
            path: "/products/switches/data-centers/spine-level",
            items: [
              {
                name: "Коммутаторы серии IDS8030",
                path: "/products/switches/ids8030",
              },
              {
                name: "Коммутаторы серии IDS8010",
                path: "/products/switches/ids8010",
              },
              {
                name: "Коммутаторы серии IDS6150",
                path: "/products/switches/ids6150",
              },
            ],
          },
          {
            name: "Уровень Leaf",
            path: "/products/switches/data-centers/leaf-level",
            items: [
              {
                name: "Коммутаторы серии IDS6130",
                path: "/products/switches/ids6130",
              },
            ],
          },
        ],
      },
      {
        name: "Сертифицированные ТОРП",
        path: "/products/switches/torp-certified",
        items: [],
      },
    ],
  },
  {
    name: "Маршрутизаторы",
    path: "/products/routers",
    hasNestedSubmenu: true,
    icon: "Route",
    submenuItems: [
      {
        name: "Распределенные сети",
        path: "/products/routers/distributed-networks",
        items: [],
      },
    ],
  },
  {
    name: "Беспроводное оборудование",
    path: "/products/wireless",
    icon: "Wifi",
  },
  {
    name: "Программное обеспечение",
    path: "/products/software",
    icon: "Code",
  },
  {
    name: "Кабельные сборки и трансиверы",
    path: "/products/cables-transceivers",
    icon: "Cable",
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
