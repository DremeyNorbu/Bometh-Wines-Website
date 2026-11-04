'use client';

import { useEffect } from 'react';

const DESKTOP = '(min-width: 1001px)';
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Scroll-linked motion for the home page. Everything is driven from one scroll
 * handler using transforms only. Depth effects are desktop-only, and the whole
 * thing is skipped when a visitor prefers reduced motion.
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = <T extends HTMLElement>(s: string) => document.querySelector<T>(s);
    const stage = q('.stage');
    const copy = q('.h-copy');
    const disc = q('.disc');
    const layer = q('.can-layer');
    const ghost = q('.col-ghost');
    const collection = q('.col');
    const storyPhoto = q('.story-photo');
    const storyImage = q('.story-photo img');
    const words = Array.from(document.querySelectorAll<HTMLElement>('.hl'));
    const strip = document.querySelector('.mq-t')?.getAnimations()[0];
    const desktop = window.matchMedia(DESKTOP);

    let queued = 0;
    const update = () => {
      queued = 0;
      const vh = window.innerHeight;
      const wide = desktop.matches;

      if (stage && copy && disc && layer) {
        const p = wide ? clamp01(window.scrollY / stage.offsetHeight) : 0;
        copy.style.transform = p ? `translate3d(0, ${(-p * 90).toFixed(1)}px, 0)` : '';
        layer.style.transform = p ? `translate3d(0, ${(p * 70).toFixed(1)}px, 0)` : '';
        disc.style.transform = p ? `translate3d(0, ${(p * 40).toFixed(1)}px, 0) scale(${(1 - p * 0.14).toFixed(4)})` : '';
      }

      if (words[0]) {
        const p = clamp01((vh * 0.8 - words[0].getBoundingClientRect().top) / (vh * 0.45));
        words.forEach((word, i) => {
          word.style.setProperty('--fill', `${(clamp01(p * words.length - i) * 100).toFixed(1)}%`);
        });
      }

      if (ghost && collection) {
        const r = collection.getBoundingClientRect();
        const p = clamp01((vh - r.top) / (vh + r.height));
        ghost.style.transform = wide
          ? `translate(calc(-50% + ${((0.5 - p) * 16).toFixed(2)}vw), -50%)`
          : '';
      }

      if (storyPhoto && storyImage) {
        const r = storyPhoto.getBoundingClientRect();
        const p = clamp01((vh - r.top) / (vh + r.height));
        storyImage.style.transform = wide ? `translate3d(0, ${(-p * 80).toFixed(1)}px, 0)` : '';
      }
    };
    const request = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    // Marquee: speeds up with scroll velocity, then eases back to its normal pace.
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let rate = 1;
    let target = 1;
    let easing = 0;
    const ease = () => {
      target += (1 - target) * 0.06;
      rate += (target - rate) * 0.12;
      if (strip) strip.playbackRate = rate;
      if (Math.abs(rate - 1) > 0.01 || Math.abs(target - 1) > 0.01) {
        easing = requestAnimationFrame(ease);
      } else {
        easing = 0;
        rate = target = 1;
        if (strip) strip.playbackRate = 1;
      }
    };
    const onScroll = () => {
      request();
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(1, now - lastTime);
      lastY = window.scrollY;
      lastTime = now;
      target = Math.max(target, 1 + Math.min(speed * 1.6, 3));
      if (!easing) easing = requestAnimationFrame(ease);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', request);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', request);
      cancelAnimationFrame(queued);
      cancelAnimationFrame(easing);
    };
  }, []);

  return null;
}
