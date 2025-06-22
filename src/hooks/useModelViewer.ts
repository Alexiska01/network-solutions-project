import { useRef, useState, useEffect } from "react";

export const useModelViewer = () => {
  const modelViewerRef = useRef<any>(null);
  const [indicatorsOn, setIndicatorsOn] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      const handleLoad = () => {
        setModelLoaded(true);
        console.log("3D модель загружена успешно");
      };

      const handleError = (error: any) => {
        console.error("Ошибка загрузки 3D модели:", error);
      };

      modelViewer.addEventListener("load", handleLoad);
      modelViewer.addEventListener("error", handleError);

      return () => {
        modelViewer.removeEventListener("load", handleLoad);
        modelViewer.removeEventListener("error", handleError);
      };
    }
  }, []);

  const toggleIndicators = () => {
    if (!modelViewerRef.current || !modelLoaded) {
      console.warn("Модель еще не загружена");
      return;
    }

    try {
      const model = modelViewerRef.current;
      const threeModel = model.model;

      if (!threeModel || !threeModel.materials) {
        console.warn("Материалы модели недоступны");
        return;
      }

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
      console.log(`Индикаторы ${newState ? "включены" : "выключены"}`);
    } catch (error) {
      console.error("Ошибка переключения индикаторов:", error);
    }
  };

  return {
    modelViewerRef,
    indicatorsOn,
    modelLoaded,
    toggleIndicators,
  };
};
