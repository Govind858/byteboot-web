import React from 'react';
import { blogPosts } from '../data/mockData';
import './Blog.css';

const Blog: React.FC = () => {
    return (
        <section id="blog" className="blog-section">
            <div className="container">
                <h2 className="blog-heading">Latest Insights</h2>
                <div className="blog-heading-underline" />
                <div className="blog-grid">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="blog-card">
                            <span className="blog-card-date">{post.date}</span>
                            <h3 className="blog-card-title">{post.title}</h3>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            <a href="#" className="blog-card-link">
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
