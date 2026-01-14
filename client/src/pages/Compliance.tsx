import { useActivities } from "@/hooks/use-wealth-data";
import { Badge } from "@/components/Badge";
import { ShieldCheck, FileCheck, Clock, CheckCircle } from "lucide-react";

export default function Compliance() {
  const { data: activities, isLoading } = useActivities();

  if (isLoading) return <div className="p-8">Loading compliance log...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Compliance Log</h1>
          <p className="text-muted-foreground mt-1">Audit trail of all advisor activities and recommendations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Alerts Sidebar */}
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
               <ShieldCheck className="w-5 h-5 text-amber-600" />
               <h3 className="font-bold text-amber-900">Action Required</h3>
            </div>
            <p className="text-sm text-amber-800/80 mb-4">
              3 clients are missing annual review documentation for the current fiscal year.
            </p>
            <button className="w-full py-2 bg-amber-100 text-amber-900 rounded-lg text-sm font-semibold hover:bg-amber-200 transition-colors">
              View Clients
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-4">Compliance Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">KYC Updates</span>
                  <span className="font-bold text-green-600">98%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                   <div className="bg-green-500 w-[98%] h-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Risk Profiles</span>
                  <span className="font-bold text-amber-600">84%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                   <div className="bg-amber-500 w-[84%] h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b border-border/50 text-muted-foreground uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Activity Type</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Reference ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {activities?.map((activity) => (
                    <tr key={activity.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{activity.clientName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-muted-foreground" />
                          {activity.activityType}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{activity.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {activity.status === 'Logged' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-500" />
                          )}
                          <span className={activity.status === 'Logged' ? 'text-green-700' : 'text-amber-700'}>
                            {activity.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">
                        #{Math.random().toString(36).substr(2, 8).toUpperCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
