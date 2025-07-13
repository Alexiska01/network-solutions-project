import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const MenuItemComponent = hasChildren ? motion.button : motion(Link);

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
    <motion.div
      key={item.path}
      initial={{ opacity: 0, x: -15, filter: "blur(2px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{
        delay: index * 0.04,
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
        filter: { duration: 0.2 }
      }}
      className="overflow-hidden will-change-transform"
    >
      <MenuItemComponent
        {...menuItemProps}
        whileHover={{
          backgroundColor: "rgba(59, 130, 246, 0.06)",
          scale: 1.015,
          y: -1,
          boxShadow: "0 4px 20px rgba(59, 130, 246, 0.15)"
        }}
        whileTap={{ 
          scale: 0.985,
          y: 0,
          transition: { duration: 0.1 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          group relative w-full flex items-center text-left pl-4 pr-4 py-4
          text-gray-700 transition-all duration-300 min-h-[56px] 
          border-b border-gray-50/80 last:border-b-0 rounded-xl mx-2 mb-1
          touch-manipulation select-none backdrop-blur-sm
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
            <motion.div
              whileHover={{ 
                scale: 1.15, 
                rotate: 8,
                y: -1,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
              whileTap={{ 
                scale: 0.85,
                transition: { duration: 0.1 }
              }}
              className={`
                p-2.5 rounded-xl transition-all duration-300 shadow-sm
                ${
                  isActive
                    ? "bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-600 shadow-lg shadow-blue-200/50"
                    : "bg-white/90 text-gray-500 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-50 group-hover:text-blue-500 shadow-md shadow-gray-200/50 group-hover:shadow-lg group-hover:shadow-blue-200/30"
                }
              `}
            >
              <Icon name={item.icon} size={20} />
            </motion.div>
          )}
          <div className="flex-1">
            <motion.span
              className={`
                text-base font-medium block transition-colors duration-300
                ${isActive ? "text-blue-700" : "text-gray-700 group-hover:text-gray-900"}
              `}
              animate={{ x: isActive ? 2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.name}
            </motion.span>
          </div>
        </div>

        {hasChildren && (
          <motion.div
            animate={{
              rotate: hasThirdLevel && isExpanded ? 90 : 0,
              scale: isActive ? 1.1 : 1,
            }}
            whileHover={{ 
              scale: 1.2,
              rotate: hasThirdLevel && isExpanded ? 135 : 15,
              transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`
              p-2 rounded-lg transition-all duration-300
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
          </motion.div>
        )}

        {/* Активный индикатор */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full shadow-lg"
              initial={{ scaleY: 0, x: -4 }}
              animate={{ scaleY: 1, x: 0 }}
              exit={{ scaleY: 0, x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ originY: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Улучшенный Ripple эффект */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ 
            scale: [0, 1.2, 2],
            opacity: [0.3, 0.15, 0],
            transition: { duration: 0.6, ease: "easeOut" }
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)",
          }}
        />
      </MenuItemComponent>

      {/* Элегантный аккордеон для третьего уровня */}
      <AnimatePresence>
        {hasThirdLevel && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.1, 0.25, 1],
              height: { duration: 0.3 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.2 }
            }}
            className="overflow-hidden mt-2"
          >
            <div className="relative ml-4 pl-4 border-l border-gray-200">
              {/* Декоративная линия */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-blue-300 via-emerald-300 to-transparent"
                style={{ transformOrigin: "top" }}
              />

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
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300 mr-3 flex-shrink-0 pointer-events-none group-hover:shadow-lg group-hover:shadow-blue-400/50"
                        />

                        <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                          {subItem.name}
                        </span>

                        {/* Стрелка при ховере */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="ml-auto pointer-events-none"
                        >
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-blue-400"
                          />
                        </motion.div>

                        {/* Gradient hover effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/0 to-emerald-50/0 group-hover:from-blue-50/50 group-hover:to-emerald-50/30 transition-all duration-300 -z-10 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuItem;