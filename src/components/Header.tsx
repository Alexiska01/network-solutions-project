import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isRoutersSubmenuOpen, setIsRoutersSubmenuOpen] = useState(false);
  const [isSwitchesSubmenuOpen, setIsSwitchesSubmenuOpen] = useState(false);
  const [isCorporateLanSubmenuOpen, setIsCorporateLanSubmenuOpen] =
    useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [switchesTimeout, setSwitchesTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

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
    },
    {
      name: "Коммутаторы уровня распределения",
      path: "/products/switches/corporate-lan/distribution-level",
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
                      if (dropdownTimeout) {
                        clearTimeout(dropdownTimeout);
                        setDropdownTimeout(null);
                      }
                      setIsProductsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setIsProductsDropdownOpen(false);
                      }, 150);
                      setDropdownTimeout(timeout);
                    }}
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
                                      name="ChevronDown"
                                      size={16}
                                      className={`transition-transform duration-200 ${
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
                                              className="flex items-center justify-between px-8 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600 cursor-pointer"
                                              onClick={() => {
                                                setIsCorporateLanSubmenuOpen(
                                                  !isCorporateLanSubmenuOpen,
                                                );
                                              }}
                                            >
                                              <span>{nestedItem.name}</span>
                                              <Icon
                                                name="ChevronDown"
                                                size={16}
                                                className={`transition-transform duration-200 ${
                                                  isCorporateLanSubmenuOpen
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                              />
                                            </div>
                                            {/* Третий уровень меню */}
                                            {isCorporateLanSubmenuOpen &&
                                              corporateLanItems.map(
                                                (thirdLevelItem) => (
                                                  <Link
                                                    key={thirdLevelItem.path}
                                                    to={thirdLevelItem.path}
                                                    className="block px-12 py-3 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                                  >
                                                    {thirdLevelItem.name}
                                                  </Link>
                                                ),
                                              )}
                                          </>
                                        ) : (
                                          <Link
                                            key={nestedItem.path}
                                            to={nestedItem.path}
                                            className="block px-8 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
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
                                        className="block px-8 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
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
