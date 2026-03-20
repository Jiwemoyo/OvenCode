import "../assets/styles/about.css";
// import aboutImage from "../assets/icons/about.png"; // Original asset if exists

export const About = () => {
  return (
    <article className="article" id="about">
      <div className="about">
        <div className="about-content">
          <span className="code-accent">{"> // ABOUT_OVEN_CODE"}</span>
          <h2>The Architecture of Success</h2>
          <p>
            We don't just build websites; we engineer digital experiences. By merging
            high-level modern frameworks with a deep understanding of code performance
            and elegant architecture, OvenCode delivers solutions that scale indefinitely.
          </p>
        </div>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-3454628-2918517.png" alt="OvenCode Setup" className="about-img" />
      </div>
    </article>
  );
};
