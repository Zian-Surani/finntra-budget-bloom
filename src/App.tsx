
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { MessageLoading } from "@/components/ui/message-loading";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ConnectionStatus from "@/components/ConnectionStatus";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry auth errors or network errors in production
        if (error && typeof error === 'object' && 'message' in error) {
          if (error.message.includes('auth') || error.message.includes('network')) {
            return false;
          }
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  console.log('App: Initializing application');
  console.log('App: Environment:', process.env.NODE_ENV);
  console.log('App: Origin:', window.location.origin);
  console.log('App: Current path:', window.location.pathname);
  console.log('App: Current URL:', window.location.href);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppProvider>
            <TooltipProvider>
              <ConnectionStatus />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<MessageLoading />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/savings" element={<Savings />} />
                    <Route path="/dashboard/user" element={<DashboardUser />} />
                    <Route path="/dashboard/admin" element={<DashboardAdmin />} />
                    <Route path="/dashboard/developer" element={<DashboardDeveloper />} />
                    <Route path="/ai-chat" element={<AiChat />} />
                    <Route path="/bank-connections" element={<BankConnections />} />
                    <Route path="/add-entries" element={<AddEntries />} />
                    <Route path="/import-files" element={<ImportFiles />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile-settings" element={<ProfileSettings />} />
                    <Route path="/privacy-settings" element={<PrivacySettings />} />
                    <Route path="/notification-settings" element={<NotificationSettings />} />
                    <Route path="/password-settings" element={<PasswordSettings />} />
                    <Route path="/cards" element={<Cards />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/expense-report" element={<ExpenseReport />} />
                    <Route path="/tax-calculator" element={<TaxCalculator />} />
                    <Route path="/user-summary" element={<UserSummary />} />
                    <Route path="/balance" element={<Balance />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
