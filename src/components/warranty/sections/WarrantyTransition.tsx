import React from 'react';
import '@/components/warranty/WarrantyTransition.css';

/**
 * Чистый вертикальный градиент-переход между hero и карточками.
 * Без волн и радиальных эффектов — только плавное растворение цвета hero в белый фон.
 */
export const WarrantyTransition: React.FC = () => (
  <div className="warranty-transition" aria-hidden />
);
