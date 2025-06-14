
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { MessageLoading } from "@/components/ui/message-loading";

// Lazy load components
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DashboardUser = lazy(() => import("./pages/DashboardUser"));
const DashboardAdmin = lazy(() => import("./pages/DashboardAdmin"));
const DashboardDeveloper = lazy(() => import("./pages/DashboardDeveloper"));
const AiChat = lazy(() => import("./pages/AiChat"));
const BankConnections = lazy(() => import("./pages/BankConnections"));
const AddEntries = lazy(() => import("./pages/AddEntries"));
const ImportFiles = lazy(() => import("./pages/ImportFiles"));
const Settings = lazy(() => import("./pages/Settings"));
const ExpenseReport = lazy(() => import("./pages/ExpenseReport"));
const TaxCalculator = lazy(() => import("./pages/TaxCalculator"));

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
            <Route path="/settings" element={<Suspense fallback={<MessageLoading />}><Settings /></Suspense>} />
            <Route path="/expense-report" element={<Suspense fallback={<MessageLoading />}><ExpenseReport /></Suspense>} />
            <Route path="/tax-calculator" element={<Suspense fallback={<MessageLoading />}><TaxCalculator /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<MessageLoading />}><NotFound /></Suspense>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
