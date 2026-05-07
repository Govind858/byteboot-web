import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import apiClient from '../APIs/Axios';
import './Contact.css';

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await apiClient.post('/send-email', formData);
            if (response.data.success) {
                setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus({ type: 'error', message: 'Something went wrong. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-glow-bg">
                <div className="glow-orb glow-cyan"></div>
                <div className="glow-orb glow-purple"></div>
            </div>

            <div className="contact-container">
                {/* Header — fade up */}
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' as const }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h2 className="contact-title">
                        Let's <span className="gradient-text">Collaborate</span>
                    </h2>
                    <div className="title-underline"></div>
                    <p className="contact-subtitle">
                        Got an idea? A project? Or just want to say hi? Drop us a message — we're excited to hear from you.
                    </p>
                </motion.div>

                {/* Grid — form from left, info from right */}
                <div className="contact-grid">
                    {/* Left: Contact Form */}
                    <motion.div
                        className="contact-form-card"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.75, ease: EASE_OUT }}
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <h3 className="form-title">Get in Touch</h3>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="input-group">
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder=" " required className="form-input" />
                                    <label htmlFor="name" className="input-label">Your Name</label>
                                </div>
                                <div className="input-group">
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder=" " required className="form-input" />
                                    <label htmlFor="email" className="input-label">Email Address</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <textarea name="message" id="message" rows={6} value={formData.message} onChange={handleChange} placeholder=" " required className="form-input resize-none" />
                                <label htmlFor="message" className="input-label">Your Message</label>
                            </div>
                            <motion.button
                                type="submit"
                                className="submit-btn group"
                                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                            <AnimatePresence>
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`status-message ${status.type}`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Right: Info + Map */}
                    <motion.div
                        className="info-map-column"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT }}
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <div className="quick-contact-grid">
                            <a href="tel:09141109785" className="contact-card">
                                <div className="icon-wrapper cyan-icon"><Phone size={26} /></div>
                                <h4>Phone</h4>
                                <span>+91 8075 119 654</span>
                            </a>
                            <a href="mailto:contact@byteboot.com" className="contact-card purple-card">
                                <div className="icon-wrapper purple-icon"><Mail size={26} /></div>
                                <h4>Email</h4>
                                <span>contact@byteboot.com</span>
                            </a>
                        </div>
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;