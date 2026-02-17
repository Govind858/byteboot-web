import React, { useState, useEffect } from 'react';
import logo from '../assets/byteboot.png';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling down 100px
      if (window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.4s ease',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        background: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        // Removed the conditional padding & transparent — now always dark when visible
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 0',           // consistent padding now
        }}
      >
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="ByteBoot Logo" style={{ height: '50px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>
            ByteBoot
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;