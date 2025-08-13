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
    // Очищаем любые существующие preload ссылки для избежания конфликтов
    this.removeExistingPreloadLinks();
    // Настраиваем приоритеты для моделей коммутаторов
    this.setupPriorityQueue();
    // Добавляем интеллектуальное кэширование
    this.setupIntelligentCache();
  }
  
  private removeExistingPreloadLinks() {
    // АГРЕССИВНАЯ очистка всех preload/prefetch ссылок для .glb файлов
    const selectors = [
      'link[rel="preload"][href*=".glb"]',
      'link[rel="prefetch"][href*=".glb"]',
      'link[rel="modulepreload"][href*=".glb"]',
      'link[href*="3730all.glb"]',
      'link[href*="3530all.glb"]',
      'link[href*="4530all.glb"]',
      'link[href*="6010all.glb"]'
    ];
    
    selectors.forEach(selector => {
      const links = document.querySelectorAll(selector);
      links.forEach(link => {
        link.remove();
      });
    });
    
    // Дополнительно очищаем из head все ссылки на модели
    const allLinks = document.head.querySelectorAll('link');
    allLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes('.glb')) {
        link.remove();
      }
    });
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
    // Только используем Service Worker для кэширования (если доступен)
    if ('serviceWorker' in navigator && 'caches' in window) {
      this.enableServiceWorkerCache();
    }
    
    // Убираем Resource Hints чтобы избежать preload ошибок
  }
  
  private enableServiceWorkerCache() {
    // Тихая проверка Service Worker без логирования
    navigator.serviceWorker.ready.then(() => {
      // Service Worker готов
    }).catch(() => {
      // Service Worker недоступен, продолжаем без него
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
      return;
    }
    
    if (this.loadedModels.get(url)) {
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
      
      // КРИТИЧНО: НЕ устанавливаем src сразу - это создает preload warning
      // modelViewer.src = url;
      
      // Принудительно отключаем любые preload через атрибуты
      modelViewer.loading = 'lazy';
      modelViewer.reveal = 'interaction';
      modelViewer.setAttribute('fetchpriority', 'low');
      modelViewer.setAttribute('preload', 'none');
      
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
      
      // Общий таймаут для всех моделей
      let timeoutId: NodeJS.Timeout;
      
      // Оптимизированная обработка событий
      const loadHandler = () => {
        clearTimeout(timeoutId);
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
      
      const errorHandler = () => {
        clearTimeout(timeoutId);
        // Тихо обрабатываем ошибку без лишних логов
        this.loadedModels.set(url, false);
        container.remove();
        resolve(); // Graceful degradation
      };
      
      modelViewer.addEventListener('load', loadHandler, { once: true });
      modelViewer.addEventListener('error', errorHandler, { once: true });
      
      // Добавляем элементы в DOM сначала без src
      container.appendChild(modelViewer);
      document.body.appendChild(container);
      
      // ЗАДЕРЖКА перед установкой src для избежания preload warning
      setTimeout(() => {
        // Теперь устанавливаем src когда element уже в DOM и готов
        modelViewer.src = url;
        
        // Устанавливаем таймаут только после установки src
        timeoutId = setTimeout(() => {
          if (!this.loadedModels.has(url)) {
            errorHandler();
          }
        }, 20000); // 20 сек для всех моделей
      }, 500); // 500мс задержка должна быть достаточной
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
    
    // Очистка завершена
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