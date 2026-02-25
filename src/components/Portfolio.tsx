// src/components/Portfolio.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getProducts } from '../APIs/adminApi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Portfolio.css';

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  tech: string[];
}

const Portfolio: React.FC = () => {
  const titleRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProducts();

        let data = Array.isArray(response)
          ? response
          : response?.product ?? response?.products ?? response?.data ?? [];

        const normalized = data.map((item: any) => ({
          id: item._id || item.id || `proj-${Math.random().toString(36).slice(2, 9)}`,
          title: item.title || 'Untitled Project',
          image: item.image || '',
          description: item.description || 'No description available',
          category: item.category || 'Development',
          tech: Array.isArray(item.techStack) ? item.techStack : item.tech || [],
        }));

        if (isMounted) setProjects(normalized);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
        if (isMounted) setError('Failed to load projects. Please try again later.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Smooth wheel scrolling with momentum
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let wheelTimeout: number | undefined;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const atStart = track.scrollLeft <= 0;
      const atEnd = Math.abs(track.scrollLeft + track.clientWidth - track.scrollWidth) < 2;

      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) {
        return;
      }

      const scrollAmount = e.deltaY * 1.5;

      if (wheelTimeout) clearTimeout(wheelTimeout);

      track.style.scrollBehavior = 'smooth';
      track.scrollLeft += scrollAmount;

      wheelTimeout = setTimeout(() => {
        track.style.scrollBehavior = 'auto';
      }, 100);
    };

    track.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      track.removeEventListener('wheel', onWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, []);

  // Mouse drag scrolling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    trackRef.current.style.scrollBehavior = 'auto';
    trackRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  }, []);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">

        {/* Header */}
        <div ref={titleRef} className="portfolio-header">
          <h2 className="portfolio-title">Our <span>Products</span></h2>
          <p className="portfolio-subtitle">
            A showcase of our finest work — built with precision, designed to perform.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="portfolio-loading">
            <div className="portfolio-loading-track">
              {[0, 1, 2].map((i) => (
                <div key={i} className="portfolio-skeleton-card" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="portfolio-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="portfolio-retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="portfolio-empty">
            <p>No products available at the moment.</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && projects.length > 0 && (
          <div className="portfolio-scroll-container">
            <div
              ref={trackRef}
              className={`portfolio-track ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'grab' }}
            >
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="project-card"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Image area */}
                  <Link
                    to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}
                    className="card-img-wrap"
                    draggable="false"
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="card-img"
                        loading="lazy"
                        draggable="false"
                      />
                    )}

                    <span className="card-badge">{project.category}</span>

                    <span className="card-arrow-btn" aria-hidden="true">
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="card-body">
                    <h3 className="card-title">
                      <Link
                        to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}
                        draggable="false"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="card-desc">{project.description}</p>

                    {project.tech.length > 0 && (
                      <div className="card-tags">
                        {project.tech.slice(0, 3).map((t, idx) => (
                          <span key={`${t}-${idx}`} className="card-tag">{t}</span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="card-tag">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="card-divider" />

                    <div className="card-footer">
                      <Link
                        to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}
                        className="card-cta"
                        draggable="false"
                      >
                        View Project
                        <ArrowUpRight size={14} strokeWidth={2} className="card-cta-icon" />
                      </Link>
                      <div className="card-dot-indicator" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;