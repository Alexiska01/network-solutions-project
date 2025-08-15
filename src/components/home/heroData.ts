export interface HeroItem {
  id: string;
  series: string;
  title: string;
  description: string;
  modelUrl: string;
  previewModelUrl?: string; // облегчённая версия (LOD0)
  features: string[];
  gradient: string; // tailwind gradient utility string
  glowColor: string; // like '[#005baa]'
  accentColor: string;
}

export const heroData: readonly HeroItem[] = [
  { id: 'IDS3530', series: '3530', title: 'Коммутаторы IDS3530', description: '', modelUrl: '/models/3530all.glb', previewModelUrl: '/models/3530all.glb', features: [ 'Встроенные блоки питания','Поддержка РоЕ/РоЕ+','Статическая и динамическая маршрутизация'], gradient: 'from-[#32398e] via-[#005baa] to-[#0079b6]', glowColor: '[#005baa]', accentColor: '#0079b6' },
  { id: 'IDS3730', series: '3730', title: 'Коммутаторы IDS3730', description: '', modelUrl: '/models/3730all.glb', previewModelUrl: '/models/3730all.glb', features: [ 'Два модульных блока питания','Поддержка РоЕ/РоЕ+','Статическая и динамическая маршрутизация'], gradient: 'from-[#005baa] via-[#0079b6] to-[#0093b6]', glowColor: '[#0079b6]', accentColor: '#0093b6' },
  { id: 'IDS4530', series: '4530', title: 'Коммутаторы IDS4530', description: '', modelUrl: '/models/4530all.glb', previewModelUrl: '/models/4530all.glb', features: [ 'Два модульных блока питания','Поддержка РоЕ/РоЕ+','Поддержка технологии VxLAN'], gradient: 'from-[#0079b6] via-[#0093b6] to-[#00acad]', glowColor: '[#0093b6]', accentColor: '#00acad' },
  { id: 'IDS6010', series: '6010', title: 'Коммутаторы IDS6010', description: '', modelUrl: '/models/6010all.glb', previewModelUrl: '/models/6010all.glb', features: [ 'Два модульных блока питания','Поддержка РоЕ/РоЕ+','Поддержка технологии VxLAN'], gradient: 'from-[#0093b6] via-[#00acad] to-[#53c2a4]', glowColor: '[#00acad]', accentColor: '#53c2a4' }
] as const;
