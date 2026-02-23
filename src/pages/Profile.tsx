import React, { useState } from "react";
import { User, Package, MapPin, HelpCircle, Info, LogOut, ChevronRight, LogIn, Heart, Database, Loader2 } from "lucide-react";
import logosabzi from "@/assets/logosabzi.png";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { icon: Package, label: "My Orders", path: "/orders" },
  { icon: Heart, label: "My Favorites", path: "/favorites" },
  { icon: MapPin, label: "Saved Addresses", path: "/saved-addresses" },
  { icon: HelpCircle, label: "Help & Support", path: "/help-support" },
  { icon: Info, label: "About Nagpursabzimart", path: "/about" },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const { toast } = useToast();
  const [exporting, setExporting] = useState(false);

  const handleExportToMongo = async () => {
    setExporting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mongodb-export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        const total = Object.values(data.results as Record<string, { exported: number }>).reduce((s, r) => s + r.exported, 0);
        toast({ title: "Export complete ✅", description: `${total} records synced to MongoDB` });
      } else {
        toast({ title: "Export failed", description: data.error, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Export failed", description: err.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  return (
    <MobileLayout>
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-8 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold">Profile</h1>
          <img src={logosabzi} alt="Nagpur Sabzi Mart" className="h-12 w-auto opacity-90" />
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User size={28} />
            </div>
            <div>
              <p className="text-base font-bold">{profile?.full_name || user.email?.split("@")[0] || "User"}</p>
              <p className="text-xs opacity-80">{user.email || profile?.phone || ""}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User size={28} />
            </div>
            <div>
              <p className="text-base font-bold">Guest User</p>
              <button onClick={() => navigate("/auth")} className="text-xs underline opacity-90">
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="px-4 -mt-4 relative z-10 space-y-2">
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          {menuItems.map(({ icon: Icon, label, path }, i) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`w-full flex items-center justify-between p-4 text-left ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {user && (
          <button
            onClick={handleExportToMongo}
            disabled={exporting}
            className="w-full flex items-center gap-3 bg-card rounded-xl border border-border p-4 shadow-sm"
          >
            {exporting ? <Loader2 size={20} className="text-primary animate-spin" /> : <Database size={20} className="text-primary" />}
            <span className="text-sm font-medium text-primary">{exporting ? "Exporting..." : "Export Data to MongoDB"}</span>
          </button>
        )}

        {user ? (
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            className="w-full flex items-center gap-3 bg-card rounded-xl border border-border p-4 shadow-sm"
          >
            <LogOut size={20} className="text-deal" />
            <span className="text-sm font-medium text-deal">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="w-full flex items-center gap-3 bg-card rounded-xl border border-border p-4 shadow-sm"
          >
            <LogIn size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">Login / Sign Up</span>
          </button>
        )}
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default ProfilePage;
