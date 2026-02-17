import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail'; // Import the new component

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Custom Cursor (Optional but cool)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    window.history.scrollRestoration = 'manual';

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
      if (document.body.contains(follower)) document.body.removeChild(follower);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <About />
              <Services />
              <Portfolio />
              <Blog />
              <Contact />
            </main>
            <Footer />
          </>
        } />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>

      {/* Dynamic Cursor Styles */}
      <style>{`
        .custom-cursor {
            position: fixed;
            top: 0; left: 0;
            width: 10px; height: 10px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
        }
        .cursor-follower {
            position: fixed;
            top: 0; left: 0;
            width: 30px; height: 30px;
            border: 1px solid var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }
      `}</style>
    </>
  );
}

export default App;
