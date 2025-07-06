import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { SwitchModel } from "@/types/models";

interface ModelCardProps {
  model: SwitchModel;
  isInCompareList: boolean;
  onToggleCompare: (modelId: string) => void;
  onNavigate: (url: string) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isInCompareList,
  onToggleCompare,
  onNavigate,
}) => {
  return (
    <motion.div
      className="group bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl hover:border-brand-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: model.animationDelay }}
      viewport={{ once: true }}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => onToggleCompare(model.id)}
          className={`p-2 rounded-full transition-all duration-300 ${
            isInCompareList
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Icon name="Plus" className="h-4 w-4" />
        </button>
      </div>

      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans group-hover:text-brand-primary transition-colors">
        {model.name}
      </h3>

      <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
        {model.description}
      </p>

      <Button
        className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
        onClick={() => onNavigate(model.url)}
      >
        <Icon
          name="Info"
          className="mr-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
        />
        Подробнее
      </Button>
    </motion.div>
  );
};

export default ModelCard;
