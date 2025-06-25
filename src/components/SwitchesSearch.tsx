import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SwitchesSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SwitchesSearch = ({
  searchTerm,
  onSearchChange,
}: SwitchesSearchProps) => {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Найти серию коммутатора... (например: IDS3730)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 py-3 text-base border-gray-200 focus:border-[#2E5BFF] focus:ring-[#2E5BFF]"
      />
    </div>
  );
};

export default SwitchesSearch;
