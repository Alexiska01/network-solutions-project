// Утилита для кэширования 3D моделей на 1 год
export class ModelCache {
  private static readonly CACHE_NAME = 'idata-models-cache';
  private static readonly CACHE_VERSION = 'v1';
  private static readonly CACHE_EXPIRY_KEY = 'idata-models-cache-expiry';
  private static readonly CACHE_STATUS_KEY = 'idata-models-cache-status';
  private static readonly ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000; // 1 год в миллисекундах

  // Список всех моделей для кэширования
  private static readonly MODEL_URLS = [
    '/models/3530all.glb',
    '/models/3730all.glb', 
    '/models/4530all.glb',
    '/models/6010all.glb'
  ];

  /**
   * Проверяет, есть ли действительный кэш моделей
   */
  static async isCacheValid(): Promise<boolean> {
    try {
      // Проверяем localStorage на истечение срока
      const expiryTime = localStorage.getItem(this.CACHE_EXPIRY_KEY);
      const cacheStatus = localStorage.getItem(this.CACHE_STATUS_KEY);
      
      if (!expiryTime || !cacheStatus || cacheStatus !== 'complete') {
        console.log('🔍 ModelCache: Кэш не найден или неполный');
        return false;
      }

      const now = Date.now();
      if (now > parseInt(expiryTime)) {
        console.log('⏰ ModelCache: Кэш истек');
        await this.clearCache();
        return false;
      }

      // Проверяем Cache API
      if ('caches' in window) {
        const cache = await caches.open(this.CACHE_NAME);
        const cachedRequests = await cache.keys();
        
        // Проверяем, что все модели закэшированы
        const cachedUrls = cachedRequests.map(req => new URL(req.url).pathname);
        const allModelsPresent = this.MODEL_URLS.every(url => 
          cachedUrls.some(cachedUrl => cachedUrl === url)
        );

        if (!allModelsPresent) {
          console.log('📋 ModelCache: Не все модели в кэше');
          return false;
        }

        console.log('✅ ModelCache: Кэш действителен');
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ ModelCache: Ошибка проверки кэша:', error);
      return false;
    }
  }

  /**
   * Кэширует все модели
   */
  static async cacheModels(onProgress?: (progress: number) => void): Promise<void> {
    try {
      console.log('🚀 ModelCache: Начинаем кэширование моделей');
      
      // Устанавливаем статус "загружается"
      localStorage.setItem(this.CACHE_STATUS_KEY, 'loading');

      if (!('caches' in window)) {
        throw new Error('Cache API не поддерживается');
      }

      const cache = await caches.open(this.CACHE_NAME);
      let completedCount = 0;

      // Параллельная загрузка моделей с ограничением
      const batchSize = 2; // Загружаем по 2 модели одновременно
      
      for (let i = 0; i < this.MODEL_URLS.length; i += batchSize) {
        const batch = this.MODEL_URLS.slice(i, i + batchSize);
        
        await Promise.all(batch.map(async (modelUrl) => {
          try {
            console.log(`📦 ModelCache: Загружаем ${modelUrl}`);
            
            // Загружаем модель
            const response = await fetch(modelUrl, {
              cache: 'no-cache' // Принудительная загрузка для кэширования
            });

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            // Кэшируем response
            await cache.put(modelUrl, response.clone());
            
            completedCount++;
            const progress = (completedCount / this.MODEL_URLS.length) * 100;
            onProgress?.(progress);
            
            console.log(`✅ ModelCache: ${modelUrl} закэширован (${Math.round(progress)}%)`);
          } catch (error) {
            console.error(`❌ ModelCache: Ошибка кэширования ${modelUrl}:`, error);
            throw error;
          }
        }));
      }

      // Устанавливаем время истечения кэша (1 год)
      const expiryTime = Date.now() + this.ONE_YEAR_MS;
      localStorage.setItem(this.CACHE_EXPIRY_KEY, expiryTime.toString());
      localStorage.setItem(this.CACHE_STATUS_KEY, 'complete');
      
      console.log('🎉 ModelCache: Все модели успешно закэшированы на 1 год');
    } catch (error) {
      console.error('❌ ModelCache: Ошибка кэширования:', error);
      localStorage.setItem(this.CACHE_STATUS_KEY, 'error');
      throw error;
    }
  }

  /**
   * Очищает весь кэш
   */
  static async clearCache(): Promise<void> {
    try {
      console.log('🧹 ModelCache: Очищаем кэш');
      
      // Очищаем Cache API
      if ('caches' in window) {
        await caches.delete(this.CACHE_NAME);
      }
      
      // Очищаем localStorage
      localStorage.removeItem(this.CACHE_EXPIRY_KEY);
      localStorage.removeItem(this.CACHE_STATUS_KEY);
      
      console.log('✅ ModelCache: Кэш очищен');
    } catch (error) {
      console.error('❌ ModelCache: Ошибка очистки кэша:', error);
    }
  }

  /**
   * Получает статус кэша
   */
  static getCacheStatus(): 'none' | 'loading' | 'complete' | 'error' {
    const status = localStorage.getItem(this.CACHE_STATUS_KEY);
    return (status as any) || 'none';
  }

  /**
   * Получает URL модели из кэша или оригинальный URL
   */
  static async getModelUrl(originalUrl: string): Promise<string> {
    try {
      if ('caches' in window) {
        const cache = await caches.open(this.CACHE_NAME);
        const cachedResponse = await cache.match(originalUrl);
        
        if (cachedResponse) {
          // Возвращаем cached blob URL для лучшей производительности
          const blob = await cachedResponse.blob();
          return URL.createObjectURL(blob);
        }
      }
      
      // Если нет в кэше, возвращаем оригинальный URL
      return originalUrl;
    } catch (error) {
      console.error('❌ ModelCache: Ошибка получения модели из кэша:', error);
      return originalUrl;
    }
  }

  /**
   * Получает информацию о кэше для отладки
   */
  static async getCacheInfo(): Promise<{
    isValid: boolean;
    status: string;
    expiryDate: string | null;
    cachedModels: string[];
  }> {
    const isValid = await this.isCacheValid();
    const status = this.getCacheStatus();
    const expiryTime = localStorage.getItem(this.CACHE_EXPIRY_KEY);
    const expiryDate = expiryTime ? new Date(parseInt(expiryTime)).toISOString() : null;
    
    let cachedModels: string[] = [];
    
    try {
      if ('caches' in window) {
        const cache = await caches.open(this.CACHE_NAME);
        const requests = await cache.keys();
        cachedModels = requests.map(req => new URL(req.url).pathname);
      }
    } catch (error) {
      console.error('❌ ModelCache: Ошибка получения информации о кэше:', error);
    }

    return {
      isValid,
      status,
      expiryDate,
      cachedModels
    };
  }
}