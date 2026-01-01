"use client";

import { useEffect, useState } from 'react';

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    const debouncedCheckIsMobile = debounce(checkIsMobile, 250);

    checkIsMobile();

    window.addEventListener('resize', debouncedCheckIsMobile);

    return () => window.removeEventListener('resize', debouncedCheckIsMobile);
  }, [breakpoint]);

  return isMobile;
}