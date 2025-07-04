export const navigationItems = [
  {
    name: "Оборудование",
    path: "/products",
    hasSubmenu: true,
    icon: "Network",
  },
  { name: "Гарантия и сервис", path: "/warranty-service", icon: "ShieldCheck" },
  { name: "Программное обеспечение", path: "/software", icon: "Settings" },
  { name: "Документация", path: "/documentation", icon: "FileText" },
  { name: "Отраслевые решения", path: "/vertical-solutions", icon: "Building" },
  {
    name: "Сетевая архитектура",
    path: "/network-architecture",
    icon: "GitBranch",
  },
];

export const productSubmenuItems = [
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

export const switchesSubmenuItems = [
  {
    name: "Корпоративные ЛВС",
    path: "/products/switches/corporate-lan",
    hasThirdLevel: true,
  },
  {
    name: "Центры обработки данных",
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
    name: "Уровень доступа",
    path: "/products/switches/corporate-lan/access-level",
    hasThirdLevel: true,
  },
  {
    name: "Уровень распределения",
    path: "/products/switches/corporate-lan/distribution-level",
    hasThirdLevel: true,
  },
];

export const accessLevelSeries = [
  { name: "Коммутаторы серии IDS3530", path: "/products/switches/ids3530" },
  { name: "Коммутаторы серии IDS3730", path: "/products/switches/ids3730" },
  { name: "Коммутаторы серии IDS4530", path: "/products/switches/ids4530" },
  { name: "Коммутаторы серии IDS6012", path: "/products/switches/ids6012" },
];

export const distributionLevelSeries = [
  { name: "Коммутаторы серии IDS6010", path: "/products/switches/ids6010" },
  { name: "Коммутаторы серии IDS6030", path: "/products/switches/ids6030" },
  { name: "Коммутаторы серии IDS6032", path: "/products/switches/ids6032" },
];

export const dataCentersItems = [
  {
    name: "Уровень Spine",
    path: "/products/switches/data-centers/spine-level",
    hasThirdLevel: true,
  },
  {
    name: "Уровень Leaf",
    path: "/products/switches/data-centers/leaf-level",
    hasThirdLevel: true,
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
