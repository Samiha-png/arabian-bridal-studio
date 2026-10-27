import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '../data/collections';

export default function SignatureCollections() {
  return (
    <section id="collections" className="section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Signature Collections</p>
          <h2>
            A wardrobe of <em>heritage</em> and modern couture
          </h2>
          <p>
            Each collection is composed around architectural form, rich fabric,
            and restrained gold detail — made for moments that deserve to be
            remembered.
          </p>
        </div>

        <div className="collections-grid">
          {collections.map((c, i) => (
            <motion.a
              key={c.id}
              href="#featured"
              className={`col-card ${c.className}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
            >
              <img src={c.image} alt={c.title} loading="lazy" />
              <div className="col-card__shade" />
              <div className="col-card__arrow">
                <ArrowUpRight size={18} />
              </div>
              <div className="col-card__body">
                <h3 className="col-card__title">{c.title}</h3>
                <p className="col-card__reveal">{c.blurb}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}