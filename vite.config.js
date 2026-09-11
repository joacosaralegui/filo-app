import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: '/' — la app ya no se sirve en la web (pensadores.ar es la landing
// estática de landing/); esto sólo alimenta el build empaquetado con Capacitor,
// que corre en su propio origen sin subpath.
export default defineConfig(() => ({
  base: '/',
  plugins: [tailwindcss(), svelte()],
}))
