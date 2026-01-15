import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { navItems } from "./Sidebar";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      {/* Top bar (mobile only) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-card sticky top-0 z-40">
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>

        <div className="font-bold text-lg">
          XtraSpec <span className="text-primary">WealthOS</span>
        </div>

        <div className="w-6" />
      </div>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute left-0 top-0 h-full w-72 bg-card p-4 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold text-lg">
                XtraSpec <span className="text-primary">WealthOS</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = location === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
