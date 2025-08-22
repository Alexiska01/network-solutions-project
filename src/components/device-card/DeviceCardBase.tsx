import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import type { SwitchModel } from "@/types/models";
import "@/components/device-card/DeviceCard.css";

export type DeviceSpecs = {
  baseTports: number;
  sfpSlots: number;
  sfpPlusSlots: number;
  poe: boolean;
  dualPsu: boolean;
  throughput: number; // Гбит/с
  hasConsole: boolean;
  hasUsb: boolean;
  hasOob: boolean;
};

type Props = {
  model: SwitchModel;
  index: number;
  onNavigate: (url: string) => void;
  getSpecs: (model: SwitchModel) => DeviceSpecs;
};

const DeviceCardBase: React.FC<Props> = ({ model, index, onNavigate, getSpecs }) => {
  const specs = getSpecs(model);
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px 0px -50px 0px" }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const handleActivate = () => onNavigate(model.url);
  const handleKey: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <article
      ref={cardRef}
      className={`device-card-premium ${isVisible ? "is-visible" : "is-hidden"} bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md h-full flex flex-col w-full max-w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
      style={{ "--stagger-delay": `${index * 80}ms` } as React.CSSProperties}
      data-clickable="true"
      role="button"
      tabIndex={0}
      aria-label={`Подробнее о модели ${model.name}`}
      onClick={handleActivate}
      onKeyDown={handleKey}
    >
      <div className="p-3 sm:p-4 pb-2">
        <div className="mb-2">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 truncate">{model.name}</h3>
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
      </div>
      <div className="px-3 sm:px-4 pb-3 flex-1">
        <div className="space-y-1.5 sm:space-y-2 text-[0.68rem] sm:text-[0.78rem] lg:text-[0.9rem]">
          {specs.baseTports > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base-T порты:</span>
              <span className="font-medium">{specs.baseTports}</span>
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
          {specs.throughput > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Пропускная способность:</span>
              <span className="font-medium">{specs.throughput} Гбит/с</span>
            </div>
          )}
          {(specs.hasConsole || specs.hasUsb || specs.hasOob) && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Управление:</span>
              <div className="flex items-center space-x-2">
                {specs.hasConsole && (
                  <Icon name="Terminal" size={16} className="text-gray-500" title="RJ45 консоль" />
                )}
                {specs.hasUsb && <Icon name="Usb" size={16} className="text-gray-500" title="USB порт" />}
                {specs.hasOob && (
                  <Icon name="Settings" size={16} className="text-gray-500" title="OOB-management" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Нижний CTA "Подробнее" и прочее сознательно отсутствуют по требованию */}
    </article>
  );
};

export default DeviceCardBase;
