import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'pp-tagger';
import { createRequire } from 'module';

function loadVisualizerSafely(): Plugin | undefined {
  if (process.env.ANALYZE !== '1') return undefined; // активировать: ANALYZE=1 npm run build
  try {
    const require = createRequire(import.meta.url);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { visualizer } = require('rollup-plugin-visualizer');
    return visualizer({
      filename: 'dist/bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[analyze] rollup-plugin-visualizer not installed; skip.');
    return undefined;
  }
}

export default defineConfig(({ mode }) => {
  const plugins: import('vite').PluginOption[] = [react()];
  if (mode === 'development') plugins.push(componentTagger() as any);
  if (mode === 'production') {
    const viz = loadVisualizerSafely();
    if (viz) plugins.push(viz as any);
  }
  return {
    plugins,
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: true,
      hmr: { overlay: false },
      proxy: {
        '/api': {
          target: 'http://localhost:' + (process.env.API_PORT || '3001'),
          changeOrigin: true,
          timeout: 10000
        }
      }
    }
  };
});
