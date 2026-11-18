import { mount } from 'svelte'
// Schriften lokal (kein Google-Server nötig, DSGVO-freundlich)
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
import '@fontsource-variable/eb-garamond/wght.css'
import '@fontsource-variable/eb-garamond/wght-italic.css'
import '@fontsource/pinyon-script/400.css'
import './app.css'
import App from './App.svelte'

mount(App, { target: document.getElementById('app') })
