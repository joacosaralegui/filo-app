import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
// base: subpath del proyecto en GitHub Pages (https://joacosaralegui.github.io/filo-app/)
export default defineConfig({
  base: '/filo-app/',
  plugins: [svelte()],
})
