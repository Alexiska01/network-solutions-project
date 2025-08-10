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
                    <div className="group relative flex items-center rounded-xl text-sm border border-gray-100 hover:border-blue-200/60 transition-all duration-300 ease-gpu w-full overflow-hidden bg-white hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-blue-50/20 hover:to-emerald-50/20 hover:shadow-lg hover:shadow-blue-200/25">
                      {/* Decorative Dot */}
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-200 ml-4 mr-3 flex-shrink-0 pointer-events-none group-hover:shadow-lg group-hover:shadow-blue-400/50 dot-indicator" />
                      
                      {/* Clickable text area - goes to page */}
                      <Link
                        to={subItem.path}
                        className="flex-1 py-4 font-medium text-gray-800 hover:text-blue-600 transition-all duration-200 ease-gpu no-underline relative overflow-hidden link-area"
                        onClick={() => {
                          setActiveItem(subItem.path);
                          onClose();
                        }}
                        onTouchEnd={() => {
                          setActiveItem(subItem.path);
                          onClose();
                        }}
                      >
                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200 ease-gpu">
                          {subItem.name}
                        </span>
                        
                        {/* Page icon indicator */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-all duration-200 ease-gpu translate-x-2 group-hover:translate-x-0">
                          <Icon name="ExternalLink" size={12} className="text-blue-500" />
                        </div>
                        
                        {/* Subtle underline animation */}
                        <div className="absolute bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 group-hover:w-full transition-all duration-300 ease-gpu" />
                      </Link>

                      {/* Visual separator */}
                      <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-60" />

                      {/* Arrow button - shows series */}
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
                        className="py-4 px-4 text-blue-400 hover:text-white hover:bg-blue-500 active:bg-blue-600 transition-all duration-200 touch-manipulation relative overflow-hidden group/btn series-button"
                      >
                        {/* Button background animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 rounded-r-xl" />
                        
                        {/* Icon with rotation effect */}
                        <div className="relative z-10 transform group-hover/btn:rotate-90 group-hover/btn:scale-110 transition-transform duration-200 ease-gpu">
                          <Icon name="ChevronRight" size={14} />
                        </div>
                        
                        {/* Tooltip hint */}
                        <div className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-20">
                          Показать серии
                          <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
                        </div>
                      </button>
                      
                      {/* Hover ripple effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-emerald-400/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-gpu" />
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={subItem.path}
                      className="w-full text-left py-4 pl-4 pr-4 rounded-xl text-sm text-gray-800 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 flex items-center gap-3 min-h-[48px] no-underline block"
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
          z-index: 0;
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
          position: relative;
          z-index: 1;
        }

        @keyframes subItemEntry {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Принудительная видимость текста */
        .sub-item span {
          color: inherit !important;
          opacity: 1 !important;
          display: block !important;
          visibility: visible !important;
        }

        /* Professional hover effects for dual-action items */
        .link-area:hover {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 80%);
        }

        .series-button:hover {
          background: linear-gradient(90deg, transparent 20%, rgba(59, 130, 246, 1) 100%);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        /* Smooth border radius for split zones */
        .link-area {
          border-radius: 0.75rem 0 0 0.75rem;
        }

        .series-button {
          border-radius: 0 0.75rem 0.75rem 0;
        }

        /* Advanced tooltip positioning */
        @media (max-width: 768px) {
          .series-button .absolute.-top-8 {
            top: -2.5rem;
            right: 0.25rem;
            font-size: 0.625rem;
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

          /* Fallback для мобильных устройств - принудительная видимость */
          .sub-item {
            opacity: 1 !important;
            transform: none !important;
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