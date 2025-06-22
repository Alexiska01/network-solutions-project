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
  const handleCorporateLanHover = () => {
    updateDropdownState({
      isCorporateLanSubmenuOpen: true,
      isDataCentersSubmenuOpen: false,
    });
  };

  const handleDataCentersHover = () => {
    updateDropdownState({
      isCorporateLanSubmenuOpen: false,
      isDataCentersSubmenuOpen: true,
    });
  };

  const handleAccessLevelHover = () => {
    updateDropdownState({
      isAccessLevelSubmenuOpen: true,
      isDistributionLevelSubmenuOpen: false,
      isSpineLevelSubmenuOpen: false,
      isLeafLevelSubmenuOpen: false,
    });
  };

  const handleDistributionLevelHover = () => {
    updateDropdownState({
      isAccessLevelSubmenuOpen: false,
      isDistributionLevelSubmenuOpen: true,
      isSpineLevelSubmenuOpen: false,
      isLeafLevelSubmenuOpen: false,
    });
  };

  const handleSpineLevelHover = () => {
    updateDropdownState({
      isAccessLevelSubmenuOpen: false,
      isDistributionLevelSubmenuOpen: false,
      isSpineLevelSubmenuOpen: true,
      isLeafLevelSubmenuOpen: false,
    });
  };

  const handleLeafLevelHover = () => {
    updateDropdownState({
      isAccessLevelSubmenuOpen: false,
      isDistributionLevelSubmenuOpen: false,
      isSpineLevelSubmenuOpen: false,
      isLeafLevelSubmenuOpen: true,
    });
  };

  return (
    <div className="relative">
      {switchesSubmenuItems.map((item) => (
        <div
          key={item.path}
          className="relative"
          onMouseEnter={() => {
            if (item.name.includes("корпоративных ЛВС")) {
              handleCorporateLanHover();
            } else if (item.name.includes("центров обработки данных")) {
              handleDataCentersHover();
            }
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

          {/* Третий уровень - Корпоративные ЛВС */}
          {item.name.includes("корпоративных ЛВС") &&
            dropdownState.isCorporateLanSubmenuOpen && (
              <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-72 animate-fade-in">
                <div className="py-2">
                  {corporateLanItems.map((subItem) => (
                    <div
                      key={subItem.path}
                      className="relative"
                      onMouseEnter={() => {
                        if (subItem.name.includes("уровня доступа")) {
                          handleAccessLevelHover();
                        } else if (
                          subItem.name.includes("уровня распределения")
                        ) {
                          handleDistributionLevelHover();
                        }
                      }}
                    >
                      <Link
                        to={subItem.path}
                        className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200 group"
                      >
                        <span>{subItem.name}</span>
                        {subItem.hasThirdLevel && (
                          <Icon
                            name="ChevronRight"
                            size={16}
                            className="text-gray-400 group-hover:text-gray-600"
                          />
                        )}
                      </Link>

                      {/* Четвертый уровень - Серии коммутаторов доступа */}
                      {subItem.name.includes("уровня доступа") &&
                        dropdownState.isAccessLevelSubmenuOpen && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-64 animate-fade-in">
                            <div className="py-2">
                              {accessLevelSeries.map((series) => (
                                <Link
                                  key={series.path}
                                  to={series.path}
                                  className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200"
                                >
                                  {series.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Четвертый уровень - Серии коммутаторов распределения */}
                      {subItem.name.includes("уровня распределения") &&
                        dropdownState.isDistributionLevelSubmenuOpen && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-64 animate-fade-in">
                            <div className="py-2">
                              {distributionLevelSeries.map((series) => (
                                <Link
                                  key={series.path}
                                  to={series.path}
                                  className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200"
                                >
                                  {series.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Третий уровень - Центры обработки данных */}
          {item.name.includes("центров обработки данных") &&
            dropdownState.isDataCentersSubmenuOpen && (
              <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-72 animate-fade-in">
                <div className="py-2">
                  {dataCentersItems.map((subItem) => (
                    <div
                      key={subItem.path}
                      className="relative"
                      onMouseEnter={() => {
                        if (subItem.name.includes("уровня Spine")) {
                          handleSpineLevelHover();
                        } else if (subItem.name.includes("уровня Leaf")) {
                          handleLeafLevelHover();
                        }
                      }}
                    >
                      <Link
                        to={subItem.path}
                        className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200 group"
                      >
                        <span>{subItem.name}</span>
                        {subItem.hasThirdLevel && (
                          <Icon
                            name="ChevronRight"
                            size={16}
                            className="text-gray-400 group-hover:text-gray-600"
                          />
                        )}
                      </Link>

                      {/* Четвертый уровень - Серии Spine */}
                      {subItem.name.includes("уровня Spine") &&
                        dropdownState.isSpineLevelSubmenuOpen && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-64 animate-fade-in">
                            <div className="py-2">
                              {spineLevelSeries.map((series) => (
                                <Link
                                  key={series.path}
                                  to={series.path}
                                  className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200"
                                >
                                  {series.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Четвертый уровень - Серии Leaf */}
                      {subItem.name.includes("уровня Leaf") &&
                        dropdownState.isLeafLevelSubmenuOpen && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 rounded-lg shadow-lg z-50 w-64 animate-fade-in">
                            <div className="py-2">
                              {leafLevelSeries.map((series) => (
                                <Link
                                  key={series.path}
                                  to={series.path}
                                  className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#F0F3F5] transition-all duration-200"
                                >
                                  {series.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
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
