import { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useScrollSolid } from '../hooks/useScrollSolid';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const primaryLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'Bridal', href: '#featured' },
  { label: 'Editorial', href: '#editorial' },
  { label: 'Contact', href: '#consult' },
];

const moreLinks = [
  { label: 'Evening Wear', href: '#featured' },
  { label: 'Our Story', href: '#atelier' },
  { label: 'Lookbook', href: '#lookbook' },
];

export default function Navbar({ onOpenSearch, onOpenBag }) {
  const solid = useScrollSolid();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { bagCount, wishCount } = useStore();

  return (
    <>
      <header className={`navbar ${solid ? 'navbar--solid' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="brand" aria-label="Arabian Bridal Studio home">
            Arabian <span>Bridal</span> Studio
          </a>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {primaryLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li
                className="nav-more"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  className="nav-more__trigger"
                  onClick={() => setMoreOpen((v) => !v)}
                  aria-expanded={moreOpen}
                >
                  More <ChevronDown size={13} />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      className="nav-more__panel"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {moreLinks.map((l) => (
                        <a key={l.label} href={l.href}>{l.label}</a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" onClick={onOpenSearch} aria-label="Search designs">
              <Search size={18} />
            </button>
            <button className="icon-btn" aria-label="Wishlist" title={`${wishCount} saved`}>
              <Heart size={18} />
              {wishCount > 0 && <span className="badge-count">{wishCount}</span>}
            </button>
            <button className="icon-btn" onClick={onOpenBag} aria-label="Shopping bag">
              <ShoppingBag size={18} />
              {bagCount > 0 && <span className="badge-count">{bagCount}</span>}
            </button>
            <button
              className="icon-btn menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="mobile-menu__close icon-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
            <ul>
              {[...primaryLinks, ...moreLinks].map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}