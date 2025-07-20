import { ProductInfo } from "@/types/product";

export const ids353048p6xData: ProductInfo = {
  id: "ids3530-48p-6x",
  title: "IDS3530-48P-6X",
  description:
    "48×1G Base-T + 6×10G SFP+, PoE+ 760 Вт — максимальная производительность для крупного бизнеса",
  modelPath: "/models/IDS3530-48P.glb",
  basicSpecs: [
    { label: "Порты:", value: "48×1000M Base-T" },
    { label: "Слоты:", value: "6×10G SFP+" },
    { label: "Поддержка PoE&PoE+:", value: "760W" },
    { label: "Производительность:", value: "216 Gbps" },
    { label: "Питание:", value: "Fixed One AC Power Supply" },
  ],
  features: [
    {
      icon: "Zap",
      iconColor: "from-blue-500 to-indigo-500",
      title: "PoE+ 760 Вт",
      description:
        "Максимальная мощность для питания большого количества устройств",
    },
    {
      icon: "Network",
      iconColor: "from-emerald-500 to-green-500",
      title: "6×10G SFP+",
      description:
        "Высокоскоростные аплинки для подключения к серверам и магистрали",
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
        { label: "Ethernet-порты:", value: "48×10/100/1000M Base-T RJ45" },
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
        { label: "Общая мощность PoE:", value: "760W" },
        { label: "Стандарты:", value: "IEEE 802.3af/at" },
      ],
    },
    {
      title: "Производительность и память",
      icon: "Gauge",
      iconColor: "text-green-600",
      specs: [
        { label: "Коммутационная способность:", value: "216 Gbps" },
        { label: "Пропускная способность:", value: "160.7 Mpps" },
        { label: "Flash-память:", value: "8 GB" },
        { label: "ОЗУ:", value: "1 GB" },
        { label: "Таблица MAC-адресов:", value: "32K" },
        { label: "Макс. размер кадра:", value: "12K" },
        { label: "ARP-таблица:", value: "12K" },
        { label: "ND-таблица:", value: "6K" },
        { label: "Количество VLAN:", value: "4K" },
        { label: "LACP-групп:", value: "64" },
        { label: "Участников в LACP:", value: "32" },
        { label: "MSTP экземпляров:", value: "64" },
        { label: "IPv4 маршрутов:", value: "12K" },
        { label: "IPv6 маршрутов:", value: "6K" },
        { label: "Multicast L2:", value: "2K" },
        { label: "Multicast L3:", value: "2K" },
        { label: "VRF:", value: "1K" },
        { label: "VRRP:", value: "255" },
      ],
    },
    {
      title: "Физические характеристики",
      icon: "Box",
      iconColor: "text-purple-600",
      specs: [
        { label: "Размеры (Ш×Г×В):", value: "442×380×44.2 мм" },
        { label: "Вес:", value: "≈4.4 кг" },
        { label: "Монтаж:", value: '19" стойка, 1U' },
        { label: "Корпус:", value: "Металл" },
        { label: "Вентиляция:", value: "Встроенный вентилятор" },
      ],
    },
    {
      title: "Питание и охлаждение",
      icon: "Cpu",
      iconColor: "text-red-600",
      specs: [
        { label: "Источник питания:", value: "Один встроенный блок питания AC" },
        { label: "Напряжение:", value: "100–240V AC, 50/60Hz" },
        { label: "Потребление (без PoE):", value: "≤54W" },
        { label: "Охлаждение:", value: "Активное, интеллектуальные вентиляторы" },
      ],
    },
    {
      title: "Условия эксплуатации",
      icon: "Thermometer",
      iconColor: "text-indigo-600",
      specs: [
        { label: "Температура рабочая:", value: "-5°C ~ 50°C" },
        { label: "Температура хранения:", value: "-40°C ~ 70°C" },
        { label: "Влажность рабочая:", value: "10% ~ 90% (без конденсата)" },
        { label: "Влажность хранение:", value: "5% ~ 95% (без конденсата)" },
        { label: "Высота над уровнем моря:", value: "до 3000 м" },
        { label: "Молниезащита:", value: "6KV" },
        { label: "Антистатическая защита:", value: "6KV" },
      ],
    },
  ],
};