'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import strawberry from '@/assets/photos/strawberry-pink.jpg';
import peach from '@/assets/photos/peach-pile.jpg';
import blueberries from '@/assets/photos/blueberries.jpg';
import amber from '@/assets/photos/amber-spritz.jpg';
import Fizz from '@/components/Fizz';
import { findProduct } from '@/lib/products';

const flavours = [
  { slug: 'rose-spritz', bg: '#F7A8BE', ink: '#58103A', photo: strawberry },
  { slug: 'peach-spritz', bg: '#FFB58A', ink: '#5A2212', photo: peach },
  { slug: 'berry-spritz', bg: '#6559B2', ink: '#FFF6F3', photo: blueberries },
  { slug: 'sparkling-brat', bg: '#E4A743', ink: '#3A1A0A', photo: amber },
].map((f) => ({ ...f, product: findProduct(f.slug)! }));

const AUTO_ADVANCE_MS = 5200;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % flavours.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer.current);
  }, []);

  const step = (dir: number) => {
    clearInterval(timer.current);
    setIndex((i) => (i + dir + flavours.length) % flavours.length);
  };
  const on = (i: number) => (i === index ? 'on' : '');
  const current = flavours[index];

  return (
    <section className="stage" id="top" style={{ backgroundColor: current.bg, color: current.ink }}>
      <Fizz />
      <div className="stage-in">
        <div className="h-copy">
          <h1 className="a1">Celebrate Life’s <i>Moments</i></h1>
          <p className="lead a2">Exceptional wines and spritz, made for her. Pick your flavour.</p>
          <div className="cta a3">
            <Link className="btn" href="/shop">Shop Online</Link>
            <Link className="btn out" href="/find-a-store">Find a Store</Link>
          </div>
        </div>
        <div className="show a2">
          <div className="disc" aria-hidden="true">
            {flavours.map((f, i) => (
              <Image key={f.slug} className={on(i)} src={f.photo} alt="" fill sizes="540px" priority={i === 0} />
            ))}
          </div>
          <div className="can-layer">
          <div className="bob">
            {flavours.map((f, i) => (
              <Image
                key={f.slug}
                className={`st-can ${on(i)}`}
                src={f.product.image}
                alt={i === index ? `${f.product.name} can` : ''}
                sizes="240px"
                priority={i === 0}
              />
            ))}
          </div>
          <div className="chip">
            {flavours.map((f, i) => (
              <div key={f.slug} className={`chip-t ${on(i)}`} aria-hidden={i !== index}>
                <b>{f.product.name}</b>
                <span>{f.product.summary}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className="flav-nav a3" role="group" aria-label="Browse flavours">
        <button aria-label="Previous flavour" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M15 4l-8 8 8 8" />
          </svg>
        </button>
        <button aria-label="Next flavour" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M9 4l8 8-8 8" />
          </svg>
        </button>
      </div>
    </section>
  );
}
