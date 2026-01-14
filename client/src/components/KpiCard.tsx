import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: ReactNode;
  delay?: number;
}

export function KpiCard({ title, value, trend, trendUp, icon, delay = 0 }: KpiCardProps) {
  return (
    <div 
      className="bg-card rounded-xl border border-border/50 p-5 shadow-sm hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/5 text-primary rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold font-display text-foreground">{value}</h3>
      </div>
    </div>
  );
}
