#!/usr/bin/env node
/*
  Быстрый анализ .glb моделей на предмет сжатия:
  - Наличие Draco:   присутствует строка "KHR_draco_mesh_compression"
  - Наличие Meshopt: присутствует строка "MESHOPT_compression"
  - Проверка KTX2:   присутствует строка "KHR_texture_basisu"
  - Размеры файлов

  Запуск:
    node scripts/analyze-models.js
*/

const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(__dirname, '..', 'public', 'models');

function formatSize(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  if (bytes > 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

function analyzeFile(filePath) {
  const buf = fs.readFileSync(filePath);
  // Ищем в JSON чанке (для простоты — во всём файле)
  const text = buf.toString('utf8');
  const hasDraco = text.includes('KHR_draco_mesh_compression');
  const hasMeshopt = text.includes('MESHOPT_compression');
  const hasKtx2 = text.includes('KHR_texture_basisu');
  return { hasDraco, hasMeshopt, hasKtx2, size: buf.length };
}

function pad(str, len) { return (str + ' '.repeat(len)).slice(0, len); }

function run() {
  if (!fs.existsSync(MODELS_DIR)) {
    console.error('❌ Папка public/models не найдена');
    process.exit(1);
  }
  const files = fs.readdirSync(MODELS_DIR).filter(f => f.toLowerCase().endsWith('.glb'));
  if (files.length === 0) {
    console.log('⚠️  Нет .glb файлов в public/models');
    return;
  }
  console.log('🔍 Анализ моделей:\n');
  const rows = [];
  let total = 0;
  for (const f of files) {
    const full = path.join(MODELS_DIR, f);
    const info = analyzeFile(full);
    total += info.size;
    rows.push({ name: f, ...info });
  }

  // Вывод
  console.log(pad('Файл', 22), pad('Размер', 10), pad('Draco', 7), pad('Meshopt', 9), pad('KTX2', 6));
  console.log('-'.repeat(60));
  for (const r of rows) {
    console.log(
      pad(r.name, 22),
      pad(formatSize(r.size), 10),
      pad(r.hasDraco ? 'yes' : 'no', 7),
      pad(r.hasMeshopt ? 'yes' : 'no', 9),
      pad(r.hasKtx2 ? 'yes' : 'no', 6),
    );
  }
  console.log('-'.repeat(60));
  console.log('Всего:', formatSize(total));

  const noDraco = rows.filter(r => !r.hasDraco).map(r => r.name);
  if (noDraco.length) {
    console.log('\n⚠️  Без Draco:', noDraco.join(', '));
    console.log('   → Можно перекодировать: npm run models:compress-draco');
  } else {
    console.log('\n✅ Все модели имеют Draco (или уже оптимизированы).');
  }
  const noMeshopt = rows.filter(r => !r.hasMeshopt).length;
  if (noMeshopt) {
    console.log('ℹ️  Meshopt не обнаружен. Дополнительно можно применить meshopt для ещё меньшего размера.');
  }
}

run();
