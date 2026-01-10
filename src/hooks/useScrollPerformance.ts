import { useEffect, useRef, useCallback } from 'react';

export function useScrollPerformance(callback: () => void, delay: number = 100) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isScrolling = useRef(false);

    const handleScroll = useCallback(() => {
        if (!isScrolling.current) {
            isScrolling.current = true;
            callback();

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                isScrolling.current = false;
            }, delay);
        }
    }, [callback, delay]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleScroll]);
}

export function useElementVisible(callback: (visible: boolean) => void, options = {}) {
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            callback(entry.isIntersecting);
        }, {
            threshold: 0.1,
            ...options,
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
            observer.disconnect();
        };
    }, [callback]);

    return elementRef;
}
