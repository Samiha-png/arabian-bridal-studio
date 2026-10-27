import { useMemo, useState } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

export default function SearchDrawer({ open, onClose, onSelect }) {
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Search designs"
          >
            <div className="drawer__head">
              <h3>
                Search <em>Designs</em>
              </h3>
              <button className="icon-btn" onClick={onClose} aria-label="Close search">
                <X size={22} />
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{ position: 'absolute', left: 14, top: 15, color: 'var(--gold)' }}
              />
              <input
                className="search-input"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="Search by name or collection..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
              />
            </div>

            {q.trim() && results.length === 0 && (
              <p className="empty-note">No designs matched your search.</p>
            )}

            {results.map((p) => (
              <button
                key={p.id}
                className="search-result"
                onClick={() => {
                  onClose();
                  onSelect(p);
                }}
              >
                <img src={p.image} alt={p.name} />
                <div className="search-result__body">
                  <span className="search-result__cat">{p.category}</span>
                  <span className="search-result__name">{p.name}</span>
                </div>
              </button>
            ))}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}