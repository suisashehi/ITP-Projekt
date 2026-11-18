<!-- Eine Reihe Text-Knöpfe. Verwendung: <Knopfwahl titel="Oberfläche" liste={OBERFLAECHE} bind:wert={config.oberflaeche} /> -->
<script>
  import { spieleNote } from './klang.js'
  let { titel, liste, wert = $bindable() } = $props()
  const TOENE = ['C5', 'E5', 'G5', 'B5', 'D6', 'E6', 'G6'] // jeder Knopf hat einen eigenen leisen Ton
</script>

<fieldset>
  <legend class="gruppe-titel">{titel}</legend>
  <div class="flex flex-wrap gap-2">
    {#each liste as option, i (option.id)}
      <button
        type="button"
        class="wahl"
        class:aktiv={wert === option.id}
        aria-pressed={wert === option.id}
        onclick={() => { wert = option.id; spieleNote(TOENE[i % TOENE.length], 0.25) }}
      >
        {option.name}
      </button>
    {/each}
  </div>
</fieldset>
