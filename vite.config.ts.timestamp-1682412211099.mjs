// vite.config.ts
import { defineConfig } from "file:///C:/Users/Admin/Documents/GitHub/balance/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Admin/Documents/GitHub/balance/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///C:/Users/Admin/Documents/GitHub/balance/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///C:/Users/Admin/Documents/GitHub/balance/node_modules/vite-plugin-svgr/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      exportAsDefault: false,
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        // ...
      },
      // esbuild options, to transform jsx to js
      esbuildOptions: {
        // ...
      },
      //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
      include: "**/*.svg",
      //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
      exclude: ""
    })
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
    outDir: "./build"
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: "" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGJhbGFuY2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcYmFsYW5jZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vRG9jdW1lbnRzL0dpdEh1Yi9iYWxhbmNlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcclxuLy8gaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgdHNjb25maWdQYXRocygpLFxyXG4gICAgc3Zncih7IGV4cG9ydEFzRGVmYXVsdDogZmFsc2UsXHJcblxyXG4gICAgLy8gc3ZnciBvcHRpb25zOiBodHRwczovL3JlYWN0LXN2Z3IuY29tL2RvY3Mvb3B0aW9ucy9cclxuICAgIHN2Z3JPcHRpb25zOiB7XHJcbiAgICAgIC8vIC4uLlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBlc2J1aWxkIG9wdGlvbnMsIHRvIHRyYW5zZm9ybSBqc3ggdG8ganNcclxuICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgIC8vIC4uLlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyAgQSBtaW5pbWF0Y2ggcGF0dGVybiwgb3IgYXJyYXkgb2YgcGF0dGVybnMsIHdoaWNoIHNwZWNpZmllcyB0aGUgZmlsZXMgaW4gdGhlIGJ1aWxkIHRoZSBwbHVnaW4gc2hvdWxkIGluY2x1ZGUuIEJ5IGRlZmF1bHQgYWxsIHN2ZyBmaWxlcyB3aWxsIGJlIGluY2x1ZGVkLlxyXG4gICAgaW5jbHVkZTogJyoqLyouc3ZnJyxcclxuXHJcbiAgICAvLyAgQSBtaW5pbWF0Y2ggcGF0dGVybiwgb3IgYXJyYXkgb2YgcGF0dGVybnMsIHdoaWNoIHNwZWNpZmllcyB0aGUgZmlsZXMgaW4gdGhlIGJ1aWxkIHRoZSBwbHVnaW4gc2hvdWxkIGlnbm9yZS4gQnkgZGVmYXVsdCBubyBmaWxlcyBhcmUgaWdub3JlZC5cclxuICAgIGV4Y2x1ZGU6ICcnLH0pLFxyXG4gIC8vICAgVml0ZVBXQSh7XHJcbiAgLy8gICBkZXZPcHRpb25zOiB7XHJcbiAgLy8gICAgIGVuYWJsZWQ6IHRydWVcclxuICAvLyAgIH0sXHJcbiAgLy8gICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAvLyAgIHdvcmtib3g6IHtcclxuICAvLyAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxyXG4gIC8vICAgICBza2lwV2FpdGluZzogdHJ1ZVxyXG4gIC8vICAgfSxcclxuICAvLyAgIG1hbmlmZXN0OiB7XHJcbiAgLy8gICAgIFwic2hvcnRfbmFtZVwiOiBcIlJlYWN0IEFwcFwiLFxyXG4gIC8vICAgICBcIm5hbWVcIjogXCJDcmVhdGUgUmVhY3QgQXBwIFNhbXBsZVwiLFxyXG4gIC8vICAgICBcImRlc2NyaXB0aW9uXCI6ICdNeSBBd2Vzb21lIEFwcCBkZXNjcmlwdGlvbicsXHJcbiAgLy8gICAgIFwiaWNvbnNcIjogW1xyXG4gIC8vICAgICAgIHtcclxuICAvLyAgICAgICAgIFwic3JjXCI6IFwibG9nbzE5Mi5wbmdcIixcclxuICAvLyAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gIC8vICAgICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIlxyXG4gIC8vICAgICAgIH0sXHJcbiAgLy8gICAgICAge1xyXG4gIC8vICAgICAgICAgXCJzcmNcIjogXCJsb2dvNTEyLnBuZ1wiLFxyXG4gIC8vICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgLy8gICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiXHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICBdLFxyXG4gIC8vICAgICBcInN0YXJ0X3VybFwiOiBcIi8/dXRtX3NvdXJjZT1ob21lc2NyZWVuXCIsXHJcbiAgLy8gICAgIFwiZGlzcGxheVwiOiBcInN0YW5kYWxvbmVcIixcclxuICAvLyAgICAgXCJ0aGVtZV9jb2xvclwiOiBcIiMwMDAwMDBcIixcclxuICAvLyAgICAgXCJiYWNrZ3JvdW5kX2NvbG9yXCI6IFwiI2ZmZmZmZlwiLFxyXG4gIC8vICAgICBcIm9yaWVudGF0aW9uXCI6IFwicG9ydHJhaXRcIlxyXG4gIC8vICAgfVxyXG4gIC8vIH0pXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnLi9idWlsZCcsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7IGZpbmQ6IC9efi8sIHJlcGxhY2VtZW50OiAnJyB9XHJcbiAgICBdLFxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLG9CQUFvQjtBQUNoVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBR2pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLE1BQU07QUFBQSxJQUFHLGNBQWM7QUFBQSxJQUMvQixLQUFLO0FBQUEsTUFBRSxpQkFBaUI7QUFBQTtBQUFBLE1BR3hCLGFBQWE7QUFBQTtBQUFBLE1BRWI7QUFBQTtBQUFBLE1BR0EsZ0JBQWdCO0FBQUE7QUFBQSxNQUVoQjtBQUFBO0FBQUEsTUFHQSxTQUFTO0FBQUE7QUFBQSxNQUdULFNBQVM7QUFBQSxJQUFHLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFpQ2Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sTUFBTSxhQUFhLEdBQUc7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
