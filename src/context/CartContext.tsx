import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, weight?: string, unitPrice?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemDetails: (productId: string, weight: string, unitPrice: number) => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, weight?: string, unitPrice?: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, selectedWeight: weight || product.weightOptions[0], unitPrice: unitPrice || product.price }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    }
  }, []);

  const updateItemDetails = useCallback((productId: string, weight: string, unitPrice: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, selectedWeight: weight, unitPrice } : i))
    );
  }, []);

  const getItemQuantity = useCallback(
    (productId: string) => items.find((i) => i.product.id === productId)?.quantity || 0,
    [items]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, updateItemDetails, getItemQuantity, totalItems, totalPrice, clearCart: () => setItems([]) }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
