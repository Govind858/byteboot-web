import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { projects } from '../projectData';
import type { Project } from '../types';
import neoTokyoImg from '../assets/ProjectScreenshots/neo_tokyo.png';
import trinityImg from '../assets/ProjectScreenshots/trinity.png';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Map IDs to imported images since dynamic imports in Vite can be tricky with variables
    const projectImages: Record<string, string> = {
        'neo-tokyo': neoTokyoImg,
        'trinity': trinityImg
    };

    // Find project
    // Note: projectData.js has "new-tokyo", checking for both
    const project = (projects as unknown as Project[]).find((p: Project) => p.id === id || (id === 'neo-tokyo' && p.id === 'new-tokyo'));

    useEffect(() => {
        window.scrollTo(0, 0);

        // Animations
        if (heroRef.current && contentRef.current) {
            const tl = gsap.timeline();

            tl.fromTo(heroRef.current,
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
            )
                .fromTo(contentRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                    "-=0.6"
                );
        }

    }, [id]);

    if (!project) {
        return (
            <div className="project-detail-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Project not found</h2>
                    <Link to="/" style={{ color: '#22d3ee', textDecoration: 'underline' }}>Back to Home</Link>
                </div>
            </div>
        );
    }

    // Use the mapped image or fallback
    const imageSrc = projectImages[id as string] || projectImages['neo-tokyo'];

    return (
        <div className="project-detail-container">
            {/* Navigation */}
            <nav className="project-nav">
                <div className="nav-container">
                    <Link
                        to="/"
                        className="back-link group"
                    >
                        <ArrowLeft size={20} />
                        <span className="back-text">Back</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div ref={heroRef} className="hero-section">
                <div className="hero-overlay" />
                <img
                    src={imageSrc}
                    alt={project.title}
                    className="hero-image"
                />
                <div className="hero-content">
                    <div className="hero-inner">
                        <span className="hero-category">
                            {project.category}
                        </span>
                        <h1 className="hero-title">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="content-section">
                <div className="content-grid">
                    {/* Main Info */}
                    <div className="main-info">
                        <div className="info-block">
                            <h2>Overview</h2>
                            <p>
                                {project.description}
                            </p>
                        </div>

                        <div className="info-block">
                            <h2>Technical Details</h2>
                            <p className="whitespace-pre-line">
                                {project.details}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar">
                        <div className="sticky-wrapper">
                            <div className="tech-panel">
                                <h3>Technologies</h3>
                                <div className="tech-tags-wrapper">
                                    {project.tech.map((t: string) => (
                                        <span
                                            key={t}
                                            className="tech-tag"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
