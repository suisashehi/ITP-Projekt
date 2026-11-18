<!-- Eine Reihe runder Farbfelder. Verwendung: <Farbwahl titel="Lack" liste={LACK} bind:wert={config.lack} /> -->
<script>
  import { spieleNote } from './klang.js'
  let { titel, liste, wert = $bindable() } = $props()
  const TOENE = ['C5', 'E5', 'G5', 'B5', 'D6', 'E6', 'G6'] // jeder Knopf hat einen eigenen leisen Ton
  const gewaehlt = $derived(liste.find((option) => option.id === wert))
</script>

<fieldset>
  <legend class="gruppe-titel">
    {titel}
    <span class="text-tinte/60">{gewaehlt?.name}</span>
  </legend>
  <div class="flex flex-wrap gap-2.5">
    {#each liste as option, i (option.id)}
      <button
        type="button"
        class="farbfeld"
        class:aktiv={wert === option.id}
        style="--farbe: {option.farbe}"
        aria-label={option.name}
        aria-pressed={wert === option.id}
        title={option.name}
        onclick={() => { wert = option.id; spieleNote(TOENE[i % TOENE.length], 0.25) }}
      ></button>
    {/each}
  </div>
</fieldset>
