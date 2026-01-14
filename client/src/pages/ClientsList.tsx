import { useClients } from "@/hooks/use-wealth-data";
import { Link } from "wouter";
import { Badge } from "@/components/Badge";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

export default function ClientsList() {
  const { data: clients, isLoading } = useClients();
  const [search, setSearch] = useState("");

  const filtered = clients?.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold font-display text-foreground">Client Directory</h1>
           <p className="text-muted-foreground mt-1">Manage your book of business.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border/50 text-muted-foreground uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Net Worth</th>
                <th className="px-6 py-4">Primary Goal</th>
                <th className="px-6 py-4 text-center">Risk Profile</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered?.map((client) => (
                <tr key={client.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {client.name.charAt(0)}
                       </div>
                       {client.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{client.email}</td>
                  <td className="px-6 py-4 font-mono">{client.netWorth}</td>
                  <td className="px-6 py-4">{client.primaryGoal}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={
                       client.riskLevel === 'High' ? 'danger' : 
                       client.riskLevel === 'Medium' ? 'warning' : 'success'
                    }>
                       {client.riskLevel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/clients/${client.id}`} className="text-primary hover:underline font-medium">
                      View Profile
                    </Link>
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
