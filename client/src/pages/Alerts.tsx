import { useAlerts } from "@/hooks/use-wealth-data";
import { Badge } from "@/components/Badge";
import { 
  Bell, 
  Filter, 
  CalendarDays, 
  ArrowRight,
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";

export default function Alerts() {
  const { data: alerts, isLoading } = useAlerts();
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Marriage", "Divorce", "Business", "Property", "Inheritance"];

  const filteredAlerts = filter === "All" 
    ? alerts 
    : alerts?.filter(a => a.eventType.includes(filter));

  if (isLoading) return <div className="p-8">Loading alerts...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Life Event Alerts</h1>
          <p className="text-muted-foreground mt-1">Real-time detection of significant client life changes.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${filter === f 
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                : 'bg-white border border-border text-muted-foreground hover:bg-muted hover:text-foreground'}
            `}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Event Type</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Date Detected</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredAlerts?.map((alert) => (
                <tr key={alert.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">{alert.clientName}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                      {alert.eventType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{alert.detectionSource}</td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-muted-foreground/50" />
                    {alert.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={alert.isRead ? 'secondary' : 'danger'}>
                      {alert.isRead ? 'Reviewed' : 'New'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-md text-xs font-semibold transition-colors">
                        Review
                      </button>
                      <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
