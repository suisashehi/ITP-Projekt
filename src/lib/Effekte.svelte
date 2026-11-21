<!-- Effekte über dem Flügel: schwebende Noten beim Spielen und "Bravo!" mit Rosenblättern nach dem Konzert -->
<script>
  import { beiTaste } from './klang.js'
  import { ui } from './zustand.svelte.js'

  // ---------- schwebende Notenzeichen
  let noten = $state([])
  let nummer = 0
  $effect(() =>
    beiTaste(() => {
      const id = nummer++
      noten.push({ id, x: 12 + Math.random() * 76, zeichen: ['♪', '♫', '♩', '♬'][id % 4] })
      setTimeout(() => (noten = noten.filter((n) => n.id !== id)), 2200)
    })
  )

  // ---------- Bravo nach dem Konzert (5 Sekunden)
  let bravo = $state(false)
  $effect(() => {
    if (ui.bravo === 0) return
    bravo = true
    const timer = setTimeout(() => (bravo = false), 5000)
    return () => clearTimeout(timer)
  })

  // 30 Rosenblätter mit zufälligem Platz, Start und Tempo
  const BLAETTER = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    start: Math.random() * 1.8,
    dauer: 3 + Math.random() * 2,
    drehung: 180 + Math.random() * 540
  }))
</script>

{#each noten as note (note.id)}
  <span class="note" style="left: {note.x}%">{note.zeichen}</span>
{/each}

{#if bravo}
  <div class="bravo" role="status">
    {#each BLAETTER as b, i (i)}
      <span class="blatt" style="left: {b.x}%; animation-delay: {b.start}s; animation-duration: {b.dauer}s; --drehung: {b.drehung}deg"></span>
    {/each}
    <p>Bravo!</p>
  </div>
{/if}

<style>
  .note {
    position: absolute;
    bottom: 32%;
    z-index: 7;
    font-size: 1.7rem;
    color: #f6dc8f;
    text-shadow: 0 0 12px rgba(255, 190, 90, 0.8);
    pointer-events: none;
    animation: schweben 2.2s ease-out forwards;
  }
  @keyframes schweben {
    0% { opacity: 0; transform: translateY(0) scale(0.7); }
    15% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-200px) rotate(-15deg) scale(1.25); }
  }

  .bravo {
    position: absolute;
    inset: 0;
    z-index: 11;
    overflow: hidden;
    pointer-events: none;
  }
  .blatt {
    position: absolute;
    top: -30px;
    width: 18px;
    height: 13px;
    border-radius: 80% 0 80% 0;
    background: radial-gradient(circle at 30% 30%, #ff9aae, #b3162f);
    animation-name: fallen;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  @keyframes fallen {
    to { transform: translate(60px, 760px) rotate(var(--drehung)); }
  }
  .bravo p {
    position: absolute;
    top: 36%;
    width: 100%;
    text-align: center;
    font-family: var(--font-schrift);
    font-size: clamp(3.5rem, 9vw, 6.5rem);
    color: #f6dc8f;
    text-shadow: 0 2px 0 #3e0a12, 0 0 6px #3e0a12, 0 6px 30px rgba(0, 0, 0, 0.8);
    animation: erscheinen 5s ease forwards;
  }
  @keyframes erscheinen {
    0% { opacity: 0; transform: scale(0.8); }
    15% { opacity: 1; transform: scale(1); }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .note, .blatt { display: none; }
  }
</style>