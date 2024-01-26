import { defineConfig } from '@solidjs/start/config';
import devtools from 'solid-devtools/vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import pckg from './package.json' assert { type: 'json' };

export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(pckg.dependencies['solid-js']),
    'process.env': import.meta.env
  },
  plugins: [
    tsconfigPaths(),
    devtools({
      autoname: true
    }),
    solidPlugin({ ssr: true })
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext'
  },
  start: {
    ssr: true,
    islands: false
  }
});
