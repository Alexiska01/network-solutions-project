import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { switchModels4530 } from "@/data/switchModels";

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
    const model = switchModels4530.find((m) => m.id === modelId);
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
                  <td className="p-4 font-semibold">Base-T порты</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    const modelName = model?.name.toLowerCase() || "";
                    let baseTports = 0;
                    if (modelName.includes("24t") || modelName.includes("24p"))
                      baseTports = 24;
                    else if (
                      modelName.includes("48t") ||
                      modelName.includes("48p")
                    )
                      baseTports = 48;
                    return (
                      <td key={modelId} className="p-4">
                        {baseTports > 0 ? baseTports : "N/A"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">SFP слоты</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    const modelName = model?.name.toLowerCase() || "";
                    let sfpSlots = 0;
                    if (modelName.includes("24s")) sfpSlots = 24;
                    else if (modelName.includes("48s")) sfpSlots = 48;
                    return (
                      <td key={modelId} className="p-4">
                        {sfpSlots > 0 ? sfpSlots : "N/A"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">SFP+ слоты</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    const modelName = model?.name.toLowerCase() || "";
                    let sfpPlusSlots = 0;
                    if (modelName.includes("24t") || modelName.includes("24p"))
                      sfpPlusSlots = 6;
                    else if (
                      modelName.includes("48t") ||
                      modelName.includes("48p")
                    )
                      sfpPlusSlots = 6;
                    else if (
                      modelName.includes("24s") ||
                      modelName.includes("48s")
                    )
                      sfpPlusSlots = 4;
                    return (
                      <td key={modelId} className="p-4">
                        {sfpPlusSlots > 0 ? sfpPlusSlots : "N/A"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">PoE бюджет</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    const modelName = model?.name.toLowerCase() || "";
                    let poeWatts = 0;
                    if (modelName.includes("24p") || modelName.includes("48p"))
                      poeWatts = 380;
                    return (
                      <td key={modelId} className="p-4">
                        {poeWatts > 0 ? `${poeWatts}Вт` : "Нет"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Пропускная способность</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    const modelName = model?.name.toLowerCase() || "";
                    let throughput = 0;
                    if (modelName.includes("24t") || modelName.includes("24p"))
                      throughput = 448;
                    else if (
                      modelName.includes("48t") ||
                      modelName.includes("48p")
                    )
                      throughput = 496;
                    else if (modelName.includes("24s")) throughput = 688;
                    else if (modelName.includes("48s")) throughput = 216;
                    return (
                      <td key={modelId} className="p-4">
                        {throughput > 0 ? `${throughput} Гбит/с` : "N/A"}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Управление</td>
                  {compareModels.map((modelId) => {
                    const model = getModelSpecs(modelId);
                    const modelName = model?.name.toLowerCase() || "";
                    const hasSfpOnly =
                      modelName.includes("24s") || modelName.includes("48s");
                    return (
                      <td key={modelId} className="p-4">
                        {hasSfpOnly ? "RJ45, USB, OOB" : "Стандартное"}
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
