// Konfiguration als Link teilen: alle Werte stehen in der Adresse,
// z. B. ...vercel.app/?lack=bordeaux&metall=gold&kandelaber=ja
import { config } from './zustand.svelte.js'

const NAMEN = ['lack', 'oberflaeche', 'metall', 'innenraum', 'polster', 'klaviatur', 'licht']

// beim Start: Werte aus der Adresse übernehmen
export function ladeAusLink() {
  const werte = new URLSearchParams(location.search)
  for (const name of NAMEN) {
    if (werte.has(name)) config[name] = werte.get(name)
  }
  if (werte.has('kandelaber')) config.kandelaber = werte.get('kandelaber') === 'ja'
  if (werte.has('bank')) config.bank = Math.min(1, Math.max(0, Number(werte.get('bank')) || 0))
}

// Link mit der aktuellen Auswahl bauen
export function linkErstellen() {
  const werte = new URLSearchParams()
  for (const name of NAMEN) werte.set(name, config[name])
  werte.set('kandelaber', config.kandelaber ? 'ja' : 'nein')
  werte.set('bank', config.bank.toFixed(2))
  return location.origin + location.pathname + '?' + werte
}