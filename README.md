# Palais Pianoforte: 3D-Konfigurator für einen Flügel

ITP-Projekt „3D-Objekt im Web“ mit Blender, Three.js, Threlte, Svelte 5, Tailwind CSS und Tone.js.

**Website:** https://itp-projekt-beta.vercel.app

## Starten

Node.js (Version 20 oder neuer) installieren, dann:

```bash
npm install
npm run dev
```

Die Adresse aus dem Terminal im Browser öffnen (meistens http://localhost:5173).

## Online

Die Website läuft auf Vercel: https://itp-projekt-beta.vercel.app

Bei jedem Push auf `main` baut Vercel die Seite automatisch neu.

## Highlights

- Theatervorhang aus Samt, der sich nach dem Laden öffnet (nur CSS, `app.css`)
- Deckel und Bankhöhe ändern die Form mit Morph Targets aus Blender
- Echter Klavierklang: Tasten anklicken, „Konzert im Kerzenschein“ mit Kamerafahrt
- Goldstaub in der Luft (`Goldstaub.svelte`), flackernde Kerzen
- Jeder Auswahl-Knopf spielt einen leisen Ton
- Urkunde mit Wachssiegel für die eigene Konfiguration (`Urkunde.svelte`)

## Wo ist was?

- `src/App.svelte`: die ganze Seite
- `src/lib/Konfigurator.svelte`: die Webkomponente mit Ladeanzeige
- `src/lib/Szene.svelte`: 3D-Szene, Kamera, Morph Targets (Deckel, Bankhöhe), Materialien
- `src/lib/Bedienfeld.svelte`: alle Optionen und der Preis
- `src/lib/data.js`: Farben, Preise, Kamera-Ansichten, Melodie
- `src/lib/klang.js`: Klavierklang und Konzert-Modus
- `src/lib/Goldstaub.svelte`: schwebender Goldstaub
- `src/lib/Urkunde.svelte`: die Urkunde
- `public/models/piano.glb`: das 3D-Modell
- `public/images/`: die 3 Renderings (`Untitled.png`, `Untitled3.png`, `Untitled4.png`)

## Quellen

- Klavierklang: Salamander Grand Piano von Alexander Holm, CC BY 3.0
- Schriften: Bodoni Moda, EB Garamond, Pinyon Script (SIL Open Font License)
- „Palais Pianoforte“ ist eine erfundene Marke für dieses Schulprojekt.