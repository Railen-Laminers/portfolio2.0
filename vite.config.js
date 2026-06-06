import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio2.0/', // IMPORTANT for GitHub Pages
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})