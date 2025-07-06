import React from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { FeatureIcon } from "@/types/models";

interface FeatureIconsGridProps {
  features: FeatureIcon[];
}

const FeatureIconsGrid: React.FC<FeatureIconsGridProps> = ({ features }) => {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.9,
          },
        },
      }}
    >
      {features.map((feature) => (
        <motion.div
          key={feature.name}
          className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2 cursor-pointer"
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            },
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          aria-label={feature.ariaLabel}
        >
          <Icon
            name={feature.icon}
            size={20}
            className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
          />
          <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
            {feature.title}
          </h3>
          <p className="text-xs md:text-sm text-blue-200">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureIconsGrid;
