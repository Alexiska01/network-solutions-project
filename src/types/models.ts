export interface SwitchModel {
  id: string;
  name: string;
  title: string;
  description: string;
  ports1G: string;
  ports10G: string;
  poe: string | null;
  layer3: boolean;
  category: "access" | "distribution" | "spine" | "leaf";
  url: string;
  image: string;
  link: string;
  specs: {
    ports: string;
    power: string;
    throughput: string;
    tags: string[];
  };
  animationDelay: number;
  features: ("poe" | "sfp")[];
}

export interface FeatureIcon {
  name: string;
  icon: string;
  title: string;
  description: string;
  ariaLabel: string;
}

export type FilterType = "all" | "poe" | "sfp";

// Тип данных для карточек и каталога
export type SwitchData = SwitchModel;
