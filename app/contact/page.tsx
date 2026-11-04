import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { placeholders, social } from '@/lib/site';

const intro = 'Want to know more or get in touch? Send us a message or follow us on social media for the latest updates.';

export const metadata: Metadata = { title: 'Contact Us', description: intro };

export default function Contact() {
  return (
    <>
      <section className="phead" style={{ backgroundColor: 'var(--brat)', color: '#3A1A0A' }}>
        <div className="wrap phead-in">
          <h1>Contact Us</h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap ct">
          <ContactForm />
          <aside className="contact-tile r d1">
            <h2>Get in touch</h2>
            <dl>
              <div><dt>Email</dt><dd>{placeholders.email}</dd></div>
              <div><dt>Phone</dt><dd>{placeholders.phone}</dd></div>
            </dl>
            <div className="soc">
              {social.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
            </div>
            <div className="cta"><Link className="btn" href="/find-a-store">Find a Store</Link></div>
          </aside>
        </div>
      </section>
    </>
  );
}
