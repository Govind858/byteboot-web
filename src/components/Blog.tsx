import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/mockData';
import './Blog.css';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const flipUp = {
    hidden: { opacity: 0, y: 60, rotateX: 12 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.65, delay: i * 0.14, ease: EASE_OUT },
    }),
};

const Blog: React.FC = () => {
    return (
        <section id="blog" className="blog-section">
            <div className="container">
                <div className="blog-header">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <p className="blog-eyebrow">Stay Updated</p>
                        <h2 className="blog-heading">
                            Latest <span>Insights</span>
                        </h2>
                        <p className="blog-subtitle">Fresh perspectives on technology and innovation.</p>
                    </motion.div>

                    <motion.div
                        className="blog-summary"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <div className="summary-big">03</div>
                        <p className="summary-label">Featured Posts</p>
                    </motion.div>
                </div>

                <motion.div
                    className="blog-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    style={{ perspective: 800 }}
                >
                    {blogPosts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            custom={i}
                            variants={flipUp}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        >
                            <span className="blog-card-date">{post.date}</span>
                            <h3 className="blog-card-title">{post.title}</h3>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            <a href="#" className="blog-card-link">
                                Read More <span>&rarr;</span>
                            </a>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;
