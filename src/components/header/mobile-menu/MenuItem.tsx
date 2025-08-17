import React from "react";
import { Link } from "react-router-dom";
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
  // onToggleExpanded intentionally kept for future logic
  void onToggleExpanded;

  const isDisabled = item.disabled;
  const hasChildren =
    item.hasSubmenu ||
    item.submenuItems ||
    (item.items && item.items.length > 0);
  const isActive = activeItem === item.path;
  const isExpanded = expandedItems.has(item.path);
  const hasThirdLevel = item.hasThirdLevel && item.items;

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    onItemClick(item, e as React.MouseEvent);
  };

  // Единая сетка/ритм:
  //  - высота строки: 56px (py-3.5)
  //  - горизонтальный отступ: 16px (px-4) для всех уровней
  //  - вертикальный зазор между элементами: 4px через gap в контейнере, поэтому margin снизу убираем
  //  - одинаковый радиус: rounded-xl
  //  - убираем разницу pl-0 / rounded-r для выравнивания сетки
  const baseItemClasses = `
    group relative w-full flex items-center text-left
    px-4 py-3.5
    text-gray-700 min-h-[56px]
    border border-transparent hover:border-gray-100
    rounded-xl
    touch-manipulation select-none transition-all duration-200 ease-gpu
  `;

  return (
    <div
  className="overflow-hidden menu-item"
      style={{
        '--item-index': index
      } as React.CSSProperties}
    >
      {hasChildren ? (
        <button
          onClick={handleClick}
          onTouchEnd={handleClick}
          className={
            `${baseItemClasses} ` +
            (isActive
              ? 'bg-gradient-to-r from-blue-50 via-blue-50 to-emerald-50 text-blue-700 shadow-sm border-blue-100'
              : isDisabled
                ? 'cursor-default'
                : 'hover:bg-gray-25 active:bg-blue-50')
          }
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgb(239 246 255) 0%, rgb(243 244 246) 50%, rgb(236 253 245) 100%)"
            : undefined,
        }}
      >
        {/* common content start */}
        <div className="flex items-center space-x-3 flex-1 justify-start">
          {item.icon && level === 0 && (
            <div
              className={`
                p-2.5 rounded-xl transition-all duration-200 ease-gpu shadow-sm icon-container
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
                text-base font-medium block transition-colors duration-200
                ${isActive ? "text-blue-700 item-text-active" : "text-gray-700 group-hover:text-gray-900"}
              `}
            >
              {item.name}
            </span>
          </div>
        </div>

  {hasChildren && (
          <div
            className={`
              p-2 rounded-lg transition-all duration-200 ease-gpu chevron-icon
              ${
                isActive
                  ? "bg-blue-100 text-blue-500 shadow-sm"
                  : "text-gray-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm"
              }
              ${hasThirdLevel && isExpanded ? 'chevron-expanded' : ''}
            `}
          >
            <Icon
              name={hasThirdLevel ? "ChevronRight" : "ChevronRight"}
              size={16}
            />
          </div>
        )}

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full shadow-lg active-indicator" />
        )}

        {/* Touch Ripple Effect */}
        <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden ripple-container" />
        {/* common content end */}
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={handleClick}
          onTouchEnd={handleClick}
          className={
            `${baseItemClasses} ` +
            (isActive
              ? 'bg-gradient-to-r from-blue-50 via-blue-50 to-emerald-50 text-blue-700 shadow-sm border-blue-100'
              : isDisabled
                ? 'cursor-default pointer-events-none'
                : 'hover:bg-gray-25 active:bg-blue-50')
          }
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
                p-2.5 rounded-xl transition-all duration-200 ease-gpu shadow-sm icon-container
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
                text-base font-medium block transition-colors duration-200
                ${isActive ? "text-blue-700 item-text-active" : "text-gray-700 group-hover:text-gray-900"}
              `}
              >
                {item.name}
              </span>
            </div>
          </div>
          {isActive && (
            <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full shadow-lg active-indicator" />
          )}
          <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden ripple-container" />
        </Link>
      )}

      {/* Accordion for Third Level */}
      {hasThirdLevel && isExpanded && (
        <div className="accordion-content">
          <div className="relative pl-4 border-l border-gray-200">
            {/* Decorative Line */}
            <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-blue-300 via-emerald-300 to-transparent decorative-line" />

            <div className="space-y-1 py-2">
              {item.items?.map((subItem, subIndex) => (
                <div
                  key={subItem.path}
                  className="sub-item"
                  style={{
                    '--sub-index': subIndex
                  } as React.CSSProperties}
                >
                  {subItem.items && subItem.items.length > 0 ? (
                    <button
                      type="button"
                      className="group relative flex items-center gap-3 rounded-lg text-sm border border-gray-100 hover:border-blue-200/60 transition-all duration-300 ease-gpu w-full overflow-hidden bg-white hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-blue-50/20 hover:to-emerald-50/20 hover:shadow-lg hover:shadow-blue-200/25 text-left px-4 py-4"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveItem(subItem.path);
                        onNavigateToLevel({
                          title: subItem.name,
                          items: subItem.items || [],
                          parentPath: subItem.path,
                        });
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveItem(subItem.path);
                        onNavigateToLevel({
                          title: subItem.name,
                          items: subItem.items || [],
                          parentPath: subItem.path,
                        });
                      }}
                    >
                      <span className="relative z-10 font-medium text-gray-800 group-hover:text-blue-600 flex-1 group-hover:translate-x-1 transition-all duration-200 ease-gpu">
                        {subItem.name}
                      </span>
                      <div className="relative z-10 text-blue-400 group-hover:text-white bg-transparent group-hover:bg-blue-500 rounded-md p-2 transition-all duration-200 ease-gpu flex items-center justify-center">
                        <Icon name="ChevronRight" size={14} />
                      </div>
                      {/* Hover ripple effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-emerald-400/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-gpu" />
                      </div>
                    </button>
                  ) : (
                    <Link
                      to={subItem.path}
                      className="w-full text-left py-3.5 px-4 rounded-lg text-sm text-gray-800 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 flex items-center gap-3 min-h-[48px] no-underline"
                      onClick={() => {
                        setActiveItem(subItem.path);
                        onClose();
                      }}
                      onTouchEnd={() => {
                        setActiveItem(subItem.path);
                        onClose();
                      }}
                    >
                      <span className="font-medium flex-1 text-gray-800">
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

  {/* Inline styles removed - using global header-motion.css */}
    </div>
  );
};

export default MenuItem;