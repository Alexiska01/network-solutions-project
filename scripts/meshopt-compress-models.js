#!/usr/bin/env node
/**
 * Meshopt (gltfpack) упаковка моделей
 * Требует установленного gltfpack (npx gltfpack ...)
 * Производит .meshopt.glb версии и складывает в models/meshopt/
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const SRC_DIR = path.join(__dirname, '..', 'public', 'models');
const OUT_DIR = path.join(SRC_DIR, 'meshopt');

async function ensureDir(dir){ if (!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true}); }

async function listGlb(dir){
  return fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.glb'));
}

async function compressOne(file){
  const src = path.join(SRC_DIR, file);
  const base = file.replace(/\.glb$/i,'');
  const out = path.join(OUT_DIR, base + '.meshopt.glb');
  if (fs.existsSync(out)) {
    console.log('↪️  Уже есть', path.basename(out));
    return {file, skipped:true};
  }
  const cmd = `npx gltfpack -i "${src}" -o "${out}" -cc -tc -si -noq -kn`; // -cc compress color, -tc compress textures, -si simplify if possible, -noq keep quantization defaults, -kn keep nodes
  console.log('🗜️  Meshopt:', file);
  try {
    await execAsync(cmd, {stdio:'inherit'});
    const origSize = fs.statSync(src).size;
    const newSize = fs.statSync(out).size;
    return {file, origSize, newSize, ratio: (1 - newSize/origSize)*100};
  } catch(e){
    console.warn('❌ Ошибка meshopt', file, e.message);
    return {file, error:true};
  }
}

async function run(){
  await ensureDir(OUT_DIR);
  const files = await listGlb(SRC_DIR);
  console.log('🚀 Meshopt сжатие файлов:', files.join(', '));
  const results = [];
  for (const f of files){
    results.push(await compressOne(f));
  }
  console.log('\n📊 Итоги:');
  results.forEach(r => {
    if (r.skipped) console.log(`  = ${r.file} (skipped)`);
    else if (r.error) console.log(`  ! ${r.file} ERROR`);
    else console.log(`  ✓ ${r.file}: ${(r.origSize/1024/1024).toFixed(2)}MB -> ${(r.newSize/1024/1024).toFixed(2)}MB (-${r.ratio.toFixed(1)}%)`);
  });
}

run().catch(e => { console.error(e); process.exit(1); });
