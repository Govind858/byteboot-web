import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../projectData';           // ← assuming this is where projects lives
import type { Project } from '../types';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const title = titleRef.current;
    const cards = projectRefs.current.filter(Boolean); // remove nulls

    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
          },
        }
      );
    }

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 ref={titleRef} className="portfolio-title">
            Products
          </h2>
          <div className="header-underline"></div>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="project-card group"
            >
              <Link
                to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}
                className="project-image-link"
              >
                <div className="image-overlay" />
                <img
                  src={project.image}           // ← use the imported image directly
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="view-project-overlay">
                  <span className="view-project-btn">
                    View Project <ArrowRight size={18} />
                  </span>
                </div>
              </Link>

              <div className="project-content">
                <div className="project-header-row">
                  <h3 className="project-title">
                    <Link to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <span className="project-category">{project.category}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech-stack">
                  <div className="tech-tags">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;