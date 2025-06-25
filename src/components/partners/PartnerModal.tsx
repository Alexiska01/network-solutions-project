import React from "react";
import Icon from "@/components/ui/icon";
import { Partner } from "@/pages/Partners";

interface PartnerModalProps {
  partner: Partner | null;
  onClose: () => void;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ partner, onClose }) => {
  if (!partner) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Дистрибьютор":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Реселлер":
        return "bg-green-100 text-green-800 border-green-200";
      case "Интегратор":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0065B3] to-[#004A87] p-6 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-white/20 rounded-full p-2"
            >
              <Icon name="X" size={20} />
            </button>

            <div className="text-center">
              <div className="bg-white rounded-xl p-4 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white font-montserrat">
                {partner.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium font-montserrat border border-blue-200">
                📍 {partner.region}
              </span>
              <span
                className={`px-3 py-1.5 rounded-lg text-sm font-medium font-montserrat border ${getTypeColor(partner.type)}`}
              >
                🏢 {partner.type}
              </span>
              <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium font-montserrat border border-orange-200">
                ⚡ {partner.category}
              </span>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 font-montserrat mb-3">
                Контактная информация
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-[#0065B3] text-white rounded-full p-2">
                    <Icon name="Phone" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-montserrat">
                      Телефон
                    </p>
                    <a
                      href={`tel:${partner.phone}`}
                      className="text-gray-900 font-medium font-montserrat hover:text-[#0065B3] transition-colors"
                    >
                      {partner.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-[#0065B3] text-white rounded-full p-2">
                    <Icon name="Mail" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-montserrat">
                      Email
                    </p>
                    <a
                      href={`mailto:${partner.email}`}
                      className="text-gray-900 font-medium font-montserrat hover:text-[#0065B3] transition-colors"
                    >
                      {partner.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-[#0065B3] text-white rounded-full p-2">
                    <Icon name="Globe" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-montserrat">
                      Веб-сайт
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-medium font-montserrat hover:text-[#0065B3] transition-colors"
                    >
                      {partner.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => window.open(`mailto:${partner.email}`, "_blank")}
                className="flex items-center justify-center gap-2 bg-[#0065B3] text-white py-3 px-4 rounded-lg font-medium font-montserrat hover:bg-[#0052A3] transition-colors duration-200"
              >
                <Icon name="Mail" size={18} />
                Написать
              </button>
              <button
                onClick={() => window.open(`tel:${partner.phone}`, "_blank")}
                className="flex items-center justify-center gap-2 bg-white text-[#0065B3] py-3 px-4 rounded-lg font-medium font-montserrat border-2 border-[#0065B3] hover:bg-[#0065B3] hover:text-white transition-colors duration-200"
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
