import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
import HeroCommuts from "@/components/HeroCommuts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import SwitchesSearch from "@/components/SwitchesSearch";
import SwitchCard from "@/components/SwitchCard";
import { switchesData } from "@/data/switchesData";
import Icon from "@/components/ui/icon";

const SwitchesCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  // Прокрутка к верху страницы при монтировании компонента
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredSwitches = useMemo(() => {
    let filtered = switchesData;

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (switch_) =>
          switch_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          switch_.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [searchTerm]);

  const handleScrollToCard = (cardId: string) => {
    const element = document.getElementById(cardId);
    if (element) {
      // Убираем активный класс у всех карточек
      document.querySelectorAll(".switch-card-base.active").forEach((el) => {
        el.classList.remove("active");
      });

      // Скроллим к элементу с учетом высоты sticky навигации
      const offset = isMobile ? 80 : 0; // высота мобильной навигации
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });

      // Очищаем хеш из URL
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );

      // Добавляем класс активного состояния
      element.classList.add("active");

      // Снимаем класс через 2 секунды
      setTimeout(() => {
        element.classList.remove("active");
      }, 2000);
    }
  };

  // Функция для мобильной навигации с автозакрытием меню
  const handleMobileNavigation = (cardId: string) => {
    // Haptic feedback для поддерживаемых устройств
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Закрываем мобильное меню с небольшой задержкой для visual feedback
    setTimeout(() => {
      const detailsElement = document.querySelector('details[open]');
      if (detailsElement) {
        (detailsElement as HTMLDetailsElement).open = false;
      }
    }, 150);
    
    // Выполняем навигацию с небольшой задержкой
    setTimeout(() => {
      handleScrollToCard(cardId);
    }, 200);
  };

  const groupedSwitches = useMemo(() => {
    const corporate = filteredSwitches.filter((s) =>
      ["access", "distribution"].includes(s.category),
    );
    const dataCenter = filteredSwitches.filter((s) =>
      ["spine", "leaf"].includes(s.category),
    );

    return {
      corporateAccess: corporate.filter((s) => s.category === "access"),
      corporateDistribution: corporate.filter(
        (s) => s.category === "distribution",
      ),
      dataCenterSpine: dataCenter.filter((s) => s.category === "spine"),
      dataCenterLeaf: dataCenter.filter((s) => s.category === "leaf"),
    };
  }, [filteredSwitches]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-[35px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Продукты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Коммутаторы</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <HeroCommuts />

      {/* Мобильная навигация */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="block lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      >
        <div className="px-4 py-3">
          <details className="group">
            <summary className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center gap-2">
                <Icon name="Navigation" size={16} />
                <span className="font-medium">Навигация по каталогу</span>
              </div>
              <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform duration-300" />
            </summary>
            
            <div className="mt-3 p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg border shadow-inner space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => handleMobileNavigation('corporate-lan')}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon 
                      name="Router" 
                      className="text-blue-600" 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <span className="font-medium">Корпоративные ЛВС</span>
                </button>
                
                <button 
                  onClick={() => handleMobileNavigation('access-level')}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon 
                      name="Router" 
                      className="text-blue-500" 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <span className="font-medium">Уровень доступа</span>
                </button>
                
                <button 
                  onClick={() => handleMobileNavigation('distribution-level')}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 shadow-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon 
                      name="Router" 
                      className="text-indigo-600" 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <span className="font-medium">Уровень распределения</span>
                </button>
                
                <button 
                  onClick={() => handleMobileNavigation('data-center')}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon 
                      name="Router" 
                      className="text-purple-600" 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <span className="font-medium">Центры обработки данных</span>
                </button>
                
                <button 
                  onClick={() => handleMobileNavigation('spine-level')}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon 
                      name="Router" 
                      className="text-purple-500" 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <span className="font-medium">Spine коммутаторы</span>
                </button>
                
                <button 
                  onClick={() => handleMobileNavigation('leaf-level')}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 shadow-sm"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon 
                      name="Router" 
                      className="text-emerald-600" 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <span className="font-medium">Leaf коммутаторы</span>
                </button>
              </div>
              
              <hr className="border-gray-200" />
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-gray-700 font-medium"
              >
                <Icon name="ArrowUp" size={16} />
                <span>Наверх страницы</span>
              </button>
            </div>
          </details>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Левое меню навигации - скрыто на мобильных */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <CatalogNavigation onNavigate={handleScrollToCard} />
          </div>

          {/* Основной контент */}
          <div className="flex-1">
            {/* Поиск */}
            <div className={cn(
              "mb-6 sm:mb-8",
              isMobile && "px-1"
            )}>
              <SwitchesSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            {/* Коммутаторы для корпоративных ЛВС */}
            <motion.section
              id="corporate-lan"
              className={cn(
                "mb-12 sm:mb-16",
                isMobile && "px-1"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 sm:mb-8"
              >
                <div className={cn(
                  "flex flex-col gap-3 mb-4",
                  !isMobile && "sm:flex-row sm:items-center sm:gap-4"
                )}>
                  <div className={cn(
                    "bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg",
"w-10 h-10"
                  )}>
                    <Icon 
                      name="Router" 
                      className="text-white !w-6 !h-6"
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        minWidth: '16px',
                        minHeight: '16px',
                        maxWidth: '16px',
                        maxHeight: '16px'
                      }}
                    />
                  </div>
                  <div className={cn(isMobile && "text-center")}>
                    <h2 className={cn(
                      "font-bold text-gray-900",
                      isMobile ? "text-2xl leading-tight" : "text-2xl sm:text-3xl"
                    )}>
                      Коммутаторы для корпоративных ЛВС
                    </h2>
                    <p className={cn(
                      "text-gray-600 mt-1",
                      isMobile ? "text-sm leading-relaxed" : "text-sm sm:text-base"
                    )}>
                      Решения для корпоративных локальных сетей
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Уровень доступа */}
              {groupedSwitches.corporateAccess.length > 0 && (
                <motion.div
                  id="access-level"
                  className={cn(
                    "mb-10 sm:mb-12",
                    isMobile && "px-2"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className={cn(
                    "flex items-center gap-3 mb-5 sm:mb-6",
                    isMobile && "justify-center"
                  )}>
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                      <Icon 
                        name="Router" 
                        className="text-white"
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          minWidth: isMobile ? '16px' : '14px',
                          minHeight: isMobile ? '16px' : '14px',
                          maxWidth: isMobile ? '16px' : '14px',
                          maxHeight: isMobile ? '16px' : '14px'
                        }}
                      />
                    </div>
                    <h3 className={cn(
                      "font-bold text-gray-800",
                      isMobile ? "text-xl text-center" : "text-xl sm:text-2xl"
                    )}>
                      Коммутаторы уровня доступа
                    </h3>
                  </div>
                  <div className={cn(
                    isMobile ? "space-y-4" : "space-y-6"
                  )}>
                    {groupedSwitches.corporateAccess.map(
                      (switchData, index) => (
                        <motion.div
                          key={switchData.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.5 + index * 0.1,
                          }}
                        >
                          <SwitchCard switchData={switchData} />
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {/* Уровень распределения */}
              {groupedSwitches.corporateDistribution.length > 0 && (
                <motion.div
                  id="distribution-level"
                  className={cn(
                    isMobile && "px-2"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className={cn(
                    "flex items-center gap-3 mb-5 sm:mb-6",
                    isMobile && "justify-center"
                  )}>
                    <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                      <Icon 
                        name="Router" 
                        className="text-white"
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          minWidth: '16px',
                          minHeight: '16px',
                          maxWidth: '16px',
                          maxHeight: '16px'
                        }}
                      />
                    </div>
                    <h3 className={cn(
                      "font-bold text-gray-800",
                      isMobile ? "text-xl text-center" : "text-2xl"
                    )}>
                      Коммутаторы уровня распределения
                    </h3>
                  </div>
                  <div className={cn(
                    isMobile ? "space-y-4" : "space-y-6"
                  )}>
                    {groupedSwitches.corporateDistribution.map(
                      (switchData, index) => (
                        <motion.div
                          key={switchData.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.7 + index * 0.1,
                          }}
                        >
                          <SwitchCard switchData={switchData} />
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}
            </motion.section>

            {/* Коммутаторы для ЦОД */}
            <motion.section
              id="data-center"
              className={cn(
                "mb-12 sm:mb-16",
                isMobile && "px-1"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mb-6 sm:mb-8"
              >
                <div className={cn(
                  "flex gap-4 mb-4",
                  isMobile ? "flex-col items-center text-center" : "items-center"
                )}>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg w-12 h-12">
                    <Icon 
                      name="Router" 
                      className="text-white !w-6 !h-6"
                      style={{ 
                        width: '24px', 
                        height: '24px',
                        minWidth: '24px',
                        minHeight: '24px',
                        maxWidth: '24px',
                        maxHeight: '24px'
                      }}
                    />
                  </div>
                  <div>
                    <h2 className={cn(
                      "font-bold text-gray-900",
                      isMobile ? "text-2xl" : "text-3xl"
                    )}>
                      Центры обработки данных
                    </h2>
                    <p className={cn(
                      "text-gray-600 mt-1",
                      isMobile ? "text-sm" : ""
                    )}>
                      Высокопроизводительные решения для ЦОД
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Spine */}
              {groupedSwitches.dataCenterSpine.length > 0 && (
                <motion.div
                  id="spine-level"
                  className={cn(
                    "mb-10 sm:mb-12",
                    isMobile && "px-2"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div className={cn(
                    "flex items-center gap-3 mb-5 sm:mb-6",
                    isMobile && "justify-center"
                  )}>
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                      <Icon 
                        name="Router" 
                        className="text-white"
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          minWidth: '16px',
                          minHeight: '16px',
                          maxWidth: '16px',
                          maxHeight: '16px'
                        }}
                      />
                    </div>
                    <h3 className={cn(
                      "font-bold text-gray-800",
                      isMobile ? "text-xl" : "text-2xl"
                    )}>Spine</h3>
                  </div>
                  <div className={cn(
                    isMobile ? "space-y-4" : "space-y-6"
                  )}>
                    {groupedSwitches.dataCenterSpine.map(
                      (switchData, index) => (
                        <motion.div
                          key={switchData.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.1 + index * 0.1,
                          }}
                        >
                          <SwitchCard switchData={switchData} />
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {/* Leaf */}
              {groupedSwitches.dataCenterLeaf.length > 0 && (
                <motion.div
                  id="leaf-level"
                  className={cn(
                    isMobile && "px-2"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <div className={cn(
                    "flex items-center gap-3 mb-5 sm:mb-6",
                    isMobile && "justify-center"
                  )}>
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                      <Icon
                        name="Router"
                        className="text-white"
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          minWidth: '16px',
                          minHeight: '16px',
                          maxWidth: '16px',
                          maxHeight: '16px'
                        }}
                      />
                    </div>
                    <h3 className={cn(
                      "font-bold text-gray-800",
                      isMobile ? "text-xl" : "text-2xl"
                    )}>Leaf</h3>
                  </div>
                  <div className={cn(
                    isMobile ? "space-y-4" : "space-y-6"
                  )}>
                    {groupedSwitches.dataCenterLeaf.map((switchData, index) => (
                      <motion.div
                        key={switchData.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                      >
                        <SwitchCard switchData={switchData} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.section>

            {/* CTA блок внизу */}
            <motion.section
              className={cn(
                "relative overflow-hidden",
                isMobile && "mx-2"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {/* Background */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
                isMobile ? "rounded-2xl" : "rounded-3xl"
              )} />
              <div className={cn(
                "absolute inset-0 bg-white/60 backdrop-blur-sm border border-white/20",
                isMobile ? "rounded-2xl" : "rounded-3xl"
              )} />

              {/* Decorative elements - скрыты на мобильных */}
              {!isMobile && (
                <>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
                </>
              )}

              <div className={cn(
                "relative text-center",
                isMobile ? "p-6" : "p-6 sm:p-8 lg:p-12"
              )}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className={cn(
                    isMobile ? "mb-5" : "mb-6"
                  )}
                >
                  <div className={cn(
                    "bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg",
                    isMobile 
                      ? "w-14 h-14 rounded-2xl mb-4" 
                      : "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                  )}>
                    <Icon 
                      name="Headphones" 
                      size={isMobile ? 28 : 24} 
                      className={cn(
                        "text-white",
                        !isMobile && "sm:w-8 sm:h-8"
                      )} 
                    />
                  </div>

                  <h2 className={cn(
                    "font-bold text-gray-900 mb-4",
                    isMobile 
                      ? "text-xl leading-tight px-2" 
                      : "text-2xl sm:text-3xl lg:text-4xl"
                  )}>
                    Нужна помощь с выбором оборудования?
                  </h2>

                  <p className={cn(
                    "text-gray-600 max-w-3xl mx-auto leading-relaxed",
                    isMobile 
                      ? "text-sm mb-5 px-2" 
                      : "text-base sm:text-lg mb-6 sm:mb-8"
                  )}>
                    Наши инженеры помогут выбрать оптимальное решение для вашей
                    инфраструктуры. Консультация и техническая поддержка —
                    бесплатно.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className={cn(
                    "flex justify-center items-center",
                    isMobile ? "flex-col gap-4" : "flex-col sm:flex-row gap-4"
                  )}
                >
                  <Button
                    size={isMobile ? "default" : "lg"}
                    className={cn(
                      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300",
                      isMobile 
                        ? "w-full px-6 py-3" 
                        : "px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-auto"
                    )}
                    asChild
                  >
                    <Link to="/partners">
                      <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
                      Связаться с нами
                      <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <div className={cn(
                    "flex items-center justify-center text-sm text-gray-600",
                    isMobile 
                      ? "flex-col gap-3" 
                      : "flex-col sm:flex-row gap-4 sm:gap-6"
                  )}>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-green-600" />
                      <span>24/7 поддержка</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-blue-600" />
                      <span>Команда экспертов</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SwitchesCatalog;