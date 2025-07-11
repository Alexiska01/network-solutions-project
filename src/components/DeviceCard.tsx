import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface DeviceSpecs {
  baseTports?: number;
  sfpSlots?: number;
  sfpPlusSlots?: number;
  poeWatts?: number;
  expansionSlots?: number;
  powerSupplies?: number;
  throughput?: number;
  hasConsole?: boolean;
  hasUsb?: boolean;
  hasOobManagement?: boolean;
  sfpOnly?: boolean;
}

interface DeviceCardProps {
  model: string;
  photo?: string;
  specs: DeviceSpecs;
  index: number;
}

const DeviceCard = ({ model, photo, specs, index }: DeviceCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1 },
    },
  };

  const formatThroughput = (gbps: number) => {
    return gbps >= 1000 ? `${gbps / 1000}Тбит/с` : `${gbps}Гбит/с`;
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header with model and chips */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{model}</h3>
          <div className="flex flex-wrap gap-1">
            {specs.poeWatts && (
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
            {specs.powerSupplies && specs.powerSupplies > 1 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <Icon name="Battery" size={12} className="mr-1" />
                Dual PSU
              </span>
            )}
          </div>
        </div>

        {/* Device photo */}
        {photo && (
          <div className="mb-3 flex justify-center">
            <img
              src={photo}
              alt={model}
              className="h-16 w-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Specs table */}
      <div className="px-4 pb-4">
        <div className="space-y-2 text-sm">
          {specs.baseTports && (
            <div className="flex justify-between">
              <span className="text-gray-600">Base-T порты:</span>
              <span className="font-medium">{specs.baseTports}</span>
            </div>
          )}

          {(specs.sfpSlots || specs.sfpPlusSlots) && (
            <div className="flex justify-between">
              <span className="text-gray-600">SFP слоты:</span>
              <span className="font-medium">
                {specs.sfpSlots && `${specs.sfpSlots} SFP`}
                {specs.sfpSlots && specs.sfpPlusSlots && " + "}
                {specs.sfpPlusSlots && `${specs.sfpPlusSlots} SFP+`}
              </span>
            </div>
          )}

          {specs.poeWatts && (
            <div className="flex justify-between">
              <span className="text-gray-600">Бюджет PoE/PoE+:</span>
              <span className="font-medium">{specs.poeWatts}Вт</span>
            </div>
          )}

          {specs.expansionSlots && (
            <div className="flex justify-between">
              <span className="text-gray-600">Слоты расширения:</span>
              <span className="font-medium">{specs.expansionSlots}</span>
            </div>
          )}

          {specs.powerSupplies && (
            <div className="flex justify-between">
              <span className="text-gray-600">Блоки питания:</span>
              <span className="font-medium">{specs.powerSupplies}</span>
            </div>
          )}

          {specs.throughput && (
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
    </motion.div>
  );
};

export default DeviceCard;
