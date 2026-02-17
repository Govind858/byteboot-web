import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../projectData';
import type { Project } from '../types';
import neoTokyoImg from '../assets/ProjectScreenshots/neo_tokyo.png';
import trinityImg from '../assets/ProjectScreenshots/trinity.png';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  const projectImages: Record<string, string> = {
    'new-tokyo': neoTokyoImg,
    'neo-tokyo': neoTokyoImg,
    trinity: trinityImg,
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = projectRefs.current;

    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
          }
        }
      );
    }

    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2, // Stagger effect
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="portfolio-header">
          <h2 ref={titleRef} className="portfolio-title">
            Products
          </h2>
          <div className="header-underline"></div>
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {(projects as Project[]).map((project, index) => {
            const imageSrc = projectImages[project.id] || neoTokyoImg;

            return (
              <article
                key={project.id}
                ref={el => projectRefs.current[index] = el}
                className="project-card group"
              >
                {/* Image Card */}
                <Link to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`} className="project-image-link">
                  <div className="image-overlay" />
                  <img
                    src={imageSrc}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  {/* Overlay Button - Visible on Hover */}
                  <div className="view-project-overlay">
                    <span className="view-project-btn">
                      View Project <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="project-content">
                  <div className="project-header-row">
                    <h3 className="project-title">
                      <Link to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <span className="project-category">
                      {project.category}
                    </span>
                  </div>

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* Tech Stack - Minimal */}
                  <div className="project-tech-stack">
                    <div className="tech-tags">
                      {project.tech.map(t => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;