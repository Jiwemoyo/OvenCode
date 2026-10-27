import '../assets/styles/about.css'

export const About = () => {
  return (
    <article className="article" id="about">
      <div className="about">
        <div className="about-content" data-reveal>
          <span className="code-accent">{'> // INSIDE_THE_OVEN'}</span>
          <h2>
            Code is our <span className="gradient-text">playground.</span>
          </h2>
          <p>
            We are a small crew of engineers and designers who treat software
            like a toy box. Every project starts with one question: what would
            make this genuinely fun to use? Then we build it with clean
            architecture, expressive motion and a lot of curiosity.
          </p>

          <div className="about-stats">
            <div>
              <strong>12+</strong>
              <span>products shipped</span>
            </div>
            <div>
              <strong>3D</strong>
              <span>first interfaces</span>
            </div>
            <div>
              <strong>0</strong>
              <span>boring handoffs</span>
            </div>
          </div>
        </div>

        <div className="about-visual" data-reveal data-parallax aria-hidden="true">
          <span className="orbit orbit--one" />
          <span className="orbit orbit--two" />
          <span className="orbit orbit--three" />
          <div className="orbit-core">
            <span className="code-accent">{'</>'}</span>
          </div>
          <span className="tech-chip tech-chip--1">Product</span>
          <span className="tech-chip tech-chip--2">Design</span>
          <span className="tech-chip tech-chip--3">Code</span>
          <span className="tech-chip tech-chip--4">Motion</span>
        </div>
      </div>
    </article>
  )
}
