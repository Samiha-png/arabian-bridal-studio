import { X, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';

export default function QuickViewModal({ product, onClose }) {
  const { isWished, toggleWishlist, addToBag } = useStore();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} details`}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal__media">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="modal__body">
              <span className="modal__cat">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="modal__desc">{product.description}</p>
              <ul style={{ color: 'rgba(244,239,229,0.65)', fontSize: '0.86rem', paddingLeft: '1rem' }}>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="modal__price">{product.priceLabel}</div>
              <div className="modal__row">
                <button className="btn btn-gold" onClick={() => addToBag(product.id)}>
                  <ShoppingBag size={16} /> Add to Bag
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => toggleWishlist(product.id)}
                  aria-pressed={isWished(product.id)}
                >
                  <Heart size={16} fill={isWished(product.id) ? 'currentColor' : 'none'} />
                  {isWished(product.id) ? 'Saved' : 'Wishlist'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}