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

    // State for API data
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Fetch the project data from the API
    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                setError(null);
                
                const response = await getProductById(id);
                // Based on your backend, the actual data is inside response.product
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

    // 2. Handle GSAP Animations AFTER data is loaded
    useEffect(() => {
        // Only run animation if we have finished loading and have a project
        if (!loading && project && heroRef.current && contentRef.current) {
            window.scrollTo(0, 0);

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
    }, [loading, project]);

    // UI: Loading State
    if (loading) {
        return (
            <div className="project-detail-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#22d3ee' }}>Loading project...</h2>
            </div>
        );
    }

    // UI: Error or Not Found State
    if (error || !project) {
        return (
            <div className="project-detail-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{error || "Project not found"}</h2>
                    <Link to="/" style={{ color: '#22d3ee', textDecoration: 'underline' }}>Back to Home</Link>
                </div>
            </div>
        );
    }

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
                {/* Now using the Cloudinary URL directly from your database */}
                <img
                    src={project.image} 
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
                                    {/* Using optional chaining (?.) just in case tech array is missing in DB */}
                                    {project.techStack?.map((t: string) => (
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