import { products } from '../data/products';
import ProductCard from './ProductCard';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';

export default function NewArrivals() {
  const [quick, setQuick] = useState(null);
  const arrivals = products.slice(-4);

  return (
    <section className="arrivals section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">New Arrivals</p>
          <h2>
            Latest from the <em>studio</em>
          </h2>
        </div>
        <div className="products-grid">
          {arrivals.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuick} />
          ))}
        </div>
      </div>
      <QuickViewModal product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}