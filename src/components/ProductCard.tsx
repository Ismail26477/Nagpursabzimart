import React from "react";
import { Plus, Minus, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact }) => {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const quantity = getItemQuantity(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const navigate = useNavigate();

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className={`bg-card rounded-xl border border-border overflow-hidden shadow-sm ${
        compact ? "min-w-[140px] w-[140px]" : "w-full"
      }`}
    >
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-deal text-deal-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md z-10">
            {discount}% OFF
          </span>
        )}
        {user && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-card/80 flex items-center justify-center"
          >
            <Heart size={14} className={isWishlisted(product.id) ? "fill-deal text-deal" : "text-muted-foreground"} />
          </button>
        )}
        <div className="aspect-square bg-muted/50 p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-2.5">
        <p className="text-xs text-muted-foreground mb-0.5">{product.unit}</p>
        <h3
          className="text-sm font-semibold text-foreground leading-tight line-clamp-2 mb-1.5 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through ml-1">₹{product.originalPrice}</span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(product);
                }}
                className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
              >
                ADD
              </motion.button>
            ) : (
              <motion.div
                key="qty"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-primary rounded-lg overflow-hidden"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.id, quantity - 1);
                  }}
                  className="p-1.5 text-primary-foreground hover:bg-primary/80"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold text-primary-foreground min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.id, quantity + 1);
                  }}
                  className="p-1.5 text-primary-foreground hover:bg-primary/80"
                >
                  <Plus size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
