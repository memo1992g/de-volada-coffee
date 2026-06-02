import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

function getPriceNumber(price) {
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      return JSON.parse(window.localStorage.getItem('devolada-cart') || '[]');
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('devolada-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!lastAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setLastAdded(null), 2600);

    return () => window.clearTimeout(timeoutId);
  }, [lastAdded]);

  const addItem = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === product.slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
    setLastAdded(product);
    setIsCartOpen(true);
  };

  const decreaseItem = (slug) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.slug === slug ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const increaseItem = (slug) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const removeItem = (slug) => {
    setItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + getPriceNumber(item.price) * item.quantity, 0);
    const shipping = items.length > 0 ? 3.5 : 0;
    const impact = subtotal * 0.05;
    const total = subtotal + shipping;
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      count,
      impact,
      shipping,
      subtotal,
      total,
    };
  }, [items]);

  const value = useMemo(
    () => ({
      addItem,
      clearCart,
      decreaseItem,
      increaseItem,
      isCartOpen,
      items,
      lastAdded,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      removeItem,
      totals,
    }),
    [items, isCartOpen, lastAdded, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
