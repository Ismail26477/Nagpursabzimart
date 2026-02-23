import React, { useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const deliveryFee = totalPrice >= 199 ? 0 : 25;
  const discount = couponApplied ? Math.round(totalPrice * 0.1) : 0;
  const grandTotal = totalPrice + deliveryFee - discount;

  const suggestions = products.filter((p) => !items.find((i) => i.product.id === p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <MobileLayout hideNav>
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <h1 className="text-base font-bold text-foreground">Cart</h1>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <span className="text-6xl mb-4">🛒</span>
          <h2 className="text-lg font-bold text-foreground mb-1">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">Add fresh vegetables and fruits to get started!</p>
          <button onClick={() => navigate("/")} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm">
            Start Shopping
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">Cart ({items.length} items)</h1>
        </div>
      </header>

      <main className="px-4 pt-4 pb-40 space-y-4">
        {/* Cart Items */}
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              exit={{ opacity: 0, x: -100 }}
              className="bg-card rounded-xl border border-border p-3 flex gap-3"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground line-clamp-1">{item.product.name}</h3>
                <p className="text-[10px] text-muted-foreground">{item.selectedWeight}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm font-bold text-foreground">₹{item.unitPrice * item.quantity}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"
                    >
                      {item.quantity === 1 ? <Trash2 size={13} className="text-deal" /> : <Minus size={13} />}
                    </button>
                    <span className="text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center"
                    >
                      <Plus size={13} className="text-primary-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Coupon */}
        <div className="bg-card rounded-xl border border-border p-3">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={() => {
                if (coupon.trim()) setCouponApplied(true);
              }}
              className="text-xs font-bold text-primary"
            >
              Apply
            </button>
          </div>
          {couponApplied && (
            <p className="text-[10px] text-fresh mt-1.5 font-medium">🎉 10% discount applied!</p>
          )}
        </div>

        {/* Bill Summary */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="text-sm font-bold text-foreground mb-2">Bill Summary</h3>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Item Total</span>
            <span className="text-foreground font-medium">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className={deliveryFee === 0 ? "text-fresh font-medium" : "text-foreground font-medium"}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-fresh font-medium">-₹{discount}</span>
            </div>
          )}
          <div className="border-t border-border pt-2 flex justify-between text-sm">
            <span className="font-bold text-foreground">Grand Total</span>
            <span className="font-extrabold text-foreground">₹{grandTotal}</span>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">You might also like</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-area-bottom z-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-lg font-extrabold text-foreground">₹{grandTotal}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/checkout")}
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm"
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </MobileLayout>
  );
};

export default CartPage;
