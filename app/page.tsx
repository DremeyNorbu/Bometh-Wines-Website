import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import script from '@/assets/brand/script.png';
import handsToast from '@/assets/photos/hands-toast.jpg';
import womenToast from '@/assets/photos/women-toast.jpg';
import Collection from '@/components/home/Collection';
import Hero from '@/components/home/Hero';
import ScrollEffects from '@/components/home/ScrollEffects';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = { title: { absolute: 'Bometh Wine & Spritz · Made for her' } };

const strip = ['Lightly sparkling', 'Delightfully flavoured', 'Perfectly portable', 'Made for her', 'Handy, ready to chill'];

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <Hero />

      <div className="mq" aria-hidden="true">
        <div className="mq-t">
          {[0, 1, 2, 3].flatMap((n) => strip.map((s) => <span key={`${n}-${s}`}>{s}</span>))}
        </div>
      </div>

      <section className="sec">
        <div className="wrap wel">
          <div className="wel-t r">
            <h2>Welcome To Bometh</h2>
            <p>
              Australia’s vibrant new wine and spritz brand, inspired by the <span className="hl hl1">energy</span>,{' '}
              <span className="hl hl2">strength</span>, and <span className="hl hl3">joy</span> of women everywhere.
            </p>
            <p>Whether you prefer the premium bottled wines or our refreshing canned Wine Spritz range, every sip embodies quality, tradition, and modern living.</p>
          </div>
          <figure className="r d1 crop-in">
            <Image src={handsToast} alt="Two glasses of white wine raised in a toast" sizes="(max-width: 900px) 100vw, 560px" />
          </figure>
        </div>
      </section>

      <Collection />

      <section className="sec story" id="story">
        <div className="wrap st">
          <div className="t r">
            <h2>Our Story</h2>
            <p>Born from the passion of a young woman and a heartfelt dedication to women everywhere.</p>
            <p>Bometh Wines and Spritz honors the incredible strength and spirit of working moms, young leaders, and every woman shaping the world.</p>
            <p>Our wines and spritz are crafted to fit the moments you live: vibrant, bold, and effortlessly elegant. Raising a glass with Bometh means celebrating resilience, joy, and community.</p>
            <div className="r sign">
              <Image className="sig" src={script} alt="Made for her." sizes="220px" />
            </div>
          </div>
          <div className="r unfold story-photo">
            <figure>
              <Image src={womenToast} alt="Two women laughing and raising a glass outdoors" sizes="(max-width: 900px) 100vw, 560px" />
            </figure>
          </div>
        </div>
      </section>

      <section className="sec bento-w">
        <div className="wrap bento">
          <div className="tile t-buy r">
            <h2>Where to Buy</h2>
            <p>Find Bometh Wines and Wine Spritz cans and bottles at select liquor stores across Australia or order online for doorstep delivery.</p>
            <div className="cta">
              <Link className="btn" href="/find-a-store">Find a Store</Link>
              <Link className="btn out" href="/shop">Shop Online</Link>
            </div>
          </div>
          <div className="tile t-ev r d1">
            <h2>Events &amp; News</h2>
            <p>Join us at wine tastings, festivals, and exclusive launch events. Stay up to date with new product releases and special offers.</p>
            <ul className="ev">
              <li>Wine tastings <span>[Date]</span></li>
              <li>Festivals <span>[Date]</span></li>
              <li>Exclusive launch events <span>[Date]</span></li>
            </ul>
          </div>
          <div className="tile t-con r d2">
            <h2>Contact Us</h2>
            <p>Want to know more or get in touch? Connect through our contact page or follow us on social media for the latest updates.</p>
            <div className="cta"><Link className="btn" href="/contact">Get in touch</Link></div>
          </div>
          <NewsletterForm variant="tile" />
        </div>
      </section>
    </>
  );
}
