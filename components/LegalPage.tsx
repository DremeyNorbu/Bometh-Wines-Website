import { placeholders } from '@/lib/site';

const toId = (heading: string) => heading.toLowerCase().replace(/[^a-z]+/g, '-');

export default function LegalPage({ title, sections }: { title: string; sections: string[] }) {
  return (
    <>
      <section className="phead" style={{ backgroundColor: 'var(--sage)', color: '#24301C' }}>
        <div className="wrap phead-in">
          <h1>{title}</h1>
          <p>Last updated [Date]</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap doc">
          <nav className="toc" aria-label="On this page">
            {sections.map((s) => <a key={s} href={`#${toId(s)}`}>{s}</a>)}
          </nav>
          <div className="doc-body">
            {sections.map((s) => (
              <section key={s} className="r">
                <h2 id={toId(s)}>{s}</h2>
                <p>{placeholders.legalText}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
