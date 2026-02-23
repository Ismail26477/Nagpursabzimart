import React, { useState } from "react";
import { ArrowLeft, Package, Search, Minus, Plus, Trash2, Truck, TrendingDown, Shield, Star, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { products } from "@/data/products";
import { categories } from "@/data/products";
import { useBulkOrder, getBulkPricePerKg } from "@/context/BulkOrderContext";
import logosabzi from "@/assets/logosabzi.png";

const kgPresets = [5, 10, 25, 50];

const BulkOrder: React.FC = () => {
  const navigate = useNavigate();
  const { items, addBulkItem, updateBulkQuantity, removeBulkItem, getBulkItemQuantity, totalBulkPrice } = useBulkOrder();
  const [search, setSearch] = useState("");
  const [customQty, setCustomQty] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered = products
    .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleCustomAdd = (product: typeof products[0]) => {
    const qty = parseFloat(customQty[product.id] || "0");
    if (qty > 0) {
      addBulkItem(product, qty);
      setCustomQty((prev) => ({ ...prev, [product.id]: "" }));
    }
  };

  const totalSavings = items.reduce((s, i) => s + (i.product.price - i.bulkPricePerKg) * i.quantityKg, 0);

  return (
    <MobileLayout>
      {/* Hero Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground px-4 pt-4 pb-4 safe-area-top">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="text-base font-extrabold">Bulk Orders</h1>
              <p className="text-[10px] opacity-80">Hotels • Restaurants • Caterers</p>
            </div>
          </div>
          <img src={logosabzi} alt="Logo" className="h-9 w-auto opacity-90" />
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm rounded-xl px-3 py-2.5">
          <Search size={16} className="opacity-60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vegetables & fruits..."
            className="bg-transparent text-sm outline-none w-full placeholder:opacity-60"
          />
        </div>
      </header>

      {/* USP Strip */}
      <div className="flex gap-0 border-b border-border bg-card">
        {[
          { icon: TrendingDown, text: "Up to 25% OFF", color: "text-fresh" },
          { icon: Truck, text: "Free Delivery", color: "text-primary" },
          { icon: Shield, text: "GST Invoice", color: "text-accent" },
        ].map(({ icon: Icon, text, color }) => (
          <div key={text} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border-r last:border-r-0 border-border">
            <Icon size={13} className={color} />
            <span className="text-[10px] font-semibold text-foreground">{text}</span>
          </div>
        ))}
      </div>

      {/* Pricing Tiers */}
      <div className="mx-4 mt-3 bg-gradient-to-r from-fresh/10 via-primary/5 to-accent/10 border border-fresh/20 rounded-xl p-3">
        <p className="text-xs font-bold text-foreground mb-2">📦 Bulk Pricing Tiers — More you buy, more you save!</p>
        <div className="flex gap-2">
          {[
            { kg: "10kg+", off: "15%", bg: "bg-fresh/15 border-fresh/30" },
            { kg: "25kg+", off: "20%", bg: "bg-primary/15 border-primary/30" },
            { kg: "50kg+", off: "25%", bg: "bg-accent/15 border-accent/30" },
          ].map(({ kg, off, bg }) => (
            <div key={kg} className={`flex-1 text-center py-2 rounded-lg border ${bg}`}>
              <p className="text-[11px] font-extrabold text-foreground">{off}</p>
              <p className="text-[9px] text-muted-foreground">{kg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto hide-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-colors ${
            selectedCategory === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"
          }`}
        >
          All Items
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-colors ${
              selectedCategory === cat.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Items in Cart Summary */}
      {items.length > 0 && (
        <div className="mx-4 mt-3 bg-primary/5 border border-primary/20 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package size={14} className="text-primary" />
            <span className="text-[11px] font-semibold text-foreground">{items.length} items • {items.reduce((s, i) => s + i.quantityKg, 0)}kg</span>
          </div>
          {totalSavings > 0 && (
            <span className="text-[10px] font-bold text-fresh bg-fresh/10 px-2 py-0.5 rounded-full">Saving ₹{totalSavings}</span>
          )}
        </div>
      )}

      <main className="px-4 pt-3 pb-32 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package size={40} className="mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No products found</p>
          </div>
        )}
        {filtered.map((product) => {
          const currentQty = getBulkItemQuantity(product.id);
          const bulkPrice = getBulkPricePerKg(product.price, currentQty || 1);
          const discount = currentQty >= 10 ? Math.round((1 - bulkPrice / product.price) * 100) : 0;

          return (
            <motion.div
              key={product.id}
              layout
              className={`bg-card rounded-xl border ${currentQty > 0 ? "border-primary/30 shadow-md shadow-primary/5" : "border-border"} p-3 transition-all`}
            >
              <div className="flex gap-3">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  {currentQty > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-[8px] font-bold text-primary-foreground">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-foreground">₹{bulkPrice}/kg</span>
                    {discount > 0 && (
                      <span className="text-[10px] bg-fresh/10 text-fresh font-bold px-1.5 py-0.5 rounded-full">{discount}% OFF</span>
                    )}
                    <span className="text-[10px] text-muted-foreground line-through">₹{product.price}/kg</span>
                  </div>

                  {/* KG Presets */}
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {kgPresets.map((kg) => (
                      <button
                        key={kg}
                        onClick={() => addBulkItem(product, kg)}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-lg border border-border text-foreground hover:border-primary hover:bg-primary/5 active:scale-95 transition-all"
                      >
                        +{kg}kg
                      </button>
                    ))}
                    {/* Custom input */}
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={customQty[product.id] || ""}
                        onChange={(e) => setCustomQty((prev) => ({ ...prev, [product.id]: e.target.value }))}
                        placeholder="Custom"
                        className="w-16 text-[10px] px-2 py-1 rounded-lg border border-border bg-transparent text-foreground outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => handleCustomAdd(product)}
                        className="text-[10px] font-bold text-primary px-1.5 py-1"
                      >
                        +kg
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current quantity */}
              <AnimatePresence>
                {currentQty > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between mt-2 pt-2 border-t border-border"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeBulkItem(product.id)}
                        className="w-6 h-6 rounded-lg bg-deal/10 flex items-center justify-center"
                      >
                        <Trash2 size={12} className="text-deal" />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateBulkQuantity(product.id, currentQty - 1)}
                          className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-xs font-bold min-w-[40px] text-center">{currentQty}kg</span>
                        <button
                          onClick={() => updateBulkQuantity(product.id, currentQty + 1)}
                          className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center"
                        >
                          <Plus size={13} className="text-primary-foreground" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-foreground">
                        ₹{getBulkPricePerKg(product.price, currentQty) * currentQty}
                      </span>
                      {discount > 0 && (
                        <p className="text-[9px] text-fresh font-semibold">You save ₹{(product.price - getBulkPricePerKg(product.price, currentQty)) * currentQty}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </main>

      {/* Bottom CTA */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-area-bottom z-50">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs text-muted-foreground">{items.length} items • {items.reduce((s, i) => s + i.quantityKg, 0)}kg total</span>
              {totalSavings > 0 && (
                <p className="text-[10px] text-fresh font-bold">Total Savings: ₹{totalSavings}</p>
              )}
            </div>
            <span className="text-lg font-extrabold text-foreground">₹{totalBulkPrice}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/bulk-checkout")}
            className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
          >
            Proceed to Bulk Checkout →
          </motion.button>
        </div>
      )}
    </MobileLayout>
  );
};

export default BulkOrder;
