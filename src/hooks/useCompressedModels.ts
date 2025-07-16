import { useState, useEffect } from 'react';

interface ModelConfig {
  compressed: string;
  original: string;
}

const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'S3530-all.glb': {
    compressed: '/models/compressed/S3530-all.glb',
    original: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-all.glb'
  },
  'S4530-all.glb': {
    compressed: '/models/compressed/S4530-all.glb', 
    original: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-all.glb'
  },
  'IDS6010-all.glb': {
    compressed: '/models/compressed/IDS6010-all.glb',
    original: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS6010-all.glb'
  }
};

export function useCompressedModels() {
  const [modelUrls, setModelUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkModels = async () => {
      const urls: Record<string, string> = {};
      
      for (const [modelName, config] of Object.entries(MODEL_CONFIGS)) {
        try {
          // Проверяем доступность сжатой модели
          const response = await fetch(config.compressed, { method: 'HEAD' });
          
          if (response.ok) {
            console.log(`✅ Используется сжатая модель: ${modelName}`);
            urls[modelName] = config.compressed;
          } else {
            console.log(`⚠️  Сжатая модель недоступна, используется оригинальная: ${modelName}`);
            urls[modelName] = config.original;
          }
        } catch (error) {
          console.log(`❌ Ошибка при проверке сжатой модели, используется оригинальная: ${modelName}`);
          urls[modelName] = config.original;
        }
      }
      
      setModelUrls(urls);
      setIsLoading(false);
    };

    checkModels();
  }, []);

  const getModelUrl = (originalUrl: string): string => {
    const modelName = originalUrl.split('/').pop();
    if (modelName && modelUrls[modelName]) {
      return modelUrls[modelName];
    }
    return originalUrl;
  };

  return {
    getModelUrl,
    isLoading,
    modelUrls
  };
}