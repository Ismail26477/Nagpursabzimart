import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const FREE_DELIVERY_THRESHOLD = 200;

const FloatingCartBar: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - totalPrice);
  const progress = Math.min(1, totalPrice / FREE_DELIVERY_THRESHOLD);

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-16 left-0 right-0 mx-auto w-full max-w-[430px] px-4 z-[49] pb-1"
    >
      <div
        onClick={() => navigate("/cart")}
        className="w-full bg-primary rounded-xl px-3 py-2.5 flex items-center justify-between shadow-xl cursor-pointer"
      >
        <div className="flex-1 min-w-0 mr-2 overflow-hidden">
          <p className="text-[11px] text-primary-foreground font-semibold leading-tight truncate">
            {remaining > 0
              ? `Add ₹${remaining} more for FREE DELIVERY`
              : "🎉 FREE DELIVERY unlocked!"}
          </p>
          <div className="w-full h-1 bg-primary-foreground/20 rounded-full mt-1.5">
            <motion.div
              className="h-full bg-primary-foreground rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1 bg-primary-foreground/20 rounded-lg px-2 py-1.5">
          <span className="text-[10px] text-primary-foreground font-extrabold uppercase">Cart</span>
          <span className="text-[10px] text-primary-foreground/60">•</span>
          <span className="text-[10px] text-primary-foreground font-extrabold">{totalItems}</span>
          <ShoppingCart size={14} className="text-primary-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCartBar;
