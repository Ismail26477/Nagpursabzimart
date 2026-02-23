import React, { useState, useEffect } from "react";
import { MapPin, Search, ShoppingCart, ChevronRight, Zap, ChevronDown } from "lucide-react";
import logo from "@/assets/logosabzi.png";
import bannerMangoes from "@/assets/banner-mangoes.jpg";
import bannerDelivery from "@/assets/banner-delivery.jpg";
import bannerStrawberry from "@/assets/banner-strawberry.jpg";
import bannerBulk from "@/assets/banner-bulk.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/ProductCard";
import LocationPicker from "@/components/LocationPicker";
import FloatingCartBar from "@/components/FloatingCartBar";
import { useLocation } from "@/context/LocationContext";
import { useCart } from "@/context/CartContext";
import { products, categories } from "@/data/products";

const banners = [
  { id: 1, title: "Fresh Mangoes", subtitle: "30% OFF on Alphonso", bg: "from-primary to-primary/70", image: bannerMangoes, label: "", cta: "Shop Now" },
  { id: 2, title: "Free Delivery", subtitle: "On orders above ₹199", bg: "from-fresh to-fresh/70", image: bannerDelivery, label: "", cta: "Shop Now" },
  { id: 3, title: "Strawberry Season", subtitle: "Fresh from farms", bg: "from-deal to-deal/70", image: bannerStrawberry, label: "", cta: "Shop Now" },
  { id: 4, title: "Bulk Orders 📦", subtitle: "Hotels • Restaurants • Caterers", bg: "from-primary to-primary/70", image: bannerBulk, label: "FOR BUSINESSES", cta: "Up to 25% OFF →", link: "/bulk-order" },
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { location, setLocationPickerOpen } = useLocation();
  const { totalItems } = useCart();
  const [activeBanner, setActiveBanner] = useState(0);
  const trending = products.filter((p) => p.trending);
  const vegetables = products.filter((p) => ["leafy", "root", "seasonal", "gourds"].includes(p.category));
  const fruits = products.filter((p) => ["exotic-fruits", "citrus", "berries"].includes(p.category));
  const deals = products.filter((p) => p.bestDeal);

  useEffect(() => {
    const timer = setInterval(() => setActiveBanner((p) => (p + 1) % banners.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MobileLayout>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 pt-3 pb-2 safe-area-top">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Nagpur Sabzi Mart" className="h-12 w-auto" />
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setLocationPickerOpen(true)}>
              <MapPin size={14} />
              <div>
                <p className="text-[10px] opacity-80">Delivery to</p>
                <p className="text-xs font-bold flex items-center gap-0.5">
                  {location.area} <ChevronDown size={12} />
                </p>
              </div>
            </div>
          </div>
          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2.5 bg-deal text-deal-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div
          className="flex items-center gap-2 bg-primary-foreground/15 rounded-xl px-3 py-2.5 cursor-pointer"
          onClick={() => navigate("/search")}
        >
          <Search size={16} className="opacity-60" />
          <span className="text-sm opacity-60">Search for vegetables, fruits...</span>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-5">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div
            key={activeBanner}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={`relative rounded-2xl overflow-hidden min-h-[140px] flex items-center justify-between`}
          >
            <img src={banners[activeBanner].image} alt={banners[activeBanner].title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-5">
              {banners[activeBanner].label && (
                <p className="text-xs font-bold opacity-80 mb-0.5 text-white">{banners[activeBanner].label}</p>
              )}
              <p className="text-lg font-extrabold text-white">{banners[activeBanner].title}</p>
              <p className="text-sm opacity-90 text-white">{banners[activeBanner].subtitle}</p>
              <button
                className="mt-2 bg-white/20 text-xs font-bold px-3 py-1 rounded-full text-white"
                onClick={() => banners[activeBanner].link && navigate(banners[activeBanner].link!)}
              >
                {banners[activeBanner].cta}
              </button>
            </div>
          </motion.div>
          <div className="flex justify-center gap-1.5 mt-2">
            {banners.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeBanner ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Fastest Delivery Badge */}
        <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-3 py-2">
          <Zap size={18} className="text-accent fill-accent" />
          <p className="text-xs font-semibold text-foreground">
            Delivery in <span className="text-primary font-extrabold">10 minutes</span>
          </p>
        </div>


        {/* Category Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-foreground">Shop by Category</h2>
            <button onClick={() => navigate("/categories")} className="text-xs text-primary font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {categories.slice(0, 6).map((cat) => (
              <motion.div
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/products/${cat.id}`)}
                className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted overflow-hidden border-2 border-border">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-[10px] font-medium text-foreground text-center leading-tight">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-1">🔥 Trending Now</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>

        {/* Fresh Vegetables */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-foreground flex items-center gap-1">🥬 Fresh Vegetables</h2>
            <button onClick={() => navigate("/products/all?type=vegetables")} className="text-xs text-primary font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {vegetables.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Fresh Fruits */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-foreground flex items-center gap-1">🍎 Fresh Fruits</h2>
            <button onClick={() => navigate("/products/all?type=fruits")} className="text-xs text-primary font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fruits.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Best Deals */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-1">💰 Best Deals</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </section>
      </main>

      <LocationPicker />
      <FloatingCartBar />
      <BottomNav />
    </MobileLayout>
  );
};

export default Index;
