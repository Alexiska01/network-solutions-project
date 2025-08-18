import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SwitchModel } from "@/data/switchesData";

// Импортируем созданные компоненты

import SwitchCardContent from "./switch-card/SwitchCardContent";
import SwitchCardMobile from "./switch-card/SwitchCardMobile";
// Dialog и кнопка удалены – вся карточка теперь кликабельна

interface SwitchCardProps {
  switchData: SwitchModel;
}

const SwitchCard = ({ switchData }: SwitchCardProps) => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false); // можно будет удалить при полной переработке layout

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => {
      window.removeEventListener("resize", checkTablet);
    };
  }, []);

  // Клик обрабатывает <Link>, отдельный handler не нужен

  // Убраны вспомогательные функции категорий – не используются после удаления диалога

  const specs = useMemo(() => {
    const base = [
      { icon: "Plug", label: "Порты", value: switchData.specs.ports },
      { icon: "Zap", label: "Питание", value: switchData.specs.power },
      { icon: "Activity", label: "Пропускная способность", value: switchData.specs.throughput },
    ];
    if (switchData.specs.sfpSlots) {
      base.push({ icon: "Layers", label: "SFP / Uplink слоты", value: switchData.specs.sfpSlots });
    }
    return base;
  }, [switchData]);

  return (
    <Link
      to={switchData.link}
      id={switchData.id.toLowerCase()}
      className="group relative block bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      aria-label={switchData.title}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-colors duration-500" />
      {!isMobile && !isTablet ? (
        <div className="flex">
          <SwitchCardContent switchData={switchData} specs={specs} isHovered={false} />
        </div>
      ) : (
        <SwitchCardMobile switchData={switchData} specs={specs} isHovered={false} />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/10" />
      </div>
    </Link>
  );
};

export default SwitchCard;