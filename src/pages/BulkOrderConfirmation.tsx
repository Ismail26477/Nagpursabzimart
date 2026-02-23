import React from "react";
import { CheckCircle, Package, Calendar, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";

const BulkOrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId = "BK000000", grandTotal = 0, frequency = "one-time" } = (location.state as any) || {};

  const freqLabel: Record<string, string> = {
    "one-time": "One-time delivery",
    daily: "Daily recurring delivery",
    weekly: "Weekly recurring delivery",
    custom: "Custom schedule delivery",
  };

  return (
    <MobileLayout hideNav>
      <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-fresh/10 flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-fresh" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-extrabold text-foreground mb-1"
        >
          Bulk Order Confirmed! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground text-center mb-6"
        >
          Your order has been placed successfully. Our team will contact you to confirm delivery details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-card rounded-xl border border-border p-4 space-y-3 mb-6"
        >
          <div className="flex items-center gap-3">
            <Package size={18} className="text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Order ID</p>
              <p className="text-sm font-bold text-foreground">{orderId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Delivery Schedule</p>
              <p className="text-sm font-bold text-foreground">{freqLabel[frequency]}</p>
            </div>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <span className="text-lg font-extrabold text-foreground">₹{grandTotal}</span>
          </div>
        </motion.div>

        <p className="text-[10px] text-muted-foreground text-center mb-6">
          📄 GST Invoice will be sent to your registered email within 24 hours.
        </p>

        <div className="w-full space-y-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/bulk-orders")}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            View Bulk Orders <ArrowRight size={16} />
          </motion.button>
          <button
            onClick={() => navigate("/")}
            className="w-full border border-border text-foreground py-3.5 rounded-xl font-bold text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </MobileLayout>
  );
};

export default BulkOrderConfirmation;
