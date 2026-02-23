import React, { useState, useMemo } from "react";
import { ArrowLeft, Search as SearchIcon, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const recentSearches = ["Tomatoes", "Mangoes", "Spinach", "Onions"];
const popularSearches = ["Strawberries", "Broccoli", "Bananas", "Carrots", "Oranges", "Mint"];

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <MobileLayout hideNav>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
            <SearchIcon size={16} className="text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for vegetables, fruits..."
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </header>

      <main className="px-4 pt-4">
        {query.trim() === "" ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Clock size={14} /> Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="bg-muted text-foreground text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <TrendingUp size={14} /> Popular
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-sm text-muted-foreground">No results for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </MobileLayout>
  );
};

export default SearchPage;
