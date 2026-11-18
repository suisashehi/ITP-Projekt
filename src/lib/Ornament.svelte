<!-- Barocke Verzierungen als SVG. art: "linie" (Trenner), "ecke" (Rahmenecke), "wappen" (Logo) -->
<script>
  let { art = 'linie', class: klasse = '' } = $props()
</script>

{#if art === 'linie'}
  <svg class={klasse} viewBox="0 0 240 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" aria-hidden="true">
    <path d="M4 12 H86" />
    <path d="M154 12 H236" />
    <path d="M86 12 c9 0 13 -8 21 -8 c6 0 8 5 4 7 c-3 1.5 -6 -1 -4 -3" />
    <path d="M86 12 c9 0 13 8 21 8 c6 0 8 -5 4 -7 c-3 -1.5 -6 1 -4 3" />
    <path d="M154 12 c-9 0 -13 -8 -21 -8 c-6 0 -8 5 -4 7 c3 1.5 6 -1 4 -3" />
    <path d="M154 12 c-9 0 -13 8 -21 8 c-6 0 -8 -5 -4 -7 c3 -1.5 6 1 4 3" />
    <path d="M120 4 l7 8 l-7 8 l-7 -8 z" fill="currentColor" stroke="none" />
  </svg>
{:else if art === 'ecke'}
  <svg class={klasse} viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true">
    <path d="M6 76 V32 C6 17 17 6 32 6 H76" stroke-width="2.4" />
    <path d="M15 68 V35 C15 24 24 15 35 15 H68" stroke-width="1.2" />
    <path d="M32 6 c0 11 8 17 17 13 c6 -3 4 -11 -2 -10 c-4 1 -4 6 0 6" stroke-width="1.8" />
    <path d="M6 32 c11 0 17 8 13 17 c-3 6 -11 4 -10 -2 c1 -4 6 -4 6 0" stroke-width="1.8" />
    <circle cx="25" cy="25" r="4.5" fill="currentColor" stroke="none" />
  </svg>
{:else if art === 'wappen'}
  <svg class={klasse} viewBox="0 0 64 80" aria-hidden="true">
    <path d="M20 12 l6 -8 l6 6 l6 -6 l6 8 z" fill="currentColor" />
    <ellipse cx="32" cy="46" rx="25" ry="30" fill="none" stroke="currentColor" stroke-width="2.5" />
    <ellipse cx="32" cy="46" rx="20" ry="25" fill="none" stroke="currentColor" stroke-width="0.8" />
    <text x="32" y="57" text-anchor="middle" font-family="Pinyon Script, cursive" font-size="34" fill="currentColor">P</text>
  </svg>
{/if}
