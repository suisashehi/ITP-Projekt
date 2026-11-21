<!--
  Kleines Klavier (eine Oktave) unter dem Flügel.
  Man kann klicken oder mit der Computertastatur spielen: A S D F G H J K (weiß), W E T Z U (schwarz).
  Dazu: eigene Melodie aufnehmen und abspielen.
-->
<script>
  import { spieleNote, beiTaste, spieleMelodie } from './klang.js'
  import { ui } from './zustand.svelte.js'

  // [Note, Taste auf der Tastatur (event.code), Buchstabe zum Anzeigen]
  const WEISS = [
    ['C4', 'KeyA', 'A'], ['D4', 'KeyS', 'S'], ['E4', 'KeyD', 'D'], ['F4', 'KeyF', 'F'],
    ['G4', 'KeyG', 'G'], ['A4', 'KeyH', 'H'], ['B4', 'KeyJ', 'J'], ['C5', 'KeyK', 'K']
  ]
  // schwarze Tasten: die letzte Zahl sagt, nach welcher weißen Taste sie liegen
  const SCHWARZ = [
    ['C#4', 'KeyW', 'W', 1], ['D#4', 'KeyE', 'E', 2], ['F#4', 'KeyT', 'T', 4],
    ['G#4', 'KeyY', 'Z', 5], ['A#4', 'KeyU', 'U', 6]
  ]

  // Computertastatur
  function taste(e) {
    if (e.repeat || e.target.tagName === 'INPUT') return
    const gefunden = [...WEISS, ...SCHWARZ].find(([, code]) => code === e.code)
    if (gefunden) spieleNote(gefunden[0])
  }

  // ---------- Eigene Melodie aufnehmen und abspielen
  let aufnahme = $state([]) // [Zeit in Millisekunden, Note]
  let nimmtAuf = $state(false)
  let startzeit = 0

  function aufnehmen() {
    if (nimmtAuf) {
      nimmtAuf = false // zweiter Klick: Aufnahme stoppen
      return
    }
    aufnahme = []
    startzeit = performance.now()
    nimmtAuf = true
  }

  function abspielen() {
    nimmtAuf = false
    const erste = aufnahme[0][0] // ohne Pause am Anfang
    // takt 0.001 heißt: eine Zeiteinheit = eine Millisekunde
    spieleMelodie({ takt: 0.001, noten: aufnahme.map(([zeit, note]) => [zeit - erste, note, 350]) })
  }

  // Die gespielte Taste leuchtet kurz (auch bei Melodien und Klicks in 3D)
  let leuchtet = $state('')
  let timer
  $effect(() =>
    beiTaste((note) => {
      leuchtet = note
      clearTimeout(timer)
      timer = setTimeout(() => (leuchtet = ''), 260)
      if (nimmtAuf && !ui.spielt) aufnahme.push([performance.now() - startzeit, note])
    })
  )
</script>

<svelte:window onkeydown={taste} />

<div class="mt-6 flex flex-col items-center gap-3">
  <div class="klavier" aria-label="Kleines Klavier">
    {#each WEISS as [note, , buchstabe] (note)}
      <button type="button" class="weiss" class:an={leuchtet === note} aria-label={note} onclick={() => spieleNote(note)}>
        {buchstabe}
      </button>
    {/each}
    {#each SCHWARZ as [note, , buchstabe, nach] (note)}
      <button
        type="button"
        class="schwarz"
        class:an={leuchtet === note}
        style="left: calc({nach} * 12.5% - 3.25%)"
        aria-label={note}
        onclick={() => spieleNote(note)}
      >
        {buchstabe}
      </button>
    {/each}
  </div>
  <p class="text-center text-base italic text-tinte/70">Spielen Sie mit Ihrer Tastatur: A bis K und W E T Z U</p>

  <div class="flex flex-wrap justify-center gap-2">
    <button type="button" class="aufnahme" class:laeuft={nimmtAuf} onclick={aufnehmen}>
      <span class="punkt"></span>
      {nimmtAuf ? `Stopp (${aufnahme.length} Töne)` : 'Melodie aufnehmen'}
    </button>
    <button type="button" class="aufnahme" disabled={aufnahme.length === 0 || ui.spielt} onclick={abspielen}>
      ▶ Meine Melodie abspielen
    </button>
  </div>
</div>

<style>
  .klavier {
    position: relative;
    display: flex;
    width: min(100%, 26rem);
    height: 7rem;
    padding: 6px 6px 8px;
    background: linear-gradient(#3e0a12, #1e050a);
    border: 1px solid var(--color-gold);
    box-shadow: 0 14px 30px -18px rgba(28, 36, 51, 0.7);
  }
  .weiss {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 0.4rem;
    margin: 0 1px;
    font-size: 0.85rem;
    color: rgba(28, 36, 51, 0.55);
    background: linear-gradient(#fbf8f1, #e9e2d2);
    border-radius: 0 0 4px 4px;
    cursor: pointer;
    transition: background 0.1s, transform 0.1s;
  }
  .schwarz {
    position: absolute;
    top: 6px;
    width: 6.5%;
    height: 58%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 0.3rem;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.6);
    background: linear-gradient(#2a2626, #0d0b0b);
    border-radius: 0 0 3px 3px;
    cursor: pointer;
    transition: background 0.1s;
  }
  .weiss.an,
  .weiss:active {
    background: linear-gradient(#f4e2a0, #e6c977);
    transform: translateY(2px);
  }
  .schwarz.an,
  .schwarz:active {
    background: linear-gradient(#b8923a, #7e5b1c);
  }

  .aufnahme {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 1rem;
    font-size: 1rem;
    background: var(--color-stuck);
    border: 1px solid rgba(184, 146, 58, 0.6);
    border-radius: 999px;
    cursor: pointer;
  }
  .aufnahme:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .punkt {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 999px;
    background: #b3162f;
  }
  .laeuft {
    background: var(--color-damast);
    color: var(--color-stuck);
  }
  .laeuft .punkt {
    background: #ff5a6e;
    animation: blinken 1s infinite;
  }
  @keyframes blinken {
    50% { opacity: 0.2; }
  }
  @media (prefers-reduced-motion: reduce) {
    .laeuft .punkt { animation: none; }
  }
</style>