<!-- Rechte Spalte: alle Optionen, der Preis und die Knöpfe -->
<script>
  import Farbwahl from './Farbwahl.svelte'
  import Knopfwahl from './Knopfwahl.svelte'
  import Urkunde from './Urkunde.svelte'
  import { config, ui, zuruecksetzen } from './zustand.svelte.js'
  import { LACK, OBERFLAECHE, METALL, INNENRAUM, POLSTER, KLAVIATUR, GRUNDPREIS, KANDELABER_PREIS, finde } from './data.js'
  import { starteKonzert, stoppeMelodie } from './klang.js'

  let urkunde // die Urkunde (Dialog)
  const euro = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  // Preis = Grundpreis + Aufpreise aller gewählten Optionen
  const preis = $derived(
    GRUNDPREIS +
      finde(LACK, config.lack).preis +
      finde(OBERFLAECHE, config.oberflaeche).preis +
      finde(METALL, config.metall).preis +
      finde(INNENRAUM, config.innenraum).preis +
      finde(POLSTER, config.polster).preis +
      finde(KLAVIATUR, config.klaviatur).preis +
      (config.kandelaber ? KANDELABER_PREIS : 0)
  )

</script>

<aside class="stuckfeld flex flex-col" aria-label="Konfiguration">
  <div class="flex-1 space-y-6 overflow-y-auto p-6 lg:max-h-[600px]">
    <Farbwahl titel="Lack" liste={LACK} bind:wert={config.lack} />
    <Knopfwahl titel="Oberfläche" liste={OBERFLAECHE} bind:wert={config.oberflaeche} />
    <Farbwahl titel="Beschläge" liste={METALL} bind:wert={config.metall} />
    <Farbwahl titel="Innenraum" liste={INNENRAUM} bind:wert={config.innenraum} />
    <Farbwahl titel="Polster der Bank" liste={POLSTER} bind:wert={config.polster} />
    <Knopfwahl titel="Klaviatur" liste={KLAVIATUR} bind:wert={config.klaviatur} />

    <!-- Diese zwei Regler verändern die Form (Morph Targets aus Blender) -->
    <fieldset>
      <legend class="gruppe-titel">Form</legend>
      <label class="regler">
        <span>Deckel</span>
        <input type="range" min="0" max="1" step="0.01" bind:value={config.deckel} />
        <span class="text-tinte/60">{Math.round(config.deckel * 100)} % offen</span>
      </label>
      <label class="regler">
        <span>Bankhöhe</span>
        <input type="range" min="0" max="1" step="0.01" bind:value={config.bank} />
        <span class="text-tinte/60">{56 + Math.round(config.bank * 8)} cm</span>
      </label>
    </fieldset>

    <fieldset>
      <legend class="gruppe-titel">Ausstattung und Licht</legend>
      <label class="schalter">
        <input type="checkbox" bind:checked={config.kandelaber} />
        <span>Zwei Kandelaber mit Kerzen</span>
      </label>
      <div class="mt-3 flex flex-wrap gap-2">
        <button type="button" class="wahl" class:aktiv={config.licht === 'tag'} onclick={() => (config.licht = 'tag')}>
          Tageslicht
        </button>
        <button type="button" class="wahl" class:aktiv={config.licht === 'kerze'} onclick={() => { config.licht = 'kerze'; config.kandelaber = true }}>
          Kerzenschein
        </button>
      </div>
    </fieldset>
  </div>

  <div class="border-t border-gold/40 p-6">
    <div class="flex items-baseline justify-between gap-4">
      <span class="text-lg italic">Richtpreis</span>
      <span class="font-display text-3xl tabular-nums">{euro.format(preis)}</span>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-2">
      {#if ui.spielt}
        <button type="button" class="knopf-voll col-span-2" onclick={stoppeMelodie}>Musik anhalten</button>
      {:else}
        <button type="button" class="knopf-voll col-span-2" disabled={!ui.klangBereit} onclick={starteKonzert}>
          {ui.klangBereit ? 'Konzert im Kerzenschein' : 'Klang wird geladen'}
        </button>
      {/if}
      <button type="button" class="knopf" onclick={() => urkunde.oeffnen()}>Urkunde ansehen</button>
      <button type="button" class="knopf" onclick={zuruecksetzen}>Zurücksetzen</button>
    </div>
  </div>
</aside>

<Urkunde bind:this={urkunde} preis={euro.format(preis)} />
