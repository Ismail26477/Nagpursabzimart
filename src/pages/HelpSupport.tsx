import React from "react";
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";

const helpItems = [
  { icon: MessageCircle, label: "Chat with Us", desc: "Get instant help from our team", action: "chat" },
  { icon: Phone, label: "Call Us", desc: "+91 98765 43210", action: "call" },
  { icon: Mail, label: "Email Support", desc: "support@nagpursabzimart.com", action: "email" },
];

const faqItems = [
  { q: "How do I track my order?", a: "Go to My Orders and tap on any order to see real-time tracking." },
  { q: "What is the delivery radius?", a: "We deliver within 5km of Wadi, Nagpur." },
  { q: "How can I cancel my order?", a: "You can cancel before the order is dispatched from My Orders page." },
  { q: "What payment methods are accepted?", a: "We accept Cash on Delivery, UPI, and Credit/Debit Cards." },
  { q: "What is the minimum order for free delivery?", a: "Orders above ₹199 get free delivery." },
];

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">Help & Support</h1>
        </div>
      </header>

      <main className="px-4 pt-4 pb-8 space-y-4">
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          {helpItems.map(({ icon: Icon, label, desc }, i) => (
            <button
              key={label}
              className={`w-full flex items-center justify-between p-4 text-left ${i < helpItems.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <h2 className="text-sm font-bold text-foreground pt-2">Frequently Asked Questions</h2>
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm divide-y divide-border">
          {faqItems.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-foreground">
                {q}
                <ChevronRight size={16} className="text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="px-4 pb-4 text-xs text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default HelpSupport;
