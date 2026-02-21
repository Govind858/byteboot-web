// src/components/Portfolio.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProducts } from '../APIs/adminApi';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  tech: string[];
}

const Portfolio: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Smooth scroll animation frame
const scrollAnimationFrame = useRef<number | null>(null);

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
    return () => {
      isMounted = false;
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }
    };
  }, []);

  // Title animation
  useEffect(() => {
    if (loading || error || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading, error]);

  // Smooth wheel scrolling with momentum
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

  let wheelTimeout: number | undefined;   // or just number    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const atStart = track.scrollLeft <= 0;
      const atEnd = Math.abs(track.scrollLeft + track.clientWidth - track.scrollWidth) < 2;

      // Allow normal vertical page scroll when at edges
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) {
        return;
      }

      // Smooth scroll with easing
      const scrollAmount = e.deltaY * 1.5;
      
      // Clear any existing timeout
      if (wheelTimeout) clearTimeout(wheelTimeout);
      
      // Add smooth scroll behavior
      track.style.scrollBehavior = 'smooth';
      track.scrollLeft += scrollAmount;
      
      // Remove smooth behavior after scrolling stops
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
    
    // Disable smooth scrolling during drag
    trackRef.current.style.scrollBehavior = 'auto';
    trackRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    
    e.preventDefault();
    
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    trackRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  }, []);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 ref={titleRef} className="portfolio-title">
            Products
          </h2>
          <div className="header-underline" />
        </div>

        {loading && (
          <div className="portfolio-loading">
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="portfolio-error">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="portfolio-retry-btn"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="portfolio-empty">
            <p>No products available at the moment.</p>
          </div>
        )}

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
              {projects.map((project) => (
                <article key={project.id} className="project-card">
                  <Link
                    to={`/project/${project.id === 'new-tokyo' ? 'neo-tokyo' : project.id}`}
                    className="project-image-link"
                    draggable="false"
                  >
                    <div className="image-overlay" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                      draggable="false"
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

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="tech-tags">
                      {project.tech.map((techItem, idx) => (
                        <span key={`${techItem}-${idx}`}>{techItem}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Optional scroll indicators */}
            <div className="scroll-fade-left" />
            <div className="scroll-fade-right" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;