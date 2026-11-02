import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: './',
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        project1: resolve('project-1.html'),
        project2: resolve('project-2.html'),
        project3: resolve('project-3.html'),
      },
    },
  },
});
