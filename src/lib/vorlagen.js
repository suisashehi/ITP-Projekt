// Fertige Stile: ein Klick setzt mehrere Optionen auf einmal
import { config } from './zustand.svelte.js'
import { LACK, OBERFLAECHE, METALL, INNENRAUM, POLSTER, KLAVIATUR } from './data.js'

export const VORLAGEN = [
  {
    name: 'Versailles',
    text: 'Weiß, Blattgold und roter Samt',
    farben: ['#F2EFEA', '#E8C46E', '#6A1424'],
    akkord: ['C4', 'E4', 'G4', 'C5'],
    werte: { lack: 'weiss', oberflaeche: 'hochglanz', metall: 'gold', innenraum: 'samtrot', polster: 'samtrot', klaviatur: 'klassisch', kandelaber: true, licht: 'tag' }
  },
  {
    name: 'Mozart 1790',
    text: 'Wiener Klaviatur und Bordeaux',
    farben: ['#5B1422', '#1C1714', '#E8C46E'],
    akkord: ['D4', 'F#4', 'A4', 'D5'],
    werte: { lack: 'bordeaux', oberflaeche: 'hochglanz', metall: 'gold', innenraum: 'honig', polster: 'leder', klaviatur: 'wien', kandelaber: true, licht: 'tag' }
  },
  {
    name: 'Trianon',
    text: 'Rosé, Roségold und Perlmutt',
    farben: ['#E3BDBE', '#E6A98C', '#E8DCC2'],
    akkord: ['F4', 'A4', 'C5', 'F5'],
    werte: { lack: 'trianon', oberflaeche: 'perlmutt', metall: 'rosegold', innenraum: 'elfenbein', polster: 'creme', klaviatur: 'klassisch', kandelaber: false, licht: 'tag' }
  },
  {
    name: 'Nachtkonzert',
    text: 'Ebenholz im Kerzenschein',
    farben: ['#0F0E10', '#3A3B40', '#FFB45E'],
    akkord: ['A3', 'C4', 'E4', 'A4'],
    werte: { lack: 'ebenholz', oberflaeche: 'hochglanz', metall: 'schwarzchrom', innenraum: 'samtblau', polster: 'samtblau', klaviatur: 'klassisch', kandelaber: true, licht: 'kerze' }
  }
]

// "Überrasch mich": aus jeder Liste eine zufällige Option
function zufall(liste) {
  return liste[Math.floor(Math.random() * liste.length)].id
}

export function zufaelligeAuswahl() {
  config.lack = zufall(LACK)
  config.oberflaeche = zufall(OBERFLAECHE)
  config.metall = zufall(METALL)
  config.innenraum = zufall(INNENRAUM)
  config.polster = zufall(POLSTER)
  config.klaviatur = zufall(KLAVIATUR)
}