// Интеллектуальная система предзагрузки 3D моделей с оптимизацией производительности
import { modelCacheManager } from './modelCacheManager';

export class ModelPreloader {
  private static instance: ModelPreloader;
  private loadedModels: Map<string, boolean> = new Map();
  private loadingModels: Map<string, Promise<void>> = new Map();

  private constructor() {
  // РАНЬШЕ: агрессивно очищали все preload/prefetch ссылки для .glb, что удаляло
  // статические <link> из index.html и приводило к повторным вставкам и предупреждениям
  // браузера о "preload не был использован достаточно быстро".
  // ТЕПЕРЬ: не трогаем статические resource hints, оставляем браузеру их обработку.
  // (Функция removeExistingPreloadLinks сохранена ниже, но намеренно не вызывается.)
    // Настраиваем приоритеты для моделей коммутаторов
    this.setupPriorityQueue();
    // Добавляем интеллектуальное кэширование
    this.setupIntelligentCache();
  }
  
  
  private setupPriorityQueue() {
  // Очередь отключена
  }
  
  private setupIntelligentCache() {
    // Service Worker временно отключен для устранения ошибок
    // Используем только обычное кэширование браузера
    console.log('🎯 ModelPreloader: Кэширование настроено без Service Worker');
  }
  


  static getInstance(): ModelPreloader {
    if (!ModelPreloader.instance) {
      ModelPreloader.instance = new ModelPreloader();
    }
    return ModelPreloader.instance;
  }

  async preloadModel(url: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    // Проверяем, что загружаем только "all" модели
    if (!url.includes('all.glb')) {
      return;
    }
    
    if (this.loadedModels.get(url)) {
      return;
    }

    if (this.loadingModels.has(url)) {
      return this.loadingModels.get(url)!;
    }

    // ⚡ Быстрый путь: если модель уже в Cache API — отмечаем мгновенно и пропускаем скрытую загрузку
    try {
      if (await modelCacheManager.hasModel(url)) {
        this.loadedModels.set(url, true);
        return;
      }
    } catch {
      // Тихо игнорируем
    }

    const controller = new AbortController();
    const loadPromise = (async () => {
      try {
        // Высокий приоритет — без задержки, низкий — лёгкая пауза
        if (priority === 'low') {
          await new Promise(r => setTimeout(r, 200));
        }
        const res = await fetch(url, { signal: controller.signal, cache: 'force-cache' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        // Не создаём blob/objectURL — model-viewer сам загрузит по URL, мы лишь прогрели кэш
        this.loadedModels.set(url, true);
      } catch (e) {
        this.loadedModels.set(url, false);
      }
    })();

    this.loadingModels.set(url, loadPromise);
    
  try { await loadPromise; } finally { this.loadingModels.delete(url); }
  }

  async preloadMultiple(urls: string[], highPriorityCount: number = 2): Promise<void> {
    // Фильтруем только "all" модели
    const allModels = urls.filter(url => url.includes('all.glb'));
    
    if (allModels.length === 0) {
      return;
    }
    
    // Загружаем с учетом приоритетов и ограничения параллельности
    const highPriorityPromises = allModels.slice(0, highPriorityCount).map(url => 
      this.preloadModel(url, 'high')
    );
    
    // Ждем загрузки высокоприоритетных моделей
    await Promise.allSettled(highPriorityPromises);
    
    // Затем загружаем остальные с низким приоритетом
    const lowPriorityPromises = allModels.slice(highPriorityCount).map(url => 
      this.preloadModel(url, 'low')
    );
    
    await Promise.allSettled(lowPriorityPromises);
  }


  isLoaded(url: string): boolean {
    const status = this.loadedModels.get(url);
    // Возвращаем true только если модель успешно загружена (не false)
    return status === true;
  }
  
  getLoadedCount(): number {
    return this.loadedModels.size;
  }
  
  getLoadingCount(): number {
    return this.loadingModels.size;
  }
  
  getAllLoadedModels(): string[] {
    return Array.from(this.loadedModels.keys());
  }

  cleanup(): void {
  // Убрали скрытые элементы — теперь просто чистим карты
    this.loadedModels.clear();
    this.loadingModels.clear();
    // Очистка завершена
  }
  // Для отладки
  debugState() {
    return {
      loaded: Array.from(this.loadedModels.entries()),
      loading: Array.from(this.loadingModels.keys())
    };
  }
  
  // Метод для предзагрузки только конкретной модели коммутатора
  async preloadSwitchModel(switchSeries: '3530' | '3730' | '4530' | '6010'): Promise<void> {
    const url = `/models/${switchSeries}all.glb`;
    await this.preloadModel(url, 'high');
  }

  // Метод для принудительной отметки модели как загруженной (для синхронизации)
  markAsLoaded(url: string): void {
    this.loadedModels.set(url, true);
  }
}

export const modelPreloader = ModelPreloader.getInstance();