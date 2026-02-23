import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface BulkOrderItem {
  product: Product;
  quantityKg: number;
  bulkPricePerKg: number;
}

export type DeliveryFrequency = "one-time" | "daily" | "weekly" | "custom";

export interface BusinessProfile {
  businessName: string;
  gstNumber: string;
  contactPerson: string;
  phone: string;
  address: string;
}

export interface BulkOrder {
  id: string;
  items: BulkOrderItem[];
  business: BusinessProfile;
  frequency: DeliveryFrequency;
  customDays?: string[];
  total: number;
  date: string;
  status: string;
}

interface BulkOrderContextType {
  items: BulkOrderItem[];
  addBulkItem: (product: Product, quantityKg: number) => void;
  removeBulkItem: (productId: string) => void;
  updateBulkQuantity: (productId: string, quantityKg: number) => void;
  getBulkItemQuantity: (productId: string) => number;
  totalBulkPrice: number;
  clearBulkCart: () => void;
  bulkOrders: BulkOrder[];
  placeBulkOrder: (business: BusinessProfile, frequency: DeliveryFrequency, customDays?: string[]) => string;
}

const BulkOrderContext = createContext<BulkOrderContextType | undefined>(undefined);

export function getBulkPricePerKg(basePrice: number, quantityKg: number): number {
  // Tiered pricing: 10kg+ → 15% off, 25kg+ → 20% off, 50kg+ → 25% off
  if (quantityKg >= 50) return Math.round(basePrice * 0.75);
  if (quantityKg >= 25) return Math.round(basePrice * 0.80);
  if (quantityKg >= 10) return Math.round(basePrice * 0.85);
  return basePrice;
}

export const BulkOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BulkOrderItem[]>([]);
  const [bulkOrders, setBulkOrders] = useState<BulkOrder[]>([
    {
      id: "BK100231",
      items: [
        { product: { id: "2", name: "Organic Tomatoes", category: "seasonal", price: 40, originalPrice: 55, unit: "500g", weightOptions: [], image: "", description: "", nutrition: "" }, quantityKg: 25, bulkPricePerKg: 32 },
        { product: { id: "13", name: "Potato", category: "root", price: 30, originalPrice: 38, unit: "1kg", weightOptions: [], image: "", description: "", nutrition: "" }, quantityKg: 50, bulkPricePerKg: 23 },
      ],
      business: { businessName: "Royal Kitchen Restaurant", gstNumber: "07AAACR1234F1Z5", contactPerson: "Raj Sharma", phone: "9876543210", address: "15, Connaught Place, Delhi" },
      frequency: "daily",
      total: 1950,
      date: "Today, 6:00 AM",
      status: "Delivered",
    },
    {
      id: "BK100189",
      items: [
        { product: { id: "1", name: "Fresh Spinach", category: "leafy", price: 25, originalPrice: 35, unit: "250g", weightOptions: [], image: "", description: "", nutrition: "" }, quantityKg: 10, bulkPricePerKg: 21 },
      ],
      business: { businessName: "Royal Kitchen Restaurant", gstNumber: "07AAACR1234F1Z5", contactPerson: "Raj Sharma", phone: "9876543210", address: "15, Connaught Place, Delhi" },
      frequency: "weekly",
      total: 210,
      date: "Feb 10, 2026",
      status: "Delivered",
    },
  ]);

  const addBulkItem = useCallback((product: Product, quantityKg: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const qty = existing ? existing.quantityKg + quantityKg : quantityKg;
      const bulkPrice = getBulkPricePerKg(product.price, qty);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantityKg: qty, bulkPricePerKg: bulkPrice } : i
        );
      }
      return [...prev, { product, quantityKg, bulkPricePerKg: bulkPrice }];
    });
  }, []);

  const removeBulkItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateBulkQuantity = useCallback((productId: string, quantityKg: number) => {
    if (quantityKg <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => {
          if (i.product.id === productId) {
            return { ...i, quantityKg, bulkPricePerKg: getBulkPricePerKg(i.product.price, quantityKg) };
          }
          return i;
        })
      );
    }
  }, []);

  const getBulkItemQuantity = useCallback(
    (productId: string) => items.find((i) => i.product.id === productId)?.quantityKg || 0,
    [items]
  );

  const totalBulkPrice = items.reduce((sum, i) => sum + i.bulkPricePerKg * i.quantityKg, 0);

  const placeBulkOrder = useCallback((business: BusinessProfile, frequency: DeliveryFrequency, customDays?: string[]) => {
    const orderId = `BK${Math.floor(100000 + Math.random() * 900000)}`;
    const order: BulkOrder = {
      id: orderId,
      items: [...items],
      business,
      frequency,
      customDays,
      total: items.reduce((sum, i) => sum + i.bulkPricePerKg * i.quantityKg, 0),
      date: "Just now",
      status: "Confirmed",
    };
    setBulkOrders((prev) => [order, ...prev]);
    setItems([]);
    return orderId;
  }, [items]);

  return (
    <BulkOrderContext.Provider
      value={{ items, addBulkItem, removeBulkItem, updateBulkQuantity, getBulkItemQuantity, totalBulkPrice, clearBulkCart: () => setItems([]), bulkOrders, placeBulkOrder }}
    >
      {children}
    </BulkOrderContext.Provider>
  );
};

export const useBulkOrder = () => {
  const ctx = useContext(BulkOrderContext);
  if (!ctx) throw new Error("useBulkOrder must be used within BulkOrderProvider");
  return ctx;
};
