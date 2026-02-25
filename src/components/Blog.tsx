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
                <motion.h2
                    className="blog-heading"
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' as const }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Latest Insights
                </motion.h2>
                <div className="blog-heading-underline" />

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
