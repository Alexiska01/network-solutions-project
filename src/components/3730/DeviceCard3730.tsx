import type { SwitchModel } from "@/types/models";
import DeviceCardBase, { DeviceSpecs } from "@/components/device-card/DeviceCardBase";

// Характеристики по pdf/твоей таблице
function getSpecs(model: SwitchModel): DeviceSpecs {
  const name = model.name.toLowerCase();
  const specs: DeviceSpecs & { poeWatts?: string } = {
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

  if (name.includes("ids3730-24t-6x")) {
    specs.baseTports = 24;
    specs.sfpPlusSlots = 6;
    specs.throughput = 168;
  } else if (name.includes("48t-6x")) {
    specs.baseTports = 48;
    specs.sfpPlusSlots = 6;
    specs.throughput = 216;
  } else if (name.includes("24p-6x")) {
    specs.baseTports = 24;
    specs.sfpPlusSlots = 6;
    specs.poe = true;
    specs.throughput = 168;
  } else if (name.includes("48p-6x")) {
    specs.baseTports = 48;
    specs.sfpPlusSlots = 6;
    specs.poe = true;
    specs.throughput = 216;
  } else if (name.includes("24s-8t-6x")) {
    specs.baseTports = 8;
    specs.sfpSlots = 24;
    specs.sfpPlusSlots = 6;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOob = true;
    specs.throughput = 184;
  } else if (name.includes("48s-6x")) {
    specs.sfpSlots = 48;
    specs.sfpPlusSlots = 6;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOob = true;
    specs.throughput = 216;
  }

  return specs;
}
interface DeviceCard3730Props {
  model: SwitchModel;
  index: number;
  isInCompareList: boolean;
  onToggleCompare: (modelId: string) => void;
  onNavigate: (url: string) => void;
}

export default function DeviceCard3730({ model, index, onNavigate }: DeviceCard3730Props) {
  return <DeviceCardBase model={model} index={index} onNavigate={onNavigate} getSpecs={getSpecs} />;
}
