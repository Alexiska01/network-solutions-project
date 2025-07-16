#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Список всех 3D моделей из проекта
const modelUrls = [
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-all.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-all.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/IDS6010-all.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/3730all.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24S.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-48T.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-48P.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24T.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3530-24P.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-48T.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-24S.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-48P.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-24T.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-24P.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S4530-48S.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3730-24T.glb',
  'https://s3.twcstorage.ru/c80bd43d-3dmodels/S3730-24P.glb'
];

// Создаем папки для моделей
const modelsDir = path.join(__dirname, '..', 'models');
const originalDir = path.join(modelsDir, 'original');
const compressedDir = path.join(modelsDir, 'compressed');

async function createDirectories() {
  if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir);
  if (!fs.existsSync(originalDir)) fs.mkdirSync(originalDir);
  if (!fs.existsSync(compressedDir)) fs.mkdirSync(compressedDir);
}

async function downloadModel(url, filename) {
  const filePath = path.join(originalDir, filename);
  
  if (fs.existsSync(filePath)) {
    console.log(`✅ Модель ${filename} уже скачана`);
    return filePath;
  }
  
  console.log(`📥 Скачиваю модель ${filename}...`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Модель ${filename} скачана (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
    
    return filePath;
  } catch (error) {
    console.error(`❌ Ошибка при скачивании ${filename}:`, error.message);
    return null;
  }
}

async function compressModel(inputPath, outputPath) {
  console.log(`🗜️  Сжимаю модель ${path.basename(inputPath)}...`);
  
  try {
    // Агрессивные настройки сжатия для максимальной оптимизации
    const command = `npx gltf-pipeline -i "${inputPath}" -o "${outputPath}" --draco.compressionLevel=10 --draco.quantizePositionBits=11 --draco.quantizeNormalBits=8 --draco.quantizeTexcoordBits=10 --draco.quantizeColorBits=8 --draco.quantizeGenericBits=8 --draco.unifiedQuantization=true --textureCompressionOptions.format=webp --textureCompressionOptions.quality=85 --removeUnusedMaterials --removeUnusedTextures --removeUnusedVertexColors --mergeDuplicateVertices --optimizeDrawCalls`;
    
    const result = await execAsync(command);
    
    // Получаем размеры файлов
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ Модель ${path.basename(inputPath)} сжата:`);
    console.log(`   📊 Было: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📊 Стало: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📊 Сжатие: ${compressionRatio}%`);
    
    return { originalSize, compressedSize, compressionRatio };
  } catch (error) {
    console.error(`❌ Ошибка при сжатии ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

async function processAllModels() {
  console.log('🚀 Начинаю сжатие 3D моделей...\n');
  
  await createDirectories();
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedCount = 0;
  
  for (const url of modelUrls) {
    const filename = path.basename(url);
    const inputPath = await downloadModel(url, filename);
    
    if (!inputPath) continue;
    
    const outputPath = path.join(compressedDir, filename);
    const result = await compressModel(inputPath, outputPath);
    
    if (result) {
      totalOriginalSize += result.originalSize;
      totalCompressedSize += result.compressedSize;
      processedCount++;
    }
    
    console.log(''); // Пустая строка для разделения
  }
  
  // Итоговая статистика
  console.log('📊 ИТОГОВАЯ СТАТИСТИКА:');
  console.log(`   Обработано моделей: ${processedCount}`);
  console.log(`   Исходный размер: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Сжатый размер: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Общее сжатие: ${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`   Экономия: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB`);
  
  console.log('\n🎯 Сжатые модели готовы в папке models/compressed/');
  console.log('💡 Теперь нужно заменить URL моделей в коде на локальные файлы');
}

// Запуск обработки
processAllModels().catch(console.error);