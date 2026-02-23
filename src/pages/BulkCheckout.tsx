import React, { useState } from "react";
import { ArrowLeft, MapPin, Calendar, CreditCard, Wallet, Banknote, Building2, FileText, Repeat, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { useBulkOrder, DeliveryFrequency, BusinessProfile } from "@/context/BulkOrderContext";
import { useLocation } from "@/context/LocationContext";

const frequencies: { id: DeliveryFrequency; label: string; desc: string }[] = [
  { id: "one-time", label: "One-time", desc: "Single bulk delivery" },
  { id: "daily", label: "Daily", desc: "Fresh stock every morning" },
  { id: "weekly", label: "Weekly", desc: "Scheduled weekly delivery" },
  { id: "custom", label: "Custom", desc: "Choose specific days" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
  { id: "upi", label: "UPI Payment", icon: Wallet },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
];

const timeSlots = [
  { id: "9-11", label: "9 AM - 11 AM" },
  { id: "11-1", label: "11 AM - 1 PM" },
  { id: "2-4", label: "2 PM - 4 PM" },
  { id: "4-6", label: "4 PM - 6 PM" },
  { id: "6-8", label: "6 PM - 8 PM" },
];

const BulkCheckout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalBulkPrice, placeBulkOrder } = useBulkOrder();
  const { location, setLocationPickerOpen } = useLocation();
  const [frequency, setFrequency] = useState<DeliveryFrequency>("one-time");
  const [customDays, setCustomDays] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("9-11");
  const [business, setBusiness] = useState<BusinessProfile>({
    businessName: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    address: "",
  });

  const deliveryFee = totalBulkPrice >= 2000 ? 0 : 100;
  const grandTotal = totalBulkPrice + deliveryFee;

  const toggleDay = (day: string) => {
    setCustomDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  const handlePlaceOrder = () => {
    const orderId = placeBulkOrder(business, frequency, customDays);
    navigate("/bulk-order-confirmation", { state: { orderId, grandTotal, frequency } });
  };

  const updateField = (field: keyof BusinessProfile, value: string) => {
    setBusiness((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    navigate("/bulk-order");
    return null;
  }

  return (
    <MobileLayout hideNav>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">Bulk Checkout</h1>
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
                Your location is outside our 5km delivery radius from Wadi, Nagpur. Please change your address.
              </p>
              <button onClick={() => setLocationPickerOpen(true)} className="text-xs text-primary font-semibold mt-1">Change Location</button>
            </div>
          </div>
        )}

        {/* Business Profile */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
            <Building2 size={16} className="text-primary" /> Business Details
          </h3>
          <div className="space-y-3">
            <input
              value={business.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              placeholder="Business / Restaurant Name"
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-border bg-transparent text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
            />
            <input
              value={business.gstNumber}
              onChange={(e) => updateField("gstNumber", e.target.value)}
              placeholder="GST Number (optional)"
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-border bg-transparent text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={business.contactPerson}
                onChange={(e) => updateField("contactPerson", e.target.value)}
                placeholder="Contact Person"
                className="text-sm px-3 py-2.5 rounded-xl border border-border bg-transparent text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <input
                value={business.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Phone Number"
                className="text-sm px-3 py-2.5 rounded-xl border border-border bg-transparent text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
              />
            </div>
            <div className="relative">
              <input
                value={business.address || location.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Delivery Address"
                className="w-full text-sm px-3 py-2.5 rounded-xl border border-border bg-transparent text-foreground outline-none focus:border-primary placeholder:text-muted-foreground pr-16"
              />
              <button
                type="button"
                onClick={() => setLocationPickerOpen(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-primary font-semibold"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Next Day Delivery Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
          <Calendar size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Next Day Delivery Only</p>
            <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-0.5">
              All bulk orders are delivered the next day by 6:00 AM. Orders placed before 8:00 PM today will arrive tomorrow morning.
            </p>
          </div>
        </div>

        {/* Delivery Time Slot */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
            <Calendar size={16} className="text-primary" /> Delivery Time
          </h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors ${
                  selectedTimeSlot === slot.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground"
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Schedule */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
            <Repeat size={16} className="text-primary" /> Delivery Schedule
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {frequencies.map((f) => (
              <button
                key={f.id}
                onClick={() => setFrequency(f.id)}
                className={`text-left p-3 rounded-xl border ${
                  frequency === f.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <p className={`text-xs font-bold ${frequency === f.id ? "text-primary" : "text-foreground"}`}>{f.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{f.desc}</p>
              </button>
            ))}
          </div>
          {frequency === "custom" && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`text-xs font-medium px-3 py-2 rounded-xl border ${
                    customDays.includes(day)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
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
                  selectedPayment === id ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <Icon size={20} className={selectedPayment === id ? "text-primary" : "text-muted-foreground"} />
                <span className={`text-sm font-medium ${selectedPayment === id ? "text-primary" : "text-foreground"}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
            <FileText size={16} className="text-primary" /> Order Summary & Invoice
          </h3>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{item.product.name} × {item.quantityKg}kg</span>
              <span className="text-foreground font-medium">₹{item.bulkPricePerKg * item.quantityKg}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className={deliveryFee === 0 ? "text-fresh font-medium" : "text-foreground font-medium"}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between text-sm">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-extrabold text-foreground">₹{grandTotal}</span>
          </div>
          {business.gstNumber && (
            <p className="text-[10px] text-muted-foreground pt-1">GST Invoice will be generated for: {business.gstNumber}</p>
          )}
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border p-4 safe-area-bottom z-50">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePlaceOrder}
          disabled={!location.isWithinRadius}
          className={`w-full py-3.5 rounded-xl font-bold text-sm ${
            location.isWithinRadius
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {location.isWithinRadius ? `Place Bulk Order — ₹${grandTotal}` : "Not Deliverable to This Location"}
        </motion.button>
      </div>
    </MobileLayout>
  );
};

export default BulkCheckout;
