import type { SwitchModel } from "@/types/models";
import DeviceCardBase, { DeviceSpecs } from "@/components/device-card/DeviceCardBase";

function getSpecs(model: SwitchModel): DeviceSpecs {
  const name = model.name.toLowerCase();
  const specs: DeviceSpecs & { poeWatts?: string; sfpOnly?: boolean } = {
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

  if (name.includes("24t") || name.includes("24p")) {
    specs.baseTports = 24;
    specs.sfpPlusSlots = 6;
    specs.throughput = 448;
  } else if (name.includes("48t") || name.includes("48p")) {
    specs.baseTports = 48;
    specs.sfpPlusSlots = 6;
    specs.throughput = 496;
  } else if (name.includes("24s")) {
    specs.sfpSlots = 24;
    specs.sfpPlusSlots = 4;
    specs.throughput = 688;
    specs.sfpOnly = true;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOob = true;
  } else if (name.includes("48s")) {
    specs.sfpSlots = 48;
    specs.sfpPlusSlots = 4;
    specs.throughput = 216;
    specs.sfpOnly = true;
    specs.hasConsole = true;
    specs.hasUsb = true;
    specs.hasOob = true;
  }

  if (name.includes("24p") || name.includes("48p")) {
    specs.poe = true;
  }

  return specs;
}

interface DeviceCard4530Props {
  model: SwitchModel;
  index: number;
  onNavigate: (url: string) => void;
}

export default function DeviceCard4530({ model, index, onNavigate }: DeviceCard4530Props) {
  return <DeviceCardBase model={model} index={index} onNavigate={onNavigate} getSpecs={getSpecs} />;
}
