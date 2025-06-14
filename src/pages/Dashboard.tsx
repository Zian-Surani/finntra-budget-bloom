import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  Plus, 
  Upload,
  Building2,
  Smartphone,
  BarChart3,
  Settings,
  Calculator,
  FileText,
  AlertCircle
} from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import FinancialAnalytics from "@/components/FinancialAnalytics";
import ImportTransactions from "@/components/ImportTransactions";
import QuickAdd from "@/components/QuickAdd";
import BankConnectionManager from "@/components/BankConnectionManager";
import { CurrencySelector } from "@/components/CurrencySelector";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { RealtimeUpdates } from "@/components/RealtimeUpdates";
import { ReportGenerator } from "@/components/ReportGenerator";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import { useAppContext } from "@/contexts/AppContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { state } = useAppContext();
  const { formatCurrency, selectedCurrency, convertAmount } = useCurrencyConverter();

  // Calculate real stats from user data
  const totalBalance = state.banks.reduce((sum, bank) => sum + bank.balance, 0);
  const monthlyIncome = state.userData.monthly_income || 0;
  
  // Calculate monthly expenses from transactions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = state.transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

  const stats = [
    {
      title: "Total Balance",
      value: totalBalance,
      change: state.banks.length > 0 ? "+0.0%" : "Add accounts to track",
      icon: DollarSign,
      color: "text-green-600",
      isNumeric: true
    },
    {
      title: "Monthly Income",
      value: monthlyIncome,
      change: monthlyIncome > 0 ? "+0.0%" : "Set in profile",
      icon: TrendingUp,
      color: "text-blue-600",
      isNumeric: true
    },
    {
      title: "Monthly Expenses",
      value: monthlyExpenses,
      change: monthlyExpenses > 0 ? "-0.0%" : "No expenses yet",
      icon: CreditCard,
      color: "text-red-600",
      isNumeric: true
    },
    {
      title: "Savings Rate",
      value: savingsRate,
      change: savingsRate > 0 ? "+0.0%" : "Start saving",
      icon: PieChart,
      color: "text-purple-600",
      isPercentage: true
    }
  ];

  const quickActions = [
    { title: "Quick Expense Report", icon: FileText, action: () => window.location.href = '/expense-report' },
    { title: "View Summary", icon: BarChart3, action: () => window.location.href = '/user-summary' },
    { title: "Check Balances", icon: Building2, action: () => window.location.href = '/balance' },
    { title: "Taxes", icon: Calculator, action: () => window.location.href = '/tax-calculator' },
    { title: "Record Income", icon: TrendingUp, action: () => window.location.href = '/add-entries' }
  ];

  const formatCurrencyForReport = (amount: number) => formatCurrency(amount, selectedCurrency);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  // New user welcome message
  const renderNewUserWelcome = () => {
    if (!state.isNewUser) return null;

    return (
      <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <AlertCircle className="h-5 w-5" />
            Welcome to FinnTra!
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            You're just getting started. Add your first transaction or connect a bank account to see your financial data here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={() => setActiveTab('quick-add')} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add First Transaction
            </Button>
            <Button onClick={() => setActiveTab('banks')} variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              Connect Bank Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FinnTra Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <CurrencySelector />
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/settings'}>
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <UserProfileDropdown />
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back{state.userData.name ? `, ${state.userData.name}` : ''}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {state.isNewUser ? "Let's get started with your financial journey" : "Here's your financial overview for today"}
          </p>
        </div>

        {renderNewUserWelcome()}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-max">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="quick-add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Quick Add
            </TabsTrigger>
            <TabsTrigger value="banks" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Banks
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={action.action}
                      >
                        <IconComponent className="h-6 w-6 mb-2" />
                        <span className="text-xs text-center">{action.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const displayValue = stat.isPercentage 
                  ? `${stat.value.toFixed(1)}%` 
                  : stat.isNumeric && typeof stat.value === 'number'
                    ? formatCurrency(convertAmount(stat.value, 'USD', selectedCurrency), selectedCurrency)
                    : stat.value;
                
                return (
                  <Card key={index} className="hover:scale-105 transition-transform relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <IconComponent className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {displayValue}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  {state.transactions.length === 0 
                    ? "No transactions yet - add your first transaction above"
                    : "Your latest financial activity"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {state.transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start tracking your finances by adding your first transaction</p>
                    <Button 
                      onClick={() => setActiveTab('quick-add')} 
                      className="mt-4"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {transaction.date} • {transaction.category}
                          </p>
                        </div>
                        <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(Math.abs(convertAmount(transaction.amount, 'USD', selectedCurrency)), selectedCurrency)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quick-add" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Quick Add Transaction</h2>
              <p className="text-gray-600 dark:text-gray-400">Add expenses or income in just 4 taps</p>
            </div>
            <QuickAdd />
          </TabsContent>

          <TabsContent value="banks" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Bank Connections</h2>
              <p className="text-gray-600 dark:text-gray-400">Connect and manage your bank accounts</p>
            </div>
            <BankConnectionManager />
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Import Transactions</h2>
              <p className="text-gray-600 dark:text-gray-400">Import data from various file formats</p>
            </div>
            <ImportTransactions />
          </TabsContent>

          <TabsContent value="mobile" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Mobile Experience</h2>
              <p className="text-gray-600 dark:text-gray-400">Optimized for mobile devices</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobile Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">✓</Badge>
                    <span>Touch-optimized interface</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">✓</Badge>
                    <span>Quick gesture controls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">✓</Badge>
                    <span>Offline transaction entry</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">✓</Badge>
                    <span>Camera receipt scanning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">✓</Badge>
                    <span>Voice note descriptions</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Quick Expense
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Record Income
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <PieChart className="h-4 w-4 mr-2" />
                    View Summary
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="h-4 w-4 mr-2" />
                    Check Balances
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Financial Analytics</h2>
              <p className="text-gray-600 dark:text-gray-400">Detailed insights and reports</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FinancialAnalytics />
              <ReportGenerator 
                transactions={state.transactions} 
                currency={selectedCurrency} 
                formatCurrency={formatCurrencyForReport} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
