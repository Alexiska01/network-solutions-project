import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ComparisonPanelProps {
  compareModels: string[];
  onClearAll: () => void;
  onRemoveModel: (modelId: string) => void;
  onShowModal: () => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  compareModels,
  onClearAll,
  onRemoveModel,
  onShowModal,
}) => {
  if (compareModels.length < 2) return null;

  return (
    <motion.section
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900 font-sans">
            Выбрано для сравнения: {compareModels.length} модели
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {compareModels.map((model) => (
                <div key={model} className="flex items-center gap-2">
                  <Icon name="Network" className="h-6 w-6 text-brand-primary" />
                  <span className="text-sm text-gray-600 font-sans">
                    {model}
                  </span>
                  <button
                    onClick={() => onRemoveModel(model)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Icon name="X" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClearAll}
                className="px-4 py-2 text-sm"
              >
                Очистить
              </Button>
              <Button
                className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-6 py-2"
                onClick={onShowModal}
              >
                Сравнить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ComparisonPanel;
