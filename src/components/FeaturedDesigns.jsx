import { useMemo, useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';

export default function FeaturedDesigns() {
  const [active, setActive] = useState('All');
  const [quick, setQuick] = useState(null);

  const filtered = useMemo(() => {
    if (active === 'All') return products;
    return products.filter((p) => p.category === active);
  }, [active]);

  return (
    <section id="featured" className="section-pad" style={{ background: 'var(--emerald-deep)' }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Featured Designs</p>
          <h2>
            Selected pieces from the <em>studio</em>
          </h2>
          <p>
            A curated edit of bridal and evening silhouettes. All pricing is
            available on request; every piece is made to measure.
          </p>
        </div>

        <div className="products-bar">
          <div className="filter-chips" role="tablist" aria-label="Filter by collection">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                className={`chip ${active === c ? 'chip--active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuick} />
          ))}
        </div>
      </div>

      <QuickViewModal product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}