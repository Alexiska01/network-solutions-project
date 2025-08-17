import React from "react";
import type { TouchState } from "../types";

interface UseTouchGesturesProps {
  touchStart: TouchState | null;
  isDragging: boolean;
  setTouchStart: (state: TouchState | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  dragXValue: number;
  setDragXValue: (val: number) => void;
  onClose: () => void;
}

export const useTouchGestures = ({
  touchStart,
  isDragging,
  setTouchStart,
  setIsDragging,
  dragXValue,
  setDragXValue,
  onClose,
}: UseTouchGesturesProps) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    // Не обрабатываем touch на кнопках и ссылках
    const target = e.target as HTMLElement;
    if (target.closest("button, a")) {
      return;
    }

    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
  const diffX = currentX - touchStart.x; // отрицательный при свайпе влево
    const diffY = Math.abs(currentY - touchStart.y);

    // Проверяем что это горизонтальный свайп и не клик по кнопке
  if (Math.abs(diffX) > 25 && diffY < 50) {
      // Проверяем что целевой элемент не является кнопкой или ссылкой
      const target = e.target as HTMLElement;
      const isClickable = target.closest("button, a");

      if (!isClickable) {
    setIsDragging(true);
    // Панель открывается справа, закрывающий свайп влево -> diffX < 0
    if (diffX < 0) setDragXValue(Math.max(diffX, -200));
      }
    }
  };

  const handleTouchEnd = () => {
  // dragXValue отрицательный при свайпе влево. Если по модулю превышает порог - закрываем
  if (isDragging && Math.abs(dragXValue) > 80) {
      onClose();
    } else {
      setDragXValue(0);
    }
    setTouchStart(null);
    setIsDragging(false);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
