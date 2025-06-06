import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, CreditCard, Wallet, Plus, Calendar, Bot, Banknote, LogOut, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DateRangePicker } from '@/components/DateRangePicker';
import { ReportGenerator } from '@/components/ReportGenerator';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';

const Dashboard = () => {
  const { toast } = useToast();
  const { convertAmount, formatCurrency } = useCurrencyConverter();
  
  const [currency, setCurrency] = useState('USD');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', amount: 1250, category: 'Food', description: 'Grocery shopping', date: '2024-06-05' },
    { id: 2, type: 'income', amount: 5000, category: 'Salary', description: 'Monthly salary', date: '2024-06-01' },
    { id: 3, type: 'expense', amount: 800, category: 'Transportation', description: 'Car payment', date: '2024-06-03' },
    { id: 4, type: 'expense', amount: 150, category: 'Entertainment', description: 'Movie tickets', date: '2024-06-04' },
    { id: 5, type: 'income', amount: 500, category: 'Freelance', description: 'Web design project', date: '2024-06-02' },
  ]);

  const [budgets] = useState([
    { category: 'Food', allocated: 2000, spent: 1250 },
    { category: 'Transportation', allocated: 1000, spent: 800 },
    { category: 'Entertainment', allocated: 500, spent: 150 },
    { category: 'Shopping', allocated: 800, spent: 320 },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: ''
  });

  const [aiSuggestions] = useState([
    "Consider reducing dining out expenses by 20% to save money this month",
    "Your transportation costs are below budget - great job!",
    "Set up an emergency fund with monthly contributions",
    "You could save money by switching to a different mobile plan"
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + convertAmount(t.amount, 'USD', currency), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + convertAmount(t.amount, 'USD', currency), 0);
  const netWorth = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const convertedAmount = convertAmount(t.amount, 'USD', currency);
      acc[t.category] = (acc[t.category] || 0) + convertedAmount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  const monthlyData = [
    { month: 'Jan', income: convertAmount(4500, 'USD', currency), expenses: convertAmount(3200, 'USD', currency), savings: convertAmount(1300, 'USD', currency) },
    { month: 'Feb', income: convertAmount(5200, 'USD', currency), expenses: convertAmount(2800, 'USD', currency), savings: convertAmount(2400, 'USD', currency) },
    { month: 'Mar', income: convertAmount(4800, 'USD', currency), expenses: convertAmount(3500, 'USD', currency), savings: convertAmount(1300, 'USD', currency) },
    { month: 'Apr', income: convertAmount(5500, 'USD', currency), expenses: convertAmount(3100, 'USD', currency), savings: convertAmount(2400, 'USD', currency) },
    { month: 'May', income: convertAmount(5000, 'USD', currency), expenses: convertAmount(2900, 'USD', currency), savings: convertAmount(2100, 'USD', currency) },
    { month: 'Jun', income: convertAmount(5500, 'USD', currency), expenses: convertAmount(2520, 'USD', currency), savings: convertAmount(2980, 'USD', currency) },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const transaction = {
      id: transactions.length + 1,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({ type: 'expense', amount: '', category: '', description: '' });
    
    toast({
      title: "Transaction added",
      description: `${transaction.type === 'income' ? 'Income' : 'Expense'} of ${formatCurrency(transaction.amount, currency)} added successfully`,
    });
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    console.log('Date range changed:', startDate, endDate);
    // Filter transactions based on date range
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 cursor-pointer hover-scale" onClick={handleLogoClick}>
              <img 
                src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" 
                alt="FinnTra Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-bold text-gray-900">FinnTra</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
              <DateRangePicker onDateRangeChange={handleDateRangeChange} />
              <Button variant="outline" size="sm">
                <Banknote className="h-4 w-4 mr-2" />
                Sync Bank
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogoClick}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalIncome, currency)}</div>
              <p className="text-xs text-green-100">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-100">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalExpenses, currency)}</div>
              <p className="text-xs text-red-100">-8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Net Worth</CardTitle>
              <PiggyBank className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(netWorth, currency)}</div>
              <p className="text-xs text-blue-100">+{formatCurrency(Math.floor(netWorth * 0.15))} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Savings Rate</CardTitle>
              <Wallet className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{((netWorth / totalIncome) * 100).toFixed(1)}%</div>
              <p className="text-xs text-purple-100">Above average</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Section */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold">AI Financial Assistant</CardTitle>
            </div>
            <CardDescription>Personalized insights and money-saving tips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Charts Section - Stacked Layout */}
            <div className="space-y-6">
              {/* Expenses by Category */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Expenses by Category</CardTitle>
                  <CardDescription>Current month breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Amount",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value: any, name: any) => [formatCurrency(value, currency), name]}
                        />
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Monthly Trends</CardTitle>
                  <CardDescription>Income vs Expenses vs Savings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      income: {
                        label: "Income",
                        color: "#10b981",
                      },
                      expenses: {
                        label: "Expenses", 
                        color: "#ef4444",
                      },
                      savings: {
                        label: "Savings",
                        color: "#3b82f6",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => formatCurrency(value, currency)} />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value: any, name: any) => [formatCurrency(value, currency), name]}
                        />
                        <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} />
                        <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} />
                        <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
                <CardDescription>Latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {transaction.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Add Transaction Form */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Add New Transaction</CardTitle>
                <CardDescription>Record your income or expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  />
                  
                  <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Salary">Salary</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    placeholder="Description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  />
                  
                  <Button onClick={handleAddTransaction} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Add Transaction
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
                <CardDescription>All your financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {transaction.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Budget Overview</CardTitle>
                <CardDescription>Track your spending against budgets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgets.map((budget) => {
                    const percentage = (budget.spent / budget.allocated) * 100;
                    const isOverBudget = percentage > 100;
                    
                    return (
                      <div key={budget.category} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{budget.category}</h3>
                          <span className="text-sm text-gray-500">
                            {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-3"
                        />
                        <div className="flex justify-between items-center text-sm">
                          <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                            {percentage.toFixed(1)}% used
                          </span>
                          <span className="text-gray-500">
                            {formatCurrency(budget.allocated - budget.spent)} remaining
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Financial Analytics</CardTitle>
                <CardDescription>Detailed insights into your spending patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value as number)}/>
                    <Bar dataKey="income" fill="#10b981" />
                    <Bar dataKey="expenses" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportGenerator 
              transactions={transactions}
              currency={currency}
              formatCurrency={(amount) => formatCurrency(amount, currency)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
