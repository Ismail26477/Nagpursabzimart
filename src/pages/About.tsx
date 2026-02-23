import React from "react";
import logosabzi from "@/assets/logosabzi.png";
import { ArrowLeft, Leaf, Truck, Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";

const features = [
  { icon: Leaf, title: "Farm Fresh", desc: "Direct from local farms in and around Nagpur" },
  { icon: Truck, title: "Quick Delivery", desc: "Delivered to your doorstep within hours" },
  { icon: Heart, title: "Quality Promise", desc: "100% fresh or we replace it, no questions asked" },
  { icon: MapPin, title: "Local First", desc: "Proudly serving Wadi, Nagpur and nearby areas" },
];

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">About Nagpursabzimart</h1>
        </div>
      </header>

      <main className="px-4 pt-4 pb-8 space-y-5">
        <div className="bg-primary/5 rounded-xl p-5 text-center flex flex-col items-center">
          <img src={logosabzi} alt="Nagpur Sabzi Mart" className="h-20 w-auto mb-2" />
          <p className="text-xs text-muted-foreground mt-1">Fresh Vegetables & Fruits · Since 2024</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Nagpursabzimart is your trusted neighborhood fresh produce delivery service based in Wadi, Nagpur. 
          We bring farm-fresh vegetables and fruits straight to your doorstep, ensuring quality and freshness 
          in every order.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl border border-border p-4 text-center">
              <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Icon size={20} className="text-primary" />
              </div>
              <p className="text-sm font-bold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="text-sm font-bold text-foreground">Contact</h3>
          <p className="text-xs text-muted-foreground">📍 Wadi, Nagpur, Maharashtra 440023</p>
          <p className="text-xs text-muted-foreground">📞 +91 98765 43210</p>
          <p className="text-xs text-muted-foreground">📧 support@nagpursabzimart.com</p>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Made with ❤️ in Nagpur · v1.0
        </p>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default About;
