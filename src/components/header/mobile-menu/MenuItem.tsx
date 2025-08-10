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

  const MenuItemComponent = hasChildren ? "button" : Link;

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
      className="overflow-hidden menu-item"
      style={{
        '--item-index': index
      } as React.CSSProperties}
    >
      <MenuItemComponent
        {...menuItemProps}
        className={`
          group relative w-full flex items-center text-left pl-4 pr-4 py-4
          text-gray-700 min-h-[56px] 
          border-b border-gray-50/80 last:border-b-0 rounded-xl mx-2 mb-1
          touch-manipulation select-none transition-all duration-200 ease-gpu
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
      </MenuItemComponent>

      {/* Accordion for Third Level */}
      {hasThirdLevel && isExpanded && (
        <div className="accordion-content">
          <div className="relative ml-4 pl-4 border-l border-gray-200">
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
                      className="group relative flex items-center text-left py-4 pl-4 pr-4 rounded-xl text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 active:bg-blue-100/80 transition-all duration-200 ease-gpu border border-transparent hover:border-blue-100/50 hover:shadow-sm w-full touch-manipulation cursor-pointer select-none"
                    >
                      {/* Decorative Dot */}
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-200 mr-3 flex-shrink-0 pointer-events-none group-hover:shadow-lg group-hover:shadow-blue-400/50 dot-indicator" />

                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200 ease-gpu">
                        {subItem.name}
                      </span>

                      {/* Arrow on Hover */}
                      <div className="ml-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-gpu">
                        <Icon
                          name="ArrowRight"
                          size={14}
                          className="text-blue-400"
                        />
                      </div>
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

      {/* GPU-FIRST Styles */}
      <style jsx>{`
        /* Performance Tokens */
        .ease-gpu {
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        /* Stagger Animation */
        .menu-item {
          opacity: 0;
          transform: translateX(-8px);
          animation: itemEntry 240ms cubic-bezier(0.25, 0.1, 0.25, 1) calc(var(--item-index) * 40ms + 80ms) both;
          will-change: transform, opacity;
        }

        @keyframes itemEntry {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* GPU Hover Effects */
        .icon-container {
          will-change: transform, opacity;
          transition: transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .group:hover .icon-container {
          transform: translateY(-1px) scale(1.05);
        }

        .group:active .icon-container {
          transform: translateY(0) scale(0.95);
          transition-duration: 80ms;
        }

        /* Active Text Animation */
        .item-text-active {
          transform: translateX(2px);
          transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        /* Chevron Animation */
        .chevron-icon {
          will-change: transform;
          transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .chevron-expanded {
          transform: rotate(90deg);
        }

        .group:hover .chevron-icon:not(.chevron-expanded) {
          transform: rotate(15deg) scale(1.1);
        }

        /* Active Indicator */
        .active-indicator {
          transform: translateY(-50%) scaleY(1);
          animation: indicatorEntry 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, opacity;
        }

        @keyframes indicatorEntry {
          from {
            transform: translateY(-50%) scaleY(0) translateX(-4px);
            opacity: 0;
          }
          to {
            transform: translateY(-50%) scaleY(1) translateX(0);
            opacity: 1;
          }
        }

        /* Touch Ripple */
        .ripple-container:active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: ripple 600ms ease-out;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            width: 120px;
            height: 120px;
            opacity: 0;
          }
        }

        /* Accordion */
        .accordion-content {
          overflow: hidden;
          opacity: 1;
          max-height: 500px;
          transition: max-height 280ms cubic-bezier(0.25, 0.1, 0.25, 1), 
                      opacity 200ms ease-gpu;
          will-change: max-height, opacity;
        }

        /* Decorative Line */
        .decorative-line {
          transform: scaleY(1);
          transform-origin: top;
          animation: lineEntry 320ms cubic-bezier(0.25, 0.1, 0.25, 1) 120ms both;
        }

        @keyframes lineEntry {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        /* Sub-item Stagger */
        .sub-item {
          opacity: 0;
          transform: translateX(-6px);
          animation: subItemEntry 200ms ease-gpu calc(var(--sub-index) * 60ms + 150ms) both;
        }

        @keyframes subItemEntry {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Dot Indicator GPU Animation */
        .dot-indicator {
          will-change: transform;
          transition: transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .group:hover .dot-indicator {
          transform: scale(1.2);
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .menu-item {
            animation-duration: 200ms;
          }
          
          .sub-item {
            animation-duration: 160ms;
          }
          
          .accordion-content {
            transition-duration: 240ms;
          }
        }

        /* Remove will-change after animations */
        .menu-item:not(.animating) {
          will-change: auto;
        }
      `}</style>
    </div>
  );
};

export default MenuItem;