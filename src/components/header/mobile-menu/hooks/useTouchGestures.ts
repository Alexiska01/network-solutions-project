import React from "react";
import type { TouchState } from "../types";

interface UseTouchGesturesProps {
  touchStart: TouchState | null;
  isDragging: boolean;
  setTouchStart: (state: TouchState | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  dragX: any; // MotionValue<number>
  onClose: () => void;
}

export const useTouchGestures = ({
  touchStart,
  isDragging,
  setTouchStart,
  setIsDragging,
  dragX,
  onClose,
}: UseTouchGesturesProps) => {
  const handleTouchStart = (e: React.TouchEvent) => {
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
    const diffX = currentX - touchStart.x;
    const diffY = Math.abs(currentY - touchStart.y);

    // Проверяем что это горизонтальный свайп
    if (Math.abs(diffX) > 10 && diffY < 50) {
      setIsDragging(true);
      if (diffX > 0) {
        // Свайп вправо
        dragX.set(Math.min(diffX, 200));
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging && dragX.get() > 80) {
      onClose();
    } else {
      dragX.set(0);
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
