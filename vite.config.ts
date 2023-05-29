import suid from '@suid/vite-plugin';
import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [tsconfigPaths(), suid(), solid({ ssr: false })],
  build: {
    target: 'esnext'
  }
});
