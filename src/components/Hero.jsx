import '../assets/styles/hero.css'

const TECH = [
  'Websites',
  'Web Apps',
  'Games',
  'React',
  'Three.js',
  'GSAP',
  'Node',
  'AI',
  'Vite',
  '1400°C',
]

export const Hero = () => {
  return (
    <section id="hero">
      <div className="content hero-copy">
        <span className="code-accent subtitle">{'> // OVEN_CODE_INIT'}</span>
        <h2>
          We forge <span className="gradient-text">playful software.</span>
        </h2>
        <p>
          OvenCode is an industrial-grade software studio. We melt product
          thinking, 3D and motion into websites, apps and games people actually
          want to play with.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary" data-magnetic>
            Start a build <span className="code-accent">_</span>
          </a>
          <a href="#services" className="btn-outline" data-magnetic>
            Enter the forge
          </a>
        </div>

        <div className="hero-meta">
          <span className="status-dot" />
          <span>Firing up new builds</span>
          <span className="hero-meta__sep">/</span>
          <span>Web · Apps · Games</span>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-terminal">
          <div className="terminal-bar">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="terminal-title">ovencode@forge: ~/melt</span>
          </div>

          <div className="terminal-body">
            <div className="code-line">
              <span className="code-keyword">const</span>{' '}
              <span className="code-var">build</span> ={' '}
              <span className="code-keyword">await</span>{' '}
              <span className="code-fn">oven.forge</span>({'{'}
            </div>
            <div className="code-line">
              {'  '}stack: [<span className="code-string">&apos;react&apos;</span>,{' '}
              <span className="code-string">&apos;three&apos;</span>,{' '}
              <span className="code-string">&apos;gsap&apos;</span>],
            </div>
            <div className="code-line">
              {'  '}output: [<span className="code-string">&apos;web&apos;</span>,{' '}
              <span className="code-string">&apos;apps&apos;</span>,{' '}
              <span className="code-string">&apos;games&apos;</span>],
            </div>
            <div className="code-line">
              {'  '}heat: <span className="code-number">1400</span>,
            </div>
            <div className="code-line">
              {'  '}ship: <span className="code-keyword">true</span>
            </div>
            <div className="code-line">{'})'}</div>
            <div className="code-line">
              <span className="code-comment">
                {'// tempered, tested, shipped'}
              </span>
            </div>
            <div className="code-line">
              <span className="code-cursor">▌</span>
            </div>
          </div>

          <div className="terminal-footer">
            <span className="code-accent">heat: 1400°c</span>
            <span className="code-accent">build: passing</span>
          </div>
        </div>

        <span className="hero-badge hero-badge--intake">
          <i className="fa-solid fa-arrow-right-to-bracket" /> Intake
        </span>
        <span className="hero-badge hero-badge--melt">
          <i className="fa-solid fa-fire" /> Melt
        </span>
        <span className="hero-badge hero-badge--forge">
          <i className="fa-solid fa-hammer" /> Forge
        </span>
        <span className="hero-badge hero-badge--ship">
          <i className="fa-solid fa-truck-fast" /> Ship
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
