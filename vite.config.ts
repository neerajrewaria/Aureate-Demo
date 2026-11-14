import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 Vite plugin handles everything — no tailwind.config needed
  ],
  resolve: {
    alias: {
      // Allows clean imports like: import Button from '@/components/common/Button'
      // Using import.meta.dirname (ES2025) instead of __dirname to avoid Vite deprecation warning
      '@': `${import.meta.dirname}/src`,
    },
  },
})
