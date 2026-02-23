import React, { useState } from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import ProductCard from "@/components/ProductCard";
import ReviewSection from "@/components/ReviewSection";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Parse weight string to grams
const parseWeightToGrams = (w: string): number => {
  const lower = w.toLowerCase().trim();
  if (lower.endsWith("kg")) return parseFloat(lower) * 1000;
  if (lower.endsWith("g")) return parseFloat(lower);
  return parseFloat(lower);
};

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const { addItem, updateQuantity, updateItemDetails, getItemQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [customWeight, setCustomWeight] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  if (!product) {
    return (
      <MobileLayout hideNav>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </MobileLayout>
    );
  }

  const quantity = getItemQuantity(product.id);
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Base weight (first option) and price-per-gram
  const baseGrams = parseWeightToGrams(product.weightOptions[0]);
  const pricePerGram = product.price / baseGrams;
  const originalPricePerGram = product.originalPrice / baseGrams;

  // Current weight in grams
  const currentGrams = useCustom
    ? parseWeightToGrams(customWeight.includes("kg") || customWeight.includes("g") ? customWeight : customWeight + "g")
    : parseWeightToGrams(product.weightOptions[selectedWeight]);

  const calculatedPrice = Math.round(pricePerGram * (isNaN(currentGrams) ? baseGrams : currentGrams));
  const calculatedOriginal = Math.round(originalPricePerGram * (isNaN(currentGrams) ? baseGrams : currentGrams));
  const discount = calculatedOriginal > 0 ? Math.round(((calculatedOriginal - calculatedPrice) / calculatedOriginal) * 100) : 0;

  const currentWeightLabel = useCustom
    ? (customWeight ? customWeight + "g" : product.weightOptions[0])
    : product.weightOptions[selectedWeight];

  return (
    <MobileLayout hideNav>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3 safe-area-top flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} className="text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <Share2 size={20} className="text-muted-foreground" />
          <motion.button whileTap={{ scale: 1.3 }} onClick={async () => {
            if (!user) { toast({ title: "Login to save favorites", variant: "destructive" }); return; }
            await toggleWishlist(product.id);
          }}>
            <Heart size={20} className={isWishlisted(product.id) ? "fill-deal text-deal" : "text-muted-foreground"} />
          </motion.button>
        </div>
      </header>

      {/* Image */}
      <div className="relative bg-muted/30 p-6">
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-deal text-deal-foreground text-xs font-bold px-2 py-1 rounded-lg">
            {discount}% OFF
          </span>
        )}
        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-2xl" />
      </div>

      {/* Info */}
      <div className="px-4 pt-4 pb-28 space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{product.unit}</p>
        </div>

        {/* Weight Options */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Select Weight</p>
          <div className="flex gap-2 flex-wrap">
            {product.weightOptions.map((w, i) => (
              <button
                key={w}
                onClick={() => {
                  setSelectedWeight(i);
                  setUseCustom(false);
                  if (quantity > 0) {
                    const grams = parseWeightToGrams(w);
                    const price = Math.round(pricePerGram * grams);
                    updateItemDetails(product.id, w, price);
                  }
                }}
                className={`text-xs font-medium px-4 py-2 rounded-xl border ${
                  !useCustom && selectedWeight === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground"
                }`}
              >
                {w}
              </button>
            ))}
            <button
              onClick={() => setUseCustom(true)}
              className={`text-xs font-medium px-4 py-2 rounded-xl border ${
                useCustom
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground"
              }`}
            >
              Custom
            </button>
          </div>
          {useCustom && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                value={customWeight}
                onChange={(e) => {
                  setCustomWeight(e.target.value);
                  if (quantity > 0 && e.target.value) {
                    const grams = parseWeightToGrams(e.target.value + "g");
                    if (!isNaN(grams) && grams > 0) {
                      const price = Math.round(pricePerGram * grams);
                      updateItemDetails(product.id, e.target.value + "g", price);
                    }
                  }
                }}
                placeholder="Enter weight"
                className="w-24 text-sm px-3 py-2 rounded-xl border border-border bg-transparent text-foreground outline-none focus:border-primary"
              />
              <span className="text-xs text-muted-foreground">grams</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-foreground">₹{calculatedPrice}</span>
          {calculatedOriginal > calculatedPrice && (
            <span className="text-base text-muted-foreground line-through">₹{calculatedOriginal}</span>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold text-fresh bg-fresh/10 px-2 py-0.5 rounded-full">
              Save ₹{calculatedOriginal - calculatedPrice}
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-1">About this product</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Nutrition */}
        <div className="bg-muted/50 rounded-xl p-3">
          <h3 className="text-sm font-bold text-foreground mb-1">Nutritional Info</h3>
          <p className="text-xs text-muted-foreground">{product.nutrition}</p>
        </div>

        {/* Reviews */}
        <ReviewSection productId={product.id} />

        {/* Similar */}
        {similar.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-foreground mb-2">Similar Products</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-area-bottom z-50">
        {quantity === 0 ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => addItem(product, currentWeightLabel, calculatedPrice)}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm"
          >
            Add to Cart — ₹{calculatedPrice}
          </motion.button>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 bg-primary rounded-xl overflow-hidden">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-4 py-3 text-primary-foreground font-bold">−</button>
              <span className="text-primary-foreground font-bold">{quantity}</span>
              <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-4 py-3 text-primary-foreground font-bold">+</button>
            </div>
            <button onClick={() => navigate("/cart")} className="bg-fresh text-fresh-foreground px-6 py-3 rounded-xl font-bold text-sm">
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default ProductDetail;
