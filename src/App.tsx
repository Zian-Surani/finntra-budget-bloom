
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { MessageLoading } from "@/components/ui/message-loading";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardDeveloper from "./pages/DashboardDeveloper";
import AiChat from "./pages/AiChat";
import BankConnections from "./pages/BankConnections";
import AddEntries from "./pages/AddEntries";
import ImportFiles from "./pages/ImportFiles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<MessageLoading />}>
          <Routes>
            <Route path="/" element={<Suspense fallback={<MessageLoading />}><Landing /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<MessageLoading />}><Login /></Suspense>} />
            <Route path="/dashboard" element={<Suspense fallback={<MessageLoading />}><Dashboard /></Suspense>} />
            <Route path="/dashboard/user" element={<Suspense fallback={<MessageLoading />}><DashboardUser /></Suspense>} />
            <Route path="/dashboard/admin" element={<Suspense fallback={<MessageLoading />}><DashboardAdmin /></Suspense>} />
            <Route path="/dashboard/developer" element={<Suspense fallback={<MessageLoading />}><DashboardDeveloper /></Suspense>} />
            <Route path="/ai-chat" element={<Suspense fallback={<MessageLoading />}><AiChat /></Suspense>} />
            <Route path="/bank-connections" element={<Suspense fallback={<MessageLoading />}><BankConnections /></Suspense>} />
            <Route path="/add-entries" element={<Suspense fallback={<MessageLoading />}><AddEntries /></Suspense>} />
            <Route path="/import-files" element={<Suspense fallback={<MessageLoading />}><ImportFiles /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<MessageLoading />}><NotFound /></Suspense>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
