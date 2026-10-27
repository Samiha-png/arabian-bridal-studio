import { motion } from 'framer-motion';

const items = [
  { num: '01', title: 'Hand Embellishment', text: 'Gold detailing applied by hand, with restraint.' },
  { num: '02', title: 'Architectural Form', text: 'Silhouettes built on line, structure, and drape.' },
  { num: '03', title: 'Made to Measure', text: 'Every piece drafted and fitted to the client.' },
  { num: '04', title: 'Heritage Fabrics', text: 'Rich textiles selected for movement and depth.' },
];

export default function Craftsmanship() {
  return (
    <section className="craft section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Craftsmanship</p>
          <h2>
            The quiet <em>discipline</em> behind each piece
          </h2>
        </div>
        <div className="craft__grid">
          {items.map((it, i) => (
            <motion.div
              key={it.num}
              className="craft__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <div className="craft__num">{it.num}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}