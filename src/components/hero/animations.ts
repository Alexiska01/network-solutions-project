import { Variants } from "framer-motion";
import type { AnimationVariants } from "./types";

// Основные варианты анимации для контейнеров
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

// Варианты анимации для элементов
export const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Анимация для заголовка
export const titleVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 1.2,
    },
  },
};

// Анимация для текстовых блоков заголовка
export const titleSpanVariants = {
  first: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.3, duration: 0.8 },
  },
  second: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.5, duration: 0.8 },
  },
  third: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.7, duration: 0.8 },
  },
};

// Анимация для кнопок
export const buttonVariants = {
  primary: {
    initial: { opacity: 0, y: 20, rotateX: -15 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { delay: 1.8, type: "spring", stiffness: 100 },
    whileHover: { scale: 1.05, rotateY: -2, y: -2 },
    whileTap: { scale: 0.98 },
  },
  secondary: {
    initial: { opacity: 0, y: 20, rotateX: -15 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { delay: 2, type: "spring", stiffness: 100 },
    whileHover: { scale: 1.05, rotateY: 2, y: -2 },
    whileTap: { scale: 0.98 },
  },
};

// Анимация для консоли десктопа
export const desktopConsoleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, rotateY: -20, z: -50 },
  visible: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    z: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: 0.5,
      duration: 1.2,
    },
  },
};

// Анимация для метрик
export const metricVariants = {
  mobile: (i: number) => ({
    initial: { opacity: 0, scale: 0.8, rotateY: -10 },
    animate: { opacity: 1, scale: 1, rotateY: 0 },
    transition: {
      delay: 0.6 + i * 0.1,
      type: "spring",
      stiffness: 120,
    },
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
  }),
  desktop: (i: number) => ({
    initial: { opacity: 0, y: 30, scale: 0.8, rotateX: -10 },
    animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    transition: {
      delay: 1.0 + i * 0.1,
      type: "spring",
      stiffness: 120,
    },
    whileHover: {
      scale: 1.05,
      y: -5,
      rotateY: 3,
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
    },
  }),
};

// Анимация для устройств
export const deviceVariants = (index: number, isMobile: boolean = false) => ({
  initial: { scale: 0, rotate: -90, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  transition: {
    delay: isMobile ? 1.8 + index * 0.1 : 2.2 + index * 0.1,
    type: "spring",
    stiffness: 150,
    damping: isMobile ? undefined : 12,
  },
  whileHover: isMobile ? { scale: 1.05, y: -2 } : { scale: 1.08, y: -3 },
  whileTap: { scale: 0.95 },
});
