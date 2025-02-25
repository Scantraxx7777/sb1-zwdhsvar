import React, { createContext, useContext, useState } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (templateId: string) => void;
  removeFromCart: (templateId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (templateId: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.templateId === templateId);
      if (existing) {
        return prev.map(item =>
          item.templateId === templateId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { templateId, quantity: 1 }];
    });
  };

  const removeFromCart = (templateId: string) => {
    setItems(prev => prev.filter(item => item.templateId !== templateId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}