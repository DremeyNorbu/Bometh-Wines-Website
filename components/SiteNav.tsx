'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import wordmark from '@/assets/brand/wordmark.png';

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === '/';
  const close = () => setOpen(false);

  const links = [
    { label: 'Wine Spritz', href: home ? '#range' : '/shop?category=spritz', section: '/shop' },
    { label: 'Our Wines', href: home ? '#wines' : '/shop?category=wine', section: '/shop' },
    { label: 'Our Story', href: '/#story', section: '' },
    { label: 'Where to Buy', href: '/find-a-store', section: '/find-a-store' },
    { label: 'Events & News', href: '/events-news', section: '/events-news' },
    { label: 'Contact', href: '/contact', section: '/contact' },
  ];
  const here = (section: string) => (section && pathname.startsWith(section) ? 'here' : undefined);

  return (
    <header className="nav">
      <div className="pill">
        <Link className="logo" href="/" aria-label="Bometh home" onClick={close}>
          <Image src={wordmark} alt="Bometh" sizes="120px" priority />
        </Link>
        <nav className="links" aria-label="Primary">
          {links.map((l) => (
            l.href.startsWith('#')
              ? <a key={l.label} href={l.href}>{l.label}</a>
              : <Link key={l.label} className={here(l.section)} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <Link className="btn sm shop" href="/shop">Shop Online</Link>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="mnav" aria-label="Mobile">
          {links.map((l) => (
            l.href.startsWith('#')
              ? <a key={l.label} href={l.href} onClick={close}>{l.label}</a>
              : <Link key={l.label} href={l.href} onClick={close}>{l.label}</Link>
          ))}
          <Link href="/shop" onClick={close}>Shop Online</Link>
        </nav>
      )}
    </header>
  );
}
