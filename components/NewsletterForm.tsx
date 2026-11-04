'use client';

import { useState, type FormEvent } from 'react';

// Not connected yet: this needs the client's email marketing tool before launch.
export default function NewsletterForm({ variant }: { variant: 'tile' | 'strip' }) {
  const [done, setDone] = useState(false);
  const id = `newsletter-${variant}`;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  if (variant === 'tile') {
    return (
      <form className="tile t-news r d3" onSubmit={submit}>
        <h2>Newsletter</h2>
        <p>New product releases and special offers, straight to your inbox.</p>
        <label htmlFor={id} className="end">Email address</label>
        {done ? <p role="status">Thanks for signing up.</p> : (
          <div className="field">
            <input id={id} type="email" placeholder="you@example.com" autoComplete="email" required />
            <button className="btn" type="submit">Sign up</button>
          </div>
        )}
      </form>
    );
  }

  return (
    <form className="strip news-strip r" onSubmit={submit}>
      <div>
        <h2>Stay up to date</h2>
        <p>New product releases and special offers, straight to your inbox.</p>
      </div>
      {done ? <p role="status">Thanks for signing up.</p> : (
        <div className="news-field">
          <div className="fld">
            <label htmlFor={id}>Email address</label>
            <input id={id} type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <button className="btn" type="submit">Sign up</button>
        </div>
      )}
    </form>
  );
}
