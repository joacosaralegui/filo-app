import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: '/filo-app/' para GitHub Pages (https://joacosaralegui.github.io/filo-app/),
// '/' para el build empaquetado con Capacitor (corre en un origen propio, sin subpath).
export default defineConfig(({ mode }) => ({
  base: mode === 'capacitor' ? '/' : '/filo-app/',
  plugins: [tailwindcss(), svelte()],
}))
