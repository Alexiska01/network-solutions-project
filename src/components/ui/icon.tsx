// src/components/ui/icon.tsx
import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  /** Имя иконки из lucide-react */
  name: keyof typeof LucideIcons;
  /** Запасная иконка, если основную не нашли */
  fallback?: keyof typeof LucideIcons;
}

const Icon: React.FC<IconProps> = ({
  name,
  fallback = "CircleAlert",
  ...props
}) => {
  // Пытаемся взять иконку по имени, иначе — по запасному, иначе рисуем пустой <svg/>
  const IconComponent =
    (LucideIcons[name] as React.FC<LucideProps>) ||
    (LucideIcons[fallback] as React.FC<LucideProps>) ||
    (() => <svg {...props} />);

  return <IconComponent {...props} />;
};

export default Icon;
