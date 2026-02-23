import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { mongoSync } from "@/lib/mongoSync";

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) { setWishlistIds(new Set()); return; }
    supabase.from("wishlist").select("product_id").eq("user_id", user.id).then(({ data }) => {
      if (data) setWishlistIds(new Set(data.map((w) => w.product_id)));
    });
  }, [user]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (!user) return false;
    const isWished = wishlistIds.has(productId);
    if (isWished) {
      await supabase.from("wishlist").delete().eq("user_id", user.id).eq("product_id", productId);
      setWishlistIds((prev) => { const s = new Set(prev); s.delete(productId); return s; });
      mongoSync.removeFromWishlist(user.id, productId).catch(console.error);
    } else {
      await supabase.from("wishlist").insert({ user_id: user.id, product_id: productId });
      setWishlistIds((prev) => new Set(prev).add(productId));
      mongoSync.addToWishlist(user.id, productId).catch(console.error);
    }
    return !isWished;
  }, [user, wishlistIds]);

  const isWishlisted = useCallback((productId: string) => wishlistIds.has(productId), [wishlistIds]);

  return { wishlistIds, toggleWishlist, isWishlisted };
};
