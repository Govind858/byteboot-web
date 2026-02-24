import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Mail, ArrowUpRight } from 'lucide-react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
];

const socials = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
];

const css = `
  .footer {
    position: relative;
    background: #09090b;
    border-top: 1px solid #18181b;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
  }

  /* Accent glow bar at top */
  .footer::before {
    content: '';
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent, #22d3ee 40%, #7c3aed 60%, transparent);
  }

  /* Radial background glow */
  .footer-glow {
    position: absolute;
    top: -200px; left: 50%; transform: translateX(-50%);
    width: 800px; height: 400px;
    background: radial-gradient(ellipse at center,
      rgba(34,211,238,0.06) 0%,
      rgba(124,58,237,0.04) 40%,
      transparent 70%);
    pointer-events: none;
  }

  .footer-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 2rem 0;
  }

  /* ── Top row ─────────────────────────────────── */
  .footer-top {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid #18181b;
  }

  /* Brand column */
  .footer-brand-col {}

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-bottom: 1.25rem;
    text-decoration: none;
  }

  .footer-logo-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 12px #22d3ee;
    flex-shrink: 0;
  }

  .footer-logo-text {
    font-size: 1.2rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
  }

  .footer-tagline {
    color: #52525b;
    font-size: 0.9rem;
    line-height: 1.7;
    max-width: 280px;
    margin-bottom: 2rem;
  }

  /* Email CTA */
  .footer-email-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.1rem;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 10px;
    color: #a1a1aa;
    font-size: 0.85rem;
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
  }

  .footer-email-cta:hover {
    border-color: #22d3ee;
    color: #22d3ee;
    background: rgba(34,211,238,0.06);
  }

  /* Nav columns */
  .footer-col-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3f3f46;
    margin-bottom: 1.25rem;
  }

  .footer-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-nav-list a {
    color: #71717a;
    font-size: 0.92rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.2s;
  }

  .footer-nav-list a:hover {
    color: #fff;
  }

  .footer-nav-list a .arrow-icon {
    opacity: 0;
    transform: translate(-4px, 4px);
    transition: opacity 0.2s, transform 0.2s;
  }

  .footer-nav-list a:hover .arrow-icon {
    opacity: 1;
    transform: translate(0, 0);
  }

  /* Socials */
  .footer-social-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-social-list a {
    color: #71717a;
    font-size: 0.92rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    transition: color 0.2s;
  }

  .footer-social-list a:hover { color: #22d3ee; }

  .footer-social-list svg { font-size: 1rem; }

  /* ── Bottom bar ──────────────────────────────── */
  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0 2.5rem;
    gap: 1rem;
  }

  .footer-copy {
    font-size: 0.82rem;
    color: #3f3f46;
  }

  .footer-copy span {
    color: #71717a;
  }

  .footer-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: #3f3f46;
  }

  .footer-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 8px #22d3ee;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── Responsive ──────────────────────────────── */
  @media (max-width: 900px) {
    .footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }
    .footer-brand-col { grid-column: span 2; }
  }

  @media (max-width: 540px) {
    .footer-top {
      grid-template-columns: 1fr;
    }
    .footer-brand-col { grid-column: span 1; }
    .footer-inner { padding: 4rem 1.25rem 0; }
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }
`;

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <style>{css}</style>
            <div className="footer-glow" />

            <div className="footer-inner">
                {/* ── Top grid ── */}
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand-col">
                        <a href="#" className="footer-logo">
                            <span className="footer-logo-dot" />
                            <span className="footer-logo-text">ByteBoot</span>
                        </a>
                        <p className="footer-tagline">
                            We craft digital products that move fast, scale effortlessly, and leave a lasting impression.
                        </p>
                        <a href="mailto:contact@byteboot.com" className="footer-email-cta">
                            <Mail size={14} />
                            contact@byteboot.com
                        </a>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="footer-col-title">Navigation</p>
                        <ul className="footer-nav-list">
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href}>
                                        {label}
                                        <ArrowUpRight size={13} className="arrow-icon" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <p className="footer-col-title">Follow Us</p>
                        <ul className="footer-social-list">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <li key={label}>
                                    <a href={href} target="_blank" rel="noopener noreferrer">
                                        <Icon />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        © {year} <span>ByteBoot Technologies.</span> All rights reserved.
                    </p>
                    <div className="footer-badge">
                        <span className="footer-badge-dot" />
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
