import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Update to match your hosting setup
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
