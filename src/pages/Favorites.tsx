import React from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/context/AuthContext";

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlistIds } = useWishlist();

  const favoriteProducts = products.filter((p) => wishlistIds.has(p.id));

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-base font-bold">My Favorites</h1>
            <p className="text-[10px] opacity-80">{favoriteProducts.length} items saved</p>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 pb-24">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Heart size={48} className="text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Login to see your favorites</p>
            <button onClick={() => navigate("/auth")} className="text-sm font-bold text-primary underline">
              Login / Sign Up
            </button>
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Heart size={48} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">No favorites yet</p>
            <p className="text-xs text-muted-foreground">Tap the ❤️ on products to save them here</p>
            <button onClick={() => navigate("/")} className="text-sm font-bold text-primary mt-2">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favoriteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </MobileLayout>
  );
};

export default Favorites;
