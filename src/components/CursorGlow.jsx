import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import '../assets/styles/cursor.css'

export const CursorGlow = () => {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    gsap.set(glow, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const moveX = gsap.quickTo(glow, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveY = gsap.quickTo(glow, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
    }

    const onDown = () => {
      gsap.to(glow, { scale: 1.6, duration: 0.3, ease: 'power2.out' })
    }

    const onUp = () => {
      gsap.to(glow, { scale: 1, duration: 0.35, ease: 'power2.out' })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      gsap.killTweensOf(glow)
    }
  }, [])

  return createPortal(
    <div ref={glowRef} className="cursor-glow" aria-hidden="true" />,
    document.body,
  )
}
