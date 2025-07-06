import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { switchModels } from "@/data/switchModels";

interface ComparisonModalProps {
  isOpen: boolean;
  compareModels: string[];
  onClose: () => void;
  onRemoveModel: (modelId: string) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  compareModels,
  onClose,
  onRemoveModel,
}) => {
  if (!isOpen) return null;

  const getModelSpecs = (modelId: string) => {
    const model = switchModels.find((m) => m.id === modelId);
    return model || null;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-sans">
              Сравнение моделей
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Icon name="X" className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-sans">Характеристики</th>
                  {compareModels.map((modelId) => (
                    <th key={modelId} className="text-left p-4 font-sans">
                      {modelId}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Порты 1G</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    return (
                      <td key={modelId} className="p-4">
                        {model?.ports1G || "N/A"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Порты 10G</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    return (
                      <td key={modelId} className="p-4">
                        {model?.ports10G || "N/A"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">PoE</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    return (
                      <td key={modelId} className="p-4">
                        {model?.poe || "Нет"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Layer 3</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    return (
                      <td key={modelId} className="p-4">
                        {model?.layer3 ? "Да" : "Нет"}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComparisonModal;
