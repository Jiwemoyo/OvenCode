import '../assets/styles/about.css'

export const About = () => {
  return (
    <article className="article" id="about">
      <div className="about">
        <div className="about-content" data-reveal>
          <span className="code-accent">{'> // INSIDE_THE_FURNACE'}</span>
          <h2>
            Raw ideas in.{' '}
            <span className="gradient-text">Finished products out.</span>
          </h2>
          <p>
            We are a small crew of engineers and designers who run a software
            foundry. Websites, apps and games go in raw; they come out fast,
            accessible and genuinely fun to use. Every build is tempered with
            clean architecture, expressive motion and a lot of curiosity.
          </p>

          <div className="about-stats">
            <div>
              <strong>1400°C</strong>
              <span>ideas melted</span>
            </div>
            <div>
              <strong>12+</strong>
              <span>products forged</span>
            </div>
            <div>
              <strong>0</strong>
              <span>boring handoffs</span>
            </div>
          </div>
        </div>

        <div className="about-visual" data-reveal data-parallax aria-hidden="true">
          <div className="furnace-panel">
            <div className="furnace-panel__head">
              <span className="code-accent">FURNACE // MK-II</span>
              <span className="furnace-status">ONLINE</span>
            </div>

            <svg
              className="furnace-schematic"
              viewBox="0 0 420 360"
              role="presentation"
            >
              <defs>
                <linearGradient id="about-metal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a4048" />
                  <stop offset="100%" stopColor="#17191d" />
                </linearGradient>
                <radialGradient id="about-molten" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff8d6" />
                  <stop offset="30%" stopColor="#ffd166" />
                  <stop offset="65%" stopColor="#ff5a00" />
                  <stop offset="100%" stopColor="#5c1200" />
                </radialGradient>
                <pattern
                  id="about-hazard"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="24" height="24" fill="#f5c542" />
                  <rect width="12" height="24" fill="#17130f" />
                </pattern>
              </defs>

              <path className="pipe" d="M20 100 H80 V180 H120" />
              <path className="pipe pipe--hot" d="M300 78 H360 V220 H330" />
              <path className="pipe" d="M210 60 V20 H360" />
              <path className="pipe pipe--hot" d="M90 300 H180" />

              <rect
                x="120"
                y="95"
                width="180"
                height="190"
                rx="18"
                fill="url(#about-metal)"
                stroke="#5a6068"
                strokeWidth="2"
              />
              <rect
                x="132"
                y="107"
                width="156"
                height="166"
                rx="12"
                fill="#0d0b09"
                stroke="#3a4048"
              />
              <rect
                x="112"
                y="282"
                width="196"
                height="14"
                rx="4"
                fill="url(#about-hazard)"
                opacity="0.85"
              />

              <circle
                cx="210"
                cy="188"
                r="58"
                fill="#17130f"
                stroke="#5a6068"
                strokeWidth="5"
              />
              <circle
                className="furnace-core"
                cx="210"
                cy="188"
                r="44"
                fill="url(#about-molten)"
              />

              <g stroke="#17130f" strokeWidth="4" opacity="0.9">
                <line x1="172" y1="164" x2="248" y2="164" />
                <line x1="172" y1="188" x2="248" y2="188" />
                <line x1="172" y1="212" x2="248" y2="212" />
                <line x1="188" y1="148" x2="188" y2="228" />
                <line x1="210" y1="148" x2="210" y2="228" />
                <line x1="232" y1="148" x2="232" y2="228" />
              </g>

              <g fill="#5a6068">
                <circle cx="136" cy="111" r="3" />
                <circle cx="284" cy="111" r="3" />
                <circle cx="136" cy="269" r="3" />
                <circle cx="284" cy="269" r="3" />
              </g>

              <rect
                x="192"
                y="45"
                width="36"
                height="50"
                rx="6"
                fill="url(#about-metal)"
                stroke="#5a6068"
                strokeWidth="2"
              />
              <rect x="184" y="38" width="52" height="10" rx="4" fill="#3a4048" />

              <circle
                cx="304"
                cy="132"
                r="26"
                fill="#0d0b09"
                stroke="#5a6068"
                strokeWidth="4"
              />
              <path
                d="M304 132 L316 118"
                stroke="#ff5a00"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="304" cy="132" r="3" fill="#ffb020" />

              <rect x="48" y="292" width="120" height="8" rx="4" fill="#3a4048" />
              <rect
                className="ingot ingot--one"
                x="62"
                y="278"
                width="18"
                height="18"
                rx="3"
                fill="#ff5a00"
              />
              <rect
                className="ingot ingot--two"
                x="94"
                y="278"
                width="18"
                height="18"
                rx="3"
                fill="#ffb020"
              />
              <rect
                className="ingot ingot--three"
                x="126"
                y="278"
                width="18"
                height="18"
                rx="3"
                fill="#5eead4"
              />

              <text x="18" y="88" className="schematic-label">
                INTAKE
              </text>
              <text x="328" y="70" className="schematic-label">
                MELT
              </text>
              <text x="326" y="240" className="schematic-label">
                FORGE
              </text>
              <text x="44" y="330" className="schematic-label">
                SHIP
              </text>
            </svg>

            <div className="furnace-panel__foot">
              <span>
                HEAT <strong>1400°C</strong>
              </span>
              <span>
                PRESSURE <strong>NOMINAL</strong>
              </span>
              <span>
                OUTPUT <strong>WEB · APPS · GAMES</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
