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
      const expiryTime = localStorage.getItem(this.CACHE_EXPIRY_KEY);
      const cacheStatus = localStorage.getItem(this.CACHE_STATUS_KEY);
      
      if (!expiryTime || !cacheStatus || cacheStatus !== 'complete') {
        return false;
      }

      const now = Date.now();
      const expiry = parseInt(expiryTime);
      if (now > expiry) {
        await this.clearCache();
        return false;
      }

      // Быстрая проверка без подробного логирования
      const cache = await caches.open(this.CACHE_NAME);
      const cachedRequests = await cache.keys();
      
      if (cachedRequests.length < this.MODEL_URLS.length) {
        await this.clearCache();
        return false;
      }

      return true;
    } catch (error) {
      try {
        await this.clearCache();
      } catch (clearError) {
        // ignore
      }
      return false;
    }
  }

  /**
   * Кэширует все модели
   */
  static async cacheModels(onProgress?: (progress: number) => void): Promise<void> {
    try {
      localStorage.setItem(this.CACHE_STATUS_KEY, 'loading');

      if (!('caches' in window)) {
        throw new Error('Cache API не поддерживается');
      }

      const cache = await caches.open(this.CACHE_NAME);
      let completedCount = 0;

      for (const modelUrl of this.MODEL_URLS) {
        try {
          const response = await fetch(modelUrl, {
            cache: 'no-cache'
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          await cache.put(modelUrl, response.clone());
          
          completedCount++;
          const progress = (completedCount / this.MODEL_URLS.length) * 100;
          onProgress?.(progress);
        } catch (error) {
          throw error;
        }
      }

      // Устанавливаем время истечения кэша (1 год)
      const expiryTime = Date.now() + this.ONE_YEAR_MS;
      localStorage.setItem(this.CACHE_EXPIRY_KEY, expiryTime.toString());
      localStorage.setItem(this.CACHE_STATUS_KEY, 'complete');
    } catch (error) {
      localStorage.setItem(this.CACHE_STATUS_KEY, 'error');
      throw error;
    }
  }

  /**
   * Очищает весь кэш
   */
  static async clearCache(): Promise<void> {
    try {
      if ('caches' in window) {
        await caches.delete(this.CACHE_NAME);
      }
      localStorage.removeItem(this.CACHE_EXPIRY_KEY);
      localStorage.removeItem(this.CACHE_STATUS_KEY);
    } catch (error) {
      // ignore
    }
  }

  /**
   * Получает кэшированную модель или null если нет в кэше
   */
  static async getCachedModel(modelUrl: string): Promise<string | null> {
    try {
      if (!('caches' in window)) return null;
      
      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(modelUrl);
      
      if (response) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }
}