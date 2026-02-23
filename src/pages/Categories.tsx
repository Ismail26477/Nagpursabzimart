import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import { categories } from "@/data/products";

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 py-4 safe-area-top">
        <h1 className="text-lg font-bold">Categories</h1>
      </header>

      <main className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/products/${cat.id}`)}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-sm cursor-pointer"
            >
              <div className="aspect-[4/3] bg-muted/50">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                  {cat.icon} {cat.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{cat.count} items</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default CategoriesPage;
