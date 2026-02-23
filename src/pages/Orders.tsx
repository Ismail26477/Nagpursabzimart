import React, { useState, useEffect } from "react";
import { Package, Truck, XCircle, CheckCircle, ChevronDown, ChevronUp, RotateCcw, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Delivered" | "In Transit" | "Cancelled";
}

const statusConfig = {
  "Delivered": { icon: CheckCircle, color: "bg-fresh/10 text-fresh", label: "Delivered ✅" },
  "In Transit": { icon: Truck, color: "bg-primary/10 text-primary", label: "In Transit 🚚" },
  "Cancelled": { icon: XCircle, color: "bg-deal/10 text-deal", label: "Cancelled ❌" },
};

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error || !ordersData) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const orderIds = ordersData.map((o) => o.id);
      const { data: itemsData } = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds.length > 0 ? orderIds : ["__none__"]);

      const mapped: Order[] = ordersData.map((o) => ({
        id: o.id,
        orderNumber: o.order_number,
        date: new Date(o.created_at).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
        }),
        total: Number(o.total),
        status: o.status as Order["status"],
        items: (itemsData || [])
          .filter((i) => i.order_id === o.id)
          .map((i) => ({
            productId: i.product_id,
            name: i.name,
            image: i.image,
            quantity: i.quantity,
            price: Number(i.price),
          })),
      }));

      setOrders(mapped);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  const filteredOrders = activeTab === "all"
    ? orders
    : activeTab === "active"
    ? orders.filter((o) => o.status === "In Transit")
    : activeTab === "completed"
    ? orders.filter((o) => o.status === "Delivered")
    : orders.filter((o) => o.status === "Cancelled");

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        for (let i = 0; i < item.quantity; i++) addItem(product);
      }
    });
    toast({ title: "Items added to cart!", description: `${order.items.length} items from order ${order.orderNumber}` });
  };

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 py-4 safe-area-top">
        <h1 className="text-lg font-bold">My Orders</h1>
      </header>

      <main className="px-4 pt-3 space-y-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 h-9">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">Completed</TabsTrigger>
            <TabsTrigger value="cancelled" className="text-xs">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        {!user && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-3">Login to see your orders</p>
            <Button size="sm" onClick={() => navigate("/auth")}>Login</Button>
          </div>
        )}

        {user && loading && (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {user && !loading && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No orders found</p>
          </div>
        )}

        {filteredOrders.map((order) => {
          const config = statusConfig[order.status];
          const isExpanded = expandedOrder === order.orderNumber;

          return (
            <div key={order.orderNumber} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedOrder(isExpanded ? null : order.orderNumber)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-primary" />
                    <span className="text-sm font-bold text-foreground">{order.orderNumber}</span>
                  </div>
                  <Badge className={`${config.color} border-0 text-[10px]`}>
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{order.date} • {order.items.length} items</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-foreground">₹{order.total}</span>
                  {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-4 py-3 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground">Qty: {item.quantity} • ₹{item.price}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-2 pt-1">
                        {order.status === "In Transit" && (
                          <Button size="sm" className="flex-1 text-xs h-8" onClick={() => navigate(`/order-tracking?id=${order.orderNumber}`)}>
                            <Truck size={14} className="mr-1" /> Track Order
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant={order.status === "In Transit" ? "outline" : "default"}
                          className="flex-1 text-xs h-8"
                          onClick={() => handleReorder(order)}
                        >
                          <RotateCcw size={14} className="mr-1" /> Reorder
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default OrdersPage;
