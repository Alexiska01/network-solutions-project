import SeriesHero from "@/components/hero_series/SeriesHero";

const Hero3530 = () => (
  <SeriesHero
    seriesTitle="IDS3530"
    modelUrl="/models/3530all.glb"
    pdfUrl="https://drive.google.com/file/d/1-4xHlvPUr7kUBCQBzgh7Lz2FGC1COfwe/view?usp=drive_link"
    features={[
      { icon: 'Server', text: 'До 760 Вт PoE+, 10G uplink, модульные БП' },
      { icon: 'Layers3', text: 'Стек до 8 устройств, кольцевые топологии' },
      { icon: 'Settings', text: 'QoS, SNMP, автоматизация (ZTP), удалённое управление' },
      { icon: 'ServerCog', text: 'Высокая доступность: STP, RSTP, MSTP' },
    ]}
  />
);

export default Hero3530;