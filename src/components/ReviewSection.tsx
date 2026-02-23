import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import StarRating from "./StarRating";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mongoSync } from "@/lib/mongoSync";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  user_name?: string;
}

const ReviewSection: React.FC<{ productId: string }> = ({ productId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  const avgRating = reviews.length > 0
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Please login to leave a review", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      product_id: productId,
      rating,
      review_text: text || null,
    });
    if (!error) {
      toast({ title: "Review submitted! ⭐" });
      mongoSync.createReview({ user_id: user.id, product_id: productId, rating, review_text: text || undefined }).catch(console.error);
      setRating(0);
      setText("");
      setShowForm(false);
      fetchReviews();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-primary" />
          <h3 className="text-sm font-bold text-foreground">Ratings & Reviews</h3>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-1.5">
            <StarRating rating={Math.round(avgRating)} readonly size={14} />
            <span className="text-xs font-bold text-foreground">{avgRating}</span>
            <span className="text-[10px] text-muted-foreground">({reviews.length})</span>
          </div>
        )}
      </div>

      {/* Write Review Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full text-xs font-semibold text-primary border border-primary/30 rounded-xl py-2.5 hover:bg-primary/5 transition-colors"
        >
          ✍️ Write a Review
        </button>
      )}

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/50 rounded-xl p-3 space-y-3"
          >
            <p className="text-xs font-semibold text-foreground">Your Rating</p>
            <StarRating rating={rating} onRate={setRating} size={24} />
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience..."
              className="text-xs min-h-[60px] bg-card"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 text-xs font-medium py-2 rounded-lg border border-border text-muted-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
              >
                <Send size={12} /> Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-3">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-2">
          {reviews.slice(0, 5).map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={12} className="text-primary" />
                  </div>
                  <StarRating rating={r.rating} readonly size={12} />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              {r.review_text && (
                <p className="text-xs text-muted-foreground mt-1">{r.review_text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
