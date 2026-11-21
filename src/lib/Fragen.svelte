<!-- Häufige Fragen. <details> klappt von selbst auf und zu, dafür braucht es kein JavaScript. -->
<script>
  const FRAGEN = [
    ['Wie spiele ich den Flügel?', 'Klicken Sie im 3D-Bild auf die Tasten. Oder spielen Sie mit Ihrer Computertastatur: A bis K sind die weißen Tasten, W E T Z U die schwarzen.'],
    ['Wie nehme ich eine eigene Melodie auf?', 'Unter dem kleinen Klavier auf „Melodie aufnehmen“ klicken, spielen und dann auf „Stopp“. Mit „Meine Melodie abspielen“ hören Sie sie, und der Flügel spielt mit.'],
    ['Kann ich meinen Flügel teilen?', 'Ja. Das Ketten-Symbol im Goldrahmen kopiert einen Link. Wer ihn öffnet, sieht genau Ihre Auswahl.'],
    ['Welche Optionen verändern die Form?', 'Der Deckel und die Bankhöhe. Dafür gibt es in Blender Shape Keys (Morph Targets), die im Browser gemischt werden.'],
    ['Woher kommt der Klang?', 'Es sind echte Aufnahmen eines Konzertflügels (Salamander Grand Piano). Dazu kommt der Hall eines großen Saals.'],
    ['Kann ich den Flügel kaufen?', 'Leider nein. Palais Pianoforte ist eine erfundene Marke für ein Schulprojekt.']
  ]
</script>

<div class="mt-10 space-y-3">
  {#each FRAGEN as [frage, antwort] (frage)}
    <details>
      <summary>{frage}</summary>
      <p>{antwort}</p>
    </details>
  {/each}
</div>

<style>
  details {
    background: var(--color-stuck);
    border: 1px solid rgba(184, 146, 58, 0.45);
  }
  summary {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.3rem;
    font-family: var(--font-display);
    font-size: 1.25rem;
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  /* Plus-Zeichen, wird beim Öffnen zum Minus */
  summary::after {
    content: '+';
    font-family: var(--font-text);
    font-size: 1.7rem;
    line-height: 1;
    color: var(--color-gold-dunkel);
  }
  details[open] summary::after {
    content: '−';
  }
  details p {
    padding: 0 1.3rem 1.1rem;
  }
</style>