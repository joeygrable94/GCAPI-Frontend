import suid from '@suid/vite-plugin';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), suid(), solidPlugin()],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext'
  }
});
