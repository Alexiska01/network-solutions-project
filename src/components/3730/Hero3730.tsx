import SeriesHero from "@/components/hero_series/SeriesHero";

// Конфиг 3730 для общего героя
const model3730Data = {
  modelUrl: "/models/3730all.glb",
  pdfUrl: "https://drive.google.com/file/d/1cWTkuRizshVB9nv9w_FVyvtuFKZDdZz0/view?usp=drive_link",
};

const Hero3730 = () => (
  <SeriesHero
    seriesTitle="IDS3730"
    modelUrl={model3730Data.modelUrl}
    pdfUrl={model3730Data.pdfUrl}
    features={[
      { icon: "GitBranch", text: "RIP, OSPF, BGP, ISIS — L3 маршрутизация" },
      { icon: "Layers3", text: "Стек до 8 устройств, кольцевые топологии" },
      { icon: "UserCheck", text: "Безопасность: 802.1X, ACL, MPLS, SNMP/SSH" },
      { icon: "Settings", text: "IPv4/IPv6, QoS (8 очередей), ZTP" },
    ]}
  />
);

export default Hero3730;