import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSiteAnimations = (scopeRef) => {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const cleanups = []

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      heroTimeline
        .from('.hero-copy > *', {
          y: 42,
          opacity: 0,
          duration: 0.9,
          stagger: 0.11,
        })
        .from(
          '.hero-terminal',
          {
            y: 60,
            opacity: 0,
            rotateX: -14,
            duration: 1.15,
          },
          0.15,
        )
        .from(
          '.hero-badge',
          {
            opacity: 0,
            duration: 0.55,
            stagger: 0.07,
          },
          0.75,
        )

      gsap.utils.toArray(scope.querySelectorAll('[data-reveal]')).forEach((element) => {
        gsap.from(element, {
          y: 46,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.utils
        .toArray(scope.querySelectorAll('[data-reveal-group]'))
        .forEach((group) => {
          gsap.from(gsap.utils.toArray(group.children), {
            scale: 0.94,
            opacity: 0,
            duration: 0.75,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          })
        })

      gsap.utils.toArray(scope.querySelectorAll('[data-parallax]')).forEach((element) => {
        gsap.to(element, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      gsap.fromTo(
        '.scroll-progress__bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        },
      )

      gsap.utils.toArray(scope.querySelectorAll('.service-card')).forEach((card) => {
        gsap.set(card, { transformPerspective: 900, transformOrigin: 'center' })

        const rotateX = gsap.quickTo(card, 'rotationX', {
          duration: 0.5,
          ease: 'power3.out',
        })
        const rotateY = gsap.quickTo(card, 'rotationY', {
          duration: 0.5,
          ease: 'power3.out',
        })
        const lift = gsap.quickTo(card, 'y', {
          duration: 0.4,
          ease: 'power3.out',
        })

        const onMove = (event) => {
          const rect = card.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width - 0.5
          const y = (event.clientY - rect.top) / rect.height - 0.5
          rotateY(x * 9)
          rotateX(-y * 9)
        }

        const onEnter = () => lift(-8)
        const onLeave = () => {
          rotateX(0)
          rotateY(0)
          lift(0)
        }

        card.addEventListener('pointerenter', onEnter)
        card.addEventListener('pointermove', onMove)
        card.addEventListener('pointerleave', onLeave)

        cleanups.push(() => {
          card.removeEventListener('pointerenter', onEnter)
          card.removeEventListener('pointermove', onMove)
          card.removeEventListener('pointerleave', onLeave)
        })
      })

      gsap.utils.toArray(scope.querySelectorAll('[data-magnetic]')).forEach((element) => {
        const moveX = gsap.quickTo(element, 'x', {
          duration: 0.4,
          ease: 'power3.out',
        })
        const moveY = gsap.quickTo(element, 'y', {
          duration: 0.4,
          ease: 'power3.out',
        })

        const onMove = (event) => {
          const rect = element.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2
          moveX(x * 0.18)
          moveY(y * 0.18)
        }

        const onLeave = () => {
          moveX(0)
          moveY(0)
        }

        element.addEventListener('pointermove', onMove)
        element.addEventListener('pointerleave', onLeave)

        cleanups.push(() => {
          element.removeEventListener('pointermove', onMove)
          element.removeEventListener('pointerleave', onLeave)
        })
      })
    }, scope)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [scopeRef])
}
