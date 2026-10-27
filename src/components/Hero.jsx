import { motion } from 'framer-motion';

// Yahan aapki best bridal image use ki gayi hai
const HERO_IMG = '/images/red-bridal-wear.jpg'; 

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.div
        className="hero__bg"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      <div className="hero__overlay" />
      <div className="container">
        <div className="hero__content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Arabian Royal Couture · Est. Studio
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1 }}
          >
            Where Royal <em>Elegance</em> Meets Timeless Couture
          </motion.h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
          >
            Exceptional bridal artistry, inspired by heritage and crafted for
            unforgettable moments.
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            <a href="#collections" className="btn btn-gold">
              Explore the Collection
            </a>
            <a href="#consult" className="btn btn-outline">
              Book a Private Consultation
            </a>
          </motion.div>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}