import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../assets/styles/scene.css'

gsap.registerPlugin(ScrollTrigger)

const COLORS = {
  steel: 0x2b2f35,
  darkSteel: 0x17191d,
  rust: 0x8a3b1e,
  molten: 0xff5a00,
  hot: 0xffb020,
  ember: 0xff3d00,
  code: 0x5eead4,
  fog: 0x0a0806,
}

const createRadialTexture = (inner, mid) => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, inner)
  gradient.addColorStop(0.35, mid)
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const createMoltenTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(128, 128, 8, 128, 128, 128)
  gradient.addColorStop(0, '#fff8d6')
  gradient.addColorStop(0.22, '#ffd166')
  gradient.addColorStop(0.5, '#ff6a00')
  gradient.addColorStop(0.78, '#a11d00')
  gradient.addColorStop(1, '#180604')
  context.fillStyle = gradient
  context.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 70; i += 1) {
    const angle = Math.random() * Math.PI * 2
    const radius = 20 + Math.random() * 105
    const x = 128 + Math.cos(angle) * radius
    const y = 128 + Math.sin(angle) * radius
    context.strokeStyle = `rgba(255, ${140 + Math.floor(Math.random() * 100)}, 30, ${0.15 + Math.random() * 0.35})`
    context.lineWidth = 1 + Math.random() * 2
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + (Math.random() - 0.5) * 26, y + (Math.random() - 0.5) * 26)
    context.stroke()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const createHazardTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 64
  const context = canvas.getContext('2d')
  context.fillStyle = '#f5c542'
  context.fillRect(0, 0, 512, 64)
  context.fillStyle = '#151515'
  for (let x = -64; x < 512; x += 64) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x + 32, 0)
    context.lineTo(x + 64, 64)
    context.lineTo(x + 32, 64)
    context.closePath()
    context.fill()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(6, 1)
  return texture
}

const createFloorTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')
  context.fillStyle = '#1b1d21'
  context.fillRect(0, 0, 256, 256)
  context.strokeStyle = 'rgba(120, 130, 140, 0.16)'
  context.lineWidth = 1
  for (let i = 0; i <= 256; i += 32) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, 256)
    context.stroke()
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(256, i)
    context.stroke()
  }
  context.strokeStyle = 'rgba(0, 0, 0, 0.22)'
  for (let i = -256; i < 512; i += 48) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i + 256, 256)
    context.stroke()
  }
  for (let i = 0; i < 90; i += 1) {
    context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.035})`
    context.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(18, 18)
  return texture
}

const createGear = (radius, teeth, thickness) => {
  const group = new THREE.Group()
  const material = new THREE.MeshStandardMaterial({
    color: COLORS.steel,
    metalness: 0.92,
    roughness: 0.32,
  })
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.72, radius * 0.14, 8, 40),
    material,
  )
  group.add(rim)
  const innerRim = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.4, radius * 0.06, 6, 32),
    material,
  )
  group.add(innerRim)
  const toothGeometry = new THREE.BoxGeometry(radius * 0.17, radius * 0.3, thickness)
  for (let i = 0; i < teeth; i += 1) {
    const angle = (i / teeth) * Math.PI * 2
    const tooth = new THREE.Mesh(toothGeometry, material)
    tooth.position.set(
      Math.cos(angle) * radius * 0.92,
      Math.sin(angle) * radius * 0.92,
      0,
    )
    tooth.rotation.z = angle
    group.add(tooth)
  }
  const spokeGeometry = new THREE.BoxGeometry(
    radius * 1.4,
    radius * 0.08,
    thickness * 0.8,
  )
  for (let i = 0; i < 4; i += 1) {
    const spoke = new THREE.Mesh(spokeGeometry, material)
    spoke.rotation.z = (i / 4) * Math.PI
    group.add(spoke)
  }
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.2, radius * 0.2, thickness * 1.5, 16),
    material,
  )
  hub.rotation.x = Math.PI / 2
  group.add(hub)
  return group
}

const createPipe = (points, radius, material) => {
  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
  )
  return new THREE.Mesh(
    new THREE.TubeGeometry(curve, 64, radius, 8, false),
    material,
  )
}

export const Scene3D = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motion = prefersReduced ? 0.2 : 1
    const textures = []

    const canvas = document.createElement('canvas')
    canvas.className = 'scene-3d__canvas'
    container.appendChild(canvas)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch (error) {
      console.warn('OvenCode: WebGL is not available in this browser.', error)
      canvas.remove()
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(COLORS.fog, 0.03)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0.4, 11)

    const ambient = new THREE.AmbientLight(0x3a2418, 1.1)
    scene.add(ambient)

    const furnaceLight = new THREE.PointLight(COLORS.molten, 120, 22, 2)
    furnaceLight.position.set(3.2, -0.2, 0.6)
    scene.add(furnaceLight)

    const emberLight = new THREE.PointLight(COLORS.hot, 45, 18, 2)
    emberLight.position.set(3.6, 2.8, -1)
    scene.add(emberLight)

    const steelLight = new THREE.DirectionalLight(0xa8c3d9, 0.7)
    steelLight.position.set(-5, 6, 6)
    scene.add(steelLight)

    const rimLight = new THREE.PointLight(0x4a8db8, 26, 24, 2)
    rimLight.position.set(-4, 1.5, -4)
    scene.add(rimLight)

    const world = new THREE.Group()
    world.position.x = window.innerWidth > 900 ? 1.1 : 0.1
    if (window.innerWidth <= 900) world.scale.setScalar(0.82)
    scene.add(world)

    const floorTexture = createFloorTexture()
    textures.push(floorTexture)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({
        map: floorTexture,
        color: 0x70767e,
        metalness: 0.55,
        roughness: 0.75,
      }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2
    world.add(floor)

    const hazardTexture = createHazardTexture()
    textures.push(hazardTexture)
    const hazardRing = new THREE.Mesh(
      new THREE.RingGeometry(1.55, 2.05, 64),
      new THREE.MeshStandardMaterial({
        map: hazardTexture,
        color: 0xffffff,
        metalness: 0.35,
        roughness: 0.6,
        side: THREE.DoubleSide,
      }),
    )
    hazardRing.rotation.x = -Math.PI / 2
    hazardRing.position.set(2.2, -1.94, -1.6)
    world.add(hazardRing)

    const furnace = new THREE.Group()
    furnace.position.set(2.2, -0.7, -1.6)
    world.add(furnace)

    const furnaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x30343b,
      metalness: 0.9,
      roughness: 0.38,
    })
    const rustMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.rust,
      metalness: 0.6,
      roughness: 0.55,
    })
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.darkSteel,
      metalness: 0.8,
      roughness: 0.45,
    })

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.35, 2.4, 40),
      furnaceMaterial,
    )
    furnace.add(body)

    const bandHeights = [-0.8, 0.15, 0.9]
    bandHeights.forEach((y) => {
      const band = new THREE.Mesh(
        new THREE.TorusGeometry(1.31, 0.045, 8, 48),
        y === 0.15 ? rustMaterial : darkMaterial,
      )
      band.rotation.x = Math.PI / 2
      band.position.y = y
      furnace.add(band)
    })

    const chimney = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.34, 3, 24),
      furnaceMaterial,
    )
    chimney.position.set(0.45, 2.7, -0.2)
    furnace.add(chimney)

    const chimneyCap = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.05, 8, 24),
      darkMaterial,
    )
    chimneyCap.rotation.x = Math.PI / 2
    chimneyCap.position.set(0.45, 4.2, -0.2)
    furnace.add(chimneyCap)

    const doorRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.085, 10, 48),
      darkMaterial,
    )
    doorRing.position.set(0, -0.05, 1.27)
    furnace.add(doorRing)

    const moltenTexture = createMoltenTexture()
    textures.push(moltenTexture)
    const moltenMaterial = new THREE.MeshBasicMaterial({
      map: moltenTexture,
      toneMapped: false,
    })
    const molten = new THREE.Mesh(new THREE.CircleGeometry(0.7, 48), moltenMaterial)
    molten.position.set(0, -0.05, 1.29)
    furnace.add(molten)

    const grateGeometry = new THREE.BoxGeometry(1.35, 0.045, 0.06)
    const grateYs = [-0.32, 0, 0.32]
    grateYs.forEach((y) => {
      const bar = new THREE.Mesh(grateGeometry, darkMaterial)
      bar.position.set(0, -0.05 + y, 1.36)
      furnace.add(bar)
    })
    const verticalGrateGeometry = new THREE.BoxGeometry(0.045, 1.35, 0.06)
    const grateXs = [-0.3, 0, 0.3]
    grateXs.forEach((x) => {
      const bar = new THREE.Mesh(verticalGrateGeometry, darkMaterial)
      bar.position.set(x, -0.05, 1.36)
      furnace.add(bar)
    })

    const rivetGeometry = new THREE.SphereGeometry(0.045, 8, 8)
    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2
      const rivet = new THREE.Mesh(rivetGeometry, darkMaterial)
      rivet.position.set(
        Math.cos(angle) * 0.98,
        -0.05 + Math.sin(angle) * 0.98,
        1.24,
      )
      furnace.add(rivet)
    }

    const glowTexture = createRadialTexture(
      'rgba(255, 248, 214, 1)',
      'rgba(255, 90, 0, 0.55)',
    )
    textures.push(glowTexture)
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xff7a1a,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const glow = new THREE.Sprite(glowMaterial)
    glow.scale.set(4.8, 4.8, 1)
    glow.position.set(0, -0.05, 1.5)
    furnace.add(glow)

    const pipeMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3f46,
      metalness: 0.88,
      roughness: 0.4,
    })
    const leftPipe = createPipe(
      [
        [-1.2, 0.2, 0],
        [-2.0, 0.2, 0.3],
        [-2.8, 0.2, 0.4],
        [-2.8, -0.8, 0.4],
        [-2.8, -1.9, 0.4],
      ],
      0.075,
      pipeMaterial,
    )
    furnace.add(leftPipe)
    const rightPipe = createPipe(
      [
        [1.1, 0.8, 0],
        [1.8, 1.5, 0.15],
        [3.0, 1.5, 0.15],
        [3.6, 0.9, 0.15],
        [3.6, -0.6, 0.15],
      ],
      0.065,
      pipeMaterial,
    )
    furnace.add(rightPipe)

    const valveMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.rust,
      metalness: 0.7,
      roughness: 0.5,
    })
    const valve = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.035, 8, 20),
      valveMaterial,
    )
    valve.position.set(-2.0, 0.2, 0.3)
    valve.rotation.y = Math.PI / 2
    furnace.add(valve)

    const gearOne = createGear(0.8, 12, 0.2)
    gearOne.position.set(0.2, 0.7, -1.8)
    world.add(gearOne)

    const gearTwo = createGear(0.7, 12, 0.18)
    gearTwo.position.set(5.6, 0.2, -1.6)
    world.add(gearTwo)

    const gearThree = createGear(1.1, 16, 0.24)
    gearThree.position.set(3.7, 2, -2.8)
    world.add(gearThree)

    const belt = new THREE.Group()
    belt.position.set(0.35, -1.72, 0.55)
    world.add(belt)
    const beltSurface = new THREE.Mesh(
      new THREE.BoxGeometry(3.7, 0.1, 0.9),
      new THREE.MeshStandardMaterial({
        color: 0x121315,
        metalness: 0.25,
        roughness: 0.9,
      }),
    )
    belt.add(beltSurface)
    const railGeometry = new THREE.BoxGeometry(3.7, 0.12, 0.08)
    const railZs = [-0.49, 0.49]
    railZs.forEach((z) => {
      const rail = new THREE.Mesh(railGeometry, darkMaterial)
      rail.position.set(0, 0.06, z)
      belt.add(rail)
    })
    const rollerGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 16)
    const rollerXs = [-1.6, -0.8, 0, 0.8, 1.6]
    rollerXs.forEach((x) => {
      const roller = new THREE.Mesh(rollerGeometry, pipeMaterial)
      roller.rotation.x = Math.PI / 2
      roller.position.set(x, -0.08, 0)
      belt.add(roller)
    })

    const ingotColors = [COLORS.molten, COLORS.hot, COLORS.code, COLORS.ember]
    const ingots = ingotColors.map((color, index) => {
      const ingot = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.32, 0.32),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.55,
          metalness: 0.4,
          roughness: 0.35,
        }),
      )
      ingot.position.set(-1.4 + index * 0.75, 0.24, 0)
      ingot.rotation.set(0.3, 0.4, 0.2)
      belt.add(ingot)
      return { mesh: ingot, speed: 0.35 + index * 0.05 }
    })

    const sparkTexture = createRadialTexture(
      'rgba(255, 255, 255, 1)',
      'rgba(255, 150, 40, 0.7)',
    )
    textures.push(sparkTexture)
    const sparkCount = 360
    const sparkPositions = new Float32Array(sparkCount * 3)
    const sparkColors = new Float32Array(sparkCount * 3)
    const sparkVelocities = new Float32Array(sparkCount * 3)
    const sparkLives = new Float32Array(sparkCount)
    const sparkColor = new THREE.Color()

    const resetSpark = (index, initial = false) => {
      sparkPositions[index * 3] = 2.2 + (Math.random() - 0.5) * 1.4
      sparkPositions[index * 3 + 1] = -0.5 + Math.random() * 0.6
      sparkPositions[index * 3 + 2] = -0.3 + (Math.random() - 0.5) * 0.8
      sparkVelocities[index * 3] = (Math.random() - 0.5) * 0.35
      sparkVelocities[index * 3 + 1] = 0.5 + Math.random() * 1.1
      sparkVelocities[index * 3 + 2] = (Math.random() - 0.5) * 0.3
      sparkLives[index] = initial ? Math.random() * 2.2 : 0
      sparkColor.setHex(
        [COLORS.molten, COLORS.hot, COLORS.ember, 0xffe3a3][
          Math.floor(Math.random() * 4)
        ],
      )
      sparkColors[index * 3] = sparkColor.r
      sparkColors[index * 3 + 1] = sparkColor.g
      sparkColors[index * 3 + 2] = sparkColor.b
    }

    for (let i = 0; i < sparkCount; i += 1) resetSpark(i, true)

    const sparkGeometry = new THREE.BufferGeometry()
    sparkGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(sparkPositions, 3),
    )
    sparkGeometry.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3))
    const sparkMaterial = new THREE.PointsMaterial({
      map: sparkTexture,
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial)
    world.add(sparks)

    const smokeTexture = createRadialTexture(
      'rgba(190, 180, 168, 0.55)',
      'rgba(120, 112, 104, 0.18)',
    )
    textures.push(smokeTexture)
    const smokeSprites = Array.from({ length: 7 }, (_, index) => {
      const material = new THREE.SpriteMaterial({
        map: smokeTexture,
        color: 0x9a8f84,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(material)
      const baseX = 2.65 + (Math.random() - 0.5) * 0.5
      const baseZ = -1.8 + (Math.random() - 0.5) * 0.5
      sprite.position.set(baseX, 3.3 + index * 0.4, baseZ)
      const scale = 1.4 + Math.random() * 1.6
      sprite.scale.set(scale, scale, 1)
      sprite.userData = {
        speed: 0.16 + Math.random() * 0.12,
        drift: (Math.random() - 0.5) * 0.12,
        baseX,
        phase: index * 0.9,
      }
      world.add(sprite)
      return sprite
    })

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onPointerMove = (event) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1
      pointer.targetY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)
      world.position.x = window.innerWidth > 900 ? 1.1 : 0.1
      world.scale.setScalar(window.innerWidth > 900 ? 1 : 0.82)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)

    let scrollProgress = 0
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress
      },
    })

    const clock = new THREE.Clock()
    let frameId = 0
    let running = true

    const render = () => {
      if (!running) return
      frameId = requestAnimationFrame(render)

      const delta = Math.min(clock.getDelta(), 0.05)
      const time = clock.elapsedTime
      pointer.x += (pointer.targetX - pointer.x) * 0.045
      pointer.y += (pointer.targetY - pointer.y) * 0.045

      furnace.position.y = -0.7 + Math.sin(time * 0.7) * 0.025 * motion
      furnace.rotation.y = Math.sin(time * 0.22) * 0.035 * motion

      glowMaterial.opacity = 0.3 + Math.sin(time * 2.4) * 0.07 * motion
      glow.scale.setScalar(4.7 + Math.sin(time * 1.8) * 0.15 * motion)
      furnaceLight.intensity = 115 + Math.sin(time * 3.1) * 22 * motion

      gearOne.rotation.z += 0.003 * motion
      gearTwo.rotation.z -= 0.0045 * motion
      gearThree.rotation.z += 0.0022 * motion

      ingots.forEach(({ mesh, speed }) => {
        mesh.position.x += speed * delta * motion
        mesh.rotation.x += 0.35 * delta * motion
        mesh.rotation.y += 0.5 * delta * motion
        if (mesh.position.x > 2.05) {
          mesh.position.x = -1.45
        }
      })

      for (let i = 0; i < sparkCount; i += 1) {
        sparkLives[i] += delta * motion
        sparkPositions[i * 3] += sparkVelocities[i * 3] * delta * motion
        sparkPositions[i * 3 + 1] += sparkVelocities[i * 3 + 1] * delta * motion
        sparkPositions[i * 3 + 2] += sparkVelocities[i * 3 + 2] * delta * motion
        if (sparkLives[i] > 2.2 || sparkPositions[i * 3 + 1] > 3.6) {
          resetSpark(i)
        }
      }
      sparkGeometry.attributes.position.needsUpdate = true
      sparkGeometry.attributes.color.needsUpdate = true

      smokeSprites.forEach((sprite) => {
        const { speed, drift, baseX, phase } = sprite.userData
        sprite.position.y += speed * delta * motion
        sprite.position.x =
          baseX +
          Math.sin(time * 0.35 + phase) * 0.16 +
          drift * Math.sin(time * 0.2 + phase)
        sprite.material.opacity = 0.1 + Math.sin(time * 0.6 + phase) * 0.025
        if (sprite.position.y > 6) {
          sprite.position.y = 3.1
        }
      })

      const targetZ = 11 - scrollProgress * 1.6
      camera.position.z += (targetZ - camera.position.z) * 0.04
      camera.position.x +=
        (pointer.x * 0.55 + scrollProgress * 0.5 - camera.position.x) * 0.04
      camera.position.y +=
        (0.4 - scrollProgress * 0.8 + pointer.y * 0.25 - camera.position.y) * 0.04
      camera.lookAt(1.2, -0.2 - scrollProgress * 0.3, 0)

      world.rotation.y +=
        (pointer.x * 0.09 + scrollProgress * 0.22 - world.rotation.y) * 0.025
      world.rotation.x +=
        (-pointer.y * 0.05 + scrollProgress * 0.08 - world.rotation.x) * 0.025

      renderer.render(scene, camera)
    }

    render()

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frameId)
      } else if (!running) {
        running = true
        clock.start()
        render()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      running = false
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      scrollTrigger.kill()

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      textures.forEach((texture) => texture.dispose())

      renderer.dispose()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [])

  return createPortal(
    <div ref={containerRef} className="scene-3d" aria-hidden="true" />,
    document.body,
  )
}
