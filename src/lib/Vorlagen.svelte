<!-- Stilvorlagen: fertige Kombinationen mit einem Klick (spielt dazu einen Akkord) -->
<script>
  import { config } from './zustand.svelte.js'
  import { VORLAGEN, zufaelligeAuswahl } from './vorlagen.js'
  import { spieleNote } from './klang.js'

  function waehle(vorlage) {
    Object.assign(config, vorlage.werte)
    vorlage.akkord.forEach((note, i) => setTimeout(() => spieleNote(note, 0.45), i * 90)) // Harfen-Akkord
  }

  // Eine Vorlage ist aktiv, wenn alle ihre Werte gerade gewählt sind
  function istAktiv(vorlage) {
    return Object.entries(vorlage.werte).every(([name, wert]) => config[name] === wert)
  }
</script>

<section class="mt-10" aria-label="Stilvorlagen">
  <h2 class="text-center text-3xl">Stilvorlagen</h2>
  <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
    {#each VORLAGEN as vorlage (vorlage.name)}
      <button type="button" class="karte" class:aktiv={istAktiv(vorlage)} onclick={() => waehle(vorlage)}>
        <span class="punkte">
          {#each vorlage.farben as farbe (farbe)}
            <span style="background: {farbe}"></span>
          {/each}
        </span>
        <span class="font-display text-xl">{vorlage.name}</span>
        <span class="text-base italic text-tinte/65">{vorlage.text}</span>
      </button>
    {/each}

    <button type="button" class="karte zufall" onclick={() => { zufaelligeAuswahl(); spieleNote('G5', 0.4) }}>
      <span class="text-3xl leading-none">✦</span>
      <span class="font-display text-xl">Überrasch mich</span>
      <span class="text-base italic text-tinte/65">Eine zufällige Auswahl</span>
    </button>
  </div>
</section>

<style>
  .karte {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 1.1rem 0.8rem;
    text-align: center;
    background: var(--color-stuck);
    border: 1px solid rgba(184, 146, 58, 0.45);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .karte:hover {
    transform: translateY(-3px);
    border-color: var(--color-gold);
    box-shadow: 0 14px 28px -16px rgba(28, 36, 51, 0.5);
  }
  .karte.aktiv {
    border-color: var(--color-gold-dunkel);
    box-shadow: 0 0 0 3px var(--color-stuck), 0 0 0 4px var(--color-gold);
  }
  .zufall {
    background: var(--color-damast);
    color: var(--color-stuck);
    border-color: var(--color-gold-hell);
  }
  .zufall span {
    color: inherit;
  }
  .punkte {
    display: flex;
    margin-bottom: 0.3rem;
  }
  .punkte span {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: -0.4rem;
    border-radius: 999px;
    border: 2px solid var(--color-stuck);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }
  .punkte span:first-child {
    margin-left: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .karte { transition: none; }
    .karte:hover { transform: none; }
  }
</style>