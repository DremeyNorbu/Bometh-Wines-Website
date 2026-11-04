import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="wrap nf">
      <h1>Page not found</h1>
      <p>This page may have moved. Let’s get you back to the good stuff.</p>
      <div className="cta">
        <Link className="btn" href="/">Back to home</Link>
        <Link className="btn out" href="/shop">Shop Online</Link>
      </div>
    </section>
  );
}
