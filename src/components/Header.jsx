import { useEffect, useState } from 'react'
import '../assets/styles/header.css'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header id="header" className={isScrolled ? 'is-scrolled' : ''}>
      <a className="title" href="#hero" onClick={closeMenu} aria-label="OvenCode home">
        <img src="/ovenLogo.png" alt="OvenCode logo" id="header-img" />
        <h1>
          Oven_Code
          <span className="code-accent title-cursor">_</span>
        </h1>
      </a>

      <button
        type="button"
        className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="nav-bar"
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="nav-bar" className={isMenuOpen ? 'active' : ''}>
        <a href="#about" className="nav-link" onClick={closeMenu}>
          About <span className="code-accent">_01</span>
        </a>
        <a href="#services" className="nav-link" onClick={closeMenu}>
          Services <span className="code-accent">_02</span>
        </a>
        <a href="#contact" className="btn-nav" data-magnetic onClick={closeMenu}>
          {'// CONNECT'}
        </a>
      </nav>
    </header>
  )
}
