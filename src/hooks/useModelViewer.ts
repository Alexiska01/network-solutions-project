import { useRef, useState } from "react";

export const useModelViewer = () => {
  const modelViewerRef = useRef<any>(null);
  const [indicatorsOn, setIndicatorsOn] = useState(false);

  const toggleIndicators = () => {
    if (modelViewerRef.current) {
      const model = modelViewerRef.current;
      const threeModel = model.model;

      if (!threeModel || !threeModel.materials) return;

      const mat1 = threeModel.materials.find(
        (m: any) => m.name === "Material_Indicator",
      );
      const mat2 = threeModel.materials.find(
        (m: any) => m.name === "Material_Indicator2",
      );

      const newState = !indicatorsOn;

      if (mat1) {
        mat1.setEmissiveFactor(newState ? [0.2, 1.0, 0.5] : [0.27, 0.27, 0.27]);
      }
      if (mat2) {
        mat2.setEmissiveFactor(newState ? [1.0, 0.9, 0.3] : [0.27, 0.27, 0.27]);
      }

      setIndicatorsOn(newState);
    }
  };

  return {
    modelViewerRef,
    indicatorsOn,
    toggleIndicators,
  };
};
