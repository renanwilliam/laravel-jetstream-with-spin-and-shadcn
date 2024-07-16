import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';

const env = loadEnv('', process.cwd());

const host = env.VITE_HOST;

export default defineConfig({
  server: {
    host,
    hmr: {
      host,
      clientPort: 443
    },
  },
  plugins: [
    viteBasicSslPlugin(),
    laravel({
      input: 'resources/js/app.tsx',
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
  ssr: {
    noExternal: ['@inertiajs/server'],
  },
});
