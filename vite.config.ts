import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import pckg from './package.json' assert { type: 'json' };

export default defineConfig(() => {
  return {
    define: {
      APP_VERSION: JSON.stringify(pckg.dependencies['solid-js'])
    },
    plugins: [tsconfigPaths(), solid()],
    server: {
      port: 3000
    },
    build: {
      target: 'esnext'
    }
  };
});
