import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/category/uls-tur',
        '/category/niigem',
        '/category/ediin-zasag',
        '/category/niitlel',
        '/category/nevtruuleg'
      ]
    })
  ]
})