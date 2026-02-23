import React from "react";
import { ArrowLeft, Package, Repeat, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { useBulkOrder } from "@/context/BulkOrderContext";

const freqLabels: Record<string, string> = {
  "one-time": "One-time",
  daily: "Daily",
  weekly: "Weekly",
  custom: "Custom",
};

const BulkOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { bulkOrders } = useBulkOrder();

  return (
    <MobileLayout hideNav>
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 py-4 safe-area-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold">Bulk Order History</h1>
        </div>
      </header>

      <main className="px-4 pt-4 pb-6 space-y-3">
        {bulkOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <span className="text-6xl mb-4">📦</span>
            <h2 className="text-lg font-bold text-foreground mb-1">No bulk orders yet</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">Place your first bulk order for your business!</p>
            <button onClick={() => navigate("/bulk-order")} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm">
              Start Bulk Order
            </button>
          </div>
        ) : (
          bulkOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-primary" />
                  <span className="text-sm font-bold text-foreground">{order.id}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  order.status === "Delivered" ? "bg-fresh/10 text-fresh" :
                  order.status === "Confirmed" ? "bg-primary/10 text-primary" :
                  "bg-accent/10 text-accent"
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{order.date} • {order.items.length} items • {order.items.reduce((s, i) => s + i.quantityKg, 0)}kg</p>
              <div className="flex items-center gap-2 mt-1">
                <Repeat size={12} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{freqLabels[order.frequency]} delivery</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{order.business.businessName}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                <span className="text-sm font-bold text-foreground">₹{order.total}</span>
                <button
                  onClick={() => navigate("/bulk-order")}
                  className="text-xs text-primary font-semibold flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Reorder
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </MobileLayout>
  );
};

export default BulkOrdersPage;
