import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className="font-mono text-cyan-300 text-center leading-relaxed">
      {displayedText}
      <motion.span
        className="inline-block w-1.5 h-4 sm:w-2 sm:h-5 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 1.5, repeat: Infinity }}
      />
    </span>
  );
};

export default TypewriterText;