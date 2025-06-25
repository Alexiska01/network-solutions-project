import React from "react";
import Icon from "@/components/ui/icon";
import { Partner } from "@/pages/Partners";

interface PartnerModalProps {
  partner: Partner | null;
  onClose: () => void;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ partner, onClose }) => {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-center h-16 mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-center font-['Montserrat'] text-gray-900">
                {partner.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={20} className="text-[#0065B3]" />
              <span className="font-['Montserrat'] text-gray-700">
                {partner.phone}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Mail" size={20} className="text-[#0065B3]" />
              <a
                href={`mailto:${partner.email}`}
                className="font-['Montserrat'] text-[#0065B3] hover:underline"
              >
                {partner.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Icon name="Globe" size={20} className="text-[#0065B3]" />
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Montserrat'] text-[#0065B3] hover:underline"
              >
                {partner.website}
              </a>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-['Montserrat']">
              {partner.region}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-['Montserrat']">
              {partner.type}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-['Montserrat']">
              {partner.category}
            </span>
          </div>

          <button
            onClick={() => window.open(`mailto:${partner.email}`, "_blank")}
            className="w-full bg-[#0065B3] text-white py-3 px-6 rounded-lg font-medium font-['Montserrat'] hover:bg-[#0052A3] transition-colors duration-200"
          >
            Связаться
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
