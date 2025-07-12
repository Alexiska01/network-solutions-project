import { motion } from "framer-motion";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroButtons from "./HeroButtons";
import HeroDecorations from "./HeroDecorations";
import { itemVariants } from "../animations";

interface HeroContentProps {
  showIDATA: boolean;
  showTyping: boolean;
  typingText: string;
  isTypingComplete: boolean;
  onShowTyping: () => void;
  onProductsClick: () => void;
}

/**
 * Левая колонка Hero секции с основным контентом
 */
const HeroContent = ({
  showIDATA,
  showTyping,
  typingText,
  isTypingComplete,
  onShowTyping,
  onProductsClick,
}: HeroContentProps) => {
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
        onShowTyping={onShowTyping}
      />

      {/* Кнопки - премиальный дизайн мирового уровня */}
      <HeroButtons onProductsClick={onProductsClick} />
    </div>
  );
};

export default HeroContent;
