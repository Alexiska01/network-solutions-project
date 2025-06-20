import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { DropdownState } from "@/hooks/useDropdownMenu";
import {
  switchesSubmenuItems,
  corporateLanItems,
  accessLevelSeries,
  distributionLevelSeries,
} from "./navigationData";

interface SwitchesSubmenuProps {
  dropdownState: DropdownState;
  updateDropdownState: (updates: Partial<DropdownState>) => void;
}

const SwitchesSubmenu = ({
  dropdownState,
  updateDropdownState,
}: SwitchesSubmenuProps) => {
  const handleCorporateLanToggle = () => {
    updateDropdownState({
      isCorporateLanSubmenuOpen: !dropdownState.isCorporateLanSubmenuOpen,
      isDataCentersSubmenuOpen: false,
    });
  };

  const handleDataCentersToggle = () => {
    updateDropdownState({
      isDataCentersSubmenuOpen: !dropdownState.isDataCentersSubmenuOpen,
      isCorporateLanSubmenuOpen: false,
    });
  };

  const handleAccessLevelToggle = () => {
    updateDropdownState({
      isAccessLevelSubmenuOpen: !dropdownState.isAccessLevelSubmenuOpen,
      isDistributionLevelSubmenuOpen: false,
    });
  };

  const handleDistributionLevelToggle = () => {
    updateDropdownState({
      isDistributionLevelSubmenuOpen:
        !dropdownState.isDistributionLevelSubmenuOpen,
      isAccessLevelSubmenuOpen: false,
    });
  };

  return (
    <>
      {switchesSubmenuItems.map((nestedItem) => (
        <div key={nestedItem.path}>
          {nestedItem.hasThirdLevel ? (
            <>
              <div
                className="flex items-center justify-between px-8 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-50 border-l-4 border-blue-300 cursor-pointer"
                onClick={() => {
                  if (nestedItem.name === "Коммутаторы для корпоративных ЛВС") {
                    handleCorporateLanToggle();
                  } else if (
                    nestedItem.name ===
                    "Коммутаторы для центров обработки данных"
                  ) {
                    handleDataCentersToggle();
                  }
                }}
              >
                <span>{nestedItem.name}</span>
                <Icon
                  name="ChevronRight"
                  size={16}
                  className={`transition-transform duration-300 ${
                    (nestedItem.name === "Коммутаторы для корпоративных ЛВС" &&
                      dropdownState.isCorporateLanSubmenuOpen) ||
                    (nestedItem.name ===
                      "Коммутаторы для центров обработки данных" &&
                      dropdownState.isDataCentersSubmenuOpen)
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </div>

              {/* Третий уровень меню для корпоративных ЛВС */}
              {nestedItem.name === "Коммутаторы для корпоративных ЛВС" &&
                dropdownState.isCorporateLanSubmenuOpen && (
                  <div className="border-l-4 border-blue-600 bg-gray-100">
                    {corporateLanItems.map((thirdLevelItem) => (
                      <div key={thirdLevelItem.path} className="relative">
                        {thirdLevelItem.hasSubmenu ? (
                          <>
                            {thirdLevelItem.name ===
                              "Коммутаторы уровня доступа" && (
                              <div className="relative">
                                <div
                                  className="flex items-center justify-between px-12 py-3 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-100 border-l-2 border-blue-600 hover:border-blue-600 cursor-pointer"
                                  onClick={handleAccessLevelToggle}
                                >
                                  <span>{thirdLevelItem.name}</span>
                                  <Icon
                                    name="ChevronRight"
                                    size={16}
                                    className={`transition-transform duration-300 ${
                                      dropdownState.isAccessLevelSubmenuOpen
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                  />
                                </div>

                                {dropdownState.isAccessLevelSubmenuOpen && (
                                  <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in w-64 ml-2">
                                    <div className="py-2">
                                      {accessLevelSeries.map((series) => (
                                        <Link
                                          key={series.path}
                                          to={series.path}
                                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                        >
                                          {series.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {thirdLevelItem.name ===
                              "Коммутаторы уровня распределения" && (
                              <div className="relative">
                                <div
                                  className="flex items-center justify-between px-12 py-3 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-100 border-l-2 border-blue-600 hover:border-blue-600 cursor-pointer"
                                  onClick={handleDistributionLevelToggle}
                                >
                                  <span>{thirdLevelItem.name}</span>
                                  <Icon
                                    name="ChevronRight"
                                    size={16}
                                    className={`transition-transform duration-300 ${
                                      dropdownState.isDistributionLevelSubmenuOpen
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                  />
                                </div>

                                {dropdownState.isDistributionLevelSubmenuOpen && (
                                  <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in w-64 ml-2">
                                    <div className="py-2">
                                      {distributionLevelSeries.map((series) => (
                                        <Link
                                          key={series.path}
                                          to={series.path}
                                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                        >
                                          {series.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={thirdLevelItem.path}
                            className="block px-12 py-3 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-100 border-l-2 border-blue-600"
                          >
                            {thirdLevelItem.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </>
          ) : (
            <Link
              to={nestedItem.path}
              className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors border-l-4 border-blue-300 bg-gray-50"
            >
              {nestedItem.name}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default SwitchesSubmenu;
