import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
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

      // Скроллим к элементу
      element.scrollIntoView({ behavior: "smooth", block: "center" });

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
        <div className="max-w-7xl mx-auto py-4 px-[35px]">
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Левое меню навигации - только на десктопе */}
          {!isMobile && (
            <div className="w-96 flex-shrink-0">
              <CatalogNavigation onNavigate={handleScrollToCard} />
            </div>
          )}

          {/* Основной контент */}
          <div className="flex-1">
            {/* Поиск */}
            <SwitchesSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Коммутаторы для корпоративных ЛВС */}
            <motion.section
              id="corporate-lan"
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="Building2" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Коммутаторы для корпоративных ЛВС
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Решения для корпоративных локальных сетей
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Уровень доступа */}
              {groupedSwitches.corporateAccess.length > 0 && (
                <motion.div
                  id="access-level"
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                      <Icon name="Wifi" size={16} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Коммутаторы уровня доступа
                    </h3>
                  </div>
                  <div className="space-y-6">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                      <Icon name="GitBranch" size={16} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Коммутаторы уровня распределения
                    </h3>
                  </div>
                  <div className="space-y-6">
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
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="Database" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Центры обработки данных
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Высокопроизводительные решения для ЦОД
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Spine */}
              {groupedSwitches.dataCenterSpine.length > 0 && (
                <motion.div
                  id="spine-level"
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <Icon name="TreePine" size={16} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Spine</h3>
                  </div>
                  <div className="space-y-6">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                      <Icon
                        name="TreeDeciduous"
                        size={16}
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Leaf</h3>
                  </div>
                  <div className="space-y-6">
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
              className="relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl" />
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20" />

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />

              <div className="relative p-8 lg:p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name="Headphones" size={32} className="text-white" />
                  </div>

                  <h2 className="lg:text-4xl font-bold text-gray-900 mb-4 text-3xl">
                    Нужна помощь с выбором оборудования?
                  </h2>

                  <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Наши инженеры помогут выбрать оптимальное решение для вашей
                    инфраструктуры. Консультация и техническая поддержка —
                    бесплатно.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
                    asChild
                  >
                    <Link to="/partners">
                      <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
                      Связаться с нами
                      <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
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
