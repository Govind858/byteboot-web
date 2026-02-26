import React from 'react';
import { motion } from 'framer-motion';
import ClientCarousel from './ClientCarousel';
import './ClientComponent.css';

const ClientComponent: React.FC = () => {
  return (
    <section className="clients-section">
      {/* Header — two halves slide in from opposite sides */}
      <div className="clients-header">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="clients-eyebrow">Trusted By</p>
          <h2 className="clients-title">Our <span>Clients</span></h2>
          <p className="clients-subtitle">
            Trusted by industry leaders and innovative startups — we build partnerships that last.
          </p>
        </motion.div>

        <motion.div
          className="clients-summary"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="summary-big">19+</div>
          <p className="summary-label">Happy Partners</p>
        </motion.div>
      </div>

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