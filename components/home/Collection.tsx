'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { findProduct } from '@/lib/products';

const ORDER = ['shiraz', 'rose-spritz', 'peach-spritz', 'white-wine', 'berry-spritz', 'sparkling-brat'];
const items = ORDER.map((slug) => findProduct(slug)!);
const N = items.length;

const DURATION = 900;
const SIDE_SCALE = 0.62;
const DRAG_THRESHOLD = 6;
const SWIPE_DISTANCE = 0.18;

/** Shortest signed distance round the loop, from -N/2 up to N/2. */
const wrap = (o: number) => ((((o + N / 2) % N) + N) % N) - N / 2;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const mod = (i: number) => ((Math.round(i) % N) + N) % N;

/** Server render and first paint, before the stage has been measured. */
const initialTransform = (i: number) => {
  const o = wrap(i);
  const a = Math.abs(o);
  return {
    transform: `translate(-50%, -50%) translateX(${o * 33}vw) scale(${a < 0.5 ? 1 : SIDE_SCALE})`,
    visibility: a > 1 ? ('hidden' as const) : undefined,
    zIndex: 10 - a,
  };
};

export default function Collection() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const bottles = useRef<(HTMLDivElement | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef(0);
  const metrics = useRef({ spread: 400, out: 900 });
  /** 0 with the range gathered in the centre, 1 once it has spread into place. */
  const entrance = useRef(1);
  const animating = useRef(false);
  const raf = useRef(0);
  const drag = useRef<{ x: number; from: number; moved: boolean; tap: number | null } | null>(null);

  /** Every bottle and label is placed from the one position value, so they can't drift apart. */
  const paint = useCallback(() => {
    const { spread, out } = metrics.current;
    items.forEach((_, i) => {
      const o = wrap(i - pos.current);
      const a = Math.abs(o);
      const bottle = bottles.current[i];
      if (bottle) {
        const x = (a <= 1 ? o * spread : Math.sign(o) * (spread + (a - 1) * (out - spread))) * entrance.current;
        const scale = 1 - (1 - SIDE_SCALE) * Math.min(a, 1);
        bottle.style.visibility = a >= 2 ? 'hidden' : 'visible';
        bottle.style.zIndex = String(Math.round(10 - a * 3));
        bottle.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, 0, 0) scale(${scale.toFixed(4)})`;
      }
      const label = labels.current[i];
      if (label) {
        label.style.opacity = clamp(1 - a * 2.4, 0, 1).toFixed(3);
        label.style.transform = `translateY(${(clamp(o, -1, 1) * 26).toFixed(2)}px)`;
        label.style.visibility = a >= 0.5 ? 'hidden' : 'visible';
      }
    });
  }, []);

  const animateTo = useCallback(
    (target: number, length = DURATION) => {
      const from = pos.current;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finish = () => {
        pos.current = target;
        paint();
        animating.current = false;
        setActive(mod(target));
      };
      animating.current = true;
      if (reduced || from === target) {
        finish();
        return;
      }
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / length);
        pos.current = from + (target - from) * easeInOut(t);
        paint();
        if (t < 1) raf.current = requestAnimationFrame(frame);
        else finish();
      };
      raf.current = requestAnimationFrame(frame);
    },
    [paint],
  );

  /** Ignored while bottles are moving, so transitions can never overlap. */
  const step = (dir: number) => {
    if (animating.current || drag.current) return;
    animateTo(Math.round(pos.current) + dir);
  };

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const boxWidth = el.clientHeight * 0.3;
      const sideWidth = boxWidth * SIDE_SCALE;
      metrics.current = {
        spread: Math.min(W / 2 - sideWidth / 2 - 12, W * 0.34),
        out: W / 2 + boxWidth,
      };
      paint();
    };
    // Scrolling in, the range starts gathered in the centre and glides out to its spots.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = el.parentElement;
    const onScroll = () => {
      if (reduced || !section) return;
      const vh = window.innerHeight;
      const p = clamp((vh * 0.9 - section.getBoundingClientRect().top) / (vh * 0.6), 0, 1);
      const eased = 1 - (1 - p) ** 3;
      if (eased !== entrance.current) {
        entrance.current = eased;
        paint();
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [paint]);

  // The menu's Wine Spritz and Our Wines links land here on the matching product.
  useEffect(() => {
    const follow = () => {
      const slug = { '#range': 'rose-spritz', '#wines': 'shiraz' }[window.location.hash];
      if (!slug || animating.current) return;
      const current = Math.round(pos.current);
      animateTo(current + Math.round(wrap(ORDER.indexOf(slug) - current)));
    };
    follow();
    window.addEventListener('hashchange', follow);
    return () => window.removeEventListener('hashchange', follow);
  }, [animateTo]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (animating.current) return;
    const hit = (e.target as HTMLElement).closest<HTMLElement>('[data-index]');
    drag.current = { x: e.clientX, from: pos.current, moved: false, tap: hit ? Number(hit.dataset.index) : null };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
    if (!d.moved) return;
    pos.current = d.from + clamp(-dx / metrics.current.spread, -1, 1);
    paint();
  };

  const onPointerUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    if (!d.moved) {
      // A tap on a side bottle brings it to the centre.
      if (d.tap !== null) {
        const o = Math.round(wrap(d.tap - d.from));
        if (o !== 0) animateTo(d.from + o);
      }
      return;
    }
    const moved = pos.current - d.from;
    const target = d.from + (Math.abs(moved) > SWIPE_DISTANCE ? Math.sign(moved) : 0);
    animateTo(target, DURATION * clamp(Math.abs(target - pos.current), 0.5, 1));
  };

  return (
    <section className="col" aria-roledescription="carousel" aria-label="The Bometh collection">
      <span id="range" className="col-anchor" />
      <span id="wines" className="col-anchor" />
      <div className="col-ghost" aria-hidden="true">made for her</div>

      <div className="wrap col-head">
        <h2>The Collection</h2>
        <Link href="/shop">View all</Link>
      </div>

      <div
        ref={stage}
        className="col-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((p, i) => (
          <div
            key={p.slug}
            ref={(el) => { bottles.current[i] = el; }}
            className={`col-item ${p.category === 'wine' ? 'bottle' : 'can'}`}
            data-index={i}
            style={initialTransform(i)}
            aria-hidden={i !== active}
          >
            <Image src={p.image} alt={p.name} sizes="(max-width: 700px) 200px, 340px" draggable={false} />
          </div>
        ))}
      </div>

      <div className="col-foot">
        <button className="col-arrow" aria-label="Previous product" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" aria-hidden="true"><path d="M15 4l-8 8 8 8" /></svg>
        </button>
        <div className="col-info" aria-live="polite">
          {items.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => { labels.current[i] = el; }}
              className="col-label"
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? undefined : 'hidden' }}
              aria-hidden={i !== active}
            >
              <h3>{p.name}</h3>
              <Link className="btn col-btn" href={`/shop/${p.slug}`} tabIndex={i === active ? 0 : -1}>Details</Link>
            </div>
          ))}
        </div>
        <button className="col-arrow" aria-label="Next product" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" aria-hidden="true"><path d="M9 4l8 8-8 8" /></svg>
        </button>
      </div>
    </section>
  );
}
