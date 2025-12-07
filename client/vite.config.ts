import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared')
    }
  },
  css: {
    postcss: path.resolve(__dirname, '../postcss.config.cjs'), // ✅ fix to absolute path
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ fix port to match Express backend
        changeOrigin: true,
        secure: false,
      },
    }
  },
  build: {
    outDir: '../dist/client',
    emptyOutDir: true
  }
});

