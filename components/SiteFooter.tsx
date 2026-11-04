import Image from 'next/image';
import Link from 'next/link';
import wordmark from '@/assets/brand/wordmark.png';
import { legalNotice, social } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <Image src={wordmark} alt="Bometh" sizes="170px" />
          <nav aria-label="Footer">
            {social.map((s) => (
              <a key={s.label} href={s.href}>{s.label}</a>
            ))}
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
        <p className="legal">{legalNotice}</p>
      </div>
    </footer>
  );
}
