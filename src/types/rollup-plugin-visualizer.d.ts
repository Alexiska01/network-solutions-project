declare module 'rollup-plugin-visualizer' {
  import type { Plugin } from 'vite';
  export interface VisualizerOptions {
    filename?: string;
    template?: 'sunburst' | 'treemap' | 'network';
    gzipSize?: boolean;
    brotliSize?: boolean;
    sourcemap?: boolean;
    emitFile?: boolean;
    projectRoot?: string;
  }
  export function visualizer(options?: VisualizerOptions): Plugin;
}
