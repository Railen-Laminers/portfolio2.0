import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces (LAN)
    port: 5173,       // Optional: you can change the port if needed
    // strictPort: true // Uncomment if you want Vite to exit if port is already in use
  }
})