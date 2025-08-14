export interface SwitchModel {
  id: string;
  title: string;
  description: string;
  category: "access" | "distribution" | "spine" | "leaf";
  specs: {
    ports: string;
    power: string;
    throughput: string;
    features: string[];
  };
  image: string;
  link: string;
}

export const switchesData: SwitchModel[] = [
  // Коммутаторы уровня доступа
  {
    id: "IDS3530",
    title: "Коммутаторы серии IDS3530",
    description:
      "Управляемые коммутаторы уровня доступа с поддержкой PoE+ и расширенными L2/L3 функциями",
    category: "access",
    specs: {
      ports: "8 - 48 портов 10/100/1000Base-T",
      power: "PoE/PoE+ до 760Вт",
      throughput: "168 - 216 Гбит/с",
      features: ["VLAN", "QoS", "ACL", "SNMP"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids3530",
  },
  {
    id: "IDS3730",
    title: "Коммутаторы серии IDS3730",
    description:
      "Высокопроизводительные коммутаторы доступа с улучшенной системой охлаждения",
    category: "access",
    specs: {
      ports: "8 - 48 портов 10/100/1000Base-T",
      power: "PoE/PoE+ до 1440Вт",
      throughput: "168 - 216 Гбит/с",
      features: ["Advanced QoS", "Layer 3", "IPv6", "Security"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids3730",
  },
  {
    id: "IDS4530",
    title: "Коммутаторы серии IDS4530",
    description:
      "Мощные коммутаторы доступа для больших офисов с продвинутыми функциями безопасности",
    category: "access",
    specs: {
      ports: "24 - 48 портов 10/100/1000Base-T",
      power: "PoE/PoE+ до 1440Вт",
      throughput: "448 - 688 Гбит/с",
      features: ["802.1X", "NAC", "Advanced Security", "Stacking"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids4530",
  },
  {
    id: "IDS6012",
    title: "Коммутаторы серии IDS6012",
    description: "Компактные коммутаторы доступа для малых и средних сетей",
    category: "access",
    specs: {
      ports: "?",
      power: "?",
      throughput: "560 - 640 Гбит/с",
      features: ["Web UI", "Basic L3", "Energy Saving", "Fanless"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids6012",
  },

  // Коммутаторы уровня распределения
  {
    id: "IDS6010",
    title: "Коммутаторы серии IDS6010",
    description:
      "Модульные коммутаторы распределения с высокой плотностью портов",
    category: "distribution",
    specs: {
      ports: "?",
      power: "?",
      throughput: "640 - 960 Гбит/с",
      features: ["Модульность", "Hot Swap", "MLAG", "VSU"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids6010",
  },
  {
    id: "IDS6030",
    title: "Коммутаторы серии IDS6030",
    description:
      "Высокопроизводительные коммутаторы распределения для крупных сетей",
    category: "distribution",
    specs: {
      ports: "?",
      power: "?",
      throughput: "?",
      features: ["Virtual Chassis", "EVPN", "VXLAN", "SDN Ready"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids6030",
  },
  {
    id: "IDS6032",
    title: "Коммутаторы серии IDS6032",
    description: "Флагманские коммутаторы распределения с поддержкой 400G",
    category: "distribution",
    specs: {
      ports: "?",
      power: "?",
      throughput: "?",
      features: ["400G Ready", "AI/ML Optimization", "Zero Touch", "Telemetry"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids6032",
  },

  // Spine коммутаторы
  {
    id: "IDS8030",
    title: "Коммутаторы серии IDS8030",
    description: "Spine-коммутаторы для крупных дата-центров с поддержкой 400G",
    category: "spine",
    specs: {
      ports: "?",
      power: "?",
      throughput: "?",
      features: ["BGP EVPN", "VXLAN", "Low Latency", "Telemetry"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids8030",
  },
  {
    id: "IDS8010",
    title: "Коммутаторы серии IDS8010",
    description: "Компактные spine-коммутаторы для средних дата-центров",
    category: "spine",
    specs: {
      ports: "?",
      power: "?",
      throughput: "?",
      features: ["ECMP", "BFD", "MPLS", "Segment Routing"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids8010",
  },

  // Leaf коммутаторы
  {
    id: "IDS6150",
    title: "Коммутаторы серии IDS6150",
    description: "Leaf-коммутаторы с высокой плотностью 100G портов",
    category: "leaf",
    specs: {
      ports: "?",
      power: "?",
      throughput: "?",
      features: ["Container Support", "Micro-services", "Zero Touch", "APIs"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids6150",
  },
  {
    id: "IDS6130",
    title: "Коммутаторы серии IDS6130",
    description: "Универсальные leaf-коммутаторы для гибридных облачных сред",
    category: "leaf",
    specs: {
      ports: "?",
      power: "?",
      throughput: "?",
      features: ["OpenFlow", "Docker", "Kubernetes", "Multi-tenancy"],
    },
    image:
      "/img/13ff7ec9-5051-43db-a9ef-5676578906d5.jpg",
    link: "/products/switches/ids6130",
  },
];

export const categoryLabels = {
  access: "Доступ",
  distribution: "Распределение",
  spine: "Spine",
  leaf: "Leaf",
};