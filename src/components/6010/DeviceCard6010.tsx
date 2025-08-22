import type { SwitchModel } from "@/types/models";
import DeviceCardBase, { DeviceSpecs } from "@/components/device-card/DeviceCardBase";

function getSpecs(model: SwitchModel): DeviceSpecs {
  const name = model.name.toLowerCase();
  const specs: DeviceSpecs & { sfp28?: number; qsfp?: string } = {
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

  if (name.includes("24t-18x-8y")) {
    specs.baseTports = 24;      // 24 Base-T
    specs.sfpPlusSlots = 18;    // 18 SFP+
    // 8×25G SFP28 — в сводке не отображаем отдельной строкой
    specs.throughput = 808;     // Gbps
  } else if (name.includes("24x-2q")) {
    specs.sfpPlusSlots = 24;    // 24 SFP+
    // 2×40G QSFP+
    specs.throughput = 640;
  } else if (name.includes("24x-2c")) {
    specs.sfpPlusSlots = 24;    // 24 SFP+
    // 2×100G QSFP28
    specs.throughput = 640;
  } else if (name.includes("48x")) {
    specs.sfpPlusSlots = 48;    // 48 SFP+
    specs.throughput = 960;     // по документу — при необходимости скорректируем
  }

  return specs;
}

interface DeviceCard6010Props {
  model: SwitchModel;
  index: number;
  onNavigate: (url: string) => void;
}

export default function DeviceCard6010({ model, index, onNavigate }: DeviceCard6010Props) {
  return <DeviceCardBase model={model} index={index} onNavigate={onNavigate} getSpecs={getSpecs} />;
}
