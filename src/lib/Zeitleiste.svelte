<!-- Zeitleiste: die Geschichte des Klaviers. Bei drei Stücken kann man direkt hineinhören. -->
<script>
  import { spieleMelodie } from './klang.js'
  import { MELODIEN } from './melodien.js'
  import { finde } from './data.js'
  import { ui } from './zustand.svelte.js'

  const EREIGNISSE = [
    { jahr: 'um 1700', ort: 'Florenz', text: 'Bartolomeo Cristofori baut das erste Pianoforte. Zum ersten Mal kann man leise (piano) und laut (forte) spielen.' },
    { jahr: '1781', ort: 'Wien', text: 'Mozart zieht nach Wien. Die Stadt wird zur Hauptstadt der Klaviermusik.' },
    { jahr: '1787', ort: 'Wien', text: 'Mozart schreibt „Eine kleine Nachtmusik“.', musik: 'nachtmusik' },
    { jahr: '1810', ort: 'Wien', text: 'Beethoven schreibt „Für Elise“.', musik: 'elise' },
    { jahr: '1821', ort: 'Paris', text: 'Sébastien Érard erfindet die Doppelrepetition. Jetzt kann man einen Ton sehr schnell wiederholen.' },
    { jahr: '1824', ort: 'Wien', text: 'Beethovens 9. Sinfonie mit der „Ode an die Freude“ wird zum ersten Mal gespielt.', musik: 'freude' },
    { jahr: '2026', ort: 'Im Browser', text: 'Le Grand Blanc: ein Flügel, den jeder in 3D gestalten und spielen kann.' }
  ]
</script>

<ol class="zeitleiste">
  {#each EREIGNISSE as e (e.jahr)}
    <li>
      <span class="kugel" aria-hidden="true"></span>
      <div class="karte">
        <p class="font-display text-3xl text-gold-dunkel">{e.jahr}</p>
        <p class="italic text-tinte/60">{e.ort}</p>
        <p class="mt-2">{e.text}</p>
        {#if e.musik}
          <button type="button" class="hoeren" disabled={!ui.klangBereit || ui.spielt} onclick={() => spieleMelodie(finde(MELODIEN, e.musik))}>
            ▶ Anhören
          </button>
        {/if}
      </div>
    </li>
  {/each}
</ol>

<style>
  .zeitleiste {
    position: relative;
    display: grid;
    gap: 1.75rem;
    margin-top: 3rem;
  }
  /* die goldene Linie in der Mitte (am Handy links) */
  .zeitleiste::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.6rem;
    width: 2px;
    background: linear-gradient(transparent, var(--color-gold) 8%, var(--color-gold) 92%, transparent);
  }
  li {
    position: relative;
    padding-left: 2.5rem;
  }
  .kugel {
    position: absolute;
    left: 0.15rem;
    top: 1.4rem;
    width: 1rem;
    height: 1rem;
    border-radius: 999px;
    background: radial-gradient(circle at 35% 30%, #f4e2a0, #9a7124);
    box-shadow: 0 0 0 4px var(--color-wand);
  }
  .karte {
    padding: 1.2rem 1.4rem;
    background: var(--color-stuck);
    border: 1px solid rgba(184, 146, 58, 0.45);
  }
  .hoeren {
    margin-top: 0.8rem;
    padding: 0.3rem 1rem;
    font-size: 1rem;
    color: var(--color-stuck);
    background: var(--color-damast);
    border-radius: 999px;
    cursor: pointer;
  }
  .hoeren:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* großer Bildschirm: Karten abwechselnd links und rechts der Linie */
  @media (min-width: 768px) {
    .zeitleiste::before {
      left: 50%;
    }
    li {
      width: 50%;
      padding-left: 0;
      padding-right: 2.5rem;
    }
    li:nth-child(even) {
      margin-left: 50%;
      padding-left: 2.5rem;
      padding-right: 0;
    }
    .kugel {
      left: auto;
      right: -0.5rem;
    }
    li:nth-child(even) .kugel {
      left: -0.5rem;
      right: auto;
    }
  }
</style>