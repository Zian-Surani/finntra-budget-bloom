
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Building2, CreditCard, Wallet, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Balance = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const { formatCurrency, selectedCurrency, convertAmount } = useCurrencyConverter();

  const accounts = [
    {
      id: 1,
      name: "Chase Checking",
      type: "Checking",
      balance: 8456.78,
      institution: "Chase Bank",
      accountNumber: "****1234",
      currency: "USD",
      status: "active"
    },
    {
      id: 2,
      name: "Wells Fargo Savings",
      type: "Savings",
      balance: 12500.00,
      institution: "Wells Fargo",
      accountNumber: "****5678",
      currency: "USD",
      status: "active"
    },
    {
      id: 3,
      name: "Chase Freedom Credit Card",
      type: "Credit Card",
      balance: -2340.56,
      institution: "Chase Bank",
      accountNumber: "****9012",
      currency: "USD",
      status: "active",
      creditLimit: 5000.00
    },
    {
      id: 4,
      name: "Cash Wallet",
      type: "Cash",
      balance: 450.00,
      institution: "Physical Cash",
      accountNumber: "N/A",
      currency: "USD",
      status: "active"
    }
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAssets = accounts.filter(acc => acc.balance > 0).reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = Math.abs(accounts.filter(acc => acc.balance < 0).reduce((sum, acc) => sum + acc.balance, 0));

  const accountTypeData = [
    { name: 'Checking', value: 8456.78, color: '#3b82f6' },
    { name: 'Savings', value: 12500.00, color: '#10b981' },
    { name: 'Cash', value: 450.00, color: '#f59e0b' },
    { name: 'Credit Card', value: 2340.56, color: '#ef4444' }
  ];

  const monthlyTrend = [
    { month: 'Jan', balance: 15000 },
    { month: 'Feb', balance: 16200 },
    { month: 'Mar', balance: 17800 },
    { month: 'Apr', balance: 19100 },
    { month: 'May', balance: 18900 },
    { month: 'Jun', balance: totalBalance }
  ];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'Checking':
      case 'Savings':
        return Building2;
      case 'Credit Card':
        return CreditCard;
      case 'Cash':
        return Wallet;
      default:
        return Building2;
    }
  };

  const displayBalance = (amount: number) => {
    if (hideBalances) return '****';
    return formatCurrency(convertAmount(amount, 'USD', selectedCurrency), selectedCurrency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Balances</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHideBalances(!hideBalances)}
            >
              {hideBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <ThemeToggle />
            <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Net Worth</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {displayBalance(totalBalance)}
              </div>
              <p className="text-xs text-green-600">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {displayBalance(totalAssets)}
              </div>
              <p className="text-xs text-blue-600">
                +5.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {displayBalance(totalLiabilities)}
              </div>
              <p className="text-xs text-red-600">
                -2.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Account Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Account Distribution</CardTitle>
              <CardDescription>Balance breakdown by account type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={accountTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {accountTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {accountTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{displayBalance(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Balance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Balance Trend</CardTitle>
              <CardDescription>Net worth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="balance" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>All your accounts and their current balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.map((account) => {
                const IconComponent = getAccountIcon(account.type);
                const isDebt = account.balance < 0;
                
                return (
                  <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${isDebt ? 'bg-red-100 dark:bg-red-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                        <IconComponent className={`h-5 w-5 ${isDebt ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{account.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {account.institution} • {account.accountNumber}
                        </p>
                        {account.type === 'Credit Card' && account.creditLimit && (
                          <p className="text-xs text-gray-500">
                            Credit Limit: {displayBalance(account.creditLimit)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${isDebt ? 'text-red-600' : 'text-green-600'}`}>
                        {displayBalance(Math.abs(account.balance))}
                      </div>
                      <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                        {account.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Balance;
