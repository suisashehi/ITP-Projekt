<!--
  Die Webkomponente "Konfigurator": 3D-Ansicht im Goldrahmen + Bedienfeld.
  Zoomen: Mausrad / zwei Finger. Perspektive: ziehen oder die Ansichts-Knöpfe.
-->
<script>
  import { Canvas } from '@threlte/core'
  import { useProgress } from '@threlte/extras'
  import { fade } from 'svelte/transition'
  import Szene from './Szene.svelte'
  import Goldstaub from './Goldstaub.svelte'
  import Bedienfeld from './Bedienfeld.svelte'
  import Ornament from './Ornament.svelte'
  import { config, ui } from './zustand.svelte.js'
  import { ANSICHTEN } from './data.js'
  import { ladeKlang } from './klang.js'

  ladeKlang()
  const { progress, errors } = useProgress() // Ladefortschritt des 3D-Modells

  function ansicht(name) {
    ui.ansicht = name
    ui.ansichtZaehler++
  }
</script>

<div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
  <div class="goldrahmen">
    {#each ['oben-links', 'oben-rechts', 'unten-links', 'unten-rechts'] as ecke (ecke)}
      <Ornament art="ecke" class="rahmen-ecke {ecke}" />
    {/each}

    <div class="salon" class:abend={config.licht === 'kerze'}>
      <div class="absolute inset-0">
        <Canvas>
          <Szene />
          <Goldstaub />
        </Canvas>
      </div>
      <div class="vignette"></div>

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

      <nav class="ansichten" aria-label="Kamera-Ansichten">
        {#each Object.entries(ANSICHTEN) as [name, a] (name)}
          <button type="button" class:aktiv={ui.ansicht === name} aria-pressed={ui.ansicht === name} onclick={() => ansicht(name)}>
            {a.name}
          </button>
        {/each}
      </nav>
    </div>
  </div>

  <Bedienfeld />
</div>

<p class="mt-5 text-center text-tinte/70 italic">
  Ziehen Sie mit der Maus, um den Flügel zu drehen, und zoomen Sie mit dem Mausrad. Ein Klick auf eine Taste spielt den Ton.
</p>

{#if ui.hinweis}
  <div class="hinweis" transition:fade={{ duration: 200 }} role="status">{ui.hinweis}</div>
{/if}
