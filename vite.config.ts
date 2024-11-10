import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'karakara',
        short_name: 'karakara',
        description: 'My awesome Vite app',
        theme_color: '#7F50FF',
        icons: [
          {
            src: '/icons/karakaraLogo.png',
            sizes: '379x379',
            type: 'image/png'
          }
        ],
        start_url: '/',
        display: 'fullscreen',
        background_color: '#ffffff'
      }
    })
  ],
})
