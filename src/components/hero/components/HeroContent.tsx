import { motion } from "framer-motion";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroButtons from "./HeroButtons";
import HeroDecorations from "./HeroDecorations";
import { useHeroAnimations } from "../hooks/useHeroAnimations";
import { itemVariants } from "../animations";

/**
 * Левая колонка Hero секции с основным контентом
 */
const HeroContent = () => {
  const {
    showIDATA,
    showTyping,
    typingText,
    isTypingComplete,
    setShowTyping,
    scrollToProducts,
  } = useHeroAnimations();
  return (
    <div className="flex flex-col h-full min-h-[520px] relative overflow-visible">
      <HeroDecorations />

      {/* Заголовок - премиальный мировой уровень */}
      <HeroTitle />

      {/* Подзаголовок - премиальная типографика */}
      <HeroSubtitle
        showIDATA={showIDATA}
        showTyping={showTyping}
        typingText={typingText}
        isTypingComplete={isTypingComplete}
        onShowTyping={() => setShowTyping(true)}
      />

      {/* Кнопки - премиальный дизайн мирового уровня */}
      <HeroButtons onProductsClick={scrollToProducts} />
    </div>
  );
};

export default HeroContent;
