// Alle Optionen des Konfigurators an einem Ort.
// Farben sind Hex-Werte, Preise in Euro (fiktiv, nur für das Schulprojekt).

export const GRUNDPREIS = 89000

export const LACK = [
  { id: 'weiss', name: 'Schneeweiß', farbe: '#F2EFEA', preis: 0 },
  { id: 'ebenholz', name: 'Ebenholz', farbe: '#0F0E10', preis: 0 },
  { id: 'bordeaux', name: 'Bordeaux', farbe: '#5B1422', preis: 2400 },
  { id: 'sevres', name: 'Bleu de Sèvres', farbe: '#1B2F6B', preis: 2400 },
  { id: 'smaragd', name: 'Smaragd', farbe: '#123D30', preis: 2400 },
  { id: 'trianon', name: 'Rosé Trianon', farbe: '#E3BDBE', preis: 2400 },
  { id: 'seladon', name: 'Seladon', farbe: '#B7CCBD', preis: 2400 }
]

// Oberfläche: verändert Glanz (Rauheit), Klarlack und Perlmutt-Effekt
export const OBERFLAECHE = [
  {
    id: 'hochglanz', name: 'Hochglanz', preis: 0,
    werte: { roughness: 0.22, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, iridescence: 0 }
  },
  {
    id: 'seidenmatt', name: 'Seidenmatt', preis: 0,
    werte: { roughness: 0.55, metalness: 0, clearcoat: 0.15, clearcoatRoughness: 0.4, iridescence: 0 }
  },
  {
    id: 'perlmutt', name: 'Perlmutt', preis: 6500,
    werte: {
      roughness: 0.25, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05,
      iridescence: 0.85, iridescenceIOR: 1.6, iridescenceThicknessMinimum: 180, iridescenceThicknessMaximum: 620
    }
  }
]

// Beschläge: Füße, Pedale, Pedalstangen, Kandelaber
export const METALL = [
  { id: 'gold', name: 'Blattgold', farbe: '#E8C46E', rauheit: 0.18, preis: 0 },
  { id: 'silber', name: 'Silber', farbe: '#E3E5EA', rauheit: 0.1, preis: 0 },
  { id: 'rosegold', name: 'Roségold', farbe: '#E6A98C', rauheit: 0.2, preis: 1200 },
  { id: 'schwarzchrom', name: 'Schwarzchrom', farbe: '#3A3B40', rauheit: 0.14, preis: 900 }
]

export const INNENRAUM = [
  { id: 'honig', name: 'Honig', farbe: '#CBA165', preis: 0 },
  { id: 'elfenbein', name: 'Elfenbein', farbe: '#E8DCC2', preis: 0 },
  { id: 'samtrot', name: 'Samt Bordeaux', farbe: '#6B1A26', preis: 1800 },
  { id: 'samtblau', name: 'Samt Königsblau', farbe: '#22346E', preis: 1800 }
]

// Polster der Bank: Leder (glatt) oder Samt (mit Sheen-Effekt)
export const POLSTER = [
  { id: 'leder', name: 'Leder Schwarz', farbe: '#171413', rauheit: 0.45, samt: false, preis: 0 },
  { id: 'creme', name: 'Leder Creme', farbe: '#E6D9C1', rauheit: 0.5, samt: false, preis: 0 },
  { id: 'samtrot', name: 'Samt Bordeaux', farbe: '#6A1424', rauheit: 0.9, samt: true, preis: 450 },
  { id: 'samtgruen', name: 'Samt Smaragd', farbe: '#134634', rauheit: 0.9, samt: true, preis: 450 },
  { id: 'samtblau', name: 'Samt Royal', farbe: '#1F2C66', rauheit: 0.9, samt: true, preis: 450 }
]

// Klaviatur: Mozarts Hammerflügel hatten schwarze Untertasten und weiße Obertasten
export const KLAVIATUR = [
  { id: 'klassisch', name: 'Klassisch', weiss: '#F1EBDD', schwarz: '#141213', preis: 0 },
  { id: 'wien', name: 'Wiener Art, um 1790', weiss: '#1C1714', schwarz: '#EFE6D2', preis: 3200 }
]

export const KANDELABER_PREIS = 4800

// Kamera-Ansichten (Position und Blickpunkt, Y zeigt nach oben)
export const ANSICHTEN = {
  gesamt: { name: 'Gesamt', pos: [2.8, 1.6, 3.55], blick: [0, 0.6, 0.15] },
  tastatur: { name: 'Tastatur', pos: [0.62, 1.08, 1.5], blick: [0.05, 0.72, 0.8] },
  innen: { name: 'Innenraum', pos: [1.5, 2.45, 0.55], blick: [0.1, 0.8, -0.15] },
  seite: { name: 'Seite', pos: [5.3, 1.15, -0.25], blick: [0, 0.72, -0.1] }
}

// Position der Kerzenflammen (über den beiden Kandelabern)
export const KERZEN = [
  [-1.18, 1.56, 0.95],
  [1.18, 1.56, -1.05]
]

export const STANDARD = {
  lack: 'weiss',
  oberflaeche: 'hochglanz',
  metall: 'gold',
  innenraum: 'honig',
  polster: 'leder',
  klaviatur: 'klassisch',
  deckel: 1, // 0 = geschlossen, 1 = ganz offen   (Morph Targets)
  bank: 0, //   0 = normal, 1 = 8 cm höher         (Morph Target)
  kandelaber: true,
  licht: 'tag'
}

export function finde(liste, id) {
  return liste.find((eintrag) => eintrag.id === id) ?? liste[0]
}

// "Für Elise" von Ludwig van Beethoven (Wien, 1810), Anfang.
// [Zeit in Sechzehnteln, Note, Länge in Sechzehnteln]
export const FUER_ELISE = [
  [0, 'E5', 1], [1, 'D#5', 1],
  [2, 'E5', 1], [3, 'D#5', 1], [4, 'E5', 1], [5, 'B4', 1], [6, 'D5', 1], [7, 'C5', 1],
  [8, 'A4', 2], [8, 'A2', 1], [9, 'E3', 1], [10, 'A3', 1], [11, 'C4', 1], [12, 'E4', 1], [13, 'A4', 1],
  [14, 'B4', 2], [14, 'E2', 1], [15, 'E3', 1], [16, 'G#3', 1], [17, 'E4', 1], [18, 'G#4', 1], [19, 'B4', 1],
  [20, 'C5', 2], [20, 'A2', 1], [21, 'E3', 1], [22, 'A3', 1], [23, 'E4', 1], [24, 'E5', 1], [25, 'D#5', 1],
  [26, 'E5', 1], [27, 'D#5', 1], [28, 'E5', 1], [29, 'B4', 1], [30, 'D5', 1], [31, 'C5', 1],
  [32, 'A4', 2], [32, 'A2', 1], [33, 'E3', 1], [34, 'A3', 1], [35, 'C4', 1], [36, 'E4', 1], [37, 'A4', 1],
  [38, 'B4', 2], [38, 'E2', 1], [39, 'E3', 1], [40, 'G#3', 1], [41, 'E4', 1], [42, 'C5', 1], [43, 'B4', 1],
  [44, 'A4', 2], [44, 'A2', 1], [45, 'E3', 1], [46, 'A3', 1], [47, 'B4', 1], [48, 'C5', 1], [49, 'D5', 1],
  [50, 'E5', 3], [50, 'C3', 1], [51, 'G3', 1], [52, 'C4', 1], [53, 'G4', 1], [54, 'F5', 1], [55, 'E5', 1],
  [56, 'D5', 3], [56, 'G2', 1], [57, 'G3', 1], [58, 'B3', 1], [59, 'F4', 1], [60, 'E5', 1], [61, 'D5', 1],
  [62, 'C5', 3], [62, 'A2', 1], [63, 'E3', 1], [64, 'A3', 1], [65, 'E4', 1], [66, 'D5', 1], [67, 'C5', 1],
  [68, 'B4', 2], [68, 'E2', 1], [69, 'E3', 1], [71, 'E4', 1], [72, 'E5', 1], [73, 'D#5', 1],
  [74, 'E5', 1], [75, 'D#5', 1], [76, 'E5', 1], [77, 'B4', 1], [78, 'D5', 1], [79, 'C5', 1],
  [80, 'A4', 2], [80, 'A2', 1], [81, 'E3', 1], [82, 'A3', 1], [83, 'C4', 1], [84, 'E4', 1], [85, 'A4', 1],
  [86, 'B4', 2], [86, 'E2', 1], [87, 'E3', 1], [88, 'G#3', 1], [89, 'E4', 1], [90, 'C5', 1], [91, 'B4', 1],
  [92, 'A4', 6], [92, 'A2', 2], [93, 'E3', 2], [94, 'A3', 4]
]
