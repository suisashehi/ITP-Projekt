<!-- Eine edle Urkunde mit Wachssiegel für die eigene Konfiguration (öffnet sich als Dialog) -->
<script>
  import { config } from './zustand.svelte.js'
  import { LACK, OBERFLAECHE, METALL, INNENRAUM, POLSTER, KLAVIATUR, finde } from './data.js'

  let { preis } = $props()
  let dialog // das <dialog>-Element
  const nummer = 1791 + Math.floor(Math.random() * 200) // Seriennummer (1791 = Mozarts Todesjahr in Wien)
  const datum = new Date().toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' })

  export function oeffnen() {
    dialog.showModal()
  }

  const zeilen = $derived([
    ['Lack', finde(LACK, config.lack).name],
    ['Oberfläche', finde(OBERFLAECHE, config.oberflaeche).name],
    ['Beschläge', finde(METALL, config.metall).name],
    ['Innenraum', finde(INNENRAUM, config.innenraum).name],
    ['Polster', finde(POLSTER, config.polster).name],
    ['Klaviatur', finde(KLAVIATUR, config.klaviatur).name],
    ['Kandelaber', config.kandelaber ? 'Zwei, vergoldet' : 'Ohne']
  ])
</script>

<dialog bind:this={dialog} class="urkunde" onclick={(e) => e.target === dialog && dialog.close()}>
  <div class="urkunde-papier">
    <p class="font-schrift text-5xl leading-none">Certificat</p>
    <p class="mt-1 italic text-tinte/70">Palais Pianoforte, Wien und Paris</p>

    <h2 class="mt-6 text-4xl">Le Grand Blanc</h2>
    <p class="italic">Konzertflügel Nr. {nummer}</p>

    <dl class="mx-auto mt-6 max-w-xs space-y-1 text-left">
      {#each zeilen as [titel, wert] (titel)}
        <div class="flex justify-between gap-6 border-b border-gold/30 pb-1">
          <dt class="italic text-tinte/70">{titel}</dt>
          <dd>{wert}</dd>
        </div>
      {/each}
    </dl>

    <p class="mt-6 font-display text-3xl">{preis}</p>

    <div class="mt-6 flex items-end justify-between">
      <div class="text-left">
        <p class="font-schrift text-3xl leading-none">Maître Facteur</p>
        <p class="text-sm italic text-tinte/60">Wien, am {datum}</p>
      </div>
      <div class="siegel" aria-hidden="true">PP</div>
    </div>

    <button type="button" class="knopf mt-8" onclick={() => dialog.close()}>Schließen</button>
  </div>
</dialog>
