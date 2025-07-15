import { ProductInfo } from "@/types/product";

export const ids3730_24p_6x: ProductInfo = {
  id: "ids3730-24p-6x",
  title: "IDS3730-24P-6X",
  description:
    "24×1G Base-T + 6×10G SFP+, без PoE — компактное решение для средней сети",
  modelPath: "https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS3730-24P.glb",
  basicSpecs: [
    { label: "Порты:", value: "24×1000M Base-T" },
    { label: "Слоты:", value: "6×10G SFP+" },
    { label: "Поддержка PoE:", value: "Нет" },
    { label: "Производительность:", value: "168 Gbps" },
    { label: "Питание:", value: "Dual AC Power Supply" },
  ],
  features: [
    {
      icon: "Network",
      iconColor: "from-emerald-500 to-green-500",
      title: "6×10G SFP+",
      description:
        "Высокоскоростные аплинки для подключения к серверам и магистрали",
    },
    {
      icon: "Cpu",
      iconColor: "from-blue-500 to-indigo-500",
      title: "Dual PSU",
      description:
        "Двойное питание обеспечивает максимальную надежность работы",
    },
    {
      icon: "Shield",
      iconColor: "from-purple-500 to-indigo-500",
      title: "L2+/L3 функции",
      description: "Продвинутая маршрутизация и функции безопасности",
    },
  ],
  specGroups: [
    {
      title: "Порты и интерфейсы",
      icon: "Plug",
      iconColor: "text-blue-600",
      specs: [
        { label: "Ethernet-порты:", value: "24×10/100/1000M Base-T RJ45" },
        { label: "SFP+ слоты:", value: "6×10G SFP+" },
        { label: "Консольный порт:", value: "RJ45" },
        { label: "Управление:", value: "OOB интерфейс, 1×USB 2.0" },
      ],
    },
    {
      title: "PoE характеристики",
      icon: "Zap",
      iconColor: "text-orange-600",
      specs: [
        { label: "Поддержка PoE:", value: "Нет" },
        { label: "Стандарты:", value: "Н/Д" },
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
        { label: "IPv4 маршрутов:", value: "12K" },
        { label: "IPv6 маршрутов:", value: "6K" },
      ],
    },
    {
      title: "Физические характеристики",
      icon: "Box",
      iconColor: "text-purple-600",
      specs: [
        { label: "Размеры (Ш×Г×В):", value: "442×320×44.2 мм" },
        { label: "Вес:", value: "≈4.1 кг" },
        { label: "Монтаж:", value: '19" стойка, 1U' },
        { label: "Корпус:", value: "Металл" },
        { label: "Вентиляция:", value: "Нет" },
      ],
    },
    {
      title: "Питание и охлаждение",
      icon: "Cpu",
      iconColor: "text-red-600",
      specs: [
        { label: "Источник питания:", value: "Два встроенных блока питания AC" },
        { label: "Напряжение:", value: "100–240V AC, 50/60Hz" },
        { label: "Потребление (без PoE):", value: "≤37W" },
        { label: "Охлаждение:", value: "Пассивное" },
      ],
    },
    {
      title: "Условия эксплуатации",
      icon: "Thermometer",
      iconColor: "text-indigo-600",
      specs: [
        { label: "Рабочая температура:", value: "-5°C ~ 45°C" },
        { label: "Температура хранения:", value: "-40°C ~ 70°C" },
        { label: "Влажность (рабочая):", value: "10% ~ 90% (без конденсата)" },
        { label: "Влажность (хранение):", value: "5% ~ 95% (без конденсата)" },
        { label: "Высота над уровнем моря:", value: "до 3000 м" },
        { label: "Молниезащита:", value: "6KV" },
      ],
    },
  ],
};