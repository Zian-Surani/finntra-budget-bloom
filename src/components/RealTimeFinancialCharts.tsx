
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Calendar } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';

export const RealTimeFinancialCharts = () => {
  const { state } = useAppContext();
  const { formatCurrency, selectedCurrency, convertAmount } = useCurrencyConverter();

  // Process transaction data for charts
  const chartData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyData = last30Days.map(date => {
      const dayTransactions = state.transactions.filter(t => t.date === date);
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const expenses = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        income: convertAmount(income, 'USD', selectedCurrency),
        expenses: convertAmount(expenses, 'USD', selectedCurrency),
        net: convertAmount(income - expenses, 'USD', selectedCurrency)
      };
    });

    return dailyData;
  }, [state.transactions, selectedCurrency, convertAmount]);

  // Category breakdown data
  const categoryData = useMemo(() => {
    const categories = {};
    state.transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount);
      });

    return Object.entries(categories).map(([name, value], index) => ({
      name,
      value: convertAmount(value as number, 'USD', selectedCurrency),
      color: [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88',
        '#ff8042', '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'
      ][index % 10]
    }));
  }, [state.transactions, selectedCurrency, convertAmount]);

  // Monthly trend data
  const monthlyTrend = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        year: date.getFullYear(),
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      };
    });

    return months.map(({ month, year, key }) => {
      const monthTransactions = state.transactions.filter(t => t.date.startsWith(key));
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      return {
        month: `${month} ${year}`,
        income: convertAmount(income, 'USD', selectedCurrency),
        expenses: convertAmount(expenses, 'USD', selectedCurrency),
        savings: convertAmount(income - expenses, 'USD', selectedCurrency)
      };
    });
  }, [state.transactions, selectedCurrency, convertAmount]);

  // Key metrics
  const metrics = useMemo(() => {
    const totalIncome = state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const totalExpenses = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalBalance = state.banks.reduce((sum, bank) => sum + bank.balance, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return {
      totalIncome: convertAmount(totalIncome, 'USD', selectedCurrency),
      totalExpenses: convertAmount(totalExpenses, 'USD', selectedCurrency),
      totalBalance: convertAmount(totalBalance, 'USD', selectedCurrency),
      savingsRate
    };
  }, [state.transactions, state.banks, selectedCurrency, convertAmount]);

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Income</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {formatCurrency(metrics.totalIncome, selectedCurrency)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">Total Expenses</p>
                <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                  {formatCurrency(metrics.totalExpenses, selectedCurrency)}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Balance</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {formatCurrency(metrics.totalBalance, selectedCurrency)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Savings Rate</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {metrics.savingsRate.toFixed(1)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cash Flow */}
        <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Daily Cash Flow (30 Days)
            </CardTitle>
            <CardDescription>Track your daily income vs expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value), selectedCurrency)} />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Your spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value), selectedCurrency)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-900/20">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>6-month income, expenses, and savings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value), selectedCurrency)} />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="savings" fill="#8b5cf6" name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Net Worth Trend */}
        <Card className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-900/20">
          <CardHeader>
            <CardTitle>Net Cash Flow</CardTitle>
            <CardDescription>Your financial trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value), selectedCurrency)} />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
