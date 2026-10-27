import { motion } from 'framer-motion';
import { Scissors, Sparkles, Ruler } from 'lucide-react';

// Yahan humne aapki asli image lagadi hai
const ATELIER_IMG = '/images/shirt-back.jpg';

const points = [
  { icon: Ruler, title: 'Custom Tailoring', text: 'Every silhouette is drafted and fitted to the client.' },
  { icon: Sparkles, title: 'Intricate Embellishment', text: 'Hand-finished detailing, composed with restraint.' },
  { icon: Scissors, title: 'Attention to Detail', text: 'From the first sketch to the final stitch.' },
];

export default function Atelier() {
  return (
    <section id="atelier" className="atelier section-pad">
      <div className="container atelier__grid">
        <motion.div
          className="atelier__media"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
        >
          {/* Yahan alt text bhi update kar diya hai */}
          <img src={ATELIER_IMG} alt="Intricate Hand Embroidery Detail" loading="lazy" />
        </motion.div>

        <motion.div
          className="atelier__body"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <p className="eyebrow">The Atelier</p>
          <h2>
            Where heritage meets <em>handcraft</em>
          </h2>
          <p>
            The studio is built around a simple belief: couture should feel
            personal, considered, and quietly extraordinary. Each commission
            begins with a conversation and ends with a piece made only for you.
          </p>
          <p>
            Our design philosophy draws on Middle Eastern architecture, rich
            fabric, and intricate gold detailing — expressed with restraint and
            modern line.
          </p>

          <div className="atelier__points">
            {points.map((p) => (
              <div className="atelier__point" key={p.title}>
                <p.icon size={20} />
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </div>
              </div>
            ))}
          </div>

          <a href="#consult" className="btn btn-outline">
            Book a Studio Visit
          </a>
        </motion.div>
      </div>
    </section>
  );
}