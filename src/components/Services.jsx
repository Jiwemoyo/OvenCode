import '../assets/styles/services.css'

export const Services = () => {
  return (
    <article id="services-section">
      <div className="services-header">
        <span className="code-accent">{'> // WHAT_WE_FORGE'}</span>
        <h2>What we forge</h2>
        <p>
          Websites, web apps, games, APIs and the systems that hold them
          together. Every build leaves the oven production-ready.
        </p>
      </div>

      <div id="services" data-reveal-group>
        <div className="service-card div1">
          <div className="service-icon">
            <i className="fa-solid fa-globe" />
            <span className="code-accent">[WEB]</span>
          </div>
          <h3>Websites</h3>
          <p>
            Marketing sites, landing pages and content platforms that load fast
            and look sharp.
          </p>
        </div>

        <div className="services-core div2" data-parallax>
          <span className="core-heat" />
          <div className="core-hatch">
            <span className="core-rivet core-rivet--tl" />
            <span className="core-rivet core-rivet--tr" />
            <span className="core-rivet core-rivet--bl" />
            <span className="core-rivet core-rivet--br" />
            <span className="core-gauge">
              <i className="fa-solid fa-fire" /> 1400°C
            </span>
            <span className="core-slit" />
            <span className="core-glyph code-accent">{'</>'}</span>
            <span className="core-label code-accent">THE OVEN // FIRING</span>
          </div>
        </div>

        <div className="service-card div3">
          <div className="service-icon">
            <i className="fa-solid fa-window-maximize" />
            <span className="code-accent">[APP]</span>
          </div>
          <h3>Web Apps</h3>
          <p>
            Interactive product surfaces, dashboards and SaaS tools built with
            React and Vite.
          </p>
        </div>

        <div className="service-card div4">
          <div className="service-icon">
            <i className="fa-solid fa-gamepad" />
            <span className="code-accent">[GAME]</span>
          </div>
          <h3>Games &amp; Interactive</h3>
          <p>
            Browser games, 3D experiences and playable prototypes with real
            personality.
          </p>
        </div>

        <div className="service-card div5">
          <div className="service-icon">
            <i className="fa-solid fa-plug" />
            <span className="code-accent">[API]</span>
          </div>
          <h3>APIs &amp; Backends</h3>
          <p>
            Fast, well-shaped endpoints and data models that stay out of your
            way.
          </p>
        </div>

        <div className="service-card div6">
          <div className="service-icon">
            <i className="fa-solid fa-palette" />
            <span className="code-accent">[UI]</span>
          </div>
          <h3>Design Systems</h3>
          <p>
            Reusable components, tokens and motion rules that keep every screen
            consistent.
          </p>
        </div>

        <div className="service-card div7">
          <div className="service-icon">
            <i className="fa-solid fa-robot" />
            <span className="code-accent">[AI]</span>
          </div>
          <h3>AI &amp; Automation</h3>
          <p>
            Practical AI features and automations that feel like magic, not a
            bolted-on chatbot.
          </p>
        </div>
      </div>
    </article>
  )
}
