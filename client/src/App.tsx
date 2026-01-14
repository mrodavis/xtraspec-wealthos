import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";

import Dashboard from "@/pages/Dashboard";
import ClientProfile from "@/pages/ClientProfile";
import ClientsList from "@/pages/ClientsList";
import Reports from "@/pages/Reports";
import Alerts from "@/pages/Alerts";
import Compliance from "@/pages/Compliance";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />
      <main className="flex-1 lg:ml-0 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-12">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/clients" component={ClientsList} />
            <Route path="/clients/:id" component={ClientProfile} />
            <Route path="/reports" component={Reports} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/compliance" component={Compliance} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
