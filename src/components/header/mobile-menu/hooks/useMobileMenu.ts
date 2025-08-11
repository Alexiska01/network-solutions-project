import { useState, useEffect, useRef } from "react";
import { navigationItems } from "../../navigationData";
import type { MenuLevel, TouchState } from "../types";

// Простая реализация spring анимации без Framer Motion
class SimpleSpring {
  private value: number = 0;
  private target: number = 0;
  private velocity: number = 0;
  private stiffness: number = 300;
  private damping: number = 30;

  constructor(initialValue: number = 0) {
    this.value = initialValue;
    this.target = initialValue;
  }

  set(newTarget: number) {
    this.target = newTarget;
  }

  get(): number {
    return this.value;
  }

  update() {
    const force = (this.target - this.value) * this.stiffness;
    this.velocity = (this.velocity + force) * (1 - this.damping / 1000);
    this.value += this.velocity;
    
    // Останавливаем анимацию если очень близко к цели
    if (Math.abs(this.target - this.value) < 0.1 && Math.abs(this.velocity) < 0.1) {
      this.value = this.target;
      this.velocity = 0;
    }
    
    return this.value;
  }
}

// Функция для трансформации значений
const transform = (value: number, inputRange: number[], outputRange: number[]): number => {
  const progress = Math.max(0, Math.min(1, (value - inputRange[0]) / (inputRange[1] - inputRange[0])));
  return outputRange[0] + (outputRange[1] - outputRange[0]) * progress;
};

export const useMobileMenu = (isOpen: boolean) => {
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<TouchState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Простая spring анимация для драга
  const dragXRef = useRef(new SimpleSpring(0));
  const dragX = dragXRef.current;
  
  // Создаем объект для opacity трансформации
  const dragOpacity = {
    get: () => transform(dragX.get(), [0, 150], [1, 0.7])
  };

  // Инициализация главного меню
  useEffect(() => {
    if (isOpen && menuStack.length === 0) {
      setMenuStack([{ title: "Меню", items: navigationItems }]);
    }
  }, [isOpen, menuStack.length]);

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMenuStack([]);
        setActiveItem(null);
        setExpandedItems(new Set());
        dragX.set(0);
      }, 300);
    }
  }, [isOpen, dragX]);

  const navigateToLevel = (newLevel: MenuLevel) => {
    setMenuStack((prev) => [...prev, newLevel]);
  };

  const navigateBack = () => {
    setMenuStack((prev) => prev.slice(0, -1));
  };

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  };

  const currentLevel = menuStack[menuStack.length - 1];
  const canGoBack = menuStack.length > 1;

  return {
    menuStack,
    expandedItems,
    activeItem,
    touchStart,
    isDragging,
    menuRef,
    dragX,
    dragOpacity,
    currentLevel,
    canGoBack,
    setActiveItem,
    setTouchStart,
    setIsDragging,
    navigateToLevel,
    navigateBack,
    toggleExpanded,
  };
};