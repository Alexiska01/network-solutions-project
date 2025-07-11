// src/components/ui/icon.tsx
import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  /** Имя иконки из lucide-react */
  name: keyof typeof LucideIcons;
  /** Запасная иконка, если основную не нашли */
  fallback?: keyof typeof LucideIcons;
  /** Дефолтный размер иконки */
  size?: number;
  /** Дефолтный strokeWidth */
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  fallback = "CircleAlert",
  size = 28,
  strokeWidth = 1.8,
  ...props
}) => {
  const IconComponent =
    (LucideIcons[name] as React.FC<LucideProps>) ||
    (LucideIcons[fallback] as React.FC<LucideProps>) ||
    undefined;

  if (!IconComponent) {
    // Заглушка-иконка с дефолтными размерами
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

export default Icon;
