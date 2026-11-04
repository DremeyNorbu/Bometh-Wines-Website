'use client';

import { useEffect, useRef } from 'react';

type Stream = { x: number; phase: number; gap: number; timer: number; big: boolean };
type Bead = { x: number; y: number; v: number; r0: number; r: number; ph: number; f: number; a: number; end: number };

const MAX_BEADS = 420;

/** Pre-rendered bubble: faint body, bright rim and two highlights. */
function makeSprite() {
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  const s = sprite.getContext('2d')!;
  const glow = (x: number, y: number, r: number, stops: [number, string][]) => {
    const g = s.createRadialGradient(x, y, 0, x, y, r);
    stops.forEach(([at, colour]) => g.addColorStop(at, colour));
    s.fillStyle = g;
    s.fillRect(x - r, y - r, r * 2, r * 2);
  };
  glow(32, 32, 32, [
    [0, 'rgba(255,255,255,.05)'],
    [0.62, 'rgba(255,255,255,.1)'],
    [0.84, 'rgba(255,255,255,.32)'],
    [0.95, 'rgba(255,255,255,.85)'],
    [1, 'rgba(255,255,255,0)'],
  ]);
  glow(22, 21, 10, [[0, 'rgba(255,255,255,.95)'], [1, 'rgba(255,255,255,0)']]);
  glow(43, 44, 5, [[0, 'rgba(255,255,255,.45)'], [1, 'rgba(255,255,255,0)']]);
  return sprite;
}

/**
 * Carbonation: fine bubbles rise in streams from fixed points, speed up and swell
 * as they climb, wobble slightly, then fade before the surface.
 */
export default function Fizz() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const box = cv?.parentElement;
    const ctx = cv?.getContext('2d');
    if (!cv || !box || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sprite = makeSprite();
    let W = 0;
    let H = 0;
    let time = 0;
    let streams: Stream[] = [];
    let beads: Bead[] = [];

    const update = (dt: number) => {
      time += dt;
      streams.forEach((st) => {
        st.timer -= dt;
        st.x += Math.sin(time * 0.13 + st.phase) * dt * 1.2;
        if (st.timer <= 0 && beads.length < MAX_BEADS) {
          st.timer = st.gap * (0.7 + Math.random() * 0.7);
          const r0 = (st.big ? 0.9 : 0.55) + Math.random() * (st.big ? 1.5 : 0.9);
          beads.push({
            x: st.x + (Math.random() - 0.5) * 2.4,
            y: H + 6,
            v: 20,
            r0,
            r: r0,
            ph: Math.random() * 6.28,
            f: 5 + Math.random() * 5,
            a: 0.35 + Math.random() * 0.5,
            end: H * Math.random() * 0.34,
          });
        }
      });
      for (let i = beads.length - 1; i >= 0; i--) {
        const b = beads[i];
        b.r = b.r0 * (1 + 1.1 * (1 - b.y / H));
        b.v += (70 + 52 * b.r - b.v) * Math.min(1, dt * 1.4);
        b.y -= b.v * dt;
        b.x += Math.sin(time * b.f + b.ph) * (0.12 + 0.1 * b.r) * dt * 21;
        if (b.y < b.end) {
          beads[i] = beads[beads.length - 1];
          beads.pop();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      beads.forEach((b) => {
        ctx.globalAlpha = b.a * Math.min(1, (b.y - b.end) / 70);
        ctx.drawImage(sprite, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      });
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (w !== W || h !== H) {
        W = w;
        H = h;
        beads = [];
        streams = Array.from({ length: Math.max(10, Math.round(W / 60)) }, () => ({
          x: Math.random() * W,
          phase: Math.random() * 6.28,
          gap: 0.12 + Math.random() * 0.34,
          timer: Math.random() * 0.4,
          big: Math.random() < 0.18,
        }));
        // Start mid-pour rather than with an empty frame.
        for (let i = 0; i < 420; i++) update(1 / 30);
      }
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(box);
    resize();

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const rect = cv.getBoundingClientRect();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!W || rect.bottom < 0 || rect.top > window.innerHeight) return;
      update(dt);
      draw();
    };
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="fizz" aria-hidden="true" />;
}
