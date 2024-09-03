import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
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
    createHtmlPlugin({
      minify: true,
      inject:{
        data:{
          kakaoJavascriptKey:loadEnv(mode,process.cwd()).VITE_KAKAO_MAP_API_KEY,
        }
      }
    })
  ],
})
