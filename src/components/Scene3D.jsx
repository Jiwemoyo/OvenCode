import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../assets/styles/scene.css'

gsap.registerPlugin(ScrollTrigger)

const PALETTE = [0x9b00ff, 0xff6a00, 0xff007f, 0x7dffc4]

export const Scene3D = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motion = prefersReduced ? 0.2 : 1

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

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x07040e, 0.035)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 11)

    scene.add(new THREE.AmbientLight(0x5a3a8a, 1.4))

    const keyLight = new THREE.PointLight(PALETTE[0], 80, 40)
    keyLight.position.set(5, 6, 7)
    const warmLight = new THREE.PointLight(PALETTE[1], 55, 40)
    warmLight.position.set(-6, -3, 6)
    const rimLight = new THREE.PointLight(PALETTE[2], 40, 40)
    rimLight.position.set(0, -6, -5)
    scene.add(keyLight, warmLight, rimLight)

    const world = new THREE.Group()
    world.position.set(window.innerWidth > 900 ? 1.1 : 0, 0, 0)
    scene.add(world)

    const coreGroup = new THREE.Group()
    world.add(coreGroup)

    const coreGeometry = new THREE.IcosahedronGeometry(1.75, 1)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x140b26,
      emissive: PALETTE[0],
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.22,
      flatShading: true,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    coreGroup.add(core)

    const wireGeometry = new THREE.WireframeGeometry(coreGeometry)
    const wireMaterial = new THREE.LineBasicMaterial({
      color: PALETTE[1],
      transparent: true,
      opacity: 0.55,
    })
    const coreWire = new THREE.LineSegments(wireGeometry, wireMaterial)
    coreWire.scale.setScalar(1.015)
    coreGroup.add(coreWire)

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 32, 32),
      new THREE.MeshBasicMaterial({
        color: PALETTE[0],
        transparent: true,
        opacity: 0.08,
      }),
    )
    coreGroup.add(glow)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: PALETTE[0],
      transparent: true,
      opacity: 0.32,
    })
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.014, 8, 160),
      ringMaterial,
    )
    ring.rotation.x = Math.PI / 2.4
    world.add(ring)

    const ringTwoMaterial = new THREE.MeshBasicMaterial({
      color: PALETTE[1],
      transparent: true,
      opacity: 0.24,
    })
    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(3.7, 0.01, 8, 160),
      ringTwoMaterial,
    )
    ringTwo.rotation.x = Math.PI / 1.7
    ringTwo.rotation.y = Math.PI / 5
    world.add(ringTwo)

    const shapeGeometries = [
      new THREE.BoxGeometry(0.42, 0.42, 0.42),
      new THREE.TetrahedronGeometry(0.36),
      new THREE.OctahedronGeometry(0.32),
      new THREE.BoxGeometry(0.26, 0.26, 0.26),
    ]

    const shapes = Array.from({ length: 12 }, (_, index) => {
      const color = PALETTE[index % PALETTE.length]
      const geometry = shapeGeometries[index % shapeGeometries.length]
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.6,
        roughness: 0.28,
        flatShading: true,
      })
      const mesh = new THREE.Mesh(geometry, material)
      const angle = (index / 12) * Math.PI * 2
      const radius = 3.5 + (index % 3) * 0.55
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.55,
        (index % 2 === 0 ? 1 : -1) * 0.9,
      )
      world.add(mesh)
      return {
        mesh,
        angle,
        radius,
        z: mesh.position.z,
        speed: 0.18 + (index % 4) * 0.035,
        phase: index * 0.7,
      }
    })

    const particleCount = 650
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 5 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.6

      color.setHex(PALETTE[Math.floor(Math.random() * PALETTE.length)])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

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
      world.position.x = window.innerWidth > 900 ? 1.1 : 0
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

    const intro = gsap.timeline()
    intro
      .from(coreGroup.scale, {
        x: 0.001,
        y: 0.001,
        z: 0.001,
        duration: 1.8,
        ease: 'expo.out',
      })
      .from(
        coreGroup.rotation,
        { y: Math.PI * 1.5, duration: 1.8, ease: 'expo.out' },
        0,
      )

    const clock = new THREE.Clock()
    let frameId = 0
    let running = true

    const render = () => {
      if (!running) return
      frameId = requestAnimationFrame(render)

      const time = clock.getElapsedTime()
      pointer.x += (pointer.targetX - pointer.x) * 0.045
      pointer.y += (pointer.targetY - pointer.y) * 0.045

      coreGroup.rotation.y += 0.0035 * motion
      coreGroup.rotation.x = Math.sin(time * 0.4) * 0.14 * motion
      coreGroup.position.y = Math.sin(time * 0.8) * 0.16 * motion

      const targetZ = 11 - scrollProgress * 3.2
      camera.position.z += (targetZ - camera.position.z) * 0.04
      camera.position.y +=
        (-scrollProgress * 2 + pointer.y * 0.35 - camera.position.y) * 0.04
      camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.04
      camera.lookAt(0, -scrollProgress * 0.6, 0)

      world.rotation.y +=
        (pointer.x * 0.32 + scrollProgress * Math.PI * 0.55 - world.rotation.y) *
        0.02
      world.rotation.x +=
        (-pointer.y * 0.18 + scrollProgress * 0.35 - world.rotation.x) * 0.02

      ring.rotation.z += 0.0014 * motion
      ringTwo.rotation.z -= 0.001 * motion

      shapes.forEach((shape) => {
        const angle = shape.angle + time * shape.speed * motion
        shape.mesh.position.x = Math.cos(angle) * shape.radius
        shape.mesh.position.y =
          Math.sin(angle) * shape.radius * 0.55 +
          Math.sin(time * 0.8 + shape.phase) * 0.2 * motion
        shape.mesh.position.z = shape.z + Math.sin(angle * 2) * 0.3
        shape.mesh.rotation.x += 0.01 * motion
        shape.mesh.rotation.y += 0.012 * motion
      })

      particles.rotation.y = time * 0.018 * motion
      particles.rotation.x = Math.sin(time * 0.08) * 0.05 * motion

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
      intro.kill()

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })

      renderer.dispose()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [])

  return createPortal(
    <div ref={containerRef} className="scene-3d" aria-hidden="true" />,
    document.body,
  )
}
