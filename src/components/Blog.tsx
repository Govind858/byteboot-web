import React from 'react';
import { blogPosts } from '../data/mockData';

const Blog: React.FC = () => {
    return (
        <section id="blog" style={{ padding: '100px 0', background: '#0a0a0a' }}>
            <div className="container">
                <h2 className="section-title t-center">Latest Insights</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            style={{
                                background: 'var(--card-bg)',
                                padding: '2rem',
                                borderRadius: '8px',
                                borderLeft: '3px solid var(--secondary-color)'
                            }}
                        >
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>{post.date}</span>
                            <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0 1rem 0' }}>{post.title}</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                            <a href="#" style={{ color: 'var(--accent-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read More <span>&rarr;</span>
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
