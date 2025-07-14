export const ids3530_24s_8t_6x = {
  model: "IDS3530-24S-8T-6X",
  name: "IDS3530-24S-8T-6X",
  description: "8×1000M Base-T, 24×SFP, 6×10G SFP+",
  modelUrl: "https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24T.glb",
  
  // Характеристики
  characteristics: {
    ports: "8×1000M Base-T, 24×SFP",
    slots: "6×10G SFP+",
    poe: "Нет",
    performance: "184 Gbps",
    power: "Dual AC Power Supply"
  },

  // Порты и интерфейсы
  ports: {
    ethernet: "8×10/100/1000M Base-T RJ45",
    sfp: "24×1G SFP",
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
    switchingCapacity: "184 Gbps",
    throughput: "136.8 Mpps",
    flash: "8 GB",
    ram: "1 GB",
    ipv4Routes: "12K",
    ipv6Routes: "6K"
  },

  // Физические характеристики
  physical: {
    dimensions: "442×320×44.2 мм",
    weight: "≈4.3 кг",
    mounting: "19\" стойка, 1U",
    housing: "Металл",
    ventilation: "Да"
  },

  // Питание и охлаждение
  powerCooling: {
    powerSupply: "Два встроенных блока питания переменного тока",
    voltage: "100–240V AC, 50/60Hz",
    consumption: "≤52W",
    cooling: "Активное, интеллектуальные вентиляторы"
  },

  // Условия эксплуатации
  environment: {
    operatingTemp: "-5°C ~ 50°C",
    storageTemp: "-40°C ~ 70°C",
    operatingHumidity: "10% ~ 90% (без конденсата)",
    storageHumidity: "5% ~ 95% (без конденсата)",
    altitude: "до 3000 м",
    staticProtection: "6KV"
  }
};