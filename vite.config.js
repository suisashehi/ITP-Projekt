import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// base './' -> die Seite funktioniert auch in einem Unterordner (z. B. GitHub Pages)
export default defineConfig({
  base: './',
  plugins: [svelte(), tailwindcss()],
  build: { chunkSizeWarningLimit: 1600 }
})
