import React, { useState, useEffect } from 'react';
import logo from '../assets/byteboot.png';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // State to handle hamburger clicks

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
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between', // Pushes logo left, hamburger right
          alignItems: 'center',
          padding: '1rem 2rem', // Added horizontal padding so items don't touch the screen edge
        }}
      >
        {/* Left Side: Logo & Brand */}
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="ByteBoot Logo" style={{ height: '50px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px', color: '#fff' }}>
            ByteBoot
          </span>
        </div>

        {/* Right Side: Hamburger Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '24px', // Fixed height for the icon
            width: '30px',  // Fixed width for the icon
            padding: 0,
            zIndex: 1001,   // Ensures it stays clickable above other elements
          }}
        >
          {/* Hamburger lines with basic transitions for a potential animation later */}
          <div style={{ width: '100%', height: '3px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s linear' }} />
          <div style={{ width: '100%', height: '3px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s linear' }} />
          <div style={{ width: '100%', height: '3px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s linear' }} />
        </button>
      </div>
    </header>
  );
};

export default Header;