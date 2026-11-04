import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, Fraunces } from 'next/font/google';
import AgeGate from '@/components/AgeGate';
import RevealObserver from '@/components/RevealObserver';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import './styles/base.css';
import './styles/home.css';
import './styles/pages.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-fraunces',
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: { default: 'Bometh Wine & Spritz', template: '%s · Bometh Wine & Spritz' },
  description: 'Australia’s vibrant new wine and spritz brand, inspired by the energy, strength, and joy of women everywhere. Made for her.',
};

// Runs before first paint so reveal-on-scroll elements never flash visible, and
// stays absent for visitors without JavaScript, who see everything.
const liveClass = "document.documentElement.classList.add('live')";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: liveClass }} />
      </head>
      <body>
        <div className="page">
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <AgeGate />
        <RevealObserver />
      </body>
    </html>
  );
}
