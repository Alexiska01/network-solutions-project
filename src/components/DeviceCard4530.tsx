// src/components/DeviceCard4530.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import type { SwitchModel } from "@/types/models";

// 1. Вспомогательные функции — ВНЕ компонента!
function getSpecs(model: SwitchModel) {
  const name = model.name.toLowerCase();
  const specs = {
    baseTports: 0,
    sfpSlots: 0,
    sfpPlusSlots: 0,
    poeWatts: 0 as number | string,
    expansionSlots: 0,
    powerSupplies: 2,
    throughput: 0,
    hasConsole: false,
    hasUsb: false,
    hasOobManagement: false,
    sfpOnly: false,
  };

  if (name.includes("24t") || name.includes("24p")) {
    specs.baseTports = 24;
    specs.sfpPlusSlots = 6;
    specs.throughput = 448;
    specs.expansionSlots = 1;
  } else if (name.includes("48t") || name.includes("48p")) {
    specs.baseTports = 48;
    specs.sfpPlusSlots = 6;
    specs.throughput = 496;
    specs.expansionSlots = 1;
  } else if (name.includes("24s")) {
    specs.sfpSlots = 24;
    specs.sfpPlusSlots = 4;
    specs.throughput = 688;
    specs.expansionSlots = 2;
    specs.sfpOnly = true;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOobManagement = true;
  } else if (name.includes("48s")) {
    specs.sfpSlots = 48;
    specs.sfpPlusSlots = 4;
    specs.throughput = 216;
    specs.expansionSlots = 2;
    specs.sfpOnly = true;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOobManagement = true;
  }

  if (name.includes("24p")) {
    specs.poeWatts = "380Вт/760Вт";
  } else if (name.includes("48p")) {
    specs.poeWatts = "380Вт/720Вт/1440Вт";
  }

  return specs;
}

function formatThroughput(gbps: number) {
  return gbps >= 1000 ? `${(gbps / 1000).toFixed(2)} Тбит/с` : `${gbps} Гбит/с`;
}

// 2. Варианты анимации для карточки
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom ? custom * 0.07 : 0,
      duration: 0.43,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

// 3. Типизация пропсов
interface DeviceCard4530Props {
  model: SwitchModel;
  index: number;
  isInCompareList: boolean;
  onToggleCompare: (modelId: string) => void;
  onNavigate: (url: string) => void;
}

// 4. Сам компонент (function, для декларативности!)
export default function DeviceCard4530({
  model,
  index,
  isInCompareList,
  onToggleCompare,
  onNavigate,
}: DeviceCard4530Props) {
  const specs = getSpecs(model);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      custom={index}
      className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden"
      style={{
        boxShadow:
          "0 2px 12px 0 rgba(34, 84, 120, 0.06), 0 1.5px 6px 0 rgba(0,0,0,0.03)",
      }}
    >
      {/* Заголовок и фичи */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
              {model.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              {specs.poeWatts && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Icon name="Zap" size={13} className="mr-1" />
                  PoE{" "}
                  {typeof specs.poeWatts === "string"
                    ? specs.poeWatts
                    : `${specs.poeWatts}Вт`}
                </span>
              )}
              {specs.sfpOnly && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Icon name="Lightbulb" size={13} className="mr-1" />
                  SFP only
                </span>
              )}
              {specs.powerSupplies > 1 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  <Icon name="Battery" size={13} className="mr-1" />
                  Dual PSU
                </span>
              )}
            </div>
          </div>
          <Checkbox
            id={`compare-${model.id}`}
            checked={isInCompareList}
            onCheckedChange={() => onToggleCompare(model.id)}
            aria-label="Добавить в сравнение"
            className="mt-0.5"
          />
        </div>
      </div>

      {/* Основные характеристики */}
      <div className="px-4 pb-4 flex-1">
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
          {specs.poeWatts && (
            <div className="flex justify-between">
              <span className="text-gray-600">Бюджет PoE/PoE+:</span>
              <span className="font-medium">
                {typeof specs.poeWatts === "string"
                  ? specs.poeWatts
                  : `${specs.poeWatts}Вт`}
              </span>
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

      {/* Кнопки действий */}
      <div className="px-4 pb-4 flex gap-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(model.url)}
          className="flex-1"
        >
          Подробнее
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 ml-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
          onClick={() => onNavigate("/partners")}
        >
          Выбрать
        </Button>
      </div>
    </motion.div>
  );
}
