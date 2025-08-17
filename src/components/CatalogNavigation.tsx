import React from "react";
import "./catalog-navigation.css";
import { useIsMobile } from "@/hooks/use-mobile";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";

interface NavigationItem { id: string; name: string; icon: keyof typeof LucideIcons; children?: NavigationItem[] }
interface CatalogNavigationProps { onNavigate: (sectionId: string) => void; activeSection?: string }

const navigationData: NavigationItem[] = [
  { id: "corporate-lan", name: "Корпоративные ЛВС", icon: "Building2", children: [
    { id: "access-level", name: "Уровень доступа", icon: "Wifi", children: [
      { id: "ids3530", name: "IDS3530", icon: "Router" },
      { id: "ids3730", name: "IDS3730", icon: "Zap" },
      { id: "ids4530", name: "IDS4530", icon: "Network" },
      { id: "ids6012", name: "IDS6012", icon: "Shield" },
    ]},
    { id: "distribution-level", name: "Уровень распределения", icon: "GitBranch", children: [
      { id: "ids6010", name: "IDS6010", icon: "Server" },
      { id: "ids6030", name: "IDS6030", icon: "Layers" },
      { id: "ids6032", name: "IDS6032", icon: "Boxes" },
    ]},
  ]},
  { id: "data-center", name: "Центры обработки данных", icon: "Database", children: [
    { id: "spine-level", name: "Уровень Spine", icon: "TreePine", children: [
      { id: "ids8030", name: "IDS8030", icon: "HardDrive" },
      { id: "ids8010", name: "IDS8010", icon: "Server" },
    ]},
    { id: "leaf-level", name: "Уровень Leaf", icon: "TreeDeciduous", children: [
      { id: "ids6150", name: "IDS6150", icon: "Warehouse" },
      { id: "ids6130", name: "IDS6130", icon: "Layers" },
    ]},
  ]},
];

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({ onNavigate, activeSection }) => {
  const isMobile = useIsMobile();
  const [openSet, setOpenSet] = React.useState<Set<string>>(new Set()); // множественное открытие
  if (isMobile) return null;
  return (
    <div className="relative nav-root-anim">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl" />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg" />
      <div className="relative p-6">
        <div className="mb-4"><h3 className="text-lg font-bold text-gray-900 flex items-center">Коммутаторы iDATA</h3></div>
        <nav className="space-y-1">
          {navigationData.map((item, i) => (
            <div key={item.id} className="nav-item-anim" style={{ ["--i" as any]: i }}>
              <NavigationItem item={item} onNavigate={onNavigate} activeSection={activeSection} level={0} openSet={openSet} setOpenSet={setOpenSet} />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

interface NavigationItemProps { item: NavigationItem; onNavigate: (id: string) => void; activeSection?: string; level: number; openSet: Set<string>; setOpenSet: React.Dispatch<React.SetStateAction<Set<string>>> }

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onNavigate, activeSection, level, openSet, setOpenSet }) => {
  const isOpen = openSet.has(item.id);
  const isActive = activeSection === item.id;
  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.children) {
      setOpenSet(prev => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          // закрываем: удаляем сам элемент и всех потомков
          const toRemove: string[] = [];
          const collect = (n: NavigationItem) => {
            toRemove.push(n.id);
            n.children?.forEach(collect);
          };
            collect(item);
          toRemove.forEach(id => next.delete(id));
        } else {
          next.add(item.id);
        }
        return next;
      });
    } else {
      e.preventDefault();
      onNavigate(item.id);
      const el = document.getElementById(item.id.toLowerCase());
      if (el) {
        document.querySelectorAll('.active').forEach(elem => elem.classList.remove('active'));
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        el.classList.add('active');
        el.addEventListener('animationend', () => el.classList.remove('active'), { once: true });
      }
    }
  };
  const getIconColor = () => {
    if (isActive) return 'text-white';
    if (level === 0) return 'text-gray-700';
    if (level === 1) return 'text-gray-600';
    return 'text-gray-500';
  };
  const getGradientForLevel = () => {
    if (level === 0) return 'from-blue-500 to-indigo-600';
    if (level === 1) return 'from-blue-400 to-blue-500';
    return 'from-gray-400 to-gray-500';
  };
  return (
    <div>
      <button onClick={handleHeaderClick} className={`group w-full text-left ${
        level === 0 ? 'px-4 py-3 rounded-xl font-bold text-base' : level === 1 ? 'px-3 py-2 rounded-lg font-semibold text-sm max-w-[300px]' : 'px-2 py-1.5 rounded-md font-medium text-sm max-w-[262px]'
      } transition-all duration-500 flex items-center justify-between relative overflow-hidden will-change-transform ${
        isActive ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/50 hover:shadow-md'
      }`} style={{ marginLeft: `${level * 16}px` }}>
        {!isActive && <div className={`absolute inset-0 bg-gradient-to-r ${getGradientForLevel()} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />}
  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-500 ${isActive ? 'bg-white' : level === 0 ? 'bg-blue-500 scale-y-0 group-hover:scale-y-100' : level === 1 ? 'bg-blue-400 scale-y-0 group-hover:scale-y-100' : 'bg-gray-400 scale-y-0 group-hover:scale-y-100'}`} />
        <div className="flex items-center gap-3 relative z-10">
          {level === 0 && <div className={`p-1.5 rounded-lg transition-all duration-500 ${isActive ? 'bg-white/20' : 'group-hover:bg-white/60 group-hover:shadow-sm'}`}><Icon name={item.icon} size={18} className={`transition-colors duration-500 ${getIconColor()}`} /></div>}
          <span className="relative z-10">{item.name}</span>
        </div>
  {item.children && <div className={`p-1 rounded-lg transition-all duration-500 ${isActive ? 'bg-white/20' : 'group-hover:bg-white/60'}`}><Icon name="ChevronDown" size={14} className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-500'}`} style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: 'transform .55s cubic-bezier(.22,.61,.36,1)' }} /></div>}
      </button>
      {item.children && (
        <div className="nav-collapse" data-open={isOpen}>
          <div className="mt-1 space-y-1 nav-children">
            {item.children.map((child, idx) => (
              <div key={child.id} className="nav-child-anim" style={{ ['--ci' as any]: idx }}>
                <NavigationItem item={child} onNavigate={onNavigate} activeSection={activeSection} level={level + 1} openSet={openSet} setOpenSet={setOpenSet} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogNavigation;
