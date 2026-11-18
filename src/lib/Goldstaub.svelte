<!-- Goldstaub: 400 kleine leuchtende Punkte, die langsam durch den Salon schweben -->
<script>
  import { T, useTask } from '@threlte/core'
  import { BufferGeometry, Float32BufferAttribute, CanvasTexture, AdditiveBlending } from 'three'
  import { config } from './zustand.svelte.js'

  // zufällige Positionen in einem Raum von 6 x 3 x 6 Metern
  const punkte = []
  for (let i = 0; i < 400; i++) {
    punkte.push((Math.random() - 0.5) * 6, Math.random() * 3, (Math.random() - 0.5) * 6)
  }
  const form = new BufferGeometry()
  form.setAttribute('position', new Float32BufferAttribute(punkte, 3))

  // ein weicher, runder Lichtpunkt (statt eckiger Pixel)
  const leinwand = document.createElement('canvas')
  leinwand.width = leinwand.height = 64
  const pinsel = leinwand.getContext('2d')
  const verlauf = pinsel.createRadialGradient(32, 32, 0, 32, 32, 32)
  verlauf.addColorStop(0, 'rgba(255,240,200,1)')
  verlauf.addColorStop(1, 'rgba(255,200,100,0)')
  pinsel.fillStyle = verlauf
  pinsel.fillRect(0, 0, 64, 64)
  const funke = new CanvasTexture(leinwand)

  let wolke = $state.raw()
  let zeit = 0
  useTask((delta) => {
    zeit += delta
    if (!wolke) return
    wolke.rotation.y += delta * 0.025 // dreht sich ganz langsam
    wolke.position.y = Math.sin(zeit * 0.4) * 0.08 // schwebt auf und ab
  })
</script>

<T.Points bind:ref={wolke} geometry={form}>
  <T.PointsMaterial
    map={funke}
    color="#ffd27a"
    size={config.licht === 'kerze' ? 0.05 : 0.03}
    opacity={config.licht === 'kerze' ? 0.95 : 0.5}
    transparent
    depthWrite={false}
    blending={AdditiveBlending}
  />
</T.Points>
