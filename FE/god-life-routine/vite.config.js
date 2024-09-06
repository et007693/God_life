import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default ({mode}) => defineConfig({
  plugins: [
    react(),
    VitePWA({registerType:'autoUpdate',
      devOptions:{
        enabled: true,
      }
    }),
  ],
})
