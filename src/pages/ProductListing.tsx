import React, { useState, useMemo } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const ProductListing: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [sort, setSort] = useState<"default" | "low" | "high" | "popular">("default");

  const category = categories.find((c) => c.id === categoryId);
  const title = category ? `${category.icon} ${category.name}` : "All Products";

  const filtered = useMemo(() => {
    let list = categoryId && categoryId !== "all"
      ? products.filter((p) => p.category === categoryId)
      : products;

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "popular") list = [...list].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));

    return list;
  }, [categoryId, sort]);

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground flex-1">{title}</h1>
          <SlidersHorizontal size={20} className="text-muted-foreground" />
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {(["default", "low", "high", "popular"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${
                sort === s ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {s === "default" ? "Relevance" : s === "low" ? "Price: Low" : s === "high" ? "Price: High" : "Popular"}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4">
        <p className="text-xs text-muted-foreground mb-3">{filtered.length} products</p>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default ProductListing;
