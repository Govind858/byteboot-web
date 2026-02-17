// About.tsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="background-grid"></div>
      <div className="orb orb-top-left"></div>
      <div className="orb orb-bottom-right"></div>

      <div className="container">
        <header className="section-header">
          <h2>
            <span className="gradient-text">Who We Are</span>
          </h2>
          <div className="header-line"></div>
        </header>

        <div className="cards-grid">
          {/* Card 1 */}
          <div className="feature-card cyan-card">
            <div className="card-icon cyan-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 10 3 10 3 3" />
                <path d="M4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Lightning-Fast Innovation</h3>
            <p>
              ByteBoot transforms ambitious visions into production-ready digital
              products. We combine cutting-edge engineering with relentless
              execution to ship software that scales from day one.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card purple-card">
            <div className="card-icon purple-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <h3>Obsessive Craftsmanship</h3>
            <p>
              Every line of code, every pixel, every interaction is intentional.
              We blend world-class design with robust architecture to create
              experiences that users love and systems that never break.
            </p>
          </div>

          {/* Full-width card */}
          <div className="full-width-card">
            <h3 className="full-card-title">What We Build</h3>

            <div className="build-items">
              <div className="build-item">
                <div className="emoji">🤖</div>
                <h4>AI-Native Platforms</h4>
                <p>Machine learning, LLM integration, intelligent automation</p>
              </div>

              <div className="build-item">
                <div className="emoji">🎨</div>
                <h4>Immersive Experiences</h4>
                <p>3D web, real-time interactions, stunning interfaces</p>
              </div>

              <div className="build-item">
                <div className="emoji">☁️</div>
                <h4>Enterprise Cloud</h4>
                <p>Scalable infrastructure, microservices, DevOps excellence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tagline-wrapper">
          <p className="tagline">
            We don't just build software. We build{" "}
            <span>foundations for tomorrow's breakthroughs</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;