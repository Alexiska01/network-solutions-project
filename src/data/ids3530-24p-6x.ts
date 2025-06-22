import { ProductInfo } from "@/types/product";

export const ids353024p6xData: ProductInfo = {
  id: "ids3530-24p-6x",
  title: "IDS3530-24P-6X",
  description:
    "24×1G Base-T + 6×10G SFP+, PoE+ 380 Вт — оптимальная производительность для среднего бизнеса",
  modelPath: "https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS3530-24P-6X.glb",
  basicSpecs: [
    { label: "Порты:", value: "24×1000M Base-T" },
    { label: "Слоты:", value: "6×10G SFP+" },
    { label: "Поддержка PoE&PoE+:", value: "380W" },
    { label: "Производительность:", value: "168 Gbps" },
    { label: "Питание:", value: "Fixed One AC Power Supply" },
  ],
  features: [
    {
      icon: "Zap",
      iconColor: "from-blue-500 to-indigo-500",
      title: "PoE+ 380 Вт",
      description:
        "Надежное питание IP-камер, точек доступа и других устройств",
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
        { label: "Порты Ethernet:", value: "24×10/100/1000M Base-T RJ45" },
        { label: "SFP+ слоты:", value: "6×10G SFP+" },
        { label: "Консольный порт:", value: "1×RJ45" },
        { label: "USB-порт:", value: "1×USB 2.0" },
      ],
    },
    {
      title: "Производительность",
      icon: "Gauge",
      iconColor: "text-green-600",
      specs: [
        { label: "Пропускная способность:", value: "168 Gbps" },
        { label: "Скорость передачи:", value: "125 Mpps" },
        { label: "Таблица MAC-адресов:", value: "32K" },
        { label: "Задержка:", value: "< 3 μs" },
      ],
    },
    {
      title: "PoE характеристики",
      icon: "Zap",
      iconColor: "text-orange-600",
      specs: [
        { label: "Общая мощность PoE:", value: "380W" },
        { label: "PoE портов:", value: "24 порта" },
        { label: "Стандарты:", value: "IEEE 802.3af/at" },
        { label: "Мощность на порт:", value: "до 30W" },
      ],
    },
    {
      title: "Физические характеристики",
      icon: "Box",
      iconColor: "text-purple-600",
      specs: [
        { label: "Размеры (ШxГxВ):", value: "440×260×44 мм" },
        { label: "Вес:", value: "3.2 кг" },
        { label: "Монтаж:", value: '19" стойка, 1U' },
        { label: "Материал корпуса:", value: "Металл" },
      ],
    },
    {
      title: "Питание и охлаждение",
      icon: "Cpu",
      iconColor: "text-red-600",
      specs: [
        { label: "Источник питания:", value: "Fixed One AC Power Supply" },
        { label: "Напряжение:", value: "100-240V AC, 50/60Hz" },
        { label: "Максимальное потребление:", value: "450W" },
        { label: "Охлаждение:", value: "Интеллектуальные вентиляторы" },
      ],
    },
    {
      title: "Условия эксплуатации",
      icon: "Thermometer",
      iconColor: "text-indigo-600",
      specs: [
        { label: "Рабочая температура:", value: "0°C ~ 50°C" },
        { label: "Температура хранения:", value: "-40°C ~ 70°C" },
        { label: "Влажность:", value: "10% ~ 90% (без конденсата)" },
        { label: "Высота над уровнем моря:", value: "до 3000 м" },
      ],
    },
  ],
};
