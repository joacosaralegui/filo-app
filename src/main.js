import { mount } from 'svelte'
import { Capacitor } from '@capacitor/core'
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

// Android: sin este listener, Capacitor no mueve el WebView hacia atrás y el
// botón físico/gesto de "atrás" cierra la app directo. `history.back()` sigue
// el mismo router por hash que usa la app, así que navega igual que "Volver".
if (Capacitor.isNativePlatform()) {
  import('@capacitor/app').then(({ App: CapacitorApp }) => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) history.back()
      else CapacitorApp.exitApp()
    })
  })
}

export default app
