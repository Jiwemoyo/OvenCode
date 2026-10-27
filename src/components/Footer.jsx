import '../assets/styles/footer.css'

export const Footer = () => {
  return (
    <footer id="footer">
      <p className="footer-brand">
        Oven_Code
        <span className="code-accent">{'> // BUILT_WITH_HEAT'}</span>
      </p>
      <p>&copy; 2026 OvenCode. All rights reserved.</p>
      <div className="footer-links">
        <a href="#about">About</a>|<a href="#services">Services</a>|
        <a href="#contact">Contact</a>
      </div>
      <div className="footer-tech">
        <span>React</span>
        <span>Three.js</span>
        <span>GSAP</span>
        <span>Vite</span>
      </div>
    </footer>
  )
}
