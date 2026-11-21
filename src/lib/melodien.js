// Die Musikstücke für das Konzert.
// Jede Note: [Zeit, Note, Länge]. "takt" = so viele Sekunden dauert eine Zeiteinheit.
import { FUER_ELISE } from './data.js'

// "Ode an die Freude", Ludwig van Beethoven, 9. Sinfonie (Wien, 1824). Zeiteinheit = Achtelnote
const ODE = [
  [0, 'E5', 2], [0, 'C3', 4], [0, 'G3', 4], [2, 'E5', 2], [4, 'F5', 2], [4, 'C3', 4], [6, 'G5', 2],
  [8, 'G5', 2], [8, 'G2', 4], [8, 'D3', 4], [10, 'F5', 2], [12, 'E5', 2], [12, 'G2', 4], [14, 'D5', 2],
  [16, 'C5', 2], [16, 'C3', 4], [16, 'G3', 4], [18, 'C5', 2], [20, 'D5', 2], [20, 'C3', 4], [22, 'E5', 2],
  [24, 'E5', 3], [24, 'G2', 8], [24, 'D3', 8], [27, 'D5', 1], [28, 'D5', 4],
  [32, 'E5', 2], [32, 'C3', 4], [32, 'G3', 4], [34, 'E5', 2], [36, 'F5', 2], [36, 'C3', 4], [38, 'G5', 2],
  [40, 'G5', 2], [40, 'G2', 4], [40, 'D3', 4], [42, 'F5', 2], [44, 'E5', 2], [44, 'G2', 4], [46, 'D5', 2],
  [48, 'C5', 2], [48, 'C3', 4], [48, 'G3', 4], [50, 'C5', 2], [52, 'D5', 2], [52, 'C3', 4], [54, 'E5', 2],
  [56, 'D5', 3], [56, 'G2', 4], [59, 'C5', 1], [60, 'C5', 6], [60, 'C3', 6], [60, 'G3', 6], [60, 'E4', 6]
]

// "Eine kleine Nachtmusik", Wolfgang Amadeus Mozart (Wien, 1787), Anfang. Zeiteinheit = Achtelnote
const NACHTMUSIK = [
  [0, 'G4', 2], [0, 'G2', 8], [3, 'D4', 1], [4, 'G4', 2], [7, 'D4', 1],
  [8, 'G4', 1], [8, 'G2', 8], [9, 'D4', 1], [10, 'G4', 1], [11, 'B4', 1], [12, 'D5', 3],
  [16, 'C5', 2], [16, 'D3', 8], [19, 'A4', 1], [20, 'C5', 2], [23, 'A4', 1],
  [24, 'C5', 1], [24, 'D3', 8], [25, 'A4', 1], [26, 'F#4', 1], [27, 'A4', 1], [28, 'D4', 3],
  [32, 'G4', 6], [32, 'B3', 6], [32, 'D4', 6], [32, 'G2', 6]
]

export const MELODIEN = [
  { id: 'elise', name: 'Für Elise', takt: 0.19, noten: FUER_ELISE },
  { id: 'freude', name: 'Ode an die Freude', takt: 0.24, noten: ODE },
  { id: 'nachtmusik', name: 'Kleine Nachtmusik', takt: 0.21, noten: NACHTMUSIK }
]