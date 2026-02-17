import React, { useEffect, useRef } from 'react';
import { services } from '../data/mockData';
import * as Icons from 'react-icons/fa';
import gsap from 'gsap';

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedService, setSelectedService] = React.useState<typeof services[0] | null>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(el.querySelectorAll('.service-card'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    // Helper to dynamically render icons
    const renderIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent ? <IconComponent size={40} /> : <Icons.FaCode size={40} />;
    };

    return (
        <section id="services" ref={sectionRef} style={{ padding: '100px 0', background: '#0a0a0a', position: 'relative' }}>
            <div className="container">
                <h2 className="section-title t-center">Our Services</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="service-card"
                            onClick={() => setSelectedService(service)}
                            style={{
                                background: 'var(--card-bg)',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 243, 255, 0.15)';
                                (e.currentTarget.querySelector('.icon-container') as HTMLElement).style.transform = 'scale(1.2) rotate(10deg)';
                                (e.currentTarget.querySelector('.read-more') as HTMLElement).style.opacity = '1';
                                (e.currentTarget.querySelector('.read-more') as HTMLElement).style.transform = 'translateY(0)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.boxShadow = 'none';
                                (e.currentTarget.querySelector('.icon-container') as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                                (e.currentTarget.querySelector('.read-more') as HTMLElement).style.opacity = '0';
                                (e.currentTarget.querySelector('.read-more') as HTMLElement).style.transform = 'translateY(10px)';
                            }}
                        >
                            <div className="icon-container" style={{
                                color: 'var(--accent-color)',
                                marginBottom: '1.5rem',
                                transition: 'transform 0.4s ease'
                            }}>
                                {renderIcon(service.icon)}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>{service.title}</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{service.description}</p>

                            <div className="read-more" style={{
                                color: 'var(--accent-color)',
                                fontWeight: 600,
                                opacity: 0,
                                transform: 'translateY(10px)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem'
                            }}>
                                View Details <Icons.FaArrowRight size={12} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedService && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 2000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem'
                }} onClick={() => setSelectedService(null)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#151515',
                            border: '1px solid var(--accent-color)',
                            borderRadius: '20px',
                            padding: '3rem',
                            maxWidth: '600px',
                            width: '100%',
                            position: 'relative',
                            boxShadow: '0 0 50px rgba(0, 243, 255, 0.2)',
                            animation: 'modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        <button
                            onClick={() => setSelectedService(null)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'transparent',
                                border: 'none',
                                color: '#666',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                transition: 'color 0.3s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
                        >
                            <Icons.FaTimes />
                        </button>

                        <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                            {renderIcon(selectedService.icon)}
                        </div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{selectedService.title}</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem' }}>{selectedService.details}</p>

                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
                            <button className="btn" onClick={() => {
                                const contactSection = document.querySelector('#contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                    setSelectedService(null);
                                }
                            }}>
                                Get Started with {selectedService.title}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes modalPop {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default Services;
