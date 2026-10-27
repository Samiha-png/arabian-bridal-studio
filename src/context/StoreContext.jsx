import { createContext, useContext, useMemo, useState } from 'react';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [bag, setBag] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const isWished = (id) => wishlist.includes(id);

  const addToBag = (id, qty = 1) =>
    setBag((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });

  const removeFromBag = (id) => setBag((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromBag(id);
    setBag((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearBag = () => setBag([]);

  const bagCount = useMemo(() => bag.reduce((s, i) => s + i.qty, 0), [bag]);
  const wishCount = wishlist.length;

  const value = {
    wishlist, toggleWishlist, isWished, wishCount,
    bag, addToBag, removeFromBag, updateQty, clearBag, bagCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}