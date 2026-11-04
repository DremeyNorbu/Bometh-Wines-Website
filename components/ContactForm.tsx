'use client';

import { useState, type FormEvent } from 'react';

// Not connected yet: the message goes nowhere until an inbox or form service is added.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const send = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="thanks" role="status">
        <h2>Thank you</h2>
        <p>Your message is on its way. We’ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="form r" onSubmit={send}>
      <div className="row">
        <div className="fld">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="fld">
          <label htmlFor="c-mail">Email</label>
          <input id="c-mail" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="fld">
        <label htmlFor="c-sub">What’s it about?</label>
        <select id="c-sub" name="subject">
          <option>General enquiry</option>
          <option>Orders and delivery</option>
          <option>Stockists</option>
          <option>Events</option>
        </select>
      </div>
      <div className="fld">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" required />
      </div>
      <button className="btn" type="submit">Send message</button>
    </form>
  );
}
