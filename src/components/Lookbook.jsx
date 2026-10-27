import { useState } from 'react';
import { lookbook } from '../data/lookbook';
import Lightbox from './Lightbox';

export default function Lookbook() {
  const [index, setIndex] = useState(null);

  return (
    <section className="section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Lookbook</p>
          <h2>
            A refined <em>gallery</em> of the season
          </h2>
        </div>
        <div className="lookbook-grid">
          {lookbook.map((l, i) => (
            <button
              key={l.id}
              className="lookbook-tile"
              onClick={() => setIndex(i)}
              aria-label={`Open ${l.label}`}
            >
              <img src={l.src} alt={l.label} loading="lazy" />
              <span className="lookbook-tile__label">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
      <Lightbox
        items={lookbook}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={() => setIndex((i) => (i - 1 + lookbook.length) % lookbook.length)}
        onNext={() => setIndex((i) => (i + 1) % lookbook.length)}
      />
    </section>
  );
}