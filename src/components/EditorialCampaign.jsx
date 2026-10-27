import { motion } from 'framer-motion';

const imgs = {
  a: '/images/maroon-bridal-wear-2.jpg',
  b: '/images/red-bridal-wear.jpg',
  c: '/images/white-walima-dress.jpg',
};

export default function EditorialCampaign() {
  return (
    <section id="editorial" className="editorial section-pad">
      <div className="container">
        <div className="editorial__word" aria-hidden="true">Couture</div>
        <div className="editorial__grid">
          {[
            { src: imgs.a, cls: 'ed-1', alt: 'Editorial bridal campaign' },
            { src: imgs.b, cls: 'ed-2', alt: 'Evening gown editorial' },
            { src: imgs.c, cls: 'ed-3', alt: 'Ceremony editorial' },
          ].map((im, i) => (
            <motion.div
              key={im.cls}
              className={`editorial__img ${im.cls}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
            >
              <img src={im.src} alt={im.alt} loading="lazy" />
            </motion.div>
          ))}

          <div className="editorial__caption">
            <h2>
              An Art of <em>Its Own</em>
            </h2>
            <p>
              A campaign study in fabric, light, and architectural form — the
              quiet drama of couture, composed for the season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}