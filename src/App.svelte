<script>
  import Konfigurator from './lib/Konfigurator.svelte'
  import Ornament from './lib/Ornament.svelte'
  import Zeitleiste from './lib/Zeitleiste.svelte'
  import Fragen from './lib/Fragen.svelte'
  import { ui } from './lib/zustand.svelte.js'
  import { starteKonzert, stoppeMelodie, spieleNote } from './lib/klang.js'

  const bilder = [
    { datei: './images/Untitled.png', text: 'Gesamtansicht' },
    { datei: './images/Untitled4.png', text: 'Detail der Klaviatur' },
    { datei: './images/Untitled3.png', text: 'Von der Seite' }
  ]

  // Die ersten Töne von "Für Elise" für das Notenblatt (y = Position auf den Notenlinien)
  const noten = [
    ['E5', 31], ['D#5', 36], ['E5', 31], ['D#5', 36], ['E5', 31],
    ['B4', 46], ['D5', 36], ['C5', 41], ['A4', 51]
  ]
</script>

<header class="px-6 pt-7 text-center">
  <Ornament art="wappen" class="mx-auto h-12 w-10 text-gold-dunkel" />
  <p class="mt-1 font-schrift text-4xl leading-tight text-tinte sm:text-5xl">Palais Pianoforte</p>
  <nav class="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg" aria-label="Hauptmenü">
    <a class="hover:text-gold-dunkel" href="#konfigurator">Konfigurator</a>
    <a class="hover:text-gold-dunkel" href="#klang">Klang</a>
    <a class="hover:text-gold-dunkel" href="#geschichte">Geschichte</a>
    <a class="hover:text-gold-dunkel" href="#galerie">Galerie</a>
    <a class="hover:text-gold-dunkel" href="#atelier">Atelier</a>
    <a class="hover:text-gold-dunkel" href="#fragen">Fragen</a>
  </nav>
</header>

<main>
  <section id="konfigurator" class="mx-auto max-w-[88rem] scroll-mt-6 px-4 pt-8 pb-20 sm:px-8">
    <div class="mx-auto mb-8 max-w-2xl text-center">
      <h1 class="goldtitel text-5xl sm:text-6xl lg:text-7xl">Le Grand Blanc</h1>
      <Ornament art="linie" class="mx-auto mt-3 h-5 w-52 text-gold-dunkel" />
      <p class="mt-3 text-lg">
        Ein Konzertflügel nach Ihren Wünschen. Wählen Sie Lack, Gold und Samt, öffnen Sie den Deckel
        und spielen Sie die ersten Töne, direkt im Salon.
      </p>
    </div>
    <Konfigurator />
  </section>

  <section id="klang" class="bg-stuck/80 py-20">
    <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
      <div>
        <h2 class="text-5xl">Der Klang</h2>
        <p class="mt-5">
          Jede Taste spielt eine echte Aufnahme eines Konzertflügels. Dazu kommt der Hall eines großen
          Festsaals, damit es klingt wie im Spiegelsaal.
        </p>
        <p class="mt-4">
          Beethoven schrieb „Für Elise“ im Jahr 1810 in Wien. Beim Konzert gehen die Kerzen an, die Tasten
          spielen von selbst und die Kamera fährt langsam um den Flügel.
        </p>
        <div class="mt-7 flex flex-wrap items-center gap-4">
          {#if ui.spielt}
            <button type="button" class="knopf-voll" onclick={stoppeMelodie}>Musik anhalten</button>
          {:else}
            <button type="button" class="knopf-voll" disabled={!ui.klangBereit} onclick={() => { starteKonzert(); location.hash = 'konfigurator' }}>
              {ui.klangBereit ? 'Konzert im Kerzenschein' : 'Klang wird geladen'}
            </button>
          {/if}
          <a class="italic underline decoration-gold underline-offset-4" href="#konfigurator">Zum Flügel</a>
        </div>
      </div>

      <figure class="stuckfeld p-6">
        <svg viewBox="0 0 400 90" class="w-full" role="img" aria-label="Die ersten Noten von Für Elise">
          {#each [26, 36, 46, 56, 66] as y (y)}
            <line x1="8" x2="392" y1={y} y2={y} stroke="#1c2433" stroke-width="1" opacity="0.7" />
          {/each}
          <line x1="8" x2="8" y1="26" y2="66" stroke="#1c2433" />
          <line x1="392" x2="392" y1="26" y2="66" stroke="#1c2433" stroke-width="3" />
          {#each noten as [note, y], i (i)}
            {@const x = 46 + i * 38}
            <g class="cursor-pointer" role="button" tabindex="0" aria-label="Note {note}"
              onclick={() => spieleNote(note)} onkeydown={(e) => e.key === 'Enter' && spieleNote(note)}>
              <rect x={x - 18} y="8" width="36" height="76" fill="transparent" />
              {#if note.includes('#')}
                <text x={x - 17} y={y + 5} font-size="16" fill="#1c2433">♯</text>
              {/if}
              <ellipse cx={x} cy={y} rx="6.5" ry="4.8" transform="rotate(-20 {x} {y})" fill="#1c2433" />
              {#if y > 46}
                <line x1={x + 6} x2={x + 6} y1={y} y2={y - 30} stroke="#1c2433" stroke-width="1.4" />
              {:else}
                <line x1={x - 6} x2={x - 6} y1={y} y2={y + 30} stroke="#1c2433" stroke-width="1.4" />
              {/if}
            </g>
          {/each}
        </svg>
        <figcaption class="mt-3 text-center italic text-tinte/70">
          Ein Klick auf eine Note spielt sie.
        </figcaption>
      </figure>
    </div>
  </section>

  <section id="geschichte" class="mx-auto max-w-5xl scroll-mt-6 px-6 py-20">
    <div class="text-center">
      <h2 class="text-5xl">Eine kleine Geschichte des Klaviers</h2>
      <Ornament art="linie" class="mx-auto mt-5 h-6 w-60 text-gold-dunkel" />
      <p class="mx-auto mt-5 max-w-xl">Von Florenz über Wien und Paris bis in Ihren Browser.</p>
    </div>
    <Zeitleiste />
  </section>

  <section id="galerie" class="mx-auto max-w-6xl scroll-mt-6 px-6 py-20">
    <div class="text-center">
      <h2 class="text-5xl">Aus dem Atelier</h2>
      <Ornament art="linie" class="mx-auto mt-5 h-6 w-60 text-gold-dunkel" />
      <p class="mx-auto mt-5 max-w-xl">Drei Bilder, gerendert in Blender mit Cycles.</p>
    </div>
    <div class="mt-12 grid gap-10 md:grid-cols-3">
      {#each bilder as bild (bild.datei)}
        <figure>
          <div class="bilderrahmen">
            <img src={bild.datei} alt={bild.text} loading="lazy" />
          </div>
          <figcaption class="museumsschild">{bild.text}</figcaption>
        </figure>
      {/each}
    </div>
  </section>

  <section id="atelier" class="bg-stuck/80 py-20">
    <div class="mx-auto max-w-3xl px-6">
      <h2 class="text-center text-5xl">Wie der Flügel entstand</h2>
      <Ornament art="linie" class="mx-auto mt-5 h-6 w-60 text-gold-dunkel" />
      <ol class="mt-10 space-y-8">
        <li class="grid grid-cols-[3rem_1fr] gap-4">
          <span class="font-display text-3xl text-gold-dunkel">I</span>
          <div>
            <h3 class="text-2xl">Modelliert in Blender</h3>
            <p class="mt-2">
              Gehäuse, Deckel, 87 einzelne Tasten, Pedale, Bank und zwei Kandelaber. Deckel und Bankhöhe
              sind Shape Keys (Morph Targets), damit sich die Form im Browser verändern kann.
            </p>
          </div>
        </li>
        <li class="grid grid-cols-[3rem_1fr] gap-4">
          <span class="font-display text-3xl text-gold-dunkel">II</span>
          <div>
            <h3 class="text-2xl">Exportiert als GLB</h3>
            <p class="mt-2">
              Materialien mit Klarlack, Samt und Gold, ein gebackener Schatten unter dem Flügel und ein
              Marmorboden. Alles steckt in einer Datei.
            </p>
          </div>
        </li>
        <li class="grid grid-cols-[3rem_1fr] gap-4">
          <span class="font-display text-3xl text-gold-dunkel">III</span>
          <div>
            <h3 class="text-2xl">Gezeigt mit Three.js und Threlte</h3>
            <p class="mt-2">
              Die Svelte-Komponente „Konfigurator“ lädt das Modell, ändert Farben und Morph Targets und
              spielt den Klang mit Tone.js. Das Design ist mit Tailwind CSS gebaut.
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section id="fragen" class="mx-auto max-w-3xl scroll-mt-6 px-6 py-20">
    <h2 class="text-center text-5xl">Fragen und Antworten</h2>
    <Ornament art="linie" class="mx-auto mt-5 h-6 w-60 text-gold-dunkel" />
    <Fragen />
  </section>
</main>

<footer class="px-6 py-12 text-center text-base text-tinte/75">
  <Ornament art="wappen" class="mx-auto h-12 w-10 text-gold-dunkel" />
  <p class="mt-3">Palais Pianoforte ist eine erfundene Marke für ein Schulprojekt (ITP, 2026).</p>
  <p>Klavierklang: Salamander Grand Piano von Alexander Holm, Lizenz CC BY 3.0.</p>
  <p>Gebaut mit Blender, Three.js, Threlte, Svelte und Tailwind CSS.</p>
</footer>