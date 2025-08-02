import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import type { MenuItemProps } from "./types";

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  level,
  index,
  activeItem,
  expandedItems,
  onItemClick,
  onToggleExpanded,
  onNavigateToLevel,
  onClose,
  setActiveItem,
}) => {
  const navigate = useNavigate();

  const hasChildren =
    item.hasSubmenu ||
    item.submenuItems ||
    (item.items && item.items.length > 0);
  const isActive = activeItem === item.path;
  const isExpanded = expandedItems.has(item.path);
  const hasThirdLevel = item.hasThirdLevel && item.items;

  const MenuItemComponent = hasChildren ? 'button' : Link;

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onItemClick(item, e as React.MouseEvent);
  };

  const menuItemProps = hasChildren
    ? {
        onClick: handleClick,
        onTouchEnd: handleClick,
      }
    : {
        to: item.path,
        onClick: handleClick,
        onTouchEnd: handleClick,
      };

  return (
    <div
      key={item.path}
      className="overflow-hidden mobile-menu-item mobile-menu-gpu-layer"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <MenuItemComponent
        {...menuItemProps}
        className={`
          group relative w-full flex items-center text-left pl-4 pr-4 py-4
          text-gray-700 transition-all duration-300 min-h-[56px] 
          border-b border-gray-50/80 last:border-b-0 rounded-xl mx-2 mb-1
          touch-manipulation select-none backdrop-blur-sm mobile-menu-gpu-layer
          ${
            isActive
              ? "bg-gradient-to-r from-blue-50 via-blue-50 to-emerald-50 text-blue-700 shadow-sm border-blue-100"
              : "hover:bg-gray-25 active:bg-blue-50"
          }
        `}
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgb(239 246 255) 0%, rgb(243 244 246) 50%, rgb(236 253 245) 100%)"
            : undefined,
        }}
      >
        <div className="flex items-center space-x-3 flex-1 justify-start">
          {item.icon && level === 0 && (
            <div
              className={`
                p-2.5 rounded-xl transition-all duration-300 shadow-sm mobile-menu-icon mobile-menu-gpu-layer
                ${
                  isActive
                    ? "bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-600 shadow-lg shadow-blue-200/50"
                    : "bg-white/90 text-gray-500 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-50 group-hover:text-blue-500 shadow-md shadow-gray-200/50 group-hover:shadow-lg group-hover:shadow-blue-200/30"
                }
              `}
            >
              <Icon name={item.icon} size={20} />
            </div>
          )}
          <div className="flex-1">
            <span
              className={`
                text-base font-medium block transition-all duration-300
                ${isActive ? "text-blue-700 translate-x-0.5" : "text-gray-700 group-hover:text-gray-900"}
              `}
            >
              {item.name}
            </span>
          </div>
        </div>

        {hasChildren && (
          <div
            className={`
              p-2 rounded-lg transition-all duration-300 mobile-menu-gpu-layer
              ${hasThirdLevel && isExpanded ? 'rotate-90' : 'rotate-0'}
              ${isActive ? 'scale-110' : 'scale-100'}
              group-hover:scale-120 group-hover:${hasThirdLevel && isExpanded ? 'rotate-135' : 'rotate-15'}
              ${
                isActive
                  ? "bg-blue-100 text-blue-500 shadow-sm"
                  : "text-gray-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm"
              }
            `}
          >
            <Icon
              name={hasThirdLevel ? "ChevronRight" : "ChevronRight"}
              size={16}
            />
          </div>
        )}

        {/* Активный индикатор */}
        {isActive && (
          <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full shadow-lg active-indicator mobile-menu-gpu-layer -translate-y-1/2" />
        )}

        {/* Улучшенный Ripple эффект */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden ripple-effect opacity-0"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)"
          }}
        />
      </MenuItemComponent>

      {/* Элегантный аккордеон для третьего уровня */}
      {hasThirdLevel && isExpanded && (
        <div className={`overflow-hidden mt-2 ${isExpanded ? 'accordion-expand' : 'accordion-collapse'} mobile-menu-gpu-layer`}>
            <div className="relative ml-4 pl-4 border-l border-gray-200">
              {/* Декоративная линия */}
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-blue-300 via-emerald-300 to-transparent accordion-line" />

              <div className="space-y-1 py-2">
                {item.items?.map((subItem, subIndex) => (
                  <div
                    key={subItem.path}
                    style={{
                      animation: `fadeInLeft 0.2s ease-out ${subIndex * 0.06 + 0.15}s both`,
                    }}
                  >
                    {subItem.items && subItem.items.length > 0 ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveItem(subItem.path);
                          onNavigateToLevel({
                            title: subItem.name,
                            items: subItem.items,
                            parentPath: subItem.path,
                          });
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveItem(subItem.path);
                          onNavigateToLevel({
                            title: subItem.name,
                            items: subItem.items,
                            parentPath: subItem.path,
                          });
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                        }}
                        className="group relative flex items-center text-left py-4 pl-4 pr-4 rounded-xl text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 active:bg-blue-100/80 focus:bg-blue-100/80 transition-all duration-300 border border-transparent hover:border-blue-100/50 hover:shadow-sm w-full touch-manipulation cursor-pointer select-none"
                      >
                        {/* Декоративная точка */}
                        <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300 mr-3 flex-shrink-0 pointer-events-none group-hover:shadow-lg group-hover:shadow-blue-400/50 group-hover:scale-120" />

                        <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                          {subItem.name}
                        </span>

                        {/* Стрелка при ховере */}
                        <div className="ml-auto pointer-events-none opacity-0 -translate-x-2.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-blue-400"
                          />
                        </div>

                        {/* Gradient hover effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/0 to-emerald-50/0 group-hover:from-blue-50/50 group-hover:to-emerald-50/30 transition-all duration-300 -z-10 pointer-events-none opacity-0 group-hover:opacity-100" />
                      </button>
                    ) : (
                      <Link
                        to={subItem.path}
                        className="w-full text-left py-4 pl-4 pr-4 rounded-xl text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 flex items-center gap-3 min-h-[48px] no-underline block"
                        onClick={() => {
                          setActiveItem(subItem.path);
                          onClose();
                        }}
                        onTouchEnd={() => {
                          setActiveItem(subItem.path);
                          onClose();
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
                        <span className="font-medium flex-1">
                          {subItem.name}
                        </span>
                        <Icon
                          name="ArrowRight"
                          size={14}
                          className="text-gray-400"
                        />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;