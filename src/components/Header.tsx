import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/mockData';
import logo from '../assets/byteboot_logo_text.png';

import './Header.css';

const MobileMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      className="mobile-menu-overlay"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mobile-menu-content">
        <nav className="mobile-nav">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={onClose}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <span className="link-number">0{index + 1}</span>
              <span className="link-text">{link.label}</span>
              <span className="link-arrow">→</span>
            </motion.a>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <p className="footer-tag">ByteBoot Techno Solutions</p>
          <div className="social-mini">
            <span>IN</span>
            <span>TW</span>
            <span>GH</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 100 || menuOpen);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <header className={`site-header ${visible ? 'visible' : 'hidden'} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        {/* Logo only – no text */}
        <div className="logo-wrapper">
          <img src={logo} alt="ByteBoot Logo" className="logo-img" />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="menu-toggle-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <FiX className="menu-icon" />
          ) : (
            <FiMenu className="menu-icon" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;