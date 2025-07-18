import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CatalogCTA = () => {
  const isMobile = useIsMobile();

  return (
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
  );
};

export default CatalogCTA;