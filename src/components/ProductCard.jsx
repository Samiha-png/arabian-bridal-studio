import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, onQuickView }) {
  const { isWished, toggleWishlist } = useStore();

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`wish-btn ${isWished(product.id) ? 'wish-btn--on' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWished(product.id)}
        >
          <Heart size={17} fill={isWished(product.id) ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-view-btn" onClick={() => onQuickView(product)}>
          Quick View
        </button>
      </div>
      <div className="product-card__body">
        <span className="product-card__cat">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <span className="product-card__price">{product.priceLabel}</span>
      </div>
    </article>
  );
}