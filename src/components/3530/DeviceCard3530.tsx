import type { SwitchModel } from "@/types/models";
import DeviceCardBase, { DeviceSpecs } from "@/components/device-card/DeviceCardBase";

function getSpecs(model: SwitchModel): DeviceSpecs {
  const name = model.name.toLowerCase();
  const specs: DeviceSpecs = { baseTports: 0, sfpSlots: 0, sfpPlusSlots: 0, poe: false, dualPsu: true, throughput: 0, hasConsole: false, hasUsb: false, hasOob: false };
  switch (name) {
    case 'ids3530-24t-6x': specs.baseTports = 24; specs.sfpPlusSlots = 6; specs.throughput = 168; specs.hasConsole = true; specs.hasUsb = true; specs.hasOob = true; break;
    case 'ids3530-24s-8t-6x': specs.sfpSlots = 24; specs.baseTports = 8; specs.sfpPlusSlots = 6; specs.throughput = 184; specs.hasConsole = true; specs.hasUsb = true; specs.hasOob = true; break;
    case 'ids3530-24p-6x': specs.baseTports = 24; specs.sfpPlusSlots = 6; specs.throughput = 168; specs.poe = true; break;
    case 'ids3530-48p-6x': specs.baseTports = 48; specs.sfpPlusSlots = 6; specs.throughput = 168; specs.poe = true; break;
    case 'ids3530-48t-6x': specs.baseTports = 48; specs.sfpPlusSlots = 6; specs.throughput = 168; break;
  }
  return specs;
}

interface DeviceCard3530Props { model: SwitchModel; index: number; isInCompareList: boolean; onToggleCompare: (id: string) => void; onNavigate: (url: string) => void; }

export default function DeviceCard3530({ model, index, isInCompareList: _isInCompareList, onToggleCompare: _onToggleCompare, onNavigate }: DeviceCard3530Props) {
  return <DeviceCardBase model={model} index={index} onNavigate={onNavigate} getSpecs={getSpecs} />;
}