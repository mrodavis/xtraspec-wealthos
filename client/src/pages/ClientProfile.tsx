import { useRoute, Link } from "wouter";
import { useClient } from "@/hooks/use-wealth-data";
import { Badge } from "@/components/Badge";
import { 
  ArrowLeft, 
  Mail, 
  FileText, 
  ShieldAlert, 
  PieChart, 
  TrendingUp, 
  Calendar
} from "lucide-react";
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ClientProfile() {
  const [, params] = useRoute("/clients/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: client, isLoading } = useClient(id);

  if (isLoading) return <div className="p-8">Loading client data...</div>;
  if (!client) return <div className="p-8">Client not found</div>;

  const portfolioData = [
    { name: 'Equities', value: 55, color: '#3b82f6' },
    { name: 'Fixed Income', value: 30, color: '#64748b' },
    { name: 'Alternative', value: 10, color: '#8b5cf6' },
    { name: 'Cash', value: 5, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-sm text-muted-foreground">Back to Dashboard</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold font-display">
            {client.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">{client.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">{client.email}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
              <span className="text-sm text-muted-foreground">Last Contact: {client.lastContactDate}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant={client.riskLevel === 'High' ? 'danger' : 'success'}>
                Risk: {client.riskLevel}
              </Badge>
              <Badge variant="secondary">Goal: {client.primaryGoal}</Badge>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Total Net Worth</p>
          <h2 className="text-3xl font-bold font-display text-primary">{client.netWorth}</h2>
          <p className="text-sm font-medium text-emerald-600 flex items-center justify-end gap-1 mt-1">
            <TrendingUp className="w-4 h-4" /> +12.4% YTD
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AI Snapshot */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
               <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">AI</span>
               <h3 className="font-bold text-indigo-900">Executive Snapshot</h3>
            </div>
            <p className="text-sm text-indigo-900/80 leading-relaxed">
              {client.name} is currently well-positioned towards their primary goal of <span className="font-semibold">{client.primaryGoal}</span>. 
              Recent market volatility has impacted the fixed income portion of their portfolio, but equity performance remains strong. 
              {client.lifeEventFlag && <span className="font-semibold text-indigo-700 block mt-2">Alert: Recent life event detected requires immediate review of estate planning documents.</span>}
            </p>
          </div>

          {/* Life Events Timeline */}
          <div>
            <h3 className="text-lg font-bold font-display mb-4">Life Event Timeline</h3>
            <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-4">
              <div className="relative pl-8">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></span>
                <p className="text-xs text-muted-foreground font-semibold mb-1">OCT 2023</p>
                <h4 className="text-sm font-bold">Business Acquisition</h4>
                <p className="text-sm text-muted-foreground">Client acquired a small competitor, increasing illiquid assets.</p>
              </div>
              <div className="relative pl-8">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background"></span>
                <p className="text-xs text-muted-foreground font-semibold mb-1">JAN 2023</p>
                <h4 className="text-sm font-bold">Annual Review</h4>
                <p className="text-sm text-muted-foreground">Completed annual portfolio rebalancing and tax review.</p>
              </div>
            </div>
          </div>

          {/* Compliance Notes */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-muted-foreground" />
              Compliance Notes
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-sm font-medium">Risk Profile Update Required</p>
                  <p className="text-xs text-muted-foreground">Last updated 14 months ago. Regulation requires annual update.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">KYC Documentation</p>
                  <p className="text-xs text-muted-foreground">All documents are current and valid.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions & Stats */}
        <div className="space-y-6">
          {/* Actions Card */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                <FileText className="w-4 h-4" />
                Generate Review Report
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-all">
                <Mail className="w-4 h-4" />
                Draft Follow-Up Email
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-all">
                <ShieldAlert className="w-4 h-4" />
                Update Risk Profile
              </button>
            </div>
          </div>

          {/* Portfolio Chart */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-foreground">Allocation</h3>
              <PieChart className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-mono font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
