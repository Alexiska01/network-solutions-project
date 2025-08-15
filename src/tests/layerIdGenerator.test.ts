import { describe, it, expect } from 'vitest';
import { createLayerIdGenerator } from '@/components/home/layerIdGenerator.ts';

// Тест (п.19): генератор id не повторяет значения и монотонно возрастает

describe('layerIdGenerator', () => {
  it('produces unique incremental ids for 1000 calls', () => {
    const gen = createLayerIdGenerator();
    const seen = new Set<number>();
    let prev = -1;
    for (let i = 0; i < 1000; i++) {
      const id = gen();
      expect(seen.has(id)).toBe(false);
      expect(id).toBeGreaterThan(prev);
      seen.add(id);
      prev = id;
    }
    expect(seen.size).toBe(1000);
  });

  it('supports custom start value', () => {
    const gen = createLayerIdGenerator(500);
    expect(gen()).toBe(500);
    expect(gen()).toBe(501);
  });
});
