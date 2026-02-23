import React, { useEffect, useState } from "react";
import { ArrowLeft, Plus, MapPin, Trash2, Star, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/context/LocationContext";
import { mongoSync } from "@/lib/mongoSync";

interface SavedAddress {
  id: string;
  label: string;
  address: string;
  area: string;
  city: string;
  is_default: boolean;
}

const SavedAddresses: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { location } = useLocation();
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "Home", address: "", area: "" });

  useEffect(() => {
    if (!user) return;
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    const { data, error } = await supabase
      .from("saved_addresses")
      .select("id, label, address, area, city, is_default")
      .order("is_default", { ascending: false });
    if (!error && data) setAddresses(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user || !form.address.trim() || !form.area.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("saved_addresses")
        .update({ label: form.label, address: form.address, area: form.area })
        .eq("id", editingId);
      if (error) {
        toast({ title: "Failed to update", variant: "destructive" });
        return;
      }
      mongoSync.updateAddress(editingId, { label: form.label, address: form.address, area: form.area }).catch(console.error);
    } else {
      const { error } = await supabase
        .from("saved_addresses")
        .insert({ user_id: user.id, label: form.label, address: form.address, area: form.area, city: "Nagpur" });
      if (error) {
        toast({ title: "Failed to save", variant: "destructive" });
        return;
      }
      mongoSync.saveAddress({ user_id: user.id, label: form.label, address: form.address, area: form.area, city: "Nagpur" }).catch(console.error);
    }

    setShowForm(false);
    setEditingId(null);
    setForm({ label: "Home", address: "", area: "" });
    fetchAddresses();
    toast({ title: editingId ? "Address updated" : "Address saved" });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("saved_addresses").delete().eq("id", id);
    mongoSync.deleteAddress(id).catch(console.error);
    fetchAddresses();
    toast({ title: "Address deleted" });
  };

  const handleSetDefault = async (id: string) => {
    // Remove default from all, set on selected
    await supabase.from("saved_addresses").update({ is_default: false }).eq("user_id", user!.id);
    await supabase.from("saved_addresses").update({ is_default: true }).eq("id", id);
    fetchAddresses();
    toast({ title: "Default address updated" });
  };

  const startEdit = (addr: SavedAddress) => {
    setForm({ label: addr.label, address: addr.address, area: addr.area });
    setEditingId(addr.id);
    setShowForm(true);
  };

  if (!user) {
    return (
      <MobileLayout>
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}><ArrowLeft size={22} className="text-foreground" /></button>
            <h1 className="text-base font-bold text-foreground">Saved Addresses</h1>
          </div>
        </header>
        <main className="px-4 pt-16 text-center">
          <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Please log in to manage your addresses</p>
          <button onClick={() => navigate("/auth")} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl text-sm font-bold">
            Login / Sign Up
          </button>
        </main>
        <BottomNav />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}><ArrowLeft size={22} className="text-foreground" /></button>
            <h1 className="text-base font-bold text-foreground">Saved Addresses</h1>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm({ label: "Home", address: "", area: "" }); }}
            className="bg-primary text-primary-foreground rounded-full p-1.5"
          >
            <Plus size={18} />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 pb-8 space-y-3">
        {showForm && (
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <h3 className="text-sm font-bold text-foreground">{editingId ? "Edit Address" : "Add New Address"}</h3>
            <div>
              <Label className="text-xs">Label</Label>
              <div className="flex gap-2 mt-1">
                {["Home", "Work", "Other"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setForm({ ...form, label: l })}
                    className={`text-xs px-3 py-1.5 rounded-lg border ${form.label === l ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border text-foreground"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs">Area / Locality</Label>
              <Input
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="e.g. Wadi, Dharampeth"
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Full Address</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="House no, street, landmark..."
                className="mt-1 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-bold">
                {editingId ? "Update" : "Save Address"}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-4 py-2.5 rounded-xl border border-border text-sm text-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-sm text-muted-foreground">Loading...</div>
        ) : addresses.length === 0 && !showForm ? (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">No saved addresses</p>
            <p className="text-xs text-muted-foreground mt-1">Add an address to get started</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div key={addr.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-primary/10 rounded-lg p-2 mt-0.5">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{addr.label}</span>
                      {addr.is_default && (
                        <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{addr.area}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{addr.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!addr.is_default && (
                    <button onClick={() => handleSetDefault(addr.id)} className="p-2 text-muted-foreground hover:text-primary" title="Set as default">
                      <Star size={16} />
                    </button>
                  )}
                  <button onClick={() => startEdit(addr)} className="p-2 text-muted-foreground hover:text-primary">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(addr.id)} className="p-2 text-muted-foreground hover:text-destructive">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default SavedAddresses;
