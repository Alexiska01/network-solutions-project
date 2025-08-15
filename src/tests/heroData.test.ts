import { describe, it, expect } from 'vitest';
import { heroData } from '@/components/home/heroData.ts';

// Малый тест (п.18):
// 1. Уникальность id
// 2. Наличие modelUrl (не пустая строка)
// 3. Ровно три цвета в градиенте (парсим по #... в строке)

describe('heroData integrity', () => {
  it('all ids are unique', () => {
    const ids = heroData.map(h => h.id);
    const set = new Set(ids);
    expect(set.size).toBe(ids.length);
  });

  it('each item has non-empty modelUrl', () => {
    for (const item of heroData) {
      expect(item.modelUrl).toMatch(/\.glb$/);
      expect(item.modelUrl.length).toBeGreaterThan(0);
    }
  });

  it('each gradient contains exactly 3 colors', () => {
    for (const item of heroData) {
      const matches = [...item.gradient.matchAll(/#([0-9a-fA-F]{3,8})/g)];
      expect(matches.length).toBe(3);
    }
  });
});
