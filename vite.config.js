import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// La raíz de pensadores.ar la ocupa la landing estática de landing/, así que la
// app Svelte se sirve en /app/. base: '/' sólo para el build empaquetado con
// Capacitor, que corre en su propio origen sin subpath.
export default defineConfig(({ mode }) => ({
  base: mode === 'capacitor' ? '/' : '/app/',
  plugins: [tailwindcss(), svelte()],
}))
