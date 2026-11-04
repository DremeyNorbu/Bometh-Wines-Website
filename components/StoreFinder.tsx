'use client';

import { useState, type FormEvent } from 'react';

const states = ['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
// Replace with the client's stockist list. Search and the map can then use real data.
const stores = [1, 2, 3, 4];

export default function StoreFinder() {
  const [state, setState] = useState('All');
  const all = state === 'All';
  const search = (e: FormEvent) => e.preventDefault();

  return (
    <div className="side r">
      <form className="search" onSubmit={search}>
        <div className="fld">
          <label htmlFor="where">Suburb or postcode</label>
          <input id="where" type="text" placeholder="[Suburb or postcode]" />
        </div>
        <button className="btn" type="submit">Search</button>
      </form>
      <div className="tabs" role="group" aria-label="Filter by state">
        {states.map((s) => (
          <button key={s} className={`tab ${s === state ? 'on' : ''}`} aria-pressed={s === state} onClick={() => setState(s)}>{s}</button>
        ))}
      </div>
      <div className="results" aria-live="polite">
        <h2>{all ? 'Stores across Australia' : `Stores in ${state}`}</h2>
        {stores.map((n) => (
          <div key={n} className="store">
            <div>
              <b>[Store name]</b>
              <span>[Street address], [Suburb] {all ? '[State]' : state} · [Phone]</span>
            </div>
            <a href="#">Directions</a>
          </div>
        ))}
      </div>
    </div>
  );
}
