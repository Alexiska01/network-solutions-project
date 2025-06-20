import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isRoutersSubmenuOpen, setIsRoutersSubmenuOpen] = useState(false);
  const [isSwitchesSubmenuOpen, setIsSwitchesSubmenuOpen] = useState(false);
  const [isAccessLevelSubmenuOpen, setIsAccessLevelSubmenuOpen] =
    useState(false);
  const [isDistributionLevelSubmenuOpen, setIsDistributionLevelSubmenuOpen] =
    useState(false);
  const [isCorporateLanSubmenuOpen, setIsCorporateLanSubmenuOpen] =
    useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [switchesTimeout, setSwitchesTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Функция для закрытия всех подменю
  const closeAllSubmenus = () => {
    setIsProductsDropdownOpen(false);
    setIsSwitchesSubmenuOpen(false);
    setIsRoutersSubmenuOpen(false);
    setIsCorporateLanSubmenuOpen(false);
    setIsAccessLevelSubmenuOpen(false);
    setIsDistributionLevelSubmenuOpen(false);
  };

  // Функция для отмены таймера закрытия
  const cancelCloseTimeout = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  // Функция для установки таймера закрытия всех подменю
  const scheduleCloseAllSubmenus = () => {
    cancelCloseTimeout();
    const timeout = setTimeout(() => {
      closeAllSubmenus();
    }, 150);
    setDropdownTimeout(timeout);
  };

  const productSubmenuItems = [
    { name: "Коммутаторы", path: "/products/switches", hasNestedSubmenu: true },
    {
      name: "Маршрутизаторы",
      path: "/products/routers",
      hasNestedSubmenu: true,
    },
    { name: "Беспроводное оборудование", path: "/products/wireless" },
    { name: "Программное обеспечение", path: "/products/software" },
    {
      name: "Кабельные сборки и трансиверы",
      path: "/products/cables-transceivers",
    },
  ];

  const switchesSubmenuItems = [
    {
      name: "Коммутаторы для корпоративных ЛВС",
      path: "/products/switches/corporate-lan",
      hasThirdLevel: true,
    },
    {
      name: "Коммутаторы для центров обработки данных",
      path: "/products/switches/data-centers",
    },
    {
      name: "Коммутаторы с сертификацией ТОРП",
      path: "/products/switches/torp-certified",
    },
  ];

  const routersSubmenuItems = [
    {
      name: "Маршрутизаторы для распределенных сетей связи",
      path: "/products/routers/distributed-networks",
    },
  ];

  const corporateLanItems = [
    {
      name: "Коммутаторы уровня доступа",
      path: "/products/switches/corporate-lan/access-level",
      hasSubmenu: true,
    },
    {
      name: "Коммутаторы уровня распределения",
      path: "/products/switches/corporate-lan/distribution-level",
      hasSubmenu: true,
    },
  ];

  const accessLevelSeries = [
    { name: "Коммутаторы серии IDS3530", path: "/products/switches/ids3530" },
    { name: "Коммутаторы серии IDS3730", path: "/products/switches/ids3730" },
    { name: "Коммутаторы серии IDS4530", path: "/products/switches/ids4530" },
    { name: "Коммутаторы серии IDS6012", path: "/products/switches/ids6012" },
  ];

  const distributionLevelSeries = [
    { name: "Коммутаторы серии IDS6010", path: "/products/switches/ids6010" },
    { name: "Коммутаторы серии IDS6030", path: "/products/switches/ids6030" },
    { name: "Коммутаторы серии IDS6032", path: "/products/switches/ids6032" },
  ];

  const dataCentersItems = [
    {
      name: "Коммутаторы для высокопроизводительных вычислений",
      path: "/products/switches/data-centers/high-performance",
    },
    {
      name: "Коммутаторы для виртуализации",
      path: "/products/switches/data-centers/virtualization",
    },
    {
      name: "Коммутаторы уровня Spine",
      path: "/products/switches/data-centers/spine",
    },
    {
      name: "Коммутаторы уровня Leaf",
      path: "/products/switches/data-centers/leaf",
    },
  ];

  const navigationItems = [
    { name: "Оборудование iDATA", path: "/products", hasSubmenu: true },
    { name: "Гарантия и сервис", path: "/warranty-service" },
    { name: "Программное обеспечение", path: "/software" },
    { name: "Документация", path: "/documentation" },
    { name: "Отраслевые решения", path: "/vertical-solutions" },
    { name: "Сетевая архитектура", path: "/network-architecture" },
    { name: "Контакты", path: "/contacts" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">iD</span>
            </div>
            <span className="text-xl font-bold text-gray-900">iDATA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.hasSubmenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      cancelCloseTimeout();
                      setIsProductsDropdownOpen(true);
                    }}
                    onMouseLeave={scheduleCloseAllSubmenus}
                  >
                    <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1">
                      <span>{item.name}</span>
                      <Icon
                        name="ChevronDown"
                        size={16}
                        className={`transition-transform duration-200 ${
                          isProductsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isProductsDropdownOpen && (
                      <div className="absolute left-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in w-72">
                        <div className="py-2">
                          {productSubmenuItems.map((subItem, index) => (
                            <div key={subItem.path}>
                              {subItem.hasNestedSubmenu ? (
                                <>
                                  <div
                                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600 cursor-pointer"
                                    onClick={() => {
                                      if (subItem.name === "Коммутаторы") {
                                        // Закрываем подменю маршрутизаторов при открытии коммутаторов
                                        setIsRoutersSubmenuOpen(false);
                                        setIsSwitchesSubmenuOpen(
                                          !isSwitchesSubmenuOpen,
                                        );
                                        // Закрываем третий уровень если переключаемся
                                        if (!isSwitchesSubmenuOpen) {
                                          setIsCorporateLanSubmenuOpen(false);
                                        }
                                      } else if (
                                        subItem.name === "Маршрутизаторы"
                                      ) {
                                        // Закрываем все подменю коммутаторов при открытии маршрутизаторов
                                        setIsSwitchesSubmenuOpen(false);
                                        setIsCorporateLanSubmenuOpen(false);
                                        setIsRoutersSubmenuOpen(
                                          !isRoutersSubmenuOpen,
                                        );
                                      }
                                    }}
                                  >
                                    <span>{subItem.name}</span>
                                    <Icon
                                      name="ChevronRight"
                                      size={16}
                                      className={`transition-transform duration-300 ${
                                        (subItem.name === "Коммутаторы" &&
                                          isSwitchesSubmenuOpen) ||
                                        (subItem.name === "Маршрутизаторы" &&
                                          isRoutersSubmenuOpen)
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </div>

                                  {/* Inline submenu items for Switches */}
                                  {subItem.name === "Коммутаторы" &&
                                    isSwitchesSubmenuOpen &&
                                    switchesSubmenuItems.map((nestedItem) => (
                                      <div key={nestedItem.path}>
                                        {nestedItem.hasThirdLevel ? (
                                          <>
                                            <div
                                              className="flex items-center justify-between px-8 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-50 border-l-4 border-blue-300 cursor-pointer"
                                              onClick={() => {
                                                setIsCorporateLanSubmenuOpen(
                                                  !isCorporateLanSubmenuOpen,
                                                );
                                              }}
                                            >
                                              <span>{nestedItem.name}</span>
                                              <Icon
                                                name="ChevronRight"
                                                size={16}
                                                className={`transition-transform duration-300 ${
                                                  isCorporateLanSubmenuOpen
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                              />
                                            </div>
                                            {/* Третий уровень меню */}
                                            {isCorporateLanSubmenuOpen && (
                                              <div className="border-l-4 border-blue-600 bg-gray-100">
                                                {/* Существующие пункты меню */}
                                                {corporateLanItems.map(
                                                  (thirdLevelItem) => (
                                                    <div
                                                      key={thirdLevelItem.path}
                                                      className="relative"
                                                    >
                                                      {thirdLevelItem.hasSubmenu ? (
                                                        <>
                                                          {thirdLevelItem.name ===
                                                            "Коммутаторы уровня доступа" && (
                                                            <div className="relative">
                                                              <div
                                                                className="flex items-center justify-between px-12 py-3 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-100 border-l-2 border-blue-600 hover:border-blue-600 cursor-pointer"
                                                                onClick={() => {
                                                                  setIsAccessLevelSubmenuOpen(
                                                                    !isAccessLevelSubmenuOpen,
                                                                  );
                                                                  // Закрываем подменю уровня распределения
                                                                  setIsDistributionLevelSubmenuOpen(
                                                                    false,
                                                                  );
                                                                }}
                                                              >
                                                                <span>
                                                                  {
                                                                    thirdLevelItem.name
                                                                  }
                                                                </span>
                                                                <Icon
                                                                  name="ChevronRight"
                                                                  size={16}
                                                                  className={`transition-transform duration-300 ${
                                                                    isAccessLevelSubmenuOpen
                                                                      ? "rotate-90"
                                                                      : ""
                                                                  }`}
                                                                />
                                                              </div>

                                                              {/* Вертикальное подменю справа */}
                                                              {isAccessLevelSubmenuOpen && (
                                                                <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in w-64 ml-2">
                                                                  <div className="py-2">
                                                                    {accessLevelSeries.map(
                                                                      (
                                                                        series,
                                                                      ) => (
                                                                        <Link
                                                                          key={
                                                                            series.path
                                                                          }
                                                                          to={
                                                                            series.path
                                                                          }
                                                                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                                                        >
                                                                          {
                                                                            series.name
                                                                          }
                                                                        </Link>
                                                                      ),
                                                                    )}
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
                                                                onClick={() => {
                                                                  setIsDistributionLevelSubmenuOpen(
                                                                    !isDistributionLevelSubmenuOpen,
                                                                  );
                                                                  // Закрываем подменю уровня доступа
                                                                  setIsAccessLevelSubmenuOpen(
                                                                    false,
                                                                  );
                                                                }}
                                                              >
                                                                <span>
                                                                  {
                                                                    thirdLevelItem.name
                                                                  }
                                                                </span>
                                                                <Icon
                                                                  name="ChevronRight"
                                                                  size={16}
                                                                  className={`transition-transform duration-300 ${
                                                                    isDistributionLevelSubmenuOpen
                                                                      ? "rotate-90"
                                                                      : ""
                                                                  }`}
                                                                />
                                                              </div>

                                                              {/* Вертикальное подменю справа для уровня распределения */}
                                                              {isDistributionLevelSubmenuOpen && (
                                                                <div className="absolute left-full top-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in w-64 ml-2">
                                                                  <div className="py-2">
                                                                    {distributionLevelSeries.map(
                                                                      (
                                                                        series,
                                                                      ) => (
                                                                        <Link
                                                                          key={
                                                                            series.path
                                                                          }
                                                                          to={
                                                                            series.path
                                                                          }
                                                                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                                                        >
                                                                          {
                                                                            series.name
                                                                          }
                                                                        </Link>
                                                                      ),
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}
                                                        </>
                                                      ) : (
                                                        <Link
                                                          to={
                                                            thirdLevelItem.path
                                                          }
                                                          className="block px-12 py-3 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors bg-gray-100 border-l-2 border-blue-600"
                                                        >
                                                          {thirdLevelItem.name}
                                                        </Link>
                                                      )}
                                                    </div>
                                                  ),
                                                )}
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <Link
                                            key={nestedItem.path}
                                            to={nestedItem.path}
                                            className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors border-l-4 border-blue-300 bg-gray-50"
                                          >
                                            {nestedItem.name}
                                          </Link>
                                        )}
                                      </div>
                                    ))}

                                  {/* Inline submenu items for Routers */}
                                  {subItem.name === "Маршрутизаторы" &&
                                    isRoutersSubmenuOpen &&
                                    routersSubmenuItems.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.path}
                                        to={nestedItem.path}
                                        className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors border-l-4 border-blue-300 bg-gray-50"
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <Link
                                  to={subItem.path}
                                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                  onClick={() => {
                                    setIsSwitchesSubmenuOpen(false);
                                    setIsRoutersSubmenuOpen(false);
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => {
                      // Закрываем все подменю при переходе на другие пункты
                      setIsProductsDropdownOpen(false);
                      setIsSwitchesSubmenuOpen(false);
                      setIsRoutersSubmenuOpen(false);
                      setIsAccessLevelSubmenuOpen(false);
                      setIsDistributionLevelSubmenuOpen(false);
                      setIsCorporateLanSubmenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
