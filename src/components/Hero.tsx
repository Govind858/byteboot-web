import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ClientCarousel from './ClientCarousel';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Background Animation
        if (bgRef.current) {
            gsap.to(bgRef.current, {
                rotation: 360,
                duration: 100,
                repeat: -1,
                ease: "linear"
            });
        }

        // Split Text Animation (Simulated without SplitText plugin)
        const titleWords = titleRef.current?.querySelectorAll('.word');
        const subtitle = subtitleRef.current;
        const btns = btnRef.current?.children;

        if (titleWords) {
            tl.fromTo(titleWords,
                { y: 150, opacity: 0, rotate: 5 },
                { y: 0, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" }
            );
        }

        if (subtitle) {
            tl.fromTo(subtitle,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            );
        }

        if (btns) {
            tl.fromTo(btns,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.8"
            );
        }

        // Parallax on Scroll
        if (heroRef.current) {
            gsap.to(heroRef.current.querySelector('.hero-content'), {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 200,
                opacity: 0
            });

            // Client Carousel Animation
            gsap.to(heroRef.current.querySelector('.client-track'), {
                x: '-50%',
                duration: 20,
                repeat: -1,
                ease: 'linear',
            });
        }

    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            style={{
                height: '100vh',
                minHeight: '700px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1000px'
            }}
        >
            {/* Animated Background Mesh */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `
                        radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 243, 255, 0.05) 0%, transparent 40%)
                    `,
                    zIndex: -1,
                    pointerEvents: 'none'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}></div>
            </div>

            <div className="container hero-content" style={{ textAlign: 'center', zIndex: 1, position: 'relative', paddingTop: '80px' }}>
                <div style={{
                    marginBottom: '1rem',
                    color: 'var(--accent-color)',
                    fontWeight: 600,
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem'
                }}>
                    Welcome to ByteBoot
                </div>

                <h1 ref={titleRef} style={{
                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                    marginBottom: '2rem',
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '0.3em' // space between words
                }}>
                    <span className="word" style={{ display: 'inline-block' }}>Code</span>
                    <span className="word" style={{ display: 'inline-block', color: 'transparent', WebkitTextStroke: '1px #fff' }}>Beyond</span>
                    <span className="word" style={{ display: 'inline-block', background: 'linear-gradient(to right, var(--accent-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Limits</span>
                </h1>

            </div>

            {/* Client Carousel */}
            <div style={{
                position: 'absolute',
                bottom: '80px',
                width: '100%',
                maxWidth: '1200px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                padding: '0 2rem'
            }}>
                <ClientCarousel />
            </div>

            <a href="#about" className="scroll-indicator" style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: 0.7
            }}>
                <div style={{
                    width: '30px',
                    height: '50px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '15px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '10px'
                }}>
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: '#fff',
                        borderRadius: '2px',
                        animation: 'scrollWheel 1.5s infinite'
                    }}></div>
                </div>
            </a>

            <style>{`
                @keyframes scrollWheel {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(15px); opacity: 0; }
                }
                .word:hover {
                    transform: scale(1.05) skewX(-5deg) !important;
                    transition: transform 0.3s ease;
                    cursor: default;     
                }
            `}</style>
        </section>
    );
};

export default Hero;
