export type LayerIdGenerator = () => number;

// Простая чистая функция-генератор, удобно тестировать отдельно
export function createLayerIdGenerator(start = 0): LayerIdGenerator {
  let current = start;
  return () => current++;
}
