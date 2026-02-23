import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, size = 18, readonly = false }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRate?.(star)}
          className={`${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform`}
        >
          <Star
            size={size}
            className={star <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
