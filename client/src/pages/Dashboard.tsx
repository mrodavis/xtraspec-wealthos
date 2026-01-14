import { Users, FileCheck, AlertTriangle, Activity, CheckSquare, Search } from "lucide-react";
import { useStats, useClients } from "@/hooks/use-wealth-data";
import { KpiCard } from "@/components/KpiCard";
import { Badge } from "@/components/Badge";
import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: stats, isLoading: isLoadingStats } = useStats();
  const { data: clients, isLoading: isLoadingClients } = useClients();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients?.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoadingStats || isLoadingClients) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Generate fake tasks for the demo
  const aiTasks = [
    { id: 1, text: "Prepare annual review for Sarah Jenkins", priority: "High", due: "Today" },
    { id: 2, text: "Follow up on life event: John Doe (Marriage)", priority: "Medium", due: "Tomorrow" },
    { id: 3, text: "Rebalance portfolio for Tech Growth Fund", priority: "Low", due: "Wed" },
    { id: 4, text: "Schedule check-in with Michael Chen", priority: "Medium", due: "Fri" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Control Tower</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex. Here's your daily briefing.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
             Generate Report
           </button>
           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
             + Add Client
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="Total Clients" 
          value={stats?.totalClients || 0} 
          icon={<Users className="w-5 h-5" />}
          trend="+3%"
          trendUp={true}
          delay={0}
        />
        <KpiCard 
          title="Reviews Done" 
          value={stats?.annualReviewsCompleted || 0} 
          icon={<FileCheck className="w-5 h-5" />}
          delay={100}
        />
        <KpiCard 
          title="Reviews Due" 
          value={stats?.annualReviewsDue || 0} 
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="Urgent"
          trendUp={false}
          delay={200}
        />
        <KpiCard 
          title="High Risk" 
          value={stats?.highRiskClients || 0} 
          icon={<Activity className="w-5 h-5" />}
          delay={300}
        />
        <KpiCard 
          title="Life Events" 
          value={stats?.lifeEventsDetected || 0} 
          icon={<Users className="w-5 h-5" />}
          trend="New"
          trendUp={true}
          delay={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display">Client Status</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b border-border/50 text-muted-foreground uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Risk Level</th>
                    <th className="px-6 py-4">Review Status</th>
                    <th className="px-6 py-4 text-center">Life Event</th>
                    <th className="px-6 py-4 text-right">Net Worth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        <Link href={`/clients/${client.id}`} className="group-hover:text-primary transition-colors">
                          {client.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          client.riskLevel === 'High' ? 'danger' : 
                          client.riskLevel === 'Medium' ? 'warning' : 'success'
                        }>
                          {client.riskLevel}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                         <Badge variant={
                          client.reviewStatus === 'Overdue' ? 'danger' : 
                          client.reviewStatus === 'Due' ? 'warning' : 'secondary'
                        }>
                          {client.reviewStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {client.lifeEventFlag && (
                          <span className="inline-flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                        {client.netWorth}
                      </td>
                    </tr>
                  ))}
                  {filteredClients.length === 0 && (
                     <tr>
                       <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                         No clients found matching "{searchQuery}"
                       </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Task List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-display flex items-center gap-2">
            <span className="w-2 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full"></span>
            AI Recommended Actions
          </h2>
          
          <div className="space-y-3">
            {aiTasks.map((task) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={
                    task.priority === 'High' ? 'danger' : 
                    task.priority === 'Medium' ? 'warning' : 'success'
                  }>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{task.due}</span>
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {task.text}
                </p>
                <div className="mt-3 flex justify-end">
                   <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                     <CheckSquare className="w-4 h-4" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl p-4 border border-primary/10">
             <div className="flex gap-3 items-start">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                   <Activity className="w-4 h-4 text-primary" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-foreground">Weekly Insight</h4>
                   <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                     3 clients have major liquidity events approaching in Q4. Consider proactively drafting tax optimization strategies.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
