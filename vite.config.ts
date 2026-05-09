import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        try { copyFileSync('.nojekyll', 'dist/.nojekyll') } catch {}
        try { copyFileSync('dist/index.html', 'dist/404.html') } catch {}
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
