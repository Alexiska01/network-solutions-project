#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');


async function updateFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Заменяем URL на локальные пути
    for (const [oldUrl, newPath] of Object.entries(modelMapping)) {
      if (content.includes(oldUrl)) {
        content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Обновлен файл: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Ошибка при обновлении ${filePath}:`, error.message);
    return false;
  }
}

async function updateAllFiles() {
  console.log('🔄 Обновляю URL моделей в файлах проекта...\n');
  
  // Файлы для обновления
  const patterns = [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.js',
    'src/**/*.jsx',
    'index.html'
  ];
  
  let totalUpdated = 0;
  
  for (const pattern of patterns) {
    const files = await glob(pattern);
    
    for (const file of files) {
      const updated = await updateFileContent(file);
      if (updated) totalUpdated++;
    }
  }
  
  console.log(`\n📊 Обновлено файлов: ${totalUpdated}`);
  console.log('🎯 Все URL моделей заменены на локальные пути');
  console.log('💡 Теперь нужно скопировать сжатые модели в public/models/compressed/');
}

// Запуск обновления
updateAllFiles().catch(console.error);