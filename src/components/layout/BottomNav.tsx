import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Package, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/categories", label: "Categories", icon: Grid3X3 },
  { path: "/bulk-order", label: "Bulk Order", icon: Package },
  { path: "/favorites", label: "Favorites", icon: Heart },
  { path: "/profile", label: "Profile", icon: User },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-0.5 relative px-3 py-1"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? "text-primary" : "text-muted-foreground"}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
