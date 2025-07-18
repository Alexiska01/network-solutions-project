import { motion, useScroll, useTransform } from "framer-motion";

const HeroBackground = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <motion.div
      className="absolute inset-0 z-0 bg-gradient-hero"
      style={{ y: backgroundY }}
    />
  );
};

export default HeroBackground;