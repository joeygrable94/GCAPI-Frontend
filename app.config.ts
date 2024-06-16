import { authVite } from '@solid-mediakit/auth-plugin';
import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  ssr: true,
  middleware: './src/middleware.ts',
  vite: {
    plugins: [
      authVite({
        log: true,
        authOpts: {
          name: 'authOptions',
          dir: '~/providers/auth'
        },
        redirectTo: '/login'
      })
    ]
  }
});
