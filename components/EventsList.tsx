'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { stories, type Story } from '@/lib/events';

type Filter = 'all' | Story['category'];

const tabs: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Events' },
  { id: 'news', label: 'News' },
];

export default function EventsList() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <>
      <div className="tabs" role="group" aria-label="Filter stories">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${t.id === filter ? 'on' : ''}`} aria-pressed={t.id === filter} onClick={() => setFilter(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="cards">
        {stories.map((s) => (
          <article key={s.title} className={`ec ${filter === 'all' || filter === s.category ? '' : 'off'}`}>
            <div className="ec-photo">
              <Image src={s.image} alt="" sizes="(max-width: 800px) 100vw, 400px" />
            </div>
            <span className="k" style={{ backgroundColor: s.tint, color: s.ink }}>{s.kind}</span>
            <h2>{s.title}</h2>
            <p className="when">{s.when}</p>
            <Link className="go" href="/contact">{s.action}</Link>
          </article>
        ))}
      </div>
    </>
  );
}
