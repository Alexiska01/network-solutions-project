import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Zap, Network, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

interface SwitchesSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SwitchesSearch = ({
  searchTerm,
  onSearchChange,
}: SwitchesSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const isMobile = useIsMobile();
  const [suggestions] = useState([
    { id: "ids3530", name: "IDS3530", category: "access", icon: "Router" },
    { id: "ids3730", name: "IDS3730", category: "access", icon: "Zap" },
    {
      id: "ids4530",
      name: "IDS4530",
      category: "distribution",
      icon: "Network",
    },
    {
      id: "ids6010",
      name: "IDS6010",
      category: "distribution",
      icon: "Server",
    },
  ]);

  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = suggestions.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [searchTerm, suggestions]);

  const handleClear = () => {
    onSearchChange("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setIsFocused(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "access":
        return "text-blue-600 bg-blue-50";
      case "distribution":
        return "text-indigo-600 bg-indigo-50";
      case "spine":
        return "text-purple-600 bg-purple-50";
      case "leaf":
        return "text-emerald-600 bg-emerald-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "access":
        return "Доступ";
      case "distribution":
        return "Распределение";
      case "spine":
        return "Магистраль";
      case "leaf":
        return "Лист";
      default:
        return category;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative",
        isMobile ? "mb-6" : "mb-8"
      )}
    >
      {/* Search container */}
      <div className="relative">
        {/* Background with gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50",
          isMobile ? "rounded-xl" : "rounded-2xl"
        )} />
        <div className={cn(
          "absolute inset-0 bg-white/60 backdrop-blur-sm border border-white/20",
          isMobile ? "rounded-xl" : "rounded-2xl"
        )} />

        {/* Search input */}
        <div className={cn(
          "relative",
          isMobile ? "p-3" : "p-4"
        )}>
          <div className="relative group">
            {/* Icon */}
            <motion.div
              className="absolute left-4 top-0 h-full flex items-center z-10"
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? "#3B82F6" : "#9CA3AF",
              }}
              transition={{ duration: 0.2 }}
            >
              <Search className="h-5 w-5 transition-colors duration-200" />
            </motion.div>

            {/* Input field */}
            <Input
              type="text"
              placeholder={isMobile ? "Поиск коммутатора..." : "Найти серию коммутатора... (например: IDS3730)"}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className={cn(
                "pl-12 pr-12 bg-white/80 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-300 placeholder:text-gray-400",
                isMobile 
                  ? "py-3.5 text-base rounded-lg" 
                  : "py-4 text-base rounded-xl"
              )}
            />

            {/* Clear button */}
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClear}
                  className="absolute right-4 top-0 h-full flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Focus ring animation */}
            <motion.div
              className={cn(
                "absolute inset-0 ring-2 ring-blue-500 pointer-events-none",
                isMobile ? "rounded-lg" : "rounded-xl"
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: isFocused ? 0.2 : 0,
                scale: isFocused ? 1 : 0.95,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Search suggestions */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl z-50 overflow-hidden",
                  isMobile ? "rounded-lg mx-1" : "rounded-xl"
                )}
              >
                <div className={cn(
                  isMobile ? "p-1.5" : "p-2"
                )}>
                  <div className={cn(
                    "flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide",
                    isMobile ? "px-2 py-1.5" : "px-3 py-2"
                  )}>
                    <Filter className="h-3 w-3" />
                    Быстрый поиск
                  </div>

                  <div className={cn(
                    isMobile ? "space-y-0.5" : "space-y-1"
                  )}>
                    {filteredSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion.name)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group",
                          isMobile ? "px-2 py-2.5" : "px-3 py-3"
                        )}
                      >
                        <div
                          className={cn(
                            `rounded-lg ${getCategoryColor(suggestion.category)} group-hover:scale-110 transition-transform duration-200`,
                            isMobile ? "p-1.5" : "p-2"
                          )}
                        >
                          <Icon name={suggestion.icon as any} size={isMobile ? 14 : 16} />
                        </div>

                        <div className="flex-1 text-left">
                          <div className={cn(
                            "font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200",
                            isMobile ? "text-sm" : ""
                          )}>
                            {suggestion.name}
                          </div>
                          <div className={cn(
                            "text-gray-500",
                            isMobile ? "text-xs" : "text-sm"
                          )}>
                            {getCategoryLabel(suggestion.category)} уровень
                          </div>
                        </div>

                        <Icon
                          name="ArrowRight"
                          size={isMobile ? 12 : 14}
                          className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"
                        />
                      </motion.button>
                    ))}
                  </div>

                  {filteredSuggestions.length === 0 && searchTerm && (
                    <div className={cn(
                      "text-center",
                      isMobile ? "px-2 py-4" : "px-3 py-6"
                    )}>
                      <div className="text-gray-400 mb-2">
                        <Search className={cn(
                          "mx-auto",
                          isMobile ? "h-6 w-6" : "h-8 w-8"
                        )} />
                      </div>
                      <p className={cn(
                        "text-gray-500",
                        isMobile ? "text-xs" : "text-sm"
                      )}>
                        Ничего не найдено для "{searchTerm}"
                      </p>
                      <p className={cn(
                        "text-gray-400 mt-1",
                        isMobile ? "text-xs" : "text-xs"
                      )}>
                        Попробуйте другой запрос
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SwitchesSearch;