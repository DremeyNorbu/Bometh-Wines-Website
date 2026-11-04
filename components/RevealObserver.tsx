'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Fades in every `.r` element as it scrolls into view, on each page. */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('.r:not(.in)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
