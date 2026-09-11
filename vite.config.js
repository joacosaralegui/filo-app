import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: '/' porque el sitio se sirve en la raíz de pensadores.ar (dominio propio
// vía GitHub Pages) y también en el build empaquetado con Capacitor (origen propio).
export default defineConfig(() => ({
  base: '/',
  plugins: [tailwindcss(), svelte()],
}))
