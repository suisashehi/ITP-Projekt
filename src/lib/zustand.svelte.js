// Gemeinsamer Zustand für die 3D-Szene und das Bedienfeld (Svelte 5 Runes).
import { STANDARD } from './data.js'

// Die aktuelle Konfiguration. Der Deckel startet geschlossen und öffnet sich nach dem Laden.
export const config = $state({ ...STANDARD, deckel: 0 })

// Alles, was nur die Oberfläche betrifft
export const ui = $state({
  geladen: false, //    ist das 3D-Modell fertig geladen?
  ansicht: 'gesamt', // aktive Kamera-Ansicht
  ansichtZaehler: 0, // erhöht sich bei jedem Klick, damit dieselbe Ansicht erneut angefahren wird
  klangBereit: false,
  spielt: false, //     läuft gerade "Für Elise"?
  note: '', //          zuletzt gespielte Note
  hinweis: '' //        kurze Meldung unten am Bildschirmrand
})

export function zuruecksetzen() {
  Object.assign(config, STANDARD)
}

export function zeigeHinweis(text) {
  ui.hinweis = text
  setTimeout(() => {
    if (ui.hinweis === text) ui.hinweis = ''
  }, 2600)
}
