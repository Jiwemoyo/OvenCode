import "../assets/styles/hero.css";

export const Hero = () => {
  return (
    <section id="hero">
      <div className="content">
        <span className="code-accent subtitle">{"> // OVEN_CODE_INIT"}</span>
        <h2>A Smart Landing Page Creation</h2>
        <p>
          Streamline your process with our latest intelligent sorting and design solutions.
          At OvenCode, we specialize in high-converting pages.
        </p>
        <div className="hero-actions">
          <a href="#video" className="btn-primary">Get Started <span className="code-accent">_</span></a>
          <a href="#video" className="btn-outline">Watch Video</a>
        </div>
      </div>
      
      {/* 3D Graphic retained as requested but with refined glows */}
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-3454628-2918517.png" alt="OvenCode Platform" />
    </section>
  );
};
