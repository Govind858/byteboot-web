import React, { useEffect, useRef, useState } from 'react';
import { services } from '../data/mockData';
import * as Icons from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>({ delay: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // ── Desktop: horizontal pin scroll ───────────────────────────────────────
      const cards = track.querySelectorAll('.service-card');
      const totalWidth = track.scrollWidth;
      const screenWidth = window.innerWidth;
      const scrollDistance = totalWidth - screenWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance + 100}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    });

    mm.add("(max-width: 768px)", () => {
      // ── Mobile: simple vertical entrance animations (no pin) ──────────────────
      const cards = track.querySelectorAll('.service-card');

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    });

    return () => mm.revert(); // Clean up everything!
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={44} /> : <Icons.FaCode size={44} />;
  };

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="services-wrapper">
        <div ref={headerRef} className="service-header">
          <h2 className="section-title">Our <span>Services</span></h2>
          <p className="section-subtitle">We craft digital experiences that drive results — from strategy to execution, we've got you covered.</p>
        </div>
        <div ref={trackRef} className="services-track">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => setSelectedService(service)}
            >
              <div className="service-icon">{renderIcon(service.icon)}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{selectedService.title}</h3>
            <p className="modal-description">{selectedService.details}</p>
            <button className="modal-close-btn" onClick={() => setSelectedService(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;