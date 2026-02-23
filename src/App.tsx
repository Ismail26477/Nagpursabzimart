import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { BulkOrderProvider } from "@/context/BulkOrderContext";
import { LocationProvider } from "@/context/LocationContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import SearchPage from "./pages/Search";
import CategoriesPage from "./pages/Categories";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/Orders";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Auth";
import BulkOrder from "./pages/BulkOrder";
import BulkCheckout from "./pages/BulkCheckout";
import BulkOrderConfirmation from "./pages/BulkOrderConfirmation";
import BulkOrdersPage from "./pages/BulkOrders";
import OrderTracking from "./pages/OrderTracking";
import HelpSupport from "./pages/HelpSupport";
import About from "./pages/About";
import SavedAddresses from "./pages/SavedAddresses";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <BulkOrderProvider>
            <LocationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/products/:categoryId" element={<ProductListing />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/order-tracking" element={<OrderTracking />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/bulk-order" element={<BulkOrder />} />
                  <Route path="/bulk-checkout" element={<BulkCheckout />} />
                  <Route path="/bulk-order-confirmation" element={<BulkOrderConfirmation />} />
                  <Route path="/bulk-orders" element={<BulkOrdersPage />} />
                  <Route path="/help-support" element={<HelpSupport />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/saved-addresses" element={<SavedAddresses />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </LocationProvider>
          </BulkOrderProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
