import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router-dom/')
          ) {
            return 'react-vendor';
          }

          if (
            id.includes('/@react-three/fiber/')
          ) {
            return 'r3f-vendor';
          }

          if (id.includes('/three/')) {
            return 'three-vendor';
          }

          if (
            id.includes('/gsap/') ||
            id.includes('/framer-motion/') ||
            id.includes('/@studio-freight/lenis/')
          ) {
            return 'motion-vendor';
          }
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
