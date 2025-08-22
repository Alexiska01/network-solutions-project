import SeriesHero from "@/components/hero_series/SeriesHero";

const Hero4530 = () => (
  <SeriesHero
    seriesTitle="IDS4530"
    modelUrl="/models/4530all.glb"
    pdfUrl="https://drive.google.com/file/d/14LsavLKoXR3eiJiTnnLzza9VnKKoU993/view?usp=drive_link"
    features={[
      { icon: "GitBranch", text: "Статическая маршрутизация" },
      { icon: "Network", text: "Динамическая маршрутизация RIP, OSPF, BGP, ISIS" },
      { icon: "ArrowUpDown", text: "Модули расширения для интерфейсов 40G и 100G" },
    ]}
  />
);

export default Hero4530;
