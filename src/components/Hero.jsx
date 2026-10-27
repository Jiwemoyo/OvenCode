import '../assets/styles/hero.css'

const TECH = [
  'React',
  'Three.js',
  'GSAP',
  'Vite',
  'Node',
  'AI',
  'WebGL',
  'Motion',
]

export const Hero = () => {
  return (
    <section id="hero">
      <div className="content hero-copy">
        <span className="code-accent subtitle">{'> // OVEN_CODE_INIT'}</span>
        <h2>
          We bake <span className="gradient-text">playful software.</span>
        </h2>
        <p>
          OvenCode is a creative software studio. We blend product thinking,
          3D and buttery motion to ship web apps people actually want to play
          with.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary" data-magnetic>
            Start a project <span className="code-accent">_</span>
          </a>
          <a href="#services" className="btn-outline" data-magnetic>
            Explore the lab
          </a>
        </div>

        <div className="hero-meta">
          <span className="status-dot" />
          <span>Available for new builds</span>
          <span className="hero-meta__sep">/</span>
          <span>React · Three.js · GSAP</span>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-terminal">
          <div className="terminal-bar">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="terminal-title">ovencode@lab: ~/build</span>
          </div>

          <div className="terminal-body">
            <div className="code-line">
              <span className="code-keyword">const</span>{' '}
              <span className="code-var">idea</span> ={' '}
              <span className="code-keyword">await</span>{' '}
              <span className="code-fn">oven.bake</span>({'{'}
            </div>
            <div className="code-line">
              {'  '}stack: [<span className="code-string">&apos;react&apos;</span>,{' '}
              <span className="code-string">&apos;three&apos;</span>,{' '}
              <span className="code-string">&apos;gsap&apos;</span>],
            </div>
            <div className="code-line">
              {'  '}vibe: <span className="code-string">&apos;playful&apos;</span>,
            </div>
            <div className="code-line">
              {'  '}ship: <span className="code-keyword">true</span>
            </div>
            <div className="code-line">{'})'}</div>
            <div className="code-line">
              <span className="code-comment">{'// now make it unforgettable'}</span>
            </div>
            <div className="code-line">
              <span className="code-cursor">▌</span>
            </div>
          </div>

          <div className="terminal-footer">
            <span className="code-accent">build: passing</span>
            <span className="code-accent">vibe: playful</span>
          </div>
        </div>

        <span className="hero-badge hero-badge--react">
          <i className="fa-brands fa-react" /> React
        </span>
        <span className="hero-badge hero-badge--three">
          <i className="fa-solid fa-cube" /> Three.js
        </span>
        <span className="hero-badge hero-badge--gsap">
          <i className="fa-solid fa-bolt" /> GSAP
        </span>
        <span className="hero-badge hero-badge--mint">
          <i className="fa-solid fa-wand-magic-sparkles" /> playful
        </span>
      </div>

      <div className="tech-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TECH, ...TECH].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
