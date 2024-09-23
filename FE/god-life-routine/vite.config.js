import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default ({mode}) => defineConfig({
  plugins: [
    react(),
    // VitePWA({registerType:'autoUpdate',
    //   devOptions:{
    //     enabled: false,
    //   },
    //   manifest: {
    //     "icons": [
    //       {
    //           "src": "/src/icons/maskable_icon_x48.png",
    //           "sizes": "48x48",
    //           "type": "image/png"
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x72.png",
    //           "sizes": "72x72",
    //           "type": "image/png"
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x96.png",
    //           "sizes": "96x96",
    //           "type": "image/png"
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x128.png",
    //           "sizes": "128x128",
    //           "type": "image/png"
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x192.png",
    //           "sizes": "192x192",
    //           "type": "image/png"
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x192.png",
    //           "sizes": "192x192",
    //           "type": "image/png",
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x384.png",
    //           "sizes": "384x384",
    //           "type": "image/png"
    //       },
    //       {
    //           "src": "/src/icons/maskable_icon_x512.png",
    //           "sizes": "512x512",
    //           "type": "image/png"
    //       }
    //   ],}
    // }),
  ],
})
