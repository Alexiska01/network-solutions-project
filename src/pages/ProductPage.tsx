import React from "react";
import ModelViewer from "@/components/ModelViewer";
import Icon from "@/components/ui/icon";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-teal-400 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-white">
            <Icon name="ArrowLeft" size={24} />
          </button>
          <div className="text-white font-bold text-xl">IDATA</div>
        </div>
        <button className="text-white">
          <Icon name="Menu" size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-8 h-screen flex flex-col">
        {/* 3D Model Container */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full max-w-lg h-80 relative">
            <ModelViewer
              src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb"
              alt="Network Switch IDS3530-24P-6X"
              className="w-full h-full"
            />

            {/* Fullscreen button */}
            <button className="absolute top-4 right-4 text-white/70 hover:text-white">
              <Icon name="Maximize2" size={24} />
            </button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Icon name="Lightbulb" size={20} />
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Icon name="Moon" size={20} />
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Icon name="Sun" size={20} />
          </button>
          <button className="w-12 h-12 bg-blue-500 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
            <Icon name="TreePine" size={20} />
          </button>
        </div>

        {/* Product Title */}
        <div className="text-center mb-6">
          <h1 className="text-white text-3xl font-bold">IDS3530-24P-6X</h1>
        </div>

        {/* Specifications Card */}
        <div className="bg-white rounded-t-3xl p-6 mt-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Основные характеристики
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Порты:</span>
              <span className="font-semibold text-gray-900">
                24×1000M Base-T
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uplink порты:</span>
              <span className="font-semibold text-gray-900">6×10G SFP+</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Пропускная способность:</span>
              <span className="font-semibold text-gray-900">336 Гбит/с</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Питание:</span>
              <span className="font-semibold text-gray-900">PoE+ 370W</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Размеры:</span>
              <span className="font-semibold text-gray-900">440×285×44 мм</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-600 transition-all">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}
