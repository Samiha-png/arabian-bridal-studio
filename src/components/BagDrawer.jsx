import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export default function BagDrawer({ open, onClose, onCheckout }) {
  const { bag, updateQty, removeFromBag } = useStore();

  const bagProducts = bag.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id),
  })).filter((i) => i.product);

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
            aria-label="Shopping bag"
          >
            <div className="drawer__head">
              <h3>
                Your <em>Bag</em>
              </h3>
              <button className="icon-btn" onClick={onClose} aria-label="Close bag">
                <X size={22} />
              </button>
            </div>

            {bagProducts.length === 0 && (
              <p className="empty-note">Your bag is currently empty.</p>
            )}

            {bagProducts.map(({ id, qty, product }) => (
              <div className="bag-item" key={id}>
                <img src={product.image} alt={product.name} />
                <div className="bag-item__body">
                  <span className="bag-item__cat">{product.category}</span>
                  <span className="bag-item__name">{product.name}</span>
                  <div className="bag-item__row">
                    <div className="qty-controls">
                      <button onClick={() => updateQty(id, qty - 1)} aria-label="Decrease quantity">
                        <Minus size={12} />
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => updateQty(id, qty + 1)} aria-label="Increase quantity">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      className="bag-remove"
                      onClick={() => removeFromBag(id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={13} style={{ verticalAlign: 'middle' }} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bag-footer">
              <div className="bag-total">
                <span>Total</span>
                <strong>Price on Request</strong>
              </div>
              <button
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  if (bagProducts.length === 0) return;
                  onCheckout?.();
                }}
                disabled={bagProducts.length === 0}
              >
                Proceed to Checkout
              </button>
              <p className="bag-demo-note">Demo only · No real payment</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}