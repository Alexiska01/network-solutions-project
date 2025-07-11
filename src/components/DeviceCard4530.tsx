import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { SwitchModel } from "@/types/models";

interface DeviceCard4530Props {
  model: SwitchModel;
  index: number;
  isInCompareList: boolean;
  onToggleCompare: (modelId: string) => void;
  onNavigate: (url: string) => void;
  animationDelay?: number;
}

const DeviceCard4530 = ({
  model,
  index,
  isInCompareList,
  onToggleCompare,
  onNavigate,
  animationDelay = 0,
}: DeviceCard4530Props) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: animationDelay },
    },
  };

  const formatThroughput = (gbps: number) => {
    return gbps >= 1000 ? `${gbps / 1000}Тбит/с` : `${gbps}Гбит/с`;
  };

  // Определение характеристик из существующих данных модели
  const getSpecs = () => {
    const specs = {
      baseTports: 0,
      sfpSlots: 0,
      sfpPlusSlots: 0,
      poeWatts: 0,
      expansionSlots: 0,
      powerSupplies: 2,
      throughput: 0,
      hasConsole: false,
      hasUsb: false,
      hasOobManagement: false,
      sfpOnly: false,
    };

    // Парсинг характеристик из названия модели
    const modelName = model.name.toLowerCase();

    if (modelName.includes("24t") || modelName.includes("24p")) {
      specs.baseTports = 24;
      specs.sfpPlusSlots = 6;
      specs.throughput = 448;
      specs.expansionSlots = 1;
    } else if (modelName.includes("48t") || modelName.includes("48p")) {
      specs.baseTports = 48;
      specs.sfpPlusSlots = 6;
      specs.throughput = 496;
      specs.expansionSlots = 1;
    } else if (modelName.includes("24s")) {
      specs.sfpSlots = 24;
      specs.sfpPlusSlots = 4;
      specs.throughput = 688;
      specs.expansionSlots = 2;
      specs.sfpOnly = true;
      specs.hasConsole = true;
      specs.hasUsb = true;
      specs.hasOobManagement = true;
    } else if (modelName.includes("48s")) {
      specs.sfpSlots = 48;
      specs.sfpPlusSlots = 4;
      specs.throughput = 216;
      specs.expansionSlots = 2;
      specs.sfpOnly = true;
      specs.hasConsole = true;
      specs.hasUsb = true;
      specs.hasOobManagement = true;
    }

    // PoE модели
    if (modelName.includes("24p")) {
      specs.poeWatts = 380;
    } else if (modelName.includes("48p")) {
      specs.poeWatts = 380;
    }

    return specs;
  };

  const specs = getSpecs();

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header with model, chips and compare checkbox */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {model.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              {specs.poeWatts > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Icon name="Zap" size={12} className="mr-1" />
                  PoE {specs.poeWatts}Вт
                </span>
              )}
              {specs.sfpOnly && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Icon name="Lightbulb" size={12} className="mr-1" />
                  SFP only
                </span>
              )}
              {specs.powerSupplies > 1 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  <Icon name="Battery" size={12} className="mr-1" />
                  Dual PSU
                </span>
              )}
            </div>
          </div>
          <div className="ml-4">
            <Checkbox
              id={`compare-${model.id}`}
              checked={isInCompareList}
              onCheckedChange={() => onToggleCompare(model.id)}
            />
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="px-4 pb-4">
        <div className="space-y-2 text-sm">
          {specs.baseTports > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Base-T порты:</span>
              <span className="font-medium">{specs.baseTports}</span>
            </div>
          )}

          {(specs.sfpSlots > 0 || specs.sfpPlusSlots > 0) && (
            <div className="flex justify-between">
              <span className="text-gray-600">SFP слоты:</span>
              <span className="font-medium">
                {specs.sfpSlots > 0 && `${specs.sfpSlots} SFP`}
                {specs.sfpSlots > 0 && specs.sfpPlusSlots > 0 && " + "}
                {specs.sfpPlusSlots > 0 && `${specs.sfpPlusSlots} SFP+`}
              </span>
            </div>
          )}

          {specs.poeWatts > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Бюджет PoE:</span>
              <span className="font-medium">{specs.poeWatts}Вт</span>
            </div>
          )}

          {specs.expansionSlots > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Слоты расширения:</span>
              <span className="font-medium">{specs.expansionSlots}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Блоки питания:</span>
            <span className="font-medium">{specs.powerSupplies}</span>
          </div>

          {specs.throughput > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Пропускная способность:</span>
              <span className="font-medium">
                {formatThroughput(specs.throughput)}
              </span>
            </div>
          )}

          {(specs.hasConsole || specs.hasUsb || specs.hasOobManagement) && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Управление:</span>
              <div className="flex items-center space-x-2">
                {specs.hasConsole && (
                  <Icon
                    name="Terminal"
                    size={16}
                    className="text-gray-500"
                    title="RJ45 консоль"
                  />
                )}
                {specs.hasUsb && (
                  <Icon
                    name="Usb"
                    size={16}
                    className="text-gray-500"
                    title="USB порт"
                  />
                )}
                {specs.hasOobManagement && (
                  <Icon
                    name="Settings"
                    size={16}
                    className="text-gray-500"
                    title="OOB-management"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(model.url)}
          className="flex-1 mr-2"
        >
          Подробнее
        </Button>
        <Button
          size="sm"
          onClick={() => onNavigate(model.url)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Выбрать
        </Button>
      </div>
    </motion.div>
  );
};

export default DeviceCard4530;
