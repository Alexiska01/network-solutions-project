import SeriesHero from "@/components/hero_series/SeriesHero";

const Hero6010 = () => (
  <SeriesHero
    seriesTitle="IDS6010"
    modelUrl="/models/6010all.glb"
    pdfUrl="https://drive.google.com/file/d/PLACEHOLDER6010/view?usp=drive_link"
    features={[
  { icon: "Layers3", text: "Стек до 8 устройств через 40G/100G QSFP" },
  { icon: "Waves", text: "Поддержка MPLS для пограничных ролей" },
  { icon: "Activity", text: "Высокая доступность: M‑LAG, STP/RSTP/MSTP" },
  { icon: "ServerCog", text: "Управление: SNMPv2/v3, Netconf/YANG, SSH" },
    ]}
  />
);

export default Hero6010;
