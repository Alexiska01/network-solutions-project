import { ProductInfo } from "@/types/product";

export const ids373024t6xData: ProductInfo = {
  id: "ids3730-24t-6x",
  title: "IDS3730-24T-6X",
  description:
    "24×1G Base-T + 6×10G SFP+ — управляемый коммутатор уровня L3 с высокой производительностью",
  modelPath: "https://s3.twcstorage.ru/c80bd43d-3dmodels/S3730-24T.glb",
  basicSpecs: [
    { label: "Порты:", value: "24×1000M Base-T" },
    { label: "Слоты:", value: "6×10G SFP+" },
    { label: "Поддержка PoE:", value: "Нет" },
    { label: "Производительность:", value: "168 Gbps" },
    { label: "Питание:", value: "Два слота для установки блоков питания" },
  ],
  features: [
    {
      icon: "Network",
      iconColor: "from-blue-500 to-indigo-500",
      title: "L3 маршрутизация",
      description:
        "Полная поддержка маршрутизации и продвинутые сетевые функции",
    },
    {
      icon: "Gauge",
      iconColor: "from-emerald-500 to-green-500",
      title: "168 Gbps",
      description:
        "Высокая производительность для требовательных приложений",
    },
    {
      icon: "Battery",
      iconColor: "from-purple-500 to-indigo-500",
      title: "Dual PSU",
      description: "Два слота для блоков питания обеспечивают отказоустойчивость",
    },
  ],
  specGroups: [
    {
      title: "Порты и интерфейсы",
      icon: "Network",
      iconColor: "text-blue-600",
      specs: [
        { label: "Ethernet-порты:", value: "24×10/100/1000M Base-T RJ45" },
        { label: "SFP+ слоты:", value: "6×10G SFP+" },
        { label: "Консольный порт:", value: "RJ45" },
        { label: "Управление:", value: "OOB интерфейс, 1×USB 2.0" },
        { label: "Общее количество портов:", value: "30 портов" },
      ],
    },
    {
      title: "Производительность",
      icon: "Gauge",
      iconColor: "text-green-600",
      specs: [
        { label: "Коммутационная способность:", value: "168 Gbps" },
        { label: "Пропускная способность:", value: "125 Mpps" },
        { label: "Flash-память:", value: "8 GB" },
        { label: "ОЗУ:", value: "1 GB" },
      ],
    },
    {
      title: "Маршрутизация L3",
      icon: "Route",
      iconColor: "text-purple-600",
      specs: [
        { label: "IPv4 маршрутов:", value: "12K" },
        { label: "IPv6 маршрутов:", value: "6K" },
        { label: "Поддержка VLAN:", value: "4094 VLAN" },
        { label: "Статическая маршрутизация:", value: "Да" },
      ],
    },
    {
      title: "Физические характеристики",
      icon: "Box",
      iconColor: "text-orange-600",
      specs: [
        { label: "Размеры (Ш×Г×В):", value: "442×320×44.2 мм" },
        { label: "Вес:", value: "≈4.1 кг" },
        { label: "Монтаж:", value: "19\" стойка, 1U" },
        { label: "Корпус:", value: "Металл" },
      ],
    },
    {
      title: "Питание и охлаждение",
      icon: "Zap",
      iconColor: "text-red-600",
      specs: [
        { label: "Источник питания:", value: "2 слота под блоки питания переменного тока (опциональные)" },
        { label: "Потребление:", value: "≤37W" },
        { label: "Напряжение:", value: "100–240V AC, 50/60Hz" },
        { label: "Охлаждение:", value: "Пассивное" },
      ],
    },
    {
      title: "Условия эксплуатации",
      icon: "Settings",
      iconColor: "text-gray-600",
      specs: [
        { label: "Рабочая температура:", value: "-5°C ~ 45°C" },
        { label: "Температура хранения:", value: "-40°C ~ 70°C" },
        { label: "Влажность (рабочая):", value: "10% ~ 90% (без конденсата)" },
        { label: "Молниезащита:", value: "6KV" },
      ],
    },
  ],
};