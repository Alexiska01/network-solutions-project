// src/components/ui/icon.tsx
import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  /** Имя иконки из lucide-react */
  name: keyof typeof LucideIcons;
  /** Запасная иконка, если основную не нашли */
  fallback?: keyof typeof LucideIcons;
  /** SVG title (для a11y и тултипа при наведении) */
  title?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  fallback = "CircleAlert",
  title,
  children,
  ...props
}) => {
  // Определяем компонент-иконку
  const IconComponent =
    (LucideIcons[name] as React.FC<LucideProps>) ||
    (LucideIcons[fallback] as React.FC<LucideProps>) ||
    (() => <svg {...props} />);

  // Встраиваем <title> внутрь SVG если передан
  return (
    <IconComponent {...props}>
      {title ? <title>{title}</title> : null}
      {children}
    </IconComponent>
  );
};

export default Icon;
