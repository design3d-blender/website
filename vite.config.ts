import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/website/',
  build: {
    outDir: 'dist',
  },
  test: {
    environment: 'jsdom',
  },
});
