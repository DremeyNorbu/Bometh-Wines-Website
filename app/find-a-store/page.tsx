import Link from 'next/link';
import type { Metadata } from 'next';
import StoreFinder from '@/components/StoreFinder';

const intro = 'Find Bometh Wines and Wine Spritz cans and bottles at select liquor stores across Australia.';

export const metadata: Metadata = { title: 'Find a Store', description: intro };

const pins = [
  { left: '24%', top: '30%', animationDelay: '0s' },
  { left: '48%', top: '52%', animationDelay: '.8s' },
  { left: '66%', top: '26%', animationDelay: '1.6s' },
  { left: '76%', top: '66%', animationDelay: '2.4s' },
];

export default function FindAStore() {
  return (
    <>
      <section className="phead" style={{ backgroundColor: 'var(--peach)', color: '#5A2212' }}>
        <div className="wrap phead-in">
          <h1>Find a Store</h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap finder">
          <StoreFinder />
          <div className="map r d1" role="img" aria-label="Placeholder for the store map">
            <svg viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M0 90H600M0 190H600M0 290H600M0 390H600M0 490H600M100 0V560M220 0V560M340 0V560M460 0V560" />
              <path d="M0 430C120 380 180 300 300 270S520 150 600 120" />
            </svg>
            {pins.map((p) => <span key={p.left} className="pin" style={p} />)}
            <span className="map-l">[Store map goes here]</span>
          </div>
        </div>
      </section>

      <section className="sec-end">
        <div className="wrap">
          <div className="strip r" style={{ backgroundColor: '#FBD0DB', color: '#58103A' }}>
            <div>
              <h2>Prefer it delivered?</h2>
              <p>Order online for doorstep delivery.</p>
            </div>
            <Link className="btn" href="/shop">Shop Online</Link>
          </div>
        </div>
      </section>
    </>
  );
}
