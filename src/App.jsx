import { useEffect, useRef } from 'react'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './components/About'
import { Scene3D } from './components/Scene3D'
import { CursorGlow } from './components/CursorGlow'
import { useSiteAnimations } from './hooks/useSiteAnimations'

export const App = () => {
  const appRef = useRef(null)
  useSiteAnimations(appRef)

  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash === '#') return

    let target
    try {
      target = document.querySelector(hash)
    } catch {
      return
    }
    if (!target) return

    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 96)
    root.style.scrollBehavior = previousBehavior
  }, [])

  return (
    <>
      <Scene3D />
      <CursorGlow />
      <div className="app-content" ref={appRef}>
        <div className="scroll-progress" aria-hidden="true">
          <span className="scroll-progress__bar" />
        </div>
        <Header />
        <Hero />
        <About />
        <Services />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
