export interface SwitchModel {
  id: string;
  name: string;
  description: string;
  ports1G: string;
  ports10G: string;
  poe: string | null;
  layer3: boolean;
  category: "poe" | "sfp" | "both";
  url: string;
  animationDelay: number;
}

export interface FeatureIcon {
  name: string;
  icon: string;
  title: string;
  description: string;
  ariaLabel: string;
}

export type FilterType = "all" | "poe" | "sfp";
