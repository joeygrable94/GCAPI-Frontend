import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import suidPlugin from "@suid/vite-plugin";
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [tsconfigPaths(), suidPlugin(), solid()],
  build: {
    target: "esnext",
  },
});
