import React, { useState, useRef, useEffect } from "react";
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
  navigate,
}) => {
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const rippleTimeoutRef = useRef<NodeJS.Timeout>();

  const hasChildren =
    item.hasSubmenu ||
    item.submenuItems ||
    (item.items && item.items.length > 0);
  const isActive = activeItem === item.path;
  const isExpanded = expandedItems.has(item.path);
  const hasThirdLevel = item.hasThirdLevel && item.items;

  // Ripple эффект для touch взаимодействий
  const createRipple = (event: React.MouseEvent | React.TouchEvent) => {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    
    const clientX = 'touches' in event 
      ? event.touches[0]?.clientX || 0
      : event.clientX;
    const clientY = 'touches' in event 
      ? event.touches[0]?.clientY || 0
      : event.clientY;
    
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;
    
    setRippleStyle({
      width: size,
      height: size,
      left: x,
      top: y,
      opacity: 1,
      transform: 'scale(0)',
      transition: 'none'
    });

    // Анимация ripple
    setTimeout(() => {
      setRippleStyle(prev => ({
        ...prev,
        transform: 'scale(4)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }));
    }, 10);

    // Убираем ripple
    if (rippleTimeoutRef.current) {
      clearTimeout(rippleTimeoutRef.current);
    }
    rippleTimeoutRef.current = setTimeout(() => {
      setRippleStyle(prev => ({ ...prev, opacity: 0 }));
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);

  // Логика клика по основной области (текст + иконка)
  const handleMainClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    createRipple(e);
    
    if (!hasChildren) {
      // Простая навигация для элементов без детей
      navigate(item.path);
      onClose();
    } else {
      // Для элементов с детьми - вызываем обработчик
      onItemClick(item, e as React.MouseEvent);
    }
  };

  // Логика клика только по стрелке (раскрытие подменю)
  const handleArrowClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasThirdLevel) {
      // Третий уровень - аккордеон
      onToggleExpanded(item.path);
    } else if (hasChildren) {
      // Второй уровень - навигация к подменю
      onItemClick(item, e as React.MouseEvent);
    }
  };

  const MenuItemComponent = hasChildren ? 'button' : Link;

  const mainProps = hasChildren
    ? {
        onClick: handleMainClick,
        onTouchStart: createRipple,
        type: 'button' as const,
        role: 'button',
        'aria-expanded': hasThirdLevel ? isExpanded : undefined,
        'aria-haspopup': hasChildren ? 'menu' : undefined,
        'aria-label': hasChildren 
          ? `${item.name}${hasThirdLevel ? (isExpanded ? ' - закрыть подменю' : ' - открыть подменю') : ' - перейти к подразделу'}`
          : `Перейти к ${item.name}`,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMainClick(e as any);
          }
        },
      }
    : {
        to: item.path,
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          createRipple(e);
          onClose();
        },
        onTouchStart: createRipple,
        'aria-label': `Перейти к ${item.name}`,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(item.path);
            onClose();
          }
        },
      };

  return (
    <div className="mobile-menu-item-container">
      {/* Основной элемент меню */}
      <div className="relative group">
        <MenuItemComponent
          {...mainProps}
          className={`
            mobile-menu-item
            group relative w-full flex items-center text-left
            transition-all duration-300 ease-out
            min-h-[56px] touch-manipulation select-none
            rounded-2xl mx-2 mb-2 overflow-hidden
            ${
              isActive
                ? "bg-gradient-to-r from-blue-50 via-blue-50 to-emerald-50 text-blue-700 shadow-lg shadow-blue-100/50 border border-blue-200/50"
                : "text-gray-700 hover:bg-white/80 active:bg-blue-50/70 border border-transparent hover:border-gray-100/50 hover:shadow-md hover:shadow-gray-100/50"
            }
          `}
          style={{
            background: isActive
              ? "linear-gradient(135deg, rgb(239 246 255) 0%, rgb(243 244 246) 50%, rgb(236 253 245) 100%)"
              : undefined,
            animationDelay: `${index * 0.04}s`,
          }}
        >
          {/* Контент основной области */}
          <div className="flex items-center flex-1 px-4 py-3">
            {/* Иконка */}
            {item.icon && level === 0 && (
              <div
                className={`
                  p-2.5 rounded-xl transition-all duration-300 mr-3 flex-shrink-0
                  ${
                    isActive
                      ? "bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-600 shadow-lg shadow-blue-200/30"
                      : "bg-white/90 text-gray-500 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-50 group-hover:text-blue-500 shadow-sm group-hover:shadow-md group-hover:shadow-blue-200/20"
                  }
                `}
              >
                <Icon name={item.icon} size={18} />
              </div>
            )}

            {/* Текст */}
            <div className="flex-1 min-w-0">
              <span
                className={`
                  text-[15px] font-medium block transition-all duration-300 truncate
                  ${isActive ? "text-blue-700" : "text-gray-700 group-hover:text-gray-900"}
                `}
              >
                {item.name}
              </span>
              {item.description && level === 0 && (
                <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 line-clamp-1">
                  {item.description}
                </span>
              )}
            </div>
          </div>

          {/* Активный индикатор */}
          {isActive && (
            <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full shadow-lg -translate-y-1/2" />
          )}

          {/* Ripple эффект */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              ...rippleStyle,
              background: isActive 
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)'
            }}
          />
        </MenuItemComponent>

        {/* Отдельная кнопка-стрелка (44x44px зона) */}
        {hasChildren && (
          <button
            onClick={handleArrowClick}
            onTouchStart={(e) => e.stopPropagation()}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2
              w-11 h-11 flex items-center justify-center
              rounded-xl transition-all duration-300 ease-out
              touch-manipulation select-none
              border-l border-gray-200/50 group-hover:border-gray-300/50
              ${
                isActive
                  ? "bg-blue-100/70 text-blue-600 hover:bg-blue-200/70 active:bg-blue-300/70 shadow-sm"
                  : "text-gray-400 hover:bg-white/80 hover:text-blue-500 active:bg-blue-50/70 group-hover:shadow-sm"
              }
            `}
            aria-label={
              hasThirdLevel
                ? isExpanded
                  ? "Закрыть подменю"
                  : "Открыть подменю"
                : "Перейти к подразделу"
            }
            role="button"
            tabIndex={0}
          >
            <Icon
              name={hasThirdLevel ? "ChevronDown" : "ChevronRight"}
              size={16}
              className={`
                transition-transform duration-300 ease-out
                ${hasThirdLevel && isExpanded ? 'rotate-180' : 'rotate-0'}
                group-hover:scale-110
              `}
              style={{
                transform: `rotate(${
                  hasThirdLevel 
                    ? isExpanded ? '180deg' : '0deg'
                    : '0deg'
                }) scale(${isActive ? '1.1' : '1'})`,
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          </button>
        )}
      </div>

      {/* Аккордеон для третьего уровня */}
      {hasThirdLevel && (
        <div
          className={`
            overflow-hidden transition-all duration-400 ease-out ml-2 mr-2
            ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
          `}
          style={{
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out'
          }}
        >
          <div className="relative ml-4 pl-4 border-l-2 border-gradient-to-b from-blue-200 via-emerald-200 to-transparent py-3">
            {/* Декоративная линия */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-300 via-emerald-300 to-transparent opacity-60" />

            <div className="space-y-2">
              {item.items?.map((subItem, subIndex) => (
                <div
                  key={subItem.path}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${subIndex * 0.06 + 0.15}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {subItem.items && subItem.items.length > 0 ? (
                    <div className="space-y-2">
                      {/* Главная ссылка на уровень */}
                      <button
                        className="group relative flex items-center text-left py-3 px-4 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50/80 hover:bg-blue-100 active:bg-blue-200 transition-all duration-300 border border-blue-200/50 hover:border-blue-300 hover:shadow-sm w-full touch-manipulation cursor-pointer select-none backdrop-blur-sm min-h-[44px]"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(subItem.path);
                          onClose();
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(subItem.path);
                          onClose();
                        }}
                        role="button"
                        aria-label={`Перейти к ${subItem.name}`}
                      >
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 mr-3 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300" />
                        
                        <span className="font-semibold group-hover:translate-x-1 transition-transform duration-300 flex-1 truncate">
                          {subItem.name}
                        </span>

                        <div className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <Icon name="ExternalLink" size={14} className="text-blue-500" />
                        </div>
                      </button>

                      {/* Кнопка для подменю серий */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveItem(subItem.path);
                          onNavigateToLevel({
                            title: `Серии ${subItem.name.toLowerCase()}`,
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
                            title: `Серии ${subItem.name.toLowerCase()}`,
                            items: subItem.items,
                            parentPath: subItem.path,
                          });
                        }}
                        className="group relative flex items-center text-left py-3 px-4 rounded-xl text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50/80 active:bg-gray-100 transition-all duration-300 border border-gray-200/50 hover:border-gray-300 hover:shadow-sm w-full touch-manipulation cursor-pointer select-none backdrop-blur-sm min-h-[44px]"
                        role="button"
                        aria-label={`Смотреть серии ${subItem.name}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors duration-300 mr-3 flex-shrink-0" />

                        <span className="font-medium group-hover:translate-x-1 transition-transform duration-300 flex-1 truncate">
                          Смотреть серии
                        </span>

                        <div className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <Icon name="ArrowRight" size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                        </div>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={subItem.path}
                      className="group w-full text-left py-3 px-4 rounded-xl text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 active:bg-blue-100 transition-all duration-300 flex items-center gap-3 min-h-[44px] no-underline block border border-transparent hover:border-blue-200/50 hover:shadow-sm backdrop-blur-sm touch-manipulation select-none"
                      onClick={() => {
                        setActiveItem(subItem.path);
                        onClose();
                      }}
                      onTouchEnd={() => {
                        setActiveItem(subItem.path);
                        onClose();
                      }}
                      role="button"
                      aria-label={`Перейти к ${subItem.name}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-blue-400 transition-colors duration-300 flex-shrink-0" />
                      <span className="font-medium flex-1 truncate group-hover:translate-x-1 transition-transform duration-300">
                        {subItem.name}
                      </span>
                      <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <Icon name="ArrowRight" size={14} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
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