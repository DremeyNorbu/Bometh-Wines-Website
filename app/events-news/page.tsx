import type { Metadata } from 'next';
import EventsList from '@/components/EventsList';
import NewsletterForm from '@/components/NewsletterForm';

const intro = 'Join us at wine tastings, festivals, and exclusive launch events. Stay up to date with new product releases and special offers.';

export const metadata: Metadata = { title: 'Events & News', description: intro };

export default function EventsNews() {
  return (
    <>
      <section className="phead" style={{ backgroundColor: 'var(--berry)', color: '#FFF6F3' }}>
        <div className="wrap phead-in">
          <h1>Events &amp; News</h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <EventsList />
        </div>
      </section>

      <section className="sec-end">
        <div className="wrap">
          <NewsletterForm variant="strip" />
        </div>
      </section>
    </>
  );
}
