import React from 'react';
import ClientCarousel from './ClientCarousel';
import './ClientComponent.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ClientComponent: React.FC = () => {
  const headerRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const carouselRef = useScrollReveal<HTMLDivElement>({ delay: 0.1, distance: 30 });

  return (
    <section className="clients-section">
      <div ref={headerRef} className="clients-header">
        <h2 className="clients-title">Our <span>Clients</span></h2>
        <p className="clients-subtitle">Trusted by industry leaders and innovative startups — we build partnerships that last.</p>
      </div>
      <div ref={carouselRef}>
        <ClientCarousel />
      </div>
    </section>
  );
};

export default ClientComponent;