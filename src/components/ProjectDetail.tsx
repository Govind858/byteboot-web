import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { getProductById } from '../APIs/adminApi';
import type { Project } from '../types';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Fetch project data
    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const response = await getProductById(id);
                if (response.success) {
                    setProject(response.product);
                } else {
                    setError("Project not found");
                }
            } catch (err) {
                console.error("Error in component:", err);
                setError("Failed to load project details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    // 2. GSAP animations after data loads
    useEffect(() => {
        if (!loading && project && heroRef.current && contentRef.current) {
            window.scrollTo(0, 0);

            const tl = gsap.timeline();

            // Hero image Ken Burns
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { scale: 1.12 },
                    { scale: 1, duration: 2.2, ease: 'power4.out' }
                );
            }

            // Hero content
            tl.fromTo(heroRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: 'power2.out' }
            )
                .fromTo('.hero-category',
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo('.hero-title',
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                    '-=0.5'
                )
                .fromTo('.hero-scroll-hint',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.2'
                );

            // Content stagger
            gsap.fromTo(contentRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.9,
                    stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 80%',
                    },
                    delay: 0.2
                }
            );
        }
    }, [loading, project]);

    // — Loading State —
    if (loading) {
        return (
            <div className="state-screen">
                <div className="state-inner">
                    <div className="state-loader" />
                    <p className="state-label">Loading</p>
                    <p className="state-sub">Fetching project data...</p>
                </div>
            </div>
        );
    }

    // — Error State —
    if (error || !project) {
        return (
            <div className="state-screen">
                <div className="state-inner">
                    <p className="state-label">{error || "Not Found"}</p>
                    <p className="state-sub">The project you're looking for doesn't exist.</p>
                    <Link to="/" className="state-link">← Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="project-detail-container">

            {/* ── Navigation ── */}
            <nav className="project-nav">
                <div className="nav-container">
                    <Link to="/" className="back-link group">
                        <ArrowLeft size={16} strokeWidth={1.5} />
                        <span className="back-text">Back</span>
                    </Link>
                    <div className="nav-dot" />
                </div>
            </nav>

            {/* ── Hero ── */}
            <div ref={heroRef} className="hero-section">
                <div className="hero-overlay" />
                <img
                    ref={imageRef}
                    src={project.image}
                    alt={project.title}
                    className="hero-image"
                />
                <div className="hero-content">
                    <div className="hero-inner">
                        <div>
                            <div className="hero-label-group">
                                <span className="hero-category">{project.category}</span>
                                <div className="hero-divider" />
                            </div>
                            <h1 className="hero-title">{project.title}</h1>
                            <div className="hero-scroll-hint">
                                <div className="scroll-line" />
                                <span>Scroll to explore</span>
                            </div>
                        </div>
                        <div className="hero-meta">
                            <span className="hero-meta-item">Case Study</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="content-section">
                <div ref={contentRef} className="content-grid">

                    {/* Main Info */}
                    <div className="main-info">
                        <div className="info-block">
                            <div className="info-block-header">
                                <span className="info-block-num">01</span>
                                <h2>Overview</h2>
                                <div className="info-block-line" />
                            </div>
                            <p>{project.description}</p>
                        </div>

                        <div className="info-block">
                            <div className="info-block-header">
                                <span className="info-block-num">02</span>
                                <h2>Technical Details</h2>
                                <div className="info-block-line" />
                            </div>
                            <p className="whitespace-pre-line">{project.details}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar">
                        <div className="sticky-wrapper">

                            {/* Tech Stack */}
                            <div className="tech-panel">
                                <h3>Tech Stack</h3>
                                <div className="tech-tags-wrapper">
                                    {project.techStack?.map((t: string) => (
                                        <span key={t} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Info Panel */}
                            <div className="info-panel">
                                <div className="info-row">
                                    <span className="info-row-label">Category</span>
                                    <span className="info-row-value">{project.category}</span>
                                </div>
                                <div className="info-row-sep" />
                                <div className="info-row">
                                    <span className="info-row-label">Type</span>
                                    <span className="info-row-value">Case Study</span>
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