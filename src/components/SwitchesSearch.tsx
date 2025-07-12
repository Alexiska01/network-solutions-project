import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Zap, Network, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      {/* Search container */}
      <div className="relative">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20" />

        {/* Search input */}
        <div className="relative p-4">
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
              placeholder="Найти серию коммутатора... (например: IDS3730)"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pl-12 pr-12 py-4 text-base bg-white/80 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 placeholder:text-gray-400"
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
              className="absolute inset-0 rounded-xl ring-2 ring-blue-500 pointer-events-none"
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
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
              >
                <div className="p-2">
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <Filter className="h-3 w-3" />
                    Быстрый поиск
                  </div>

                  <div className="space-y-1">
                    {filteredSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion.name)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <div
                          className={`p-2 rounded-lg ${getCategoryColor(suggestion.category)} group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon name={suggestion.icon as any} size={16} />
                        </div>

                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {suggestion.name}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {suggestion.category} уровень
                          </div>
                        </div>

                        <Icon
                          name="ArrowRight"
                          size={14}
                          className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"
                        />
                      </motion.button>
                    ))}
                  </div>

                  {filteredSuggestions.length === 0 && searchTerm && (
                    <div className="px-3 py-6 text-center">
                      <div className="text-gray-400 mb-2">
                        <Search className="h-8 w-8 mx-auto" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Ничего не найдено для "{searchTerm}"
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Попробуйте другой запрос
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 px-4 pb-4 relative z-10"
        >
          {[
            { label: "Доступ", icon: "Wifi", color: "blue" },
            { label: "Распределение", icon: "GitBranch", color: "indigo" },
            { label: "PoE+", icon: "Zap", color: "yellow" },
            { label: "10G", icon: "Network", color: "emerald" },
          ].map((filter, index) => (
            <motion.button
              key={filter.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSearchChange(filter.label)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:shadow-md
                ${
                  filter.color === "blue"
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : filter.color === "indigo"
                      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      : filter.color === "yellow"
                        ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
            >
              <Icon name={filter.icon as any} size={12} />
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SwitchesSearch;
