'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import mark from '@/assets/brand/mark.webp';

const KEY = 'bometh-age-confirmed';

const remembered = () => {
  try {
    return window.localStorage.getItem(KEY) === 'yes';
  } catch {
    return false;
  }
};

export default function AgeGate() {
  const [status, setStatus] = useState<'hidden' | 'asking' | 'underage'>('hidden');

  useEffect(() => {
    if (!remembered()) setStatus('asking');
  }, []);

  if (status === 'hidden') return null;

  const confirm = () => {
    try {
      window.localStorage.setItem(KEY, 'yes');
    } catch {
      // Private browsing can block storage. The visitor is simply asked again next time.
    }
    setStatus('hidden');
  };

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-label="Age check">
      <div className="gate-card">
        <Image src={mark} alt="" sizes="96px" />
        <h2>Are you 18 or over?</h2>
        <p>
          {status === 'underage'
            ? 'Sorry, you need to be 18 or over to visit this site.'
            : 'Bometh is for those of legal drinking age.'}
        </p>
        <div className="cta">
          <button className="btn" onClick={confirm} autoFocus>Yes, I am</button>
          <button className="btn out" onClick={() => setStatus('underage')}>Not yet</button>
        </div>
      </div>
    </div>
  );
}
