// Утилита для тестирования и отладки системы кэширования моделей

import { ModelCache } from './modelCache';

export class CacheDebug {
  /**
   * Выводит подробную информацию о состоянии кэша в консоль
   */
  static async logCacheStatus(): Promise<void> {
    console.group('📦 CacheDebug: Полная информация о кэше');
    
    try {
      const info = await ModelCache.getCacheInfo();
      
      console.log('🔍 Статус кэша:', info.status);
      console.log('✅ Действительность:', info.isValid ? 'Действителен' : 'Недействителен');
      console.log('📅 Истечение:', info.expiryDate || 'Не установлено');
      
      if (info.cachedModels.length > 0) {
        console.log('📋 Кэшированные модели:');
        info.cachedModels.forEach((model, index) => {
          console.log(`  ${index + 1}. ${model}`);
        });
      } else {
        console.log('📋 Кэшированные модели: Нет');
      }
      
      // Проверяем localStorage
      const expiryTime = localStorage.getItem('idata-models-cache-expiry');
      const status = localStorage.getItem('idata-models-cache-status');
      
      console.log('💾 localStorage:');
      console.log(`  - Статус: ${status || 'Не установлен'}`);
      console.log(`  - Истечение: ${expiryTime ? new Date(parseInt(expiryTime)).toLocaleString() : 'Не установлено'}`);
      
      // Проверяем Cache API
      if ('caches' in window) {
        try {
          const cache = await caches.open('idata-models-cache');
          const keys = await cache.keys();
          console.log(`🔧 Cache API: ${keys.length} записей`);
        } catch (error) {
          console.log('🔧 Cache API: Ошибка доступа', error);
        }
      } else {
        console.log('🔧 Cache API: Не поддерживается');
      }
      
    } catch (error) {
      console.error('❌ CacheDebug: Ошибка получения информации:', error);
    }
    
    console.groupEnd();
  }

  /**
   * Очищает весь кэш и выводит подтверждение
   */
  static async clearCacheWithLog(): Promise<void> {
    console.log('🧹 CacheDebug: Начинаем очистку кэша...');
    
    try {
      await ModelCache.clearCache();
      console.log('✅ CacheDebug: Кэш успешно очищен');
      
      // Проверяем что действительно очищено
      setTimeout(() => {
        this.logCacheStatus();
      }, 100);
      
    } catch (error) {
      console.error('❌ CacheDebug: Ошибка очистки кэша:', error);
    }
  }

  /**
   * Принудительно кэширует все модели с детальным логированием
   */
  static async forceCacheModels(): Promise<void> {
    console.log('🚀 CacheDebug: Запускаем принудительное кэширование...');
    
    try {
      await ModelCache.cacheModels((progress) => {
        console.log(`📊 CacheDebug: Прогресс кэширования: ${Math.round(progress)}%`);
      });
      
      console.log('✅ CacheDebug: Кэширование завершено');
      
      // Проверяем результат
      setTimeout(() => {
        this.logCacheStatus();
      }, 100);
      
    } catch (error) {
      console.error('❌ CacheDebug: Ошибка кэширования:', error);
    }
  }

  /**
   * Тестирует полный цикл: очистка -> кэширование -> проверка
   */
  static async testFullCycle(): Promise<void> {
    console.group('🔄 CacheDebug: Тест полного цикла кэширования');
    
    console.log('1️⃣ Проверяем начальное состояние...');
    await this.logCacheStatus();
    
    console.log('2️⃣ Очищаем кэш...');
    await this.clearCacheWithLog();
    
    console.log('3️⃣ Ждём 1 секунду...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('4️⃣ Запускаем кэширование...');
    await this.forceCacheModels();
    
    console.log('5️⃣ Финальная проверка...');
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.logCacheStatus();
    
    console.groupEnd();
    console.log('✅ CacheDebug: Тест полного цикла завершён');
  }

  /**
   * Добавляет глобальные функции для отладки в window (только в dev режиме)
   */
  static addGlobalDebugFunctions(): void {
    if (import.meta.env.DEV) {
      (window as any).cacheDebug = {
        status: () => this.logCacheStatus(),
        clear: () => this.clearCacheWithLog(),
        cache: () => this.forceCacheModels(),
        test: () => this.testFullCycle(),
        help: () => {
          console.log('🔧 CacheDebug: Доступные команды:');
          console.log('  cacheDebug.status() - показать статус кэша');
          console.log('  cacheDebug.clear()  - очистить кэш');
          console.log('  cacheDebug.cache()  - принудительное кэширование');
          console.log('  cacheDebug.test()   - полный тест цикла');
        }
      };
      
      console.log('🔧 CacheDebug: Функции отладки добавлены в window.cacheDebug');
      console.log('   Введите cacheDebug.help() для справки');
    }
  }
}