import React, { useEffect, useRef } from 'react';
import { services } from '../data/mockData';
import * as Icons from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] =
    React.useState<typeof services[0] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll('.service-card');

    // Horizontal Scroll Animation
    const totalWidth = track.scrollWidth;
    const screenWidth = window.innerWidth;
    const scrollDistance = totalWidth - screenWidth;

    gsap.to(track, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Fade In Cards
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? (
      <IconComponent size={40} />
    ) : (
      <Icons.FaCode size={40} />
    );
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        height: '100vh',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '100px 0' }}>
        <h2 className="section-title t-center">Our Services</h2>

        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '2rem',
            padding: '3rem 5vw',
            width: 'max-content',
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => setSelectedService(service)}
              style={{
                flex: '0 0 350px',
                background: '#151515',
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-10px)';
                target.style.borderColor = 'var(--accent-color)';
                target.style.boxShadow =
                  '0 15px 40px rgba(0, 243, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0)';
                target.style.borderColor =
                  'rgba(255,255,255,0.05)';
                target.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  color: 'var(--accent-color)',
                  marginBottom: '1.5rem',
                }}
              >
                {renderIcon(service.icon)}
              </div>

              <h3
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                }}
              >
                {service.title}
              </h3>

              <p style={{ color: '#aaa', lineHeight: 1.6 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          onClick={() => setSelectedService(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#151515',
              padding: '3rem',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
            }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {selectedService.title}
            </h3>

            <p style={{ color: '#ccc', lineHeight: 1.8 }}>
              {selectedService.details}
            </p>

            <button
              style={{
                marginTop: '2rem',
                padding: '0.8rem 2rem',
                background: 'var(--accent-color)',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedService(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
