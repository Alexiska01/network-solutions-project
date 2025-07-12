// Типы для компонентов Hero секции

export interface HeroMetric {
  icon: string;
  value: string;
  label: string;
  color: "emerald" | "blue" | "purple" | "orange" | "amber";
  trend?: string;
  gradient?: string;
}

export interface HeroDevice {
  icon: string;
  label: string;
  status?: "active" | "warning";
  color: "emerald" | "blue" | "amber";
}

export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    rotateX?: number;
    rotateY?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    rotateX?: number;
    rotateY?: number;
    transition?: any;
  };
}
