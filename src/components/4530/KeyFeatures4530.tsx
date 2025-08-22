import KeyFeaturesSection, { KeyFeatureItem } from "@/components/key-features/KeyFeaturesSection";

const FEATURES: KeyFeatureItem[] = [
  {
    title: "Высокая производительность",
    description:
      "До 688 Гбит/с производительности, оптимально для уровня агрегации и доступа",
    icon: "Zap",
  },
  {
    title: "Слоты расширения 40G/100G",
    description:
      "Два слота для высокоскоростных модулей расширения 40G и 100G",
    icon: "ArrowUpDown",
  },
  {
    title: "Динамическая маршрутизация",
    description:
      "Поддержка протоколов RIP, OSPF, BGP, ISIS для построения отказоустойчивых сетей",
    icon: "Network",
  },
  {
    title: "Надёжное питание",
    description:
      "Двойные блоки питания и PoE+ до 1440 Вт в соответствующих моделях",
    icon: "Shield",
  },
  {
    title: "Функции управления",
    description:
      "SNMPv2/v3, Netconf/Yang, RMON/SYSLOG, Telnet/SSH — полный набор для администрирования",
    icon: "Settings",
  },
];

const KeyFeatures4530 = () => (
  <KeyFeaturesSection
    features={FEATURES}
    heading="Ключевые характеристики коммутаторов серии"
  />
);

export default KeyFeatures4530;
