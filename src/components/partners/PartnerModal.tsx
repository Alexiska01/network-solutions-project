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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0065B3] to-[#004A87] p-3 rounded-t-xl">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors bg-white/20 rounded-full p-1.5"
            >
              <Icon name="X" size={16} />
            </button>

            <div className="text-center">
              <div className="bg-white rounded-lg p-2 w-16 h-16 mx-auto mb-3 flex items-center justify-center shadow-sm">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className =
                      "w-full h-full bg-gray-200 rounded flex items-center justify-center";
                    fallback.innerHTML = `<span class="text-gray-400 text-xl font-bold">${partner.name.charAt(0)}</span>`;
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
              <h2 className="text-xl font-bold text-white font-montserrat">
                {partner.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium font-montserrat border border-blue-200">
                📍 {partner.region}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium font-montserrat border ${getTypeColor(partner.type)}`}
              >
                🏢 {partner.type}
              </span>
              <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-xs font-medium font-montserrat border border-orange-200">
                ⚡ {partner.category}
              </span>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 font-montserrat mb-3">
                Контактная информация
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-[#0065B3] text-white rounded-full p-2 flex-shrink-0">
                    <Icon name="Phone" size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-montserrat mb-1">
                      Телефон
                    </p>
                    <a
                      href={`tel:${partner.phone}`}
                      className="text-gray-900 text-sm font-medium font-montserrat hover:text-[#0065B3] transition-colors break-all"
                    >
                      {partner.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-[#0065B3] text-white rounded-full p-2 flex-shrink-0">
                    <Icon name="Mail" size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-montserrat mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${partner.email}`}
                      className="text-gray-900 text-sm font-medium font-montserrat hover:text-[#0065B3] transition-colors break-all"
                    >
                      {partner.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-[#0065B3] text-white rounded-full p-2 flex-shrink-0">
                    <Icon name="Globe" size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-montserrat mb-1">
                      Веб-сайт
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 text-sm font-medium font-montserrat hover:text-[#0065B3] transition-colors break-all"
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
                className="flex items-center justify-center gap-2 bg-[#0065B3] text-white py-3 px-4 rounded-lg text-sm font-medium font-montserrat hover:bg-[#0052A3] transition-colors duration-200 active:scale-95"
              >
                <Icon name="Mail" size={16} />
                Написать
              </button>
              <button
                onClick={() => window.open(`tel:${partner.phone}`, "_blank")}
                className="flex items-center justify-center gap-2 bg-white text-[#0065B3] py-3 px-4 rounded-lg text-sm font-medium font-montserrat border-2 border-[#0065B3] hover:bg-[#0065B3] hover:text-white transition-colors duration-200 active:scale-95"
              >
                <Icon name="Phone" size={16} />
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
