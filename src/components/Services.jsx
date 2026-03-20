import "../assets/styles/services.css";

// The icons here can be replaced by actual SVG components, or we rely on font-awesome
export const Services = () => {
  return (
    <article id="services-section">
      <div className="services-header">
        <span className="code-accent">{"> // SYS_MODULES"}</span>
        <h2>Explore our Capabilities</h2>
        <p>Discover how OvenCode powers your digital transformation with precision and modern stack tools.</p>
      </div>

      <div id="services">
        <div className="div1">
          <div className="service-icon"><span className="code-accent">[SEC]</span></div>
          <h3>Secure Authentication</h3>
          <p>Implement enterprise-grade security protocols with zero-trust architecture.</p>
        </div>
        <div className="div2">
          {/* We keep the central image as requested but integrated seamlessly */}
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-3454628-2918517.png" alt="Platform core" />
        </div>
        <div className="div3">
          <div className="service-icon"><span className="code-accent">[API]</span></div>
          <h3>RESTful Endpoints</h3>
          <p>High-performance backend services capable of handling thousands of requests.</p>
        </div>
        <div className="div4">
          <div className="service-icon"><span className="code-accent">[DB]</span></div>
          <h3>Cloud Storage</h3>
          <p>Seamless database integration and highly scalable data silos.</p>
        </div>
        <div className="div5">
          <div className="service-icon"><span className="code-accent">[UX]</span></div>
          <h3>Modern Interfaces</h3>
          <p>Provide fluid, user-centric frontends tailored to your needs.</p>
        </div>
        <div className="div6">
          <div className="service-icon"><span className="code-accent">[ML]</span></div>
          <h3>AI Integrations</h3>
          <p>Utilize intelligent models to predict and automate tasks.</p>
        </div>
        <div className="div7">
          <div className="service-icon"><span className="code-accent">[NET]</span></div>
          <h3>Global CDN</h3>
          <p>Deliver assets at lightning speed to users anywhere globally.</p>
        </div>
      </div>
    </article>
  );
};
