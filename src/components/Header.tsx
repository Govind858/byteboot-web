    import React, { useState, useEffect } from 'react';
    import logo from '../assets/byteboot.png';

    const Header: React.FC = () => {
        const [scrolled, setScrolled] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
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
                    transition: 'all 0.3s ease',
                    padding: scrolled ? '1rem 0' : '2rem 0',
                    background: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                    <div className="logo" style={{ zIndex: 1001, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={logo} alt="ByteBoot Logo" style={{ height: '50px', objectFit: 'contain' }} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>ByteBoot</span>
                    </div>

                </div>
            </header>
        );
    };

    export default Header;
