import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Bell, 
  ShieldCheck, 
  LogOut,
  Settings
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Compliance", href: "/compliance", icon: ShieldCheck },
];

export function Sidebar() {
  const [location] = useLocation();


  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border/40 shadow-sm z-50">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-lg">
            X
          </div>
          <h1 className="text-xl font-bold font-display text-foreground tracking-tight">
            XtraSpec <span className="text-primary">WealthOS</span>
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Platform
        </div>
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                hover:bg-muted hover:text-foreground group
                ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'text-muted-foreground'}
              `}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <div className="p-6 pt-0">
        <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              AM
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-foreground truncate">Alex Morgan</p>
              <p className="text-xs text-muted-foreground truncate">Senior Advisor</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
