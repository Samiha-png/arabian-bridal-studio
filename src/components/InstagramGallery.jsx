import { Camera } from 'lucide-react';
import { instagram } from '../data/lookbook';

export default function InstagramGallery() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Follow the Studio</p>
          <h2>
            From the <em>feed</em>
          </h2>
        </div>
        <div className="insta-grid">
          {instagram.map((src, i) => (
            <a key={i} className="insta-tile" href="#home" aria-label="Open Instagram gallery">
              <img src={src} alt={`Studio feed ${i + 1}`} loading="lazy" />
              <Camera size={22} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}