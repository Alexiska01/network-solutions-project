/**
 * Система кэширования 3D моделей
 * Использует Cache API для надежного хранения моделей в браузере на 1 год
 */

interface CacheEntry {
  url: string;
  timestamp: number;
  blob: Blob;
  size: number;
}

interface CacheMetadata {
  version: string;
  lastActivity: number;
  lastHomeVisit: number; // Время последнего посещения главной страницы
  quickReturnMode: boolean; // Режим быстрого возврата
  models: Record<string, {
    timestamp: number;
    size: number;
    etag?: string;
  }>;
}

class ModelCacheManager {
  private readonly CACHE_NAME = 'idata-models-v2';
  private readonly CACHE_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 год
  private readonly ACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 минут
  private readonly QUICK_RETURN_THRESHOLD = 10 * 60 * 1000; // 10 минут для быстрого возврата
  private readonly METADATA_KEY = 'cache-metadata';
  
  private cache: Cache | null = null;
  private metadata: CacheMetadata | null = null;

  // Публичный геттер для отладки
  get currentMetadata(): CacheMetadata | null {
    return this.metadata;
  }

  constructor() {
    // Сразу инициализируем метаданные синхронно
    this.initSync();
    console.log('🎉 ModelCacheManager: Конструктор выполнен');
  }

  /**
   * Синхронная инициализация метаданных
   */
  private initSync(): void {
    try {
      const stored = localStorage.getItem(this.METADATA_KEY);
      if (stored) {
        this.metadata = JSON.parse(stored);
      } else {
        this.metadata = {
          version: '2.0',
          lastActivity: Date.now(),
          lastHomeVisit: 0,
          quickReturnMode: false,
          models: {}
        };
        // Синхронное сохранение
        localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
      }
      console.log('✅ ModelCacheManager: Синхронная инициализация завершена', this.metadata);
    } catch (error) {
      console.warn('⚠️ ModelCacheManager: Ошибка синхронной инициализации', error);
      this.metadata = {
        version: '2.0',
        lastActivity: Date.now(),
        lastHomeVisit: 0,
        quickReturnMode: false,
        models: {}
      };
    }
  }

  /**
   * Инициализация кэша
   */
  async init(): Promise<void> {
    try {
      this.cache = await caches.open(this.CACHE_NAME);
      await this.loadMetadata();
      console.log('✅ ModelCacheManager: Инициализирован');
    } catch (error) {
      console.warn('⚠️ ModelCacheManager: Ошибка инициализации', error);
    }
  }

  /**
   * Загрузка метаданных кэша
   */
  private async loadMetadata(): Promise<void> {
    try {
      const stored = localStorage.getItem(this.METADATA_KEY);
      if (stored) {
        this.metadata = JSON.parse(stored);
      } else {
        this.metadata = {
          version: '2.0',
          lastActivity: Date.now(),
          lastHomeVisit: 0,
          quickReturnMode: false,
          models: {}
        };
        await this.saveMetadata();
      }
    } catch (error) {
      console.warn('⚠️ ModelCacheManager: Ошибка загрузки метаданных', error);
      this.metadata = {
        version: '2.0',
        lastActivity: Date.now(),
        lastHomeVisit: 0,
        quickReturnMode: false,
        models: {}
      };
    }
  }

  /**
   * Сохранение метаданных
   */
  private async saveMetadata(): Promise<void> {
    if (this.metadata) {
      try {
        localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
      } catch (error) {
        console.warn('⚠️ ModelCacheManager: Ошибка сохранения метаданных', error);
      }
    }
  }

  /**
   * Проверка необходимости показа WelcomeScreen
   */
  shouldShowWelcomeScreen(): boolean {
    console.log('🔍 ModelCacheManager: Проверка необходимости показа WelcomeScreen');
    
    if (!this.metadata) {
      console.log('📝 ModelCacheManager: Метаданные не найдены, инициализируем');
      // Если метаданные не инициализированы, делаем это сейчас
      try {
        this.initSync();
      } catch (error) {
        console.warn('⚠️ ModelCacheManager: Ошибка синхронной инициализации', error);
        return true;
      }
    }
    
    if (!this.metadata) {
      console.log('❌ ModelCacheManager: Метаданные все еще отсутствуют');
      return true;
    }

    const now = Date.now();
    const timeSinceActivity = now - this.metadata.lastActivity;
    const timeSinceHomeVisit = this.metadata.lastHomeVisit ? now - this.metadata.lastHomeVisit : Infinity;

    console.log('📊 ModelCacheManager:', {
      now,
      lastActivity: this.metadata.lastActivity,
      lastHomeVisit: this.metadata.lastHomeVisit,
      timeSinceActivity: Math.round(timeSinceActivity / 1000) + 's',
      timeSinceHomeVisit: timeSinceHomeVisit === Infinity ? 'Infinity' : Math.round(timeSinceHomeVisit / 1000) + 's',
      activityTimeout: Math.round(this.ACTIVITY_TIMEOUT / 1000) + 's',
      quickReturnThreshold: Math.round(this.QUICK_RETURN_THRESHOLD / 1000) + 's'
    });

    // Если это первый визит (lastHomeVisit = 0)
    if (this.metadata.lastHomeVisit === 0) {
      console.log('🆕 ModelCacheManager: Первый визит - показываем WelcomeScreen');
      return true;
    }

    // Режим быстрого возврата: если пользователь был на главной недавно (< 10 минут)
    if (timeSinceHomeVisit < this.QUICK_RETURN_THRESHOLD) {
      console.log('⚡ ModelCacheManager: Быстрый возврат - скрываем WelcomeScreen');
      return false;
    }

    // Если прошло больше 10 минут с последней активности
    if (timeSinceActivity > this.ACTIVITY_TIMEOUT) {
      console.log('🕐 ModelCacheManager: Показываем WelcomeScreen - прошло более 10 минут');
      return true;
    }

    // Проверяем наличие ключевых моделей в кэше (все основные модели)
    const criticalModels = [
      '/models/3530all.glb',
      '/models/3730all.glb',
      '/models/4530all.glb',
      '/models/6010all.glb'
    ];

    const criticalModelsCached = criticalModels.every(url => {
      const modelInfo = this.metadata!.models[url];
      if (!modelInfo) return false;

      const age = now - modelInfo.timestamp;
      return age < this.CACHE_DURATION;
    });

    // Если есть критичные модели, пропускаем WelcomeScreen
    if (criticalModelsCached) {
      console.log('⚡ ModelCacheManager: Скрываем WelcomeScreen - критичные модели в кэше');
      return false;
    }

    console.log('📦 ModelCacheManager: Показываем WelcomeScreen - нет критичных моделей в кэше');
    return true;
  }

  /**
   * Отметка активности пользователя
   */
  updateActivity(): void {
    if (this.metadata) {
      this.metadata.lastActivity = Date.now();
      // Синхронное сохранение для быстрой отметки активности
      try {
        localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
      } catch (error) {
        console.warn('⚠️ ModelCacheManager: Ошибка сохранения активности', error);
      }
    }
  }

  /**
   * Отметка посещения главной страницы
   */
  markHomeVisit(): void {
    if (this.metadata) {
      const now = Date.now();
      this.metadata.lastHomeVisit = now;
      this.metadata.lastActivity = now;
      this.metadata.quickReturnMode = true;
      // Синхронное сохранение
      try {
        localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
        console.log('🏠 ModelCacheManager: Отмечено посещение главной страницы', {
          lastHomeVisit: now,
          lastActivity: now
        });
      } catch (error) {
        console.warn('⚠️ ModelCacheManager: Ошибка сохранения посещения', error);
      }
    }
  }

  /**
   * Принудительный показ WelcomeScreen (например, при первом посещении)
   */
  forceWelcomeScreen(): void {
    if (this.metadata) {
      this.metadata.lastHomeVisit = 0;
      this.metadata.quickReturnMode = false;
      // Синхронное сохранение
      try {
        localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
        console.log('🔄 ModelCacheManager: Принудительный показ WelcomeScreen');
      } catch (error) {
        console.warn('⚠️ ModelCacheManager: Ошибка принудительного показа', error);
      }
    }
  }

  /**
   * Сброс состояния при долгом бездействии
   */
  resetInactivityState(): void {
    if (this.metadata) {
      const now = Date.now();
      const timeSinceActivity = now - this.metadata.lastActivity;
      
      // Если прошло больше 10 минут с последней активности - сбрасываем состояние
      if (timeSinceActivity > this.ACTIVITY_TIMEOUT) {
        this.metadata.lastHomeVisit = 0;
        this.metadata.quickReturnMode = false;
        // Синхронное сохранение
        try {
          localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
          console.log('🔄 ModelCacheManager: Сброс состояния из-за бездействия', {
            timeSinceActivity: Math.round(timeSinceActivity / 1000) + 's'
          });
        } catch (error) {
          console.warn('⚠️ ModelCacheManager: Ошибка сброса состояния', error);
        }
      }
    }
  }

  /**
   * Проверка наличия модели в кэше
   */
  async hasModel(url: string): Promise<boolean> {
    if (!this.cache || !this.metadata) return false;

    try {
      const response = await this.cache.match(url);
      if (!response) return false;

      const modelInfo = this.metadata.models[url];
      if (!modelInfo) return false;

      const age = Date.now() - modelInfo.timestamp;
      return age < this.CACHE_DURATION;
    } catch (error) {
      console.warn(`⚠️ ModelCacheManager: Ошибка проверки модели ${url}`, error);
      return false;
    }
  }

  /**
   * Получение модели из кэша
   */
  async getModel(url: string): Promise<Response | null> {
    if (!this.cache) return null;

    try {
      const response = await this.cache.match(url);
      if (response) {
        console.log(`✅ ModelCacheManager: Модель загружена из кэша ${url}`);
      }
      return response || null;
    } catch (error) {
      console.warn(`⚠️ ModelCacheManager: Ошибка получения модели ${url}`, error);
      return null;
    }
  }

  /**
   * Кэширование модели
   */
  async cacheModel(url: string, response: Response): Promise<void> {
    if (!this.cache || !this.metadata) return;

    try {
      // Клонируем ответ для кэширования
      const responseClone = response.clone();
      
      // Сохраняем в кэш
      await this.cache.put(url, responseClone);

      // Обновляем метаданные
      const blob = await response.blob();
      this.metadata.models[url] = {
        timestamp: Date.now(),
        size: blob.size,
        etag: response.headers.get('etag') || undefined
      };

      await this.saveMetadata();
      console.log(`✅ ModelCacheManager: Модель закэширована ${url} (${(blob.size / 1024 / 1024).toFixed(1)} MB)`);
    } catch (error) {
      console.warn(`⚠️ ModelCacheManager: Ошибка кэширования модели ${url}`, error);
    }
  }

  /**
   * Загрузка модели с кэшированием
   */
  async loadModel(url: string): Promise<Response | null> {
    // Сначала проверяем кэш
    const cached = await this.getModel(url);
    if (cached) {
      return cached;
    }

    try {
      console.log(`🔄 ModelCacheManager: Загружаем модель ${url}`);
      
      const response = await fetch(url, {
        cache: 'force-cache',
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Кэшируем модель
      await this.cacheModel(url, response.clone());
      
      return response;
    } catch (error) {
      console.error(`❌ ModelCacheManager: Ошибка загрузки модели ${url}`, error);
      return null;
    }
  }

  /**
   * Предварительная загрузка моделей
   */
  async preloadModels(urls: string[], maxConcurrent: number = 2): Promise<void> {
    console.log(`🚀 ModelCacheManager: Начинаем предзагрузку ${urls.length} моделей`);
    
    const semaphore = new Array(maxConcurrent).fill(0);
    const results = await Promise.allSettled(
      urls.map(async (url, index) => {
        // Ожидаем доступный слот
        const slotIndex = index % maxConcurrent;
        await new Promise(resolve => setTimeout(resolve, slotIndex * 200));
        
        return this.loadModel(url);
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value).length;
    console.log(`✅ ModelCacheManager: Предзагрузка завершена (${successful}/${urls.length})`);
  }

  /**
   * Очистка устаревших моделей
   */
  async cleanup(): Promise<void> {
    if (!this.cache || !this.metadata) return;

    try {
      const now = Date.now();
      const toDelete: string[] = [];

      for (const [url, info] of Object.entries(this.metadata.models)) {
        const age = now - info.timestamp;
        if (age > this.CACHE_DURATION) {
          toDelete.push(url);
        }
      }

      for (const url of toDelete) {
        await this.cache.delete(url);
        delete this.metadata.models[url];
        console.log(`🧹 ModelCacheManager: Удалена устаревшая модель ${url}`);
      }

      if (toDelete.length > 0) {
        await this.saveMetadata();
        console.log(`✅ ModelCacheManager: Очистка завершена, удалено ${toDelete.length} моделей`);
      }
    } catch (error) {
      console.warn('⚠️ ModelCacheManager: Ошибка очистки кэша', error);
    }
  }

  /**
   * Получение информации о кэше
   */
  getCacheInfo(): {
    totalModels: number;
    totalSize: string;
    oldestModel: string | null;
    newestModel: string | null;
  } {
    if (!this.metadata) {
      return { totalModels: 0, totalSize: '0 MB', oldestModel: null, newestModel: null };
    }

    const models = Object.entries(this.metadata.models);
    const totalSize = models.reduce((sum, [, info]) => sum + (info.size || 0), 0);
    
    let oldest: [string, any] | null = null;
    let newest: [string, any] | null = null;

    models.forEach(([url, info]) => {
      if (!oldest || info.timestamp < oldest[1].timestamp) {
        oldest = [url, info];
      }
      if (!newest || info.timestamp > newest[1].timestamp) {
        newest = [url, info];
      }
    });

    return {
      totalModels: models.length,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(1)} MB`,
      oldestModel: oldest ? oldest[0] : null,
      newestModel: newest ? newest[0] : null
    };
  }

  /**
   * Очистка данных для тестирования WelcomeScreen
   */
  clearForTesting(): void {
    try {
      localStorage.removeItem(this.METADATA_KEY);
      this.metadata = null;
      console.log('🧪 ModelCacheManager: Данные очищены для тестирования');
      // Повторная инициализация
      this.initSync();
    } catch (error) {
      console.warn('⚠️ ModelCacheManager: Ошибка очистки для тестирования', error);
    }
  }

  /**
   * Принудительная очистка для первого визита
   */
  forceFirstVisit(): void {
    try {
      this.metadata = {
        version: '2.0',
        lastActivity: Date.now(),
        lastHomeVisit: 0, // Обнуляем для первого визита
        quickReturnMode: false,
        models: {}
      };
      localStorage.setItem(this.METADATA_KEY, JSON.stringify(this.metadata));
      console.log('🔄 ModelCacheManager: Принудительный первый визит', this.metadata);
    } catch (error) {
      console.warn('⚠️ ModelCacheManager: Ошибка принудительного первого визита', error);
    }
  }
}

export const modelCacheManager = new ModelCacheManager();