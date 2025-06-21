export const navigationItems = [
  { name: "Оборудование", path: "/products", hasSubmenu: true },
  { name: "Гарантия и сервис", path: "/warranty-service" },
  { name: "Программное обеспечение", path: "/software" },
  { name: "Документация", path: "/documentation" },
  { name: "Отраслевые решения", path: "/vertical-solutions" },
  { name: "Сетевая архитектура", path: "/network-architecture" },
];

export const productSubmenuItems = [
  { name: "Коммутаторы", path: "/products/switches", hasNestedSubmenu: true },
  { name: "Маршрутизаторы", path: "/products/routers", hasNestedSubmenu: true },
  { name: "Беспроводное оборудование", path: "/products/wireless" },
  { name: "Программное обеспечение", path: "/products/software" },
  {
    name: "Кабельные сборки и трансиверы",
    path: "/products/cables-transceivers",
  },
];

export const switchesSubmenuItems = [
  {
    name: "Коммутаторы для корпоративных ЛВС",
    path: "/products/switches/corporate-lan",
    hasThirdLevel: true,
  },
  {
    name: "Коммутаторы для центров обработки данных",
    path: "/products/switches/data-centers",
    hasThirdLevel: true,
  },
  {
    name: "Коммутаторы с сертификацией ТОРП",
    path: "/products/switches/torp-certified",
  },
];

export const routersSubmenuItems = [
  {
    name: "Маршрутизаторы для распределенных сетей связи",
    path: "/products/routers/distributed-networks",
  },
];

export const corporateLanItems = [
  {
    name: "Коммутаторы уровня доступа",
    path: "/products/switches/corporate-lan/access-level",
    hasSubmenu: true,
  },
  {
    name: "Коммутаторы уровня распределения",
    path: "/products/switches/corporate-lan/distribution-level",
    hasSubmenu: true,
  },
];

export const accessLevelSeries = [
  { name: "Коммутаторы серии IDS3530", path: "/products/switches/ids3530" },
  { name: "Коммутаторы серии IDS3730", path: "/products/switches/ids3730" },
  { name: "Коммутаторы серии IDS4530", path: "/products/switches/ids4530" },
  { name: "Коммутаторы серии IDS6012", path: "/products/switches/ids6012" },
  { name: "Коммутаторы серии IDS610", path: "/products/switches/ids610" },
];

export const distributionLevelSeries = [
  { name: "Коммутаторы серии IDS6010", path: "/products/switches/ids6010" },
  { name: "Коммутаторы серии IDS6030", path: "/products/switches/ids6030" },
  { name: "Коммутаторы серии IDS6032", path: "/products/switches/ids6032" },
];

export const dataCentersItems = [
  {
    name: "Коммутаторы уровня Spine",
    path: "/products/switches/spine-level",
    hasSubmenu: true,
  },
  {
    name: "Коммутаторы уровня Leaf",
    path: "/products/switches/leaf-level",
  },
];

export const spineLevelSeries = [
  { name: "Коммутаторы серии IDS8030", path: "/products/switches/ids8030" },
  { name: "Коммутаторы серии IDS8010", path: "/products/switches/ids8010" },
  { name: "Коммутаторы серии IDS6150", path: "/products/switches/ids6150" },
];

export const leafLevelSeries = [
  { name: "Коммутаторы серии IDS6130", path: "/products/switches/ids6130" },
];
