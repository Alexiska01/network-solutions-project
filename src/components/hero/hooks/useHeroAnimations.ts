import { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  ANIMATION_DELAYS,
  COMPANY_DESCRIPTION,
  PARALLAX_RANGES,
} from "../constants";

/**
 * Хук для управления анимациями и состоянием Hero секции
 */
export const useHeroAnimations = () => {
  const [typingText, setTypingText] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showIDATA, setShowIDATA] = useState(false);

  const { scrollY } = useScroll();

  // Parallax эффекты
  const backgroundY = useTransform(
    scrollY,
    [PARALLAX_RANGES.BACKGROUND[0], PARALLAX_RANGES.BACKGROUND[1]],
    [PARALLAX_RANGES.BACKGROUND[2], PARALLAX_RANGES.BACKGROUND[3]],
  );

  const contentY = useTransform(
    scrollY,
    [PARALLAX_RANGES.CONTENT[0], PARALLAX_RANGES.CONTENT[1]],
    [PARALLAX_RANGES.CONTENT[2], PARALLAX_RANGES.CONTENT[3]],
  );

  // Функция плавного скролла к секции продуктов
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Эффект показа логотипа iDATA
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIDATA(true);
    }, ANIMATION_DELAYS.IDATA_SHOW);

    return () => clearTimeout(timeout);
  }, []);

  // Эффект анимации печатающегося текста
  useEffect(() => {
    if (!showTyping) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= COMPANY_DESCRIPTION.length) {
        setTypingText(COMPANY_DESCRIPTION.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, ANIMATION_DELAYS.TYPING_SPEED);

    return () => clearInterval(typingInterval);
  }, [showTyping]);

  return {
    // Состояние
    typingText,
    showTyping,
    showIDATA,

    // Функции
    setShowTyping,
    scrollToProducts,

    // Parallax значения
    backgroundY,
    contentY,

    // Вычисленные значения
    isTypingComplete: typingText.length >= COMPANY_DESCRIPTION.length,
    fullText: COMPANY_DESCRIPTION,
  };
};
