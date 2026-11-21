<!--
  Die 3D-Szene: lädt den Flügel aus Blender (GLB) und überträgt die Auswahl
  aus dem Bedienfeld auf Materialien und Morph Targets.
-->
<script>
  import { T, useThrelte, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { untrack } from 'svelte'
  import { Tween } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { PMREMGenerator, Raycaster, Vector2 } from 'three'
  import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { config, ui } from './zustand.svelte.js'
  import { LACK, OBERFLAECHE, METALL, INNENRAUM, POLSTER, KLAVIATUR, ANSICHTEN, KERZEN, finde } from './data.js'
  import { spieleNote, beiTaste } from './klang.js'

  // 1. Modell laden. Danach finden wir alles über die Namen aus Blender:
  //    gltf.nodes.Key_C4, gltf.materials.Lacquer_White, ...
  let gltf = $state.raw(null)
  new GLTFLoader().load('./models/piano.glb', (geladen) => {
    const nodes = {}
    const materials = {}
    geladen.scene.traverse((objekt) => {
      nodes[objekt.name] = objekt
      if (objekt.material) materials[objekt.material.name] = objekt.material
    })
    materials.ContactShadow.depthWrite = false // weicher Schatten unter dem Flügel
    gltf = { scene: geladen.scene, nodes, materials }
    ui.geladen = true
    config.deckel = 1 // Deckel öffnet sich
  })

  // 2. Spiegelungen im Lack: eine eingebaute Studio-Umgebung
  const { renderer, scene } = useThrelte()
  scene.environment = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture
  renderer.toneMappingExposure = 1.3

  // ---------- Kamera: fährt weich zur gewählten Ansicht
  let kamera = $state.raw()
  let steuerung = $state.raw()
  const kameraPos = new Tween(ANSICHTEN.gesamt.pos, { duration: 1400, easing: cubicInOut })
  const kameraBlick = new Tween(ANSICHTEN.gesamt.blick, { duration: 1400, easing: cubicInOut })

  $effect(() => {
    ui.ansichtZaehler // läuft bei jedem Klick auf eine Ansicht
    untrack(() => {
      if (!kamera || !steuerung) return
      // von dort starten, wo die Kamera gerade ist
      kameraPos.set(kamera.position.toArray(), { duration: 0 })
      kameraBlick.set(steuerung.target.toArray(), { duration: 0 })
      kameraPos.target = ANSICHTEN[ui.ansicht].pos
      kameraBlick.target = ANSICHTEN[ui.ansicht].blick
    })
  })

  // Während Musik spielt, fährt die Kamera langsam um den Flügel
  $effect(() => {
    if (!steuerung) return
    steuerung.autoRotate = ui.spielt
    steuerung.autoRotateSpeed = 0.7
  })

  // ---------- Deckel öffnen und schließen (Morph Targets aus Blender)
  // Der Tween macht jede Änderung weich, auch das Öffnen nach dem Laden.
  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const deckel = Tween.of(() => config.deckel, {
    duration: (von, nach) => (ruhig ? 0 : Math.abs(nach - von) * 2200),
    easing: cubicInOut
  })

  function setzeMorph(name, wert) {
    gltf.scene.traverse((objekt) => {
      const nummer = objekt.morphTargetDictionary?.[name]
      if (nummer !== undefined) objekt.morphTargetInfluences[nummer] = wert
    })
  }

  $effect(() => {
    if (!gltf) return
    // In Blender gibt es vier Stufen: 25 %, 50 %, 75 % und 100 % geschlossen.
    // Zwischen zwei Stufen wird gemischt, so bewegt sich der Deckel auf einem Bogen.
    const zu = (1 - deckel.current) * 4 // 0 = offen ... 4 = geschlossen
    ;[25, 50, 75, 100].forEach((stufe, i) => {
      const anteil = Math.max(0, 1 - Math.abs(zu - (i + 1)))
      setzeMorph('Lid_' + stufe, anteil)
      setzeMorph('Prop_' + stufe, anteil)
    })
  })

  $effect(() => {
    if (gltf) setzeMorph('Bench_High', config.bank) // Bank höher
  })

  // ---------- Farben und Materialien
  $effect(() => {
    if (!gltf) return
    const m = gltf.materials

    m.Lacquer_White.color.set(finde(LACK, config.lack).farbe)
    Object.assign(m.Lacquer_White, finde(OBERFLAECHE, config.oberflaeche).werte)

    const metall = finde(METALL, config.metall)
    m.Brass_Polished.color.set(metall.farbe)
    m.Brass_Polished.roughness = metall.rauheit

    m.Inside_Color.color.set(finde(INNENRAUM, config.innenraum).farbe)

    const polster = finde(POLSTER, config.polster)
    m.Leather_Black.color.set(polster.farbe)
    m.Leather_Black.roughness = polster.rauheit
    m.Leather_Black.sheen = polster.samt ? 1 : 0.1 // Samt schimmert
    m.Leather_Black.sheenColor.set(polster.farbe).offsetHSL(0, 0, 0.25)

    const tasten = finde(KLAVIATUR, config.klaviatur)
    m.Keys_Ivory.color.set(tasten.weiss)
    m.Keys_Ebony.color.set(tasten.schwarz)
  })

  // ---------- Ausstattung und Licht
  const abend = $derived(config.licht === 'kerze')

  $effect(() => {
    if (!gltf) return
    gltf.nodes.Kandelaber_L.visible = config.kandelaber
    gltf.nodes.Kandelaber_R.visible = config.kandelaber
  })

  $effect(() => {
    scene.environmentIntensity = abend ? 0.1 : 1
  })

  // ---------- Tasten spielen
  function drueckeTaste(note) {
    const taste = gltf?.nodes['Key_' + note]
    if (!taste) return
    taste.rotation.x = 0.06 // Taste geht nach unten ...
    setTimeout(() => (taste.rotation.x = 0), 220) // ... und wieder hoch
  }

  // Klick auf die Leinwand: welche Taste liegt unter der Maus?
  const strahl = new Raycaster()
  function klick(ev) {
    if (!gltf || !kamera) return
    const rand = renderer.domElement.getBoundingClientRect()
    const maus = new Vector2(
      ((ev.clientX - rand.left) / rand.width) * 2 - 1,
      -((ev.clientY - rand.top) / rand.height) * 2 + 1
    )
    strahl.setFromCamera(maus, kamera)
    const treffer = strahl.intersectObject(gltf.nodes.Keyboard, true)[0]
    if (!treffer) return
    const note = treffer.object.name.replace('Key_', '') // "Key_C4" -> "C4"
    spieleNote(note) // spielt den Ton, die Taste bewegt sich über beiTaste
  }
  $effect(() => {
    renderer.domElement.addEventListener('pointerdown', klick)
    return () => renderer.domElement.removeEventListener('pointerdown', klick)
  })

  // Jede gespielte Note (Klick, Computertastatur, Melodie) drückt die 3D-Taste
  $effect(() => beiTaste(drueckeTaste))

  // ---------- Kerzen flackern
  let kerzenLichter = $state([])
  let zeit = 0
  useTask((delta) => {
    zeit += delta
    const flackern = 0.85 + 0.15 * Math.sin(zeit * 13) * Math.sin(zeit * 7.3)
    const hell = config.kandelaber ? (abend ? 28 : 2) : 0
    kerzenLichter.forEach((licht) => licht && (licht.intensity = hell * flackern))
    if (gltf) gltf.materials.Flame.emissiveIntensity = (abend ? 26 : 12) * flackern
  })
</script>

<T.PerspectiveCamera makeDefault fov={32} position={kameraPos.current} bind:ref={kamera}>
  <OrbitControls
    bind:ref={steuerung}
    target={kameraBlick.current}
    enableDamping
    enablePan={false}
    minDistance={1}
    maxDistance={8.5}
    maxPolarAngle={1.47}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[-3, 5, 4]} intensity={abend ? 0.06 : 1.5} color="#fff2e0" />
<T.DirectionalLight position={[-1, 3, -5]} intensity={abend ? 0.3 : 0.6} color="#d6e2ff" />
{#each KERZEN as position, i}
  <T.PointLight {position} color="#ffab55" distance={8} decay={2} bind:ref={kerzenLichter[i]} />
{/each}

{#if gltf}
  <T is={gltf.scene} />
{/if}