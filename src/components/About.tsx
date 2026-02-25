// About.tsx
import { motion } from 'framer-motion';
import "./About.css";
import { Bot, Palette, Cloud } from 'lucide-react';

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: EASE_OUT },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0.78 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 22, delay: i * 0.18 },
  }),
};

const buildItemVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: 0.3 + i * 0.12, ease: 'easeOut' as const },
  }),
};

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="background-grid"></div>
      <div className="orb orb-top-left"></div>
      <div className="orb orb-bottom-right"></div>

      <div className="container">
        {/* Heading — fade up */}
        <motion.header
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>
            <span className="gradient-text">Who We Are</span>
          </h2>
          <div className="header-line"></div>
        </motion.header>

        {/* Cards — pop / spring scale, staggered */}
        <motion.div
          className="cards-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="feature-card cyan-card" custom={0} variants={popIn}>
            <div className="card-icon cyan-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          </motion.div>

          <motion.div className="feature-card purple-card" custom={1} variants={popIn}>
            <div className="card-icon purple-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          </motion.div>

          <motion.div className="full-width-card" custom={2} variants={popIn}>
            <h3 className="full-card-title">What We Build</h3>
            <motion.div
              className="build-items"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { icon: <Bot className="build-icon" size={32} strokeWidth={1.8} />, title: 'AI-Native Platforms', desc: 'Machine learning, LLM integration, intelligent automation' },
                { icon: <Palette className="build-icon" size={32} strokeWidth={1.8} />, title: 'Immersive Experiences', desc: '3D web, real-time interactions, stunning interfaces' },
                { icon: <Cloud className="build-icon" size={32} strokeWidth={1.8} />, title: 'Enterprise Cloud', desc: 'Scalable infrastructure, microservices, DevOps excellence' },
              ].map((item, i) => (
                <motion.div key={item.title} className="build-item" custom={i} variants={buildItemVariant}>
                  {item.icon}
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Tagline — fade up last */}
        <motion.div
          className="tagline-wrapper"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.5}
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className="tagline">
            We don't just build software. We build{" "}
            <span>foundations for tomorrow's breakthroughs</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;