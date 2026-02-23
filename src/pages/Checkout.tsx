import React, { useState } from "react";
import { ArrowLeft, MapPin, Clock, CreditCard, Wallet, Banknote, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { mongoSync } from "@/lib/mongoSync";

const timeSlots = ["9 AM - 11 AM", "11 AM - 1 PM", "2 PM - 4 PM", "4 PM - 6 PM", "6 PM - 8 PM"];
const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
  { id: "upi", label: "UPI Payment", icon: Wallet },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { location, setLocationPickerOpen } = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);

  const handlingFee = 11;
  const smallCartFee = totalPrice < 200 ? 20 : 0;
  const deliveryFee = totalPrice >= 200 ? 0 : 30;
  const gstAndCharges = Math.round((totalPrice + handlingFee) * 0.05 * 100) / 100;
  const grandTotal = totalPrice + handlingFee + smallCartFee + deliveryFee + gstAndCharges;

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setPlacing(true);
    try {
      const orderNumber = `FB${Date.now().toString().slice(-6)}`;
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: "In Transit",
          total: grandTotal,
          delivery_address: location.address,
        })
        .select("id")
        .single();

      if (error) throw error;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        quantity: item.quantity,
        price: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Sync to MongoDB
      mongoSync.createOrder({
        user_id: user.id,
        order_number: orderNumber,
        status: "In Transit",
        total: grandTotal,
        delivery_address: location.address,
        items: orderItems.map(i => ({ ...i, order_id: undefined } as any)),
      }).catch(console.error);

      clearCart();
      navigate(`/order-confirmation?id=${orderNumber}`);
    } catch (err: any) {
      toast({ title: "Failed to place order", description: err.message, variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <MobileLayout hideNav>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">Checkout</h1>
        </div>
      </header>

      <main className="px-4 pt-4 pb-32 space-y-4">
        {/* Not Deliverable Overlay */}
        {!location.isWithinRadius && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={20} className="text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-destructive">Not Deliverable</p>
              <p className="text-xs text-destructive/80 mt-0.5">
                Your location is outside our 5km delivery radius from Wadi, Nagpur. Please change your address to place an order.
              </p>
            </div>
          </div>
        )}

        {/* Address */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <MapPin size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{location.area}</p>
                <button onClick={() => setLocationPickerOpen(true)} className="text-xs text-primary font-semibold">Change</button>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {location.address}
              </p>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
            <Clock size={16} className="text-primary" /> Delivery Time
          </h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot, i) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(i)}
                className={`text-xs font-medium px-3 py-2 rounded-xl border ${
                  selectedSlot === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedPayment(id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${
                  selectedPayment === id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <Icon size={20} className={selectedPayment === id ? "text-primary" : "text-muted-foreground"} />
                <span className={`text-sm font-medium ${selectedPayment === id ? "text-primary" : "text-foreground"}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="text-sm font-bold text-foreground mb-2">Bill Details</h3>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
              <span className="text-foreground font-medium">₹{item.unitPrice * item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Item Total</span>
            <span className="text-foreground font-medium">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Handling Fee</span>
            <span className="text-foreground font-medium">₹{handlingFee}</span>
          </div>
          {smallCartFee > 0 && (
            <>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Small Cart Fee</span>
                <span className="text-foreground font-medium">₹{smallCartFee}</span>
              </div>
              <p className="text-[10px] text-muted-foreground italic">No small cart fee on orders above ₹199</p>
            </>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Delivery Partner Fee</span>
            <span className={deliveryFee === 0 ? "text-fresh font-medium" : "text-foreground font-medium"}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          {deliveryFee > 0 && (
            <p className="text-[10px] text-muted-foreground italic">Free delivery on orders above ₹199</p>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">GST and Charges</span>
            <span className="text-foreground font-medium">₹{gstAndCharges.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between text-sm">
            <span className="font-bold text-foreground">To Pay</span>
            <span className="font-extrabold text-foreground">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-area-bottom z-50">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePlaceOrder}
          disabled={!location.isWithinRadius || placing}
          className={`w-full py-3.5 rounded-xl font-bold text-sm ${
            location.isWithinRadius && !placing
              ? "bg-fresh text-fresh-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {placing ? "Placing Order..." : location.isWithinRadius ? `Place Order — ₹${grandTotal.toFixed(2)}` : "Not Deliverable to This Location"}
        </motion.button>
      </div>
    </MobileLayout>
  );
};

export default Checkout;
