
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
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Savings = lazy(() => import("./pages/Savings"));
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
const UserSummary = lazy(() => import("./pages/UserSummary"));
const Balance = lazy(() => import("./pages/Balance"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const PrivacySettings = lazy(() => import("./pages/PrivacySettings"));
const NotificationSettings = lazy(() => import("./pages/NotificationSettings"));
const PasswordSettings = lazy(() => import("./pages/PasswordSettings"));
const Cards = lazy(() => import("./pages/Cards"));
const Accounts = lazy(() => import("./pages/Accounts"));

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
            <Route path="/onboarding" element={<Suspense fallback={<MessageLoading />}><Onboarding /></Suspense>} />
            <Route path="/dashboard" element={<Suspense fallback={<MessageLoading />}><Dashboard /></Suspense>} />
            <Route path="/savings" element={<Suspense fallback={<MessageLoading />}><Savings /></Suspense>} />
            <Route path="/dashboard/user" element={<Suspense fallback={<MessageLoading />}><DashboardUser /></Suspense>} />
            <Route path="/dashboard/admin" element={<Suspense fallback={<MessageLoading />}><DashboardAdmin /></Suspense>} />
            <Route path="/dashboard/developer" element={<Suspense fallback={<MessageLoading />}><DashboardDeveloper /></Suspense>} />
            <Route path="/ai-chat" element={<Suspense fallback={<MessageLoading />}><AiChat /></Suspense>} />
            <Route path="/bank-connections" element={<Suspense fallback={<MessageLoading />}><BankConnections /></Suspense>} />
            <Route path="/add-entries" element={<Suspense fallback={<MessageLoading />}><AddEntries /></Suspense>} />
            <Route path="/import-files" element={<Suspense fallback={<MessageLoading />}><ImportFiles /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<MessageLoading />}><Settings /></Suspense>} />
            <Route path="/profile-settings" element={<Suspense fallback={<MessageLoading />}><ProfileSettings /></Suspense>} />
            <Route path="/privacy-settings" element={<Suspense fallback={<MessageLoading />}><PrivacySettings /></Suspense>} />
            <Route path="/notification-settings" element={<Suspense fallback={<MessageLoading />}><NotificationSettings /></Suspense>} />
            <Route path="/password-settings" element={<Suspense fallback={<MessageLoading />}><PasswordSettings /></Suspense>} />
            <Route path="/cards" element={<Suspense fallback={<MessageLoading />}><Cards /></Suspense>} />
            <Route path="/accounts" element={<Suspense fallback={<MessageLoading />}><Accounts /></Suspense>} />
            <Route path="/expense-report" element={<Suspense fallback={<MessageLoading />}><ExpenseReport /></Suspense>} />
            <Route path="/tax-calculator" element={<Suspense fallback={<MessageLoading />}><TaxCalculator /></Suspense>} />
            <Route path="/user-summary" element={<Suspense fallback={<MessageLoading />}><UserSummary /></Suspense>} />
            <Route path="/balance" element={<Suspense fallback={<MessageLoading />}><Balance /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<MessageLoading />}><NotFound /></Suspense>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
