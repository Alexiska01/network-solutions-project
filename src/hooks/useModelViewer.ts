import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useModelViewer = () => {
  const modelViewerRef = useRef<any>(null);
  const [indicatorsOn, setIndicatorsOn] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLibraryReady, setIsLibraryReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    let checkCount = 0;
    const maxChecks = 50;

    const checkLibrary = () => {
      checkCount++;

      if (
        typeof window !== "undefined" &&
        window.customElements &&
        window.customElements.get("model-viewer")
      ) {
        console.log("✅ model-viewer библиотека готова");
        setIsLibraryReady(true);
        return;
      }

      if (checkCount < maxChecks) {
        console.log(`⏳ Ожидаем model-viewer... (${checkCount}/${maxChecks})`);
        setTimeout(checkLibrary, 100);
      } else {
        console.error("❌ Не удалось загрузить model-viewer библиотеку");
      }
    };

    checkLibrary();
  }, []);

  useEffect(() => {
    if (!isLibraryReady || !modelViewerRef.current) return;

    const modelViewer = modelViewerRef.current;
    setModelLoaded(false);
    setLoadingProgress(0);

    const handleLoad = () => {
      console.log("✅ 3D модель загружена успешно");
      setModelLoaded(true);
      setLoadingProgress(100);
    };

    const handleError = (error: any) => {
      console.error("❌ Ошибка загрузки 3D модели:", error);
      setModelLoaded(false);
      setLoadingProgress(0);
    };

    const handleProgress = (event: any) => {
      const progress = Math.round(event.detail.totalProgress * 100);
      setLoadingProgress(progress);
      console.log("📊 Прогресс загрузки модели:", progress + "%");
    };

    const handleModelReady = () => {
      console.log("🎯 Модель готова к взаимодействию");
      setModelLoaded(true);
    };

    // Добавляем все необходимые слушатели
    modelViewer.addEventListener("load", handleLoad);
    modelViewer.addEventListener("error", handleError);
    modelViewer.addEventListener("progress", handleProgress);
    modelViewer.addEventListener("model-visibility", handleModelReady);

    // Проверяем, если модель уже загружена
    if (modelViewer.modelIsVisible) {
      console.log("🔄 Модель уже загружена");
      setModelLoaded(true);
      setLoadingProgress(100);
    }

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
      modelViewer.removeEventListener("error", handleError);
      modelViewer.removeEventListener("progress", handleProgress);
      modelViewer.removeEventListener("model-visibility", handleModelReady);
    };
  }, [isLibraryReady]);

  const toggleIndicators = () => {
    if (!modelViewerRef.current || !modelLoaded) {
      console.warn("⚠️ Модель еще не загружена");
      return;
    }

    try {
      const model = modelViewerRef.current;

      // Ждем полной готовности модели
      if (!model.model || !model.modelIsVisible) {
        console.warn("⚠️ 3D модель еще не готова");
        return;
      }

      const threeModel = model.model;
      if (!threeModel || !threeModel.materials) {
        console.warn("⚠️ Материалы модели недоступны");
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
      console.log(`💡 Индикаторы ${newState ? "включены" : "выключены"}`);
    } catch (error) {
      console.error("❌ Ошибка переключения индикаторов:", error);
    }
  };

  return {
    modelViewerRef,
    indicatorsOn,
    modelLoaded,
    isLibraryReady,
    loadingProgress,
    isMobile,
    toggleIndicators,
  };
};
