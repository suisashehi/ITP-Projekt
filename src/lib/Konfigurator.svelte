<!--
  Die Webkomponente "Konfigurator": 3D-Ansicht im Goldrahmen + Bedienfeld.
  Zoomen: Mausrad / zwei Finger. Perspektive: ziehen oder die Ansichts-Knöpfe.
-->
<script>
  import { Canvas } from '@threlte/core'
  import { WebGLRenderer } from 'three'
  import { getDestination } from 'tone'
  import { useProgress } from '@threlte/extras'
  import { fade } from 'svelte/transition'
  import Szene from './Szene.svelte'
  import Goldstaub from './Goldstaub.svelte'
  import Bedienfeld from './Bedienfeld.svelte'
  import Ornament from './Ornament.svelte'
  import Vorlagen from './Vorlagen.svelte'
  import Tastatur from './Tastatur.svelte'
  import Effekte from './Effekte.svelte'
  import { config, ui, zeigeHinweis } from './zustand.svelte.js'
  import { ANSICHTEN } from './data.js'
  import { ladeKlang } from './klang.js'
  import { ladeAusLink, linkErstellen } from './teilen.js'

  ladeKlang()
  ladeAusLink() // geteilte Konfiguration aus der Adresse laden
  const { progress, errors } = useProgress() // Ladefortschritt des 3D-Modells

  function ansicht(name) {
    ui.ansicht = name
    ui.ansichtZaehler++
  }

  // preserveDrawingBuffer: das 3D-Bild bleibt erhalten, damit wir ein Foto davon machen können
  const neuerRenderer = (canvas) =>
    new WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true })

  // ---------- Foto: 3D-Bild auf roten Hintergrund malen und als PNG speichern
  let buehne // das Element mit der 3D-Leinwand
  function foto() {
    const bild = buehne.querySelector('canvas')
    const leinwand = document.createElement('canvas')
    leinwand.width = bild.width
    leinwand.height = bild.height
    const pinsel = leinwand.getContext('2d')
    const verlauf = pinsel.createLinearGradient(0, 0, 0, leinwand.height)
    verlauf.addColorStop(0, '#7a1f2c')
    verlauf.addColorStop(1, '#3a0a12')
    pinsel.fillStyle = verlauf
    pinsel.fillRect(0, 0, leinwand.width, leinwand.height)
    pinsel.drawImage(bild, 0, 0)
    const link = document.createElement('a')
    link.download = 'mein-fluegel.png'
    link.href = leinwand.toDataURL('image/png')
    link.click()
    zeigeHinweis('Foto gespeichert')
  }

  // ---------- Link zur eigenen Konfiguration kopieren
  async function teilen() {
    try {
      await navigator.clipboard.writeText(linkErstellen())
      zeigeHinweis('Link kopiert. Wer ihn öffnet, sieht genau diesen Flügel.')
    } catch {
      zeigeHinweis('Kopieren ist in diesem Browser nicht erlaubt')
    }
  }

  // ---------- Vollbild für den Goldrahmen
  let rahmen // der Goldrahmen
  function vollbild() {
    if (document.fullscreenElement) document.exitFullscreen()
    else rahmen.requestFullscreen()
  }

  // ---------- Ton an und aus
  let stumm = $state(false)
  function ton() {
    stumm = !stumm
    getDestination().mute = stumm
  }
</script>

<div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
  <div>
    <div class="goldrahmen" bind:this={rahmen}>
      {#each ['oben-links', 'oben-rechts', 'unten-links', 'unten-rechts'] as ecke (ecke)}
        <Ornament art="ecke" class="rahmen-ecke {ecke}" />
      {/each}

      <div class="salon" class:abend={config.licht === 'kerze'}>
        <div class="absolute inset-0" bind:this={buehne}>
          <Canvas createRenderer={neuerRenderer}>
            <Szene />
            <Goldstaub />
          </Canvas>
        </div>
        <div class="vignette"></div>
        <Effekte />

        <!-- Theatervorhang: zu beim Laden, danach seitlich gerafft (nur CSS) -->
        <div class="vorhang links" class:offen={ui.geladen}></div>
        <div class="vorhang rechts" class:offen={ui.geladen}></div>
        <div class="lambrequin"></div>

        {#if !ui.geladen}
          <div class="ladeanzeige" out:fade={{ duration: 500 }} role="status" aria-live="polite">
            <Ornament art="wappen" class="h-20 w-16 text-gold-hell lade-wappen" />
            {#if $errors.length}
              <p class="max-w-xs text-center">Das 3D-Modell konnte nicht geladen werden. Bitte laden Sie die Seite neu.</p>
            {:else}
              <p class="font-display text-2xl italic">Der Flügel wird gestimmt</p>
              <div class="h-px w-56 bg-stuck/25">
                <div class="h-px bg-gold-hell transition-[width] duration-300" style="width: {Math.round($progress * 100)}%"></div>
              </div>
              <p class="tabular-nums text-stuck/70">{Math.round($progress * 100)} %</p>
            {/if}
          </div>
        {/if}

        {#if ui.note}
          <p class="note-anzeige" aria-live="polite">{ui.note.replace('#', '♯')}</p>
        {/if}

        <div class="werkzeuge">
          <button type="button" onclick={teilen} title="Link teilen" aria-label="Link teilen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
          </button>
          <button type="button" onclick={vollbild} title="Vollbild" aria-label="Vollbild">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
          </button>
          <button type="button" onclick={foto} title="Foto speichern" aria-label="Foto speichern">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
          </button>
          <button type="button" onclick={ton} title={stumm ? 'Ton an' : 'Ton aus'} aria-label={stumm ? 'Ton an' : 'Ton aus'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M4 9h4l5-4v14l-5-4H4z" />
              {#if stumm}<path d="M17 9l5 6M22 9l-5 6" />{:else}<path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />{/if}
            </svg>
          </button>
        </div>

        <nav class="ansichten" aria-label="Kamera-Ansichten">
          {#each Object.entries(ANSICHTEN) as [name, a] (name)}
            <button type="button" class:aktiv={ui.ansicht === name} aria-pressed={ui.ansicht === name} onclick={() => ansicht(name)}>
              {a.name}
            </button>
          {/each}
        </nav>
      </div>
    </div>
    <Tastatur />
  </div>

  <Bedienfeld />
</div>

<Vorlagen />

<p class="mt-5 text-center text-tinte/70 italic">
  Ziehen Sie mit der Maus, um den Flügel zu drehen, und zoomen Sie mit dem Mausrad. Ein Klick auf eine Taste spielt den Ton.
</p>

{#if ui.hinweis}
  <div class="hinweis" transition:fade={{ duration: 200 }} role="status">{ui.hinweis}</div>
{/if}

<style>
  /* im Vollbild füllt der Goldrahmen den ganzen Bildschirm */
  .goldrahmen:fullscreen {
    display: flex;
    flex-direction: column;
  }
  .goldrahmen:fullscreen .salon {
    flex: 1;
    height: auto;
  }

  .werkzeuge {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    z-index: 12;
    display: flex;
    gap: 0.5rem;
  }
  .werkzeuge button {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 999px;
    color: var(--color-gold-hell);
    background: rgba(30, 6, 12, 0.6);
    border: 1px solid rgba(230, 201, 119, 0.55);
    backdrop-filter: blur(6px);
    cursor: pointer;
  }
  .werkzeuge button:hover {
    background: rgba(60, 12, 22, 0.8);
  }
  .werkzeuge svg {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>