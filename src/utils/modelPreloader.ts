// Интеллектуальная система предзагрузки 3D моделей с оптимизацией производительности
export class ModelPreloader {
  private static instance: ModelPreloader;
  private loadedModels: Map<string, boolean> = new Map();
  private loadingModels: Map<string, Promise<void>> = new Map();
  private modelElements: Map<string, HTMLElement> = new Map();
  private preloadQueue: Array<{ url: string; priority: number }> = [];
  private isProcessingQueue = false;
  private maxConcurrentLoads = 2;

  private constructor() {
    // Настраиваем приоритеты для моделей коммутаторов
    this.setupPriorityQueue();
    // Добавляем интеллектуальное кэширование
    this.setupIntelligentCache();
  }
  
  private setupPriorityQueue() {
    // Модели загружаются с равными приоритетами для устранения проблем с 4530 и 6010
    const modelPriorities = [
      { url: '/models/3530all.glb', priority: 10 }, // Самая популярная модель  
      { url: '/models/3730all.glb', priority: 10 }, // Равный приоритет
      { url: '/models/4530all.glb', priority: 10 }, // Повышенный приоритет
      { url: '/models/6010all.glb', priority: 10 }  // Повышенный приоритет
    ];
    
    // Добавляем в очередь с приоритетами
    modelPriorities.forEach(({ url, priority }) => {
      this.preloadQueue.push({ url, priority });
    });
    
    // Сортируем по приоритету (больший приоритет = раньше загрузка)
    this.preloadQueue.sort((a, b) => b.priority - a.priority);
  }
  
  private setupIntelligentCache() {
    // Используем Service Worker для кэширования моделей (если доступен)
    if ('serviceWorker' in navigator && 'caches' in window) {
      this.enableServiceWorkerCache();
    }
    
    // Resource Hints для браузера
    this.addResourceHints();
  }
  
  private enableServiceWorkerCache() {
    // Проверяем, зарегистрирован ли Service Worker
    navigator.serviceWorker.ready.then(registration => {
      console.log('🔧 ModelPreloader: Service Worker готов для кэширования моделей');
    }).catch(err => {
      console.warn('⚠️ ModelPreloader: Service Worker недоступен', err);
    });
  }
  
  private addResourceHints() {
    // Только для "all" моделей - основные модели коммутаторов
    const allModels = [
      '/models/3530all.glb',
      '/models/3730all.glb',
      '/models/4530all.glb',
      '/models/6010all.glb'
    ];
    
    // Добавляем dns-prefetch и preconnect для ускорения загрузки
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = window.location.origin;
    document.head.appendChild(preconnect);
    
    // Добавляем prefetch для первых двух моделей (самые важные)
    allModels.slice(0, 2).forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'fetch';
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
      console.log(`📥 ModelPreloader: Prefetch добавлен для ${url}`);
    });
    
    // Для остальных моделей используем preload с низким приоритетом
    allModels.slice(2).forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'fetch';
      link.setAttribute('fetchpriority', 'low');
      document.head.appendChild(link);
    });
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
      console.warn(`⚠️ ModelPreloader: Пропускаем загрузку не-all модели: ${url}`);
      return;
    }
    
    if (this.loadedModels.get(url)) {
      console.log(`✅ ModelPreloader: Модель уже загружена: ${url}`);
      return;
    }

    if (this.loadingModels.has(url)) {
      return this.loadingModels.get(url)!;
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      // Создаем оптимизированный контейнер
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        z-index: -9999;
        left: -9999px;
        top: -9999px;
        visibility: hidden;
      `;
      
      const modelViewer = document.createElement('model-viewer') as any;
      modelViewer.src = url;
      
      // Оптимизация загрузки в зависимости от приоритета
      if (priority === 'high') {
        modelViewer.loading = 'eager';
        modelViewer.reveal = 'immediate';
        modelViewer.setAttribute('fetchpriority', 'high');
      } else {
        modelViewer.loading = 'lazy';
        modelViewer.reveal = 'interaction';
        modelViewer.setAttribute('fetchpriority', 'low');
      }
      
      // Настройки для минимального потребления ресурсов
      modelViewer.style.cssText = 'width: 100%; height: 100%;';
      modelViewer.setAttribute('disable-zoom', '');
      modelViewer.setAttribute('disable-pan', '');
      modelViewer.setAttribute('disable-tap', '');
      modelViewer.setAttribute('interaction-prompt', 'none');
      modelViewer.setAttribute('ar', 'false');
      modelViewer.setAttribute('ar-modes', '');
      modelViewer.setAttribute('camera-controls', 'false');
      modelViewer.setAttribute('auto-rotate', 'false');
      modelViewer.setAttribute('shadow-intensity', '0');
      modelViewer.setAttribute('exposure', '0.5');
      
      // Оптимизированная обработка событий
      const loadHandler = () => {
        console.log(`✅ ModelPreloader: Модель загружена [${priority}]: ${url}`);
        this.loadedModels.set(url, true);
        this.modelElements.set(url, container);
        
        // Освобождаем память после загрузки
        if (priority === 'low') {
          setTimeout(() => {
            modelViewer.dismissPoster?.();
          }, 100);
        }
        
        resolve();
      };
      
      const errorHandler = (e: Event) => {
        console.error(`❌ ModelPreloader: Ошибка загрузки модели: ${url}`, e);
        container.remove();
        reject(new Error(`Failed to preload model: ${url}`));
      };
      
      modelViewer.addEventListener('load', loadHandler, { once: true });
      modelViewer.addEventListener('error', errorHandler, { once: true });
      
      container.appendChild(modelViewer);
      document.body.appendChild(container);
      
      // Таймаут для предотвращения зависания
      setTimeout(() => {
        if (!this.loadedModels.get(url)) {
          errorHandler(new Event('timeout'));
        }
      }, 30000); // 30 секунд таймаут
    });

    this.loadingModels.set(url, loadPromise);
    
    try {
      await loadPromise;
    } finally {
      this.loadingModels.delete(url);
      this.processQueue(); // Обрабатываем очередь после загрузки
    }
  }

  async preloadMultiple(urls: string[], highPriorityCount: number = 2): Promise<void> {
    // Фильтруем только "all" модели
    const allModels = urls.filter(url => url.includes('all.glb'));
    
    if (allModels.length === 0) {
      console.warn('⚠️ ModelPreloader: Нет all-моделей для загрузки');
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

  private async processQueue() {
    if (this.isProcessingQueue || this.preloadQueue.length === 0) {
      return;
    }
    
    this.isProcessingQueue = true;
    
    while (this.preloadQueue.length > 0 && this.loadingModels.size < this.maxConcurrentLoads) {
      const item = this.preloadQueue.shift();
      if (item && !this.loadedModels.get(item.url)) {
        this.preloadModel(item.url, item.priority >= 9 ? 'high' : 'low');
      }
    }
    
    this.isProcessingQueue = false;
  }

  isLoaded(url: string): boolean {
    return this.loadedModels.get(url) || false;
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
    // Очищаем элементы с задержкой для предотвращения проблем с отображением
    this.modelElements.forEach((element, url) => {
      setTimeout(() => {
        element.remove();
      }, 100);
    });
    
    this.modelElements.clear();
    this.loadedModels.clear();
    this.loadingModels.clear();
    this.preloadQueue = [];
    
    console.log('🧹 ModelPreloader: Очистка завершена');
  }
  
  // Метод для предзагрузки только конкретной модели коммутатора
  async preloadSwitchModel(switchSeries: '3530' | '3730' | '4530' | '6010'): Promise<void> {
    const url = `/models/${switchSeries}all.glb`;
    await this.preloadModel(url, 'high');
  }
}

export const modelPreloader = ModelPreloader.getInstance();