/**
 * useScrollReveal.ts
 * Drop this hook on any ref'd element and it will fade+slide in when scrolled into view.
 * Uses IntersectionObserver — no GSAP dependency.
 */
import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
    threshold?: number;   // 0-1, when to trigger
    delay?: number;       // seconds
    distance?: number;    // px to translate from
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function useScrollReveal<T extends HTMLElement>(
    opts: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        threshold = 0.15,
        delay = 0,
        distance = 40,
        direction = 'up',
    } = opts;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const translateMap = {
            up: `translateY(${distance}px)`,
            down: `translateY(-${distance}px)`,
            left: `translateX(${distance}px)`,
            right: `translateX(-${distance}px)`,
        };

        el.style.opacity = '0';
        el.style.transform = translateMap[direction];
        el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;
        el.style.willChange = 'opacity, transform';

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, delay, distance, direction]);

    return ref;
}
