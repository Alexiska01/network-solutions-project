import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Icon name="Network" size={24} className="text-blue-600" />
      <span className="text-xl font-bold text-gray-900">iDATA</span>
    </Link>
  );
};

export default Logo;
