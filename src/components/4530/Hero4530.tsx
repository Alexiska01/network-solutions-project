import SeriesHero from "@/components/hero_series/SeriesHero";

const Hero4530 = () => (
  <SeriesHero
    seriesTitle="IDS4530"
    modelUrl="/models/4530all.glb"
    pdfUrl="https://drive.google.com/file/d/14LsavLKoXR3eiJiTnnLzza9VnKKoU993/view?usp=drive_link"
    features={[
      { icon: "GitBranch", text: "Статическая и динамическая маршрутизация (IPv4/IPv6)" },
      { icon: "SlidersHorizontal", text: "QoS: 8 очередей, приоритизация CoS/DSCP" },
      { icon: "Globe", text: "Полная поддержка IPv4 и IPv6 (dual-stack)" },
      { icon: "ShieldCheck", text: "Безопасность: 802.1X и списки доступа (ACL)" },
    ]}
  />
);

export default Hero4530;
