import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer style={{ background: '#000', padding: '3rem 0', borderTop: '1px solid #222' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>ByteBoot</h3>
                    <p style={{ color: '#666' }}>© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" style={{ color: '#aaa', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-icon"><FaGithub /></a>
                    <a href="#" style={{ color: '#aaa', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-icon"><FaTwitter /></a>
                    <a href="#" style={{ color: '#aaa', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-icon"><FaLinkedin /></a>
                </div>

                <style>{`
                    .social-icon:hover { color: var(--accent-color) !important; }
                `}</style>
            </div>
        </footer>
    );
};

export default Footer;
