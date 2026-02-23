import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Circle, Package, Truck, ChefHat, MapPin, Phone } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { useLocation } from "@/context/LocationContext";

interface TrackingStep {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  time: string;
}

const ALL_STEPS: TrackingStep[] = [
  { id: "confirmed", label: "Order Confirmed", description: "Your order has been placed", icon: CheckCircle, time: "" },
  { id: "preparing", label: "Preparing", description: "Packing fresh items for you", icon: ChefHat, time: "" },
  { id: "picked", label: "Picked Up", description: "Out for delivery", icon: Package, time: "" },
  { id: "on_the_way", label: "On the Way", description: "Rider is heading to you", icon: Truck, time: "" },
  { id: "delivered", label: "Delivered", description: "Enjoy your fresh produce!", icon: MapPin, time: "" },
];

// Simulate progression timings (seconds after mount)
const STEP_DELAYS = [0, 6, 14, 22, 35];

const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || `FB${Date.now().toString().slice(-6)}`;
  const { location } = useLocation();

  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TrackingStep[]>(() =>
    ALL_STEPS.map((s, i) => ({ ...s, time: i === 0 ? formatNow() : "" }))
  );

  useEffect(() => {
    const timers = STEP_DELAYS.slice(1).map((delay, i) =>
      setTimeout(() => {
        const stepIndex = i + 1;
        setCurrentStep(stepIndex);
        setSteps((prev) =>
          prev.map((s, j) => (j === stepIndex ? { ...s, time: formatNow() } : s))
        );
      }, delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  function formatNow() {
    return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  }

  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <MobileLayout hideNav>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">Track Order</h1>
            <p className="text-[10px] text-muted-foreground">#{orderId}</p>
          </div>
          <a href="tel:+91 7020503794" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone size={16} className="text-primary" />
          </a>
        </div>
      </header>

      <main className="px-4 pt-5 pb-8 space-y-5">
        {/* ETA Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center"
        >
          <p className="text-xs text-muted-foreground mb-1">Estimated Delivery</p>
          <p className="text-2xl font-extrabold text-foreground">
            {currentStep >= 4 ? "Delivered ✅" : `${Math.max(2, 10 - currentStep * 2)} min`}
          </p>
          {currentStep < 4 && (
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          )}
        </motion.div>

        {/* Status Timeline */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-4">Order Status</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />
            <motion.div
              className="absolute left-[15px] top-2 w-0.5 bg-primary rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
            />

            <div className="space-y-5">
              {steps.map((step, i) => {
                const isComplete = i <= currentStep;
                const isCurrent = i === currentStep;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 relative"
                  >
                    <div
                      className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 z-10 ${
                        isComplete
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-2 ring-primary/30 ring-offset-2 ring-offset-background" : ""}`}
                    >
                      {isComplete ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Circle size={14} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-semibold ${
                            isComplete ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        {step.time && (
                          <span className="text-[10px] text-muted-foreground">{step.time}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      {isCurrent && i === 3 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 bg-primary/5 rounded-lg p-2.5 flex items-center gap-2"
                        >
                          <Truck size={14} className="text-primary" />
                          <span className="text-xs text-foreground font-medium">
                            Rider is near your location
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-2">Delivery Address</h3>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">{location.area}</p>
              <p className="text-xs text-muted-foreground">{location.address}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm"
          >
            Continue Shopping
          </motion.button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-muted text-foreground py-3 rounded-xl font-medium text-sm"
          >
            View All Orders
          </button>
        </div>
      </main>
    </MobileLayout>
  );
};

export default OrderTracking;
