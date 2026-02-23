import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || `FB${Date.now().toString().slice(-6)}`;

  return (
    <MobileLayout hideNav>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="w-24 h-24 bg-fresh/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={56} className="text-fresh" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-extrabold text-foreground">Order Placed!</h1>
          <p className="text-sm text-muted-foreground">Your order has been placed successfully</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-4 mt-6 w-full space-y-3"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-bold text-foreground">{orderId}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated Delivery</span>
            <span className="font-bold text-fresh">10 minutes</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full mt-6 space-y-3"
        >
          <button
            onClick={() => navigate(`/order-tracking?id=${orderId}`)}
            className="w-full bg-primary/10 text-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            <Package size={18} /> Track Order
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default OrderConfirmation;
