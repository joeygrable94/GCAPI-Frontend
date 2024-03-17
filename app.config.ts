import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  ssr: true,
  middleware: './src/middleware.ts',
  server: {},
  vite(options) {
    return {
      plugins: []
    };
  }
});
