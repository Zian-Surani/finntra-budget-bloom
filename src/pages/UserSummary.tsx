
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Home, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

const UserSummary = () => {
  const { formatCurrency } = useCurrencyConverter();

  const summaryStats = [
    { label: "Total Balance", value: 18222.57, trend: "+12.5%", color: "text-green-600" },
    { label: "Monthly Income", value: 5400.00, trend: "+8.2%", color: "text-blue-600" },
    { label: "Monthly Expenses", value: 3284.50, trend: "-3.1%", color: "text-red-600" },
    { label: "Savings Rate", value: 39.2, trend: "+4.1%", color: "text-purple-600", isPercentage: true }
  ];

  const expenseData = [
    { name: 'Food & Dining', value: 1200, color: '#8884d8' },
    { name: 'Transportation', value: 800, color: '#82ca9d' },
    { name: 'Entertainment', value: 600, color: '#ffc658' },
    { name: 'Utilities', value: 400, color: '#ff7300' },
    { name: 'Healthcare', value: 300, color: '#00ff88' },
  ];

  const monthlyTrend = [
    { month: 'Jan', income: 5200, expenses: 3100 },
    { month: 'Feb', income: 5400, expenses: 3200 },
    { month: 'Mar', income: 5300, expenses: 3400 },
    { month: 'Apr', income: 5600, expenses: 3100 },
    { month: 'May', income: 5800, expenses: 3300 },
    { month: 'Jun', income: 5400, expenses: 3284 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Summary</h1>
          </div>
          <div className="flex items-center space-x-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="hover:scale-105 transition-transform">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                {stat.label.includes('Income') && <TrendingUp className="h-4 w-4 text-blue-600" />}
                {stat.label.includes('Expenses') && <TrendingDown className="h-4 w-4 text-red-600" />}
                {stat.label.includes('Balance') && <DollarSign className="h-4 w-4 text-green-600" />}
                {stat.label.includes('Savings') && <PieChart className="h-4 w-4 text-purple-600" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.isPercentage ? `${stat.value}%` : formatCurrency(stat.value)}
                </div>
                <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Current month spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {expenseData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Income vs Expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="income" fill="#3b82f6" name="Income" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Goals and Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Emergency Fund</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Vacation Savings</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Investment Portfolio</span>
                  <span className="text-sm text-gray-500">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Insights</CardTitle>
              <CardDescription>AI-powered recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Badge variant="secondary" className="mb-2">Spending Alert</Badge>
                <p className="text-sm">You've spent 15% more on dining this month compared to last month.</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Badge variant="secondary" className="mb-2">Savings Opportunity</Badge>
                <p className="text-sm">Great job! You're on track to exceed your monthly savings goal by {formatCurrency(200)}.</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Badge variant="secondary" className="mb-2">Investment Tip</Badge>
                <p className="text-sm">Consider diversifying your portfolio with international funds for better returns.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
