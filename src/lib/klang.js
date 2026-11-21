// Klavierklang mit Tone.js: echte Flügel-Aufnahmen (Salamander Grand Piano, CC BY 3.0).
// Es gibt eine Aufnahme pro kleiner Terz, Tone.js berechnet die Töne dazwischen.
import * as Tone from 'tone'
import { MELODIEN } from './melodien.js'
import { ui, config } from './zustand.svelte.js'

let sampler = null
let timer = []
const zuhoerer = new Set()

// Wer wissen will, welche Note gerade spielt, meldet sich hier an
// (3D-Tasten, kleines Klavier, Effekte)
export function beiTaste(funktion) {
  zuhoerer.add(funktion)
  return () => zuhoerer.delete(funktion)
}

function dateien() {
  // A0, C1, D#1, F#1, A1, ... C8  ->  Dateinamen wie "Ds1.mp3"
  const urls = { A0: 'A0.mp3', C8: 'C8.mp3' }
  for (let oktave = 1; oktave <= 7; oktave++) {
    for (const ton of ['C', 'D#', 'F#', 'A']) {
      urls[ton + oktave] = ton.replace('#', 's') + oktave + '.mp3'
    }
  }
  return urls
}

export function ladeKlang() {
  if (sampler) return
  const hall = new Tone.Reverb({ decay: 3.6, wet: 0.3 }).toDestination() // Akustik eines Festsaals
  sampler = new Tone.Sampler({
    urls: dateien(),
    baseUrl: './samples/',
    release: 1.2,
    onload: () => (ui.klangBereit = true)
  }).connect(hall)
  sampler.volume.value = -5
}

// Einen Ton spielen und allen Zuhörern Bescheid geben
function spiele(note, staerke, dauer) {
  sampler.triggerAttackRelease(note, dauer, Tone.now(), staerke)
  zuhoerer.forEach((funktion) => funktion(note))
  ui.note = note
}

export async function spieleNote(note, staerke = 0.8, dauer = 1.4) {
  await Tone.start() // Browser erlauben Ton erst nach einem Klick
  if (ui.klangBereit) spiele(note, staerke, dauer)
}

export async function spieleMelodie(melodie = MELODIEN[0]) {
  await Tone.start()
  if (!ui.klangBereit) return
  stoppeMelodie()
  ui.spielt = true
  let ende = 0
  for (const [zeit, note, laenge] of melodie.noten) {
    const start = zeit * melodie.takt * 1000 // takt = Sekunden pro Zeiteinheit
    const dauer = laenge * melodie.takt * 1000
    const tief = note.endsWith('2') || note.endsWith('3')
    timer.push(setTimeout(() => spiele(note, tief ? 0.5 : 0.72, (dauer / 1000) * 1.6), start))
    ende = Math.max(ende, start + dauer)
  }
  timer.push(setTimeout(() => {
    ui.spielt = false
    ui.bravo++ // Ende erreicht: Applaus!
  }, ende + 600))
}

// Konzert: Kerzenlicht an, Deckel auf, Kamera zur Gesamtansicht, Musik ab
export function starteKonzert(melodie = MELODIEN[0]) {
  config.licht = 'kerze'
  config.kandelaber = true
  config.deckel = 1
  ui.ansicht = 'gesamt'
  ui.ansichtZaehler++
  spieleMelodie(melodie)
}

export function stoppeMelodie() {
  timer.forEach(clearTimeout)
  timer = []
  sampler?.releaseAll()
  ui.spielt = false
}