import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section className="testimonials section-pad">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Client Words</p>
          <h2>
            Notes from the <em>studio</em>
          </h2>
          <p className="testi-demo">Sample content · for demo only</p>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              className="testi-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <span className="testi-card__mark">“</span>
              <p>{t.quote}</p>
              <footer className="testi-card__who">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}