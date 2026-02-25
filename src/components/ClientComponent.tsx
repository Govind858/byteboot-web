import React from 'react';
import { motion } from 'framer-motion';
import ClientCarousel from './ClientCarousel';
import './ClientComponent.css';

const ClientComponent: React.FC = () => {
  return (
    <section className="clients-section">
      {/* Header — blur-to-clear fade */}
      <motion.div
        className="clients-header"
        initial={{ opacity: 0, filter: 'blur(14px)', y: 20 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' as const }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="clients-title">Our <span>Clients</span></h2>
        <p className="clients-subtitle">
          Trusted by industry leaders and innovative startups — we build partnerships that last.
        </p>
      </motion.div>

      {/* Carousel — slides up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' as const }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <ClientCarousel />
      </motion.div>
    </section>
  );
};

export default ClientComponent;