import { supabase } from "@/integrations/supabase/client";

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mongodb-sync`;

async function callMongo(body: Record<string, unknown>) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      ...(session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : {}),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ── Sync helpers for each collection ──

export const mongoSync = {
  // Profiles
  async upsertProfile(userId: string, profile: { full_name?: string; phone?: string; avatar_url?: string }) {
    return callMongo({
      action: "updateOne",
      collection: "profiles",
      filter: { user_id: userId },
      update: { ...profile, user_id: userId, updated_at: new Date().toISOString(), created_at: new Date().toISOString() },
    });
  },

  // Orders
  async createOrder(order: {
    user_id: string;
    order_number: string;
    status: string;
    total: number;
    delivery_address?: string;
    items: Array<{ product_id: string; name: string; image: string; quantity: number; price: number }>;
  }) {
    return callMongo({
      action: "insertOne",
      collection: "orders",
      data: { ...order, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    });
  },

  // Reviews
  async createReview(review: { user_id: string; product_id: string; rating: number; review_text?: string }) {
    return callMongo({
      action: "insertOne",
      collection: "reviews",
      data: { ...review, created_at: new Date().toISOString() },
    });
  },

  async deleteReview(userId: string, productId: string) {
    return callMongo({
      action: "deleteOne",
      collection: "reviews",
      filter: { user_id: userId, product_id: productId },
    });
  },

  // Wishlist
  async addToWishlist(userId: string, productId: string) {
    return callMongo({
      action: "insertOne",
      collection: "wishlist",
      data: { user_id: userId, product_id: productId, created_at: new Date().toISOString() },
    });
  },

  async removeFromWishlist(userId: string, productId: string) {
    return callMongo({
      action: "deleteOne",
      collection: "wishlist",
      filter: { user_id: userId, product_id: productId },
    });
  },

  // Saved Addresses
  async saveAddress(address: { user_id: string; label: string; address: string; area: string; city: string; is_default?: boolean }) {
    return callMongo({
      action: "insertOne",
      collection: "saved_addresses",
      data: { ...address, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    });
  },

  async updateAddress(addressId: string, updates: Record<string, unknown>) {
    return callMongo({
      action: "updateOne",
      collection: "saved_addresses",
      filter: { _supabase_id: addressId },
      update: { ...updates, updated_at: new Date().toISOString() },
    });
  },

  async deleteAddress(addressId: string) {
    return callMongo({
      action: "deleteOne",
      collection: "saved_addresses",
      filter: { _supabase_id: addressId },
    });
  },
};
