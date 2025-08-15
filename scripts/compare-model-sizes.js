#!/usr/bin/env node
/**
 * Сравнение размеров: original vs draco (compressed/) vs meshopt (meshopt/)
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'public', 'models');
const DRACO = path.join(BASE, 'compressed');
const MESHOPT = path.join(BASE, 'meshopt');

function collect(dir){
  if (!fs.existsSync(dir)) return {};
  return Object.fromEntries(
    fs.readdirSync(dir)
      .filter(f=>f.endsWith('.glb'))
      .map(f=>[f, fs.statSync(path.join(dir,f)).size])
  );
}

function fmt(bytes){
  return (bytes/1024/1024).toFixed(2)+'MB';
}

function run(){
  const orig = collect(BASE);
  const draco = collect(DRACO);
  const mesh = collect(MESHOPT);
  const names = Array.from(new Set([...Object.keys(orig), ...Object.keys(draco), ...Object.keys(mesh)])).sort();
  console.log('Файл'.padEnd(20),'Оригинал'.padEnd(12),'Draco'.padEnd(12),'Meshopt'.padEnd(12),'Лучший');
  console.log('-'.repeat(70));
  names.forEach(n => {
    const o = orig[n];
    const d = draco[n];
    const m = mesh[n.replace(/\.glb$/,'.meshopt.glb')] || mesh[n];
    const best = [o,d,m].filter(Boolean).reduce((acc,v)=> Math.min(acc,v), Infinity);
    const bestLabel = best===m? 'meshopt' : best===d? 'draco' : 'orig';
    console.log(n.padEnd(20), (o?fmt(o):'-').padEnd(12), (d?fmt(d):'-').padEnd(12), (m?fmt(m):'-').padEnd(12), bestLabel);
  });
}
run();
