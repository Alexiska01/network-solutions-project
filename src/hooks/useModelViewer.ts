import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useModelViewer = () => {
  const modelViewerRef = useRef<any>(null);
  const [indicatorsOn, setIndicatorsOn] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLibraryReady, setIsLibraryReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkLibrary = () => {
      if (
        typeof window !== "undefined" &&
        window.customElements &&
        window.customElements.get("model-viewer")
      ) {
        console.log("model-viewer библиотека готова");
        setIsLibraryReady(true);
      } else {
        console.log("Ожидаем загрузки model-viewer...");
        setTimeout(checkLibrary, 200);
      }
    };

    // Немедленная проверка и затем через интервал
    checkLibrary();
  }, []);

  useEffect(() => {
    if (!isLibraryReady || !modelViewerRef.current) return;

    const modelViewer = modelViewerRef.current;
    setModelLoaded(false);

    const handleLoad = () => {
      console.log("3D модель загружена успешно");
      setModelLoaded(true);
    };

    const handleError = (error: any) => {
      console.error("Ошибка загрузки 3D модели:", error);
      setModelLoaded(false);
    };

    const handleProgress = (event: any) => {
      const progress = Math.round(event.detail.totalProgress * 100);
      console.log("Загрузка модели:", progress + "%");
    };

    // Добавляем слушатели событий
    modelViewer.addEventListener("load", handleLoad);
    modelViewer.addEventListener("error", handleError);
    modelViewer.addEventListener("progress", handleProgress);

    // Принудительно запускаем загрузку модели
    if (modelViewer.src) {
      console.log("Начинаем загрузку модели:", modelViewer.src);
      // Перезагружаем модель для надежности
      const currentSrc = modelViewer.src;
      modelViewer.src = "";
      setTimeout(() => {
        modelViewer.src = currentSrc;
      }, 100);
    }

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
      modelViewer.removeEventListener("error", handleError);
      modelViewer.removeEventListener("progress", handleProgress);
    };
  }, [isLibraryReady]);

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
    isLibraryReady,
    isMobile,
    toggleIndicators,
  };
};
