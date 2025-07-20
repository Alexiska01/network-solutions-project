export class ModelPreloader {
  private static instance: ModelPreloader;
  private loadedModels: Map<string, boolean> = new Map();
  private loadingModels: Map<string, Promise<void>> = new Map();
  private modelElements: Map<string, HTMLElement> = new Map();

  private constructor() {
    // Добавляем prefetch для быстрой загрузки первых двух моделей
    this.addPrefetchLinks();
  }
  
  private addPrefetchLinks() {
    const priorityModels = [
      'https://models-static-anummr3hg-alexiskas-projects.vercel.app/3530all.glb',
      'https://models-static-anummr3hg-alexiskas-projects.vercel.app/3730all.glb'
    ];
    
    priorityModels.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      console.log(`📥 ModelPreloader: Добавлен prefetch для ${url}`);
    });
  }

  static getInstance(): ModelPreloader {
    if (!ModelPreloader.instance) {
      ModelPreloader.instance = new ModelPreloader();
    }
    return ModelPreloader.instance;
  }

  async preloadModel(url: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.loadedModels.get(url)) {
      return;
    }

    if (this.loadingModels.has(url)) {
      return this.loadingModels.get(url)!;
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-9999';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      
      const modelViewer = document.createElement('model-viewer') as any;
      modelViewer.src = url;
      modelViewer.loading = 'eager';
      modelViewer.reveal = 'immediate';
      modelViewer.style.width = '100%';
      modelViewer.style.height = '100%';
      
      // Настройки для максимально быстрой загрузки
      modelViewer.setAttribute('auto-rotate', '');
      modelViewer.setAttribute('camera-controls', '');
      modelViewer.setAttribute('shadow-intensity', '0');
      modelViewer.setAttribute('environment-image', 'neutral');
      modelViewer.setAttribute('exposure', '1');
      
      // Для высокого приоритета сразу начинаем загрузку
      if (priority === 'high') {
        modelViewer.setAttribute('poster', 'none');
        modelViewer.dismissPoster();
      }
      
      modelViewer.addEventListener('load', () => {
        console.log(`✅ Модель предзагружена: ${url}`);
        this.loadedModels.set(url, true);
        this.modelElements.set(url, container);
        resolve();
      });
      
      modelViewer.addEventListener('error', () => {
        console.error(`❌ Ошибка предзагрузки модели: ${url}`);
        reject(new Error(`Failed to preload model: ${url}`));
      });
      
      container.appendChild(modelViewer);
      document.body.appendChild(container);
    });

    this.loadingModels.set(url, loadPromise);
    
    try {
      await loadPromise;
    } finally {
      this.loadingModels.delete(url);
    }
  }

  async preloadMultiple(urls: string[], highPriorityCount: number = 2): Promise<void> {
    const promises = urls.map((url, index) => 
      this.preloadModel(url, index < highPriorityCount ? 'high' : 'low')
    );
    
    await Promise.allSettled(promises);
  }

  isLoaded(url: string): boolean {
    return this.loadedModels.get(url) || false;
  }

  cleanup(): void {
    this.modelElements.forEach(element => {
      element.remove();
    });
    this.modelElements.clear();
    this.loadedModels.clear();
    this.loadingModels.clear();
  }
}

export const modelPreloader = ModelPreloader.getInstance();