import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app → send to backend / email service
        alert(`Thank you, ${formData.name}! We'll get back to you soon.`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="contact-section">
            {/* Background glows */}
            <div className="contact-glow-bg">
                <div className="glow-orb glow-cyan"></div>
                <div className="glow-orb glow-purple"></div>
            </div>

            <div className="contact-container">
                {/* Header */}
                <div className="contact-header">
                    <h2 className="contact-title">
                        Let's <span className="gradient-text">Collaborate</span>
                    </h2>
                    <div className="title-underline"></div>
                    <p className="contact-subtitle">
                        Got an idea? A project? Or just want to say hi? Drop us a message — we're excited to hear from you.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* ─── Left: Contact Form ─── */}
                    <div className="contact-form-card">
                        <h3 className="form-title">Get in Touch</h3>

                        <form onSubmit={handleSubmit} className="contact-form">
                            {/* Name + Email row */}
                            <div className="form-row">
                                {/* Name */}
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                        className="form-input"
                                    />
                                    <label htmlFor="name" className="input-label">
                                        Your Name
                                    </label>
                                </div>

                                {/* Email */}
                                <div className="input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                        className="form-input"
                                    />
                                    <label htmlFor="email" className="input-label">
                                        Email Address
                                    </label>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="input-group">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                    className="form-input resize-none"
                                />
                                <label htmlFor="message" className="input-label">
                                    Your Message
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="submit-btn group"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* ─── Right: Info + Map ─── */}
                    <div className="info-map-column">
                        {/* Quick contact cards */}
                        <div className="quick-contact-grid">
                            {/* Phone */}
                            <a
                                href="tel:09141109785"
                                className="contact-card"
                            >
                                <div className="icon-wrapper cyan-icon">
                                    <Phone size={26} />
                                </div>
                                <h4>Phone</h4>
                                <span>
                                    091 4110 9785
                                </span>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:contact@byteboot.com"
                                className="contact-card purple-card"
                            >
                                <div className="icon-wrapper purple-icon">
                                    <Mail size={26} />
                                </div>
                                <h4>Email</h4>
                                <span>
                                    contact@byteboot.com
                                </span>
                            </a>
                        </div>

                        {/* Map */}
                        <div className="map-container">
                            <iframe
                                title="ByteBoot Location"
                                src="https://maps.google.com/maps?q=9.967453192958345,76.29970391839987&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="map-frame"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                            <div className="map-badge">
                                <MapPin size={18} className="icon-red" />
                                <span>ByteBoot HQ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;