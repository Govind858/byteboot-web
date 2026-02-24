import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing the icons
import logo from '../assets/byteboot.png';
import './Header.css';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header only in top ~100px or when scrolling up
      setVisible(window.scrollY <= 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${visible ? 'visible' : 'hidden'}`}>
      <div className="header-container">
        {/* Logo + Brand name */}
        <div className="logo-wrapper">
          <img src={logo} alt="ByteBoot Logo" className="logo-img" />
          <span className="brand-name">ByteBoot</span>
        </div>

        {/* React Icons Toggle Button */}
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

      {/* Mobile menu conditional rendering
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      */}
    </header>
  );
};

export default Header;