import '../assets/styles/services.css'

export const Services = () => {
  return (
    <article id="services-section">
      <div className="services-header">
        <span className="code-accent">{'> // WHAT_WE_BAKE'}</span>
        <h2>Modules we ship</h2>
        <p>
          From first sketch to production deploy, we build the whole stack with
          a bias for delight and a soft spot for weird ideas.
        </p>
      </div>

      <div id="services" data-reveal-group>
        <div className="service-card div1">
          <div className="service-icon">
            <i className="fa-solid fa-window-maximize" />
            <span className="code-accent">[WEB]</span>
          </div>
          <h3>Web Applications</h3>
          <p>
            Interactive product surfaces built with React, Vite and a healthy
            obsession with detail.
          </p>
        </div>

        <div className="services-core div2" data-parallax>
          <div className="core-rings">
            <span className="core-ring core-ring--1" />
            <span className="core-ring core-ring--2" />
            <span className="core-ring core-ring--3" />
          </div>
          <div className="core-glyph code-accent">{'</>'}</div>
          <span className="core-label code-accent">build_mode: playful</span>
        </div>

        <div className="service-card div3">
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

        <div className="service-card div4">
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

        <div className="service-card div5">
          <div className="service-icon">
            <i className="fa-solid fa-cloud" />
            <span className="code-accent">[OPS]</span>
          </div>
          <h3>Cloud &amp; DevOps</h3>
          <p>
            CI/CD, observability and infrastructure that scales without the
            drama.
          </p>
        </div>

        <div className="service-card div6">
          <div className="service-icon">
            <i className="fa-solid fa-robot" />
            <span className="code-accent">[AI]</span>
          </div>
          <h3>AI Integrations</h3>
          <p>
            Practical AI features that feel like magic, not a chatbot bolted
            onto the sidebar.
          </p>
        </div>

        <div className="service-card div7">
          <div className="service-icon">
            <i className="fa-solid fa-gauge-high" />
            <span className="code-accent">[QA]</span>
          </div>
          <h3>QA &amp; Performance</h3>
          <p>
            Accessibility, testing and performance budgets baked in from day
            one.
          </p>
        </div>
      </div>
    </article>
  )
}
