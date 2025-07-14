export const ids3730_24t_6x = {
  model: "IDS3730-24T-6X",
  name: "IDS3730-24T-6X",
  description: "24×1000M Base-T, 6×10G SFP+",
  modelUrl: "https://s3.twcstorage.ru/c80bd43d-3dmodels/S3730-24T.glb",
  
  // Характеристики
  characteristics: {
    ports: "24×1000M Base-T",
    slots: "6×10G SFP+",
    poe: "Нет",
    performance: "168 Gbps",
    power: "Два слота для установки блоков питания"
  },

  // Порты и интерфейсы
  ports: {
    ethernet: "24×10/100/1000M Base-T RJ45",
    sfpPlus: "6×10G SFP+",
    console: "RJ45",
    management: "OOB интерфейс, 1×USB 2.0"
  },

  // PoE характеристики
  poe: {
    support: "Нет",
    standards: "Н/Д"
  },

  // Производительность
  performance: {
    switchingCapacity: "168 Gbps",
    throughput: "125 Mpps",
    flash: "8 GB",
    ram: "1 GB",
    ipv4Routes: "12K",
    ipv6Routes: "6K"
  },

  // Физические характеристики
  physical: {
    dimensions: "442×320×44.2 мм",
    weight: "≈4.1 кг",
    mounting: "19\" стойка, 1U",
    housing: "Металл",
    ventilation: "Нет"
  },

  // Питание и охлаждение
  powerCooling: {
    powerSupply: "2 слота под блоки питания переменного тока (опциональные)",
    voltage: "100–240V AC, 50/60Hz",
    consumption: "≤37W",
    cooling: "Пассивное"
  },

  // Условия эксплуатации
  environment: {
    operatingTemp: "-5°C ~ 45°C",
    storageTemp: "-40°C ~ 70°C",
    operatingHumidity: "10% ~ 90% (без конденсата)",
    storageHumidity: "5% ~ 95% (без конденсата)",
    altitude: "до 3000 м",
    staticProtection: "6KV"
  }
};