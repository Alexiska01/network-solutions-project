
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import type { SwitchModel } from "@/types/models";
import { useIsMobile } from "@/hooks/useIsMobile";
import './DeviceCard3530.css';

// По спецификации (см. таблицу)
function getSpecs(model: SwitchModel) {
  const name = model.name.toLowerCase();
  const specs = {
    baseTports: 0,
    sfpSlots: 0,
    sfpPlusSlots: 0,
    poe: false,
    dualPsu: true,
    throughput: 0,
    hasConsole: false,
    hasUsb: false,
    hasOob: false,
  };

  if (name === "ids3530-24t-6x") {
    specs.baseTports = 24;
    specs.sfpPlusSlots = 6;
    specs.throughput = 168;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOob = true;
  } else if (name === "ids3530-24s-8t-6x") {
    specs.sfpSlots = 24;
    specs.baseTports = 8;
    specs.sfpPlusSlots = 6;
    specs.throughput = 184;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOob = true;
  } else if (name === "ids3530-24p-6x") {
    specs.baseTports = 24;
    specs.sfpPlusSlots = 6;
    specs.throughput = 168;
    specs.poe = true;
  } else if (name === "ids3530-48p-6x") {
    specs.baseTports = 48;
    specs.sfpPlusSlots = 6;
    specs.throughput = 168;
    specs.poe = true;
  } else if (name === "ids3530-48t-6x") {
    specs.baseTports = 48;
    specs.sfpPlusSlots = 6;
    specs.throughput = 168;
  }

  return specs;
}

interface DeviceCard3530Props {
  model: SwitchModel;
  index: number;
  isInCompareList: boolean;
  onToggleCompare: (modelId: string) => void;
  onNavigate: (url: string) => void;
}

export default function DeviceCard3530({
  model,
  index,
  isInCompareList,
  onToggleCompare,
  onNavigate,
}: DeviceCard3530Props) {
  const specs = getSpecs(model);
  const isMobile = useIsMobile();

  return (
    <div
      className="device-card-3530 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md h-full flex flex-col w-full max-w-full"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      {/* Top */}
      <div className="p-3 sm:p-4 pb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 truncate">
              {model.name}
            </h3>
            <div className="flex flex-wrap gap-1">
              {specs.poe && (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Icon name="Zap" size={13} className="mr-1" />
                  PoE
                </span>
              )}
              {specs.dualPsu && (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
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
            className="mt-0.5 scale-90 sm:scale-100 lg:scale-110"
          />
        </div>
      </div>

      {/* Specs */}
      <div className="px-3 sm:px-4 pb-3 flex-1">
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm lg:text-base">
          {(specs.baseTports > 0 || specs.sfpSlots > 0) && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base-T порты:</span>
              <span className="font-medium">{specs.baseTports || '-'}</span>
            </div>
          )}
          {(specs.sfpSlots > 0 || specs.sfpPlusSlots > 0) && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SFP слоты:</span>
              <span className="font-medium">
                {specs.sfpSlots > 0 && `${specs.sfpSlots} SFP`}
                {specs.sfpSlots > 0 && specs.sfpPlusSlots > 0 && " + "}
                {specs.sfpPlusSlots > 0 && `${specs.sfpPlusSlots} SFP+`}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Блоки питания:</span>
            <span className="font-medium">{specs.dualPsu ? 2 : 1}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Пропускная способность:</span>
            <span className="font-medium">{specs.throughput} Гбит/с</span>
          </div>
          {(specs.hasConsole || specs.hasUsb || specs.hasOob) && (
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
                {specs.hasOob && (
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

      {/* Buttons */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col sm:flex-row gap-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(model.url)}
          className="flex-1 min-w-0 text-sm lg:text-base py-2 sm:py-2.5"
        >
          Подробнее
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 min-w-0 sm:ml-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 text-sm lg:text-base py-2 sm:py-2.5"
          onClick={() => onNavigate("/partners")}
        >
          Выбрать
        </Button>
      </div>
    </div>
  );
}