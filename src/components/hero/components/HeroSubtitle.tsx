import { motion } from "framer-motion";
import { itemVariants } from "../animations";

interface HeroSubtitleProps {
  showIDATA: boolean;
  showTyping: boolean;
  typingText: string;
  isTypingComplete: boolean;
  onShowTyping: () => void;
}

/**
 * Компонент подзаголовка с анимацией печатающегося текста
 */
const HeroSubtitle = ({
  showIDATA,
  showTyping,
  typingText,
  isTypingComplete,
  onShowTyping,
}: HeroSubtitleProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="h-28 flex items-start justify-start mb-6 relative"
    >
      <div className="relative z-10">
        <div className="text-lg md:text-xl lg:text-2xl leading-relaxed">
          {showIDATA && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 12,
                duration: 1,
              }}
              onAnimationComplete={onShowTyping}
              className="inline-block font-black text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text relative"
            >
              iDATA
              {/* Светящийся эффект для логотипа */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-lg blur-lg -z-10 opacity-0 animate-pulse" />
            </motion.div>
          )}
          {showTyping && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-blue-100/90 font-medium"
            >
              {typingText}
            </motion.span>
          )}
          {showTyping && !isTypingComplete && (
            <motion.span
              className="inline-block w-0.5 h-6 bg-gradient-to-t from-cyan-400 to-blue-400 ml-1 rounded-full shadow-lg shadow-cyan-400/50"
              animate={{
                opacity: [0, 1, 0],
                scaleY: [1, 1.2, 1],
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSubtitle;