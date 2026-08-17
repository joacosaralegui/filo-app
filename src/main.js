import { mount } from 'svelte'
import './global.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

// PWA: registrar el service worker (respeta el base de Vite)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => {})
  })
}

export default app
