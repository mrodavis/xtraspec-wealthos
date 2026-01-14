import { useState } from "react";
import { FileText, CheckCircle2, Download, Printer, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClients } from "@/hooks/use-wealth-data";

export default function Reports() {
  const { toast } = useToast();
  const { data: clients } = useClients();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const [toggles, setToggles] = useState({
    marketPerformance: true,
    lifeEvents: true,
    riskProfile: false,
    compliance: true,
  });

  const handleGenerate = () => {
    if (!selectedClient) {
      toast({
        title: "Selection Required",
        description: "Please select a client to generate a report.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast({
        title: "Report Generated",
        description: "The annual review report is ready for download.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Report Generator</h1>
          <p className="text-muted-foreground mt-1">Create comprehensive annual reviews with one click.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold font-display mb-4">Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Select Client</label>
                <select 
                  className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  <option value="">Select a client...</option>
                  {clients?.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-foreground">Include Sections</label>
                
                {[
                  { id: 'marketPerformance', label: 'Market Performance Analysis' },
                  { id: 'lifeEvents', label: 'Life Events Impact Assessment' },
                  { id: 'riskProfile', label: 'Risk Profile Re-evaluation' },
                  { id: 'compliance', label: 'Compliance Disclosures' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox"
                      checked={toggles[item.id as keyof typeof toggles]}
                      onChange={() => setToggles(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof toggles]}))}
                      className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </label>
                ))}
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-border shadow-sm min-h-[600px] flex flex-col relative overflow-hidden">
            <div className="border-b border-border p-4 bg-gray-50 flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preview Mode</span>
              {isGenerated && (
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white rounded text-muted-foreground transition-colors" title="Print">
                    <Printer className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white rounded text-primary transition-colors" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 p-8 md:p-12 font-serif">
              {!isGenerated ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                  <FileText className="w-16 h-16 mb-4" />
                  <p>Configure and generate report to view preview</p>
                </div>
              ) : (
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="text-center border-b pb-8 border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 font-display">Annual Wealth Review</h2>
                    <p className="text-gray-500">Prepared for {clients?.find(c => c.id === Number(selectedClient))?.name}</p>
                    <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-primary pl-3">Executive Summary</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Despite recent market volatility, your portfolio has demonstrated resilience, outperforming the benchmark by 2.3%. 
                        We have identified opportunities to optimize tax efficiency through strategic loss harvesting in the fixed income allocation.
                        Your primary goal of retirement at age 60 remains on track with a probability of 94%.
                      </p>
                    </section>

                    {toggles.marketPerformance && (
                      <section>
                         <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-primary pl-3">Market Performance</h3>
                         <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-2">
                           <div className="flex justify-between text-sm mb-2">
                             <span className="text-gray-600">Total Return (YTD)</span>
                             <span className="font-bold text-green-600">+12.4%</span>
                           </div>
                           <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                             <div className="bg-green-500 h-full w-[65%]"></div>
                           </div>
                         </div>
                         <p className="text-gray-600 leading-relaxed text-sm">
                           Equity markets rallied in Q3 driven by technology sector performance. Your allocation to defensive sectors provided stability during October volatility.
                         </p>
                      </section>
                    )}

                    {toggles.lifeEvents && (
                      <section>
                        <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-primary pl-3">Life Event Impact</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          The recent business acquisition noted in your file suggests a need to increase liquidity in your personal accounts to cover potential capital calls over the next 18 months.
                        </p>
                      </section>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
              <span className="text-9xl font-bold -rotate-45">DRAFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
