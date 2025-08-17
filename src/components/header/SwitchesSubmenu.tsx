import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { DropdownState } from "@/hooks/useDropdownMenu";
import {
  switchesSubmenuItems,
  corporateLanItems,
  dataCentersItems,
  accessLevelSeries,
  distributionLevelSeries,
  spineLevelSeries,
  leafLevelSeries,
} from "./navigationData";

interface SwitchesSubmenuProps {
  dropdownState: DropdownState;
  updateDropdownState: (updates: Partial<DropdownState>) => void;
}

const SwitchesSubmenu = ({
  dropdownState,
  updateDropdownState,
}: SwitchesSubmenuProps) => {
  // Обработчики ховеров для третьего/четвертого уровня
  const resetFlags = () =>
    updateDropdownState({
      isCorporateLanSubmenuOpen: false,
      isDataCentersSubmenuOpen: false,
      isAccessLevelSubmenuOpen: false,
      isDistributionLevelSubmenuOpen: false,
      isSpineLevelSubmenuOpen: false,
      isLeafLevelSubmenuOpen: false,
    });

  const openSubmenu = (
    level:
      | "isCorporateLanSubmenuOpen"
      | "isDataCentersSubmenuOpen"
      | "isAccessLevelSubmenuOpen"
      | "isDistributionLevelSubmenuOpen"
      | "isSpineLevelSubmenuOpen"
      | "isLeafLevelSubmenuOpen"
  ) => {
    resetFlags();
    updateDropdownState({ [level]: true });
  };

  // Вспомогательные функции для третьего уровня
  const renderFourthLevel = (
    series: { name: string; path: string }[]
  ) => (
    <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-64 animate-fade-in">
      <div className="py-2">
        {series.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );

  // Уровни меню, которые требуют подменю
  const isCorporateLan = (item: { path: string }) =>
    item.path.includes("/corporate-lan");
  const isDataCenters = (item: { path: string }) =>
    item.path.includes("/data-centers");
  const isAccessLevel = (item: { path: string }) =>
    item.path.includes("/access-level");
  const isDistributionLevel = (item: { path: string }) =>
    item.path.includes("/distribution-level");
  const isSpineLevel = (item: { path: string }) =>
    item.path.includes("/spine-level");
  const isLeafLevel = (item: { path: string }) =>
    item.path.includes("/leaf-level");

  return (
    <div className="relative">
      {switchesSubmenuItems.map((item) => (
        <div
          key={item.path}
          className="relative"
          onMouseEnter={() => {
            if (isCorporateLan(item)) openSubmenu("isCorporateLanSubmenuOpen");
            if (isDataCenters(item)) openSubmenu("isDataCentersSubmenuOpen");
          }}
        >
          <Link
            to={item.path}
            className="flex items-center justify-between px-12 py-4 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200 border-l-4 border-blue-200 bg-gray-50 group"
          >
            <span>{item.name}</span>
            {item.hasThirdLevel && (
              <Icon
                name="ChevronRight"
                size={16}
                className="text-gray-400 group-hover:text-gray-600"
              />
            )}
          </Link>

          {/* Корпоративные ЛВС */}
          {isCorporateLan(item) && dropdownState.isCorporateLanSubmenuOpen && (
            <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-72 animate-fade-in">
              <div className="py-2">
                {corporateLanItems.map((subItem) => (
                  <div
                    key={subItem.path}
                    className="relative"
                    onMouseEnter={() => {
                      if (isAccessLevel(subItem))
                        openSubmenu("isAccessLevelSubmenuOpen");
                      if (isDistributionLevel(subItem))
                        openSubmenu("isDistributionLevelSubmenuOpen");
                    }}
                  >
                    <Link
                      to={subItem.path}
                      className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200 group"
                    >
                      <span>{subItem.name}</span>
                      {(subItem.hasThirdLevel || (subItem.items && subItem.items.length > 0)) && (
                        <Icon
                          name="ChevronRight"
                          size={16}
                          className="text-gray-400 group-hover:text-gray-600"
                        />
                      )}
                    </Link>
                    {/* Уровень доступа */}
                    {isAccessLevel(subItem) && dropdownState.isAccessLevelSubmenuOpen &&
                      renderFourthLevel(accessLevelSeries)}
                    {/* Уровень распределения */}
                    {isDistributionLevel(subItem) && dropdownState.isDistributionLevelSubmenuOpen &&
                      renderFourthLevel(distributionLevelSeries)}
                    {/* Уровень ядра */}
                    {subItem.path.includes("/core-level") && subItem.items &&
                      renderFourthLevel(subItem.items)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ЦОД */}
          {isDataCenters(item) && dropdownState.isDataCentersSubmenuOpen && (
            <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-72 animate-fade-in">
              <div className="py-2">
                {dataCentersItems.map((subItem) => (
                  <div
                    key={subItem.path}
                    className="relative"
                    onMouseEnter={() => {
                      if (isSpineLevel(subItem))
                        openSubmenu("isSpineLevelSubmenuOpen");
                      if (isLeafLevel(subItem))
                        openSubmenu("isLeafLevelSubmenuOpen");
                    }}
                  >
                    <Link
                      to={subItem.path}
                      className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200 group"
                    >
                      <span>{subItem.name}</span>
                      {(subItem.hasThirdLevel || (subItem.items && subItem.items.length > 0)) && (
                        <Icon
                          name="ChevronRight"
                          size={16}
                          className="text-gray-400 group-hover:text-gray-600"
                        />
                      )}
                    </Link>
                    {/* Spine */}
                    {isSpineLevel(subItem) && dropdownState.isSpineLevelSubmenuOpen &&
                      renderFourthLevel(spineLevelSeries)}
                    {/* Leaf */}
                    {isLeafLevel(subItem) && dropdownState.isLeafLevelSubmenuOpen &&
                      renderFourthLevel(leafLevelSeries)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SwitchesSubmenu;