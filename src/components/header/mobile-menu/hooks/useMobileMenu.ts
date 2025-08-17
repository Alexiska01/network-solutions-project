import { useState, useEffect, useRef } from "react";
import { navigationItems } from "../../navigationData";
import type { MenuLevel, TouchState } from "../types";

export const useMobileMenu = (isOpen: boolean) => {
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<TouchState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Простое числовое состояние вместо framer-motion spring
  const [dragXValue, setDragXValue] = useState(0);
  const dragOpacityValue = 1 - Math.min(dragXValue, 150) / 150 * 0.3; // 0 ->1, 150->0.7

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
  setDragXValue(0);
      }, 300);
    }
  }, [isOpen]);

  // Блокировка скролла body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const navigateToLevel = (newLevel: MenuLevel) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuStack((prev) => [...prev, newLevel]);
      setIsTransitioning(false);
    }, 150);
  };

  const navigateBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuStack((prev) => prev.slice(0, -1));
      setIsTransitioning(false);
    }, 150);
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
    isTransitioning,
    touchStart,
    isDragging,
    menuRef,
  dragXValue,
  dragOpacityValue,
  setDragXValue,
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
