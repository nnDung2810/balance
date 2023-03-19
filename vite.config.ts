import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
// import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),
  //   VitePWA({
  //   devOptions: {
  //     enabled: true
  //   },
  //   registerType: 'autoUpdate',
  //   workbox: {
  //     clientsClaim: true,
  //     skipWaiting: true
  //   },
  //   manifest: {
  //     "short_name": "React App",
  //     "name": "Create React App Sample",
  //     "description": 'My Awesome App description',
  //     "icons": [
  //       {
  //         "src": "logo192.png",
  //         "type": "image/png",
  //         "sizes": "192x192"
  //       },
  //       {
  //         "src": "logo512.png",
  //         "type": "image/png",
  //         "sizes": "512x512"
  //       }
  //     ],
  //     "start_url": "/?utm_source=homescreen",
  //     "display": "standalone",
  //     "theme_color": "#000000",
  //     "background_color": "#ffffff",
  //     "orientation": "portrait"
  //   }
  // })
  ],
  build: {
    outDir: './build',
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ],
  }
})
