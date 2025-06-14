
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from "@/components/ThemeToggle";
import { Plus, TrendingUp, TrendingDown, Home, LogIn, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const AddEntries = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    account: 'checking',
    notes: ''
  });

  const expenseCategories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Health & Medical', 'Travel', 'Education',
    'Home & Garden', 'Personal Care', 'Insurance', 'Taxes', 'Other'
  ];

  const incomeCategories = [
    'Salary', 'Freelance', 'Business', 'Investments', 'Rental',
    'Pension', 'Benefits', 'Gifts', 'Refunds', 'Bonus', 'Commission', 'Other'
  ];

  const accounts = [
    { value: 'checking', label: 'Checking Account' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'cash', label: 'Cash' },
    { value: 'investment', label: 'Investment Account' }
  ];

  useEffect(() => {
    // Check if user is authenticated (you can replace this with actual auth logic)
    const user = localStorage.getItem('authenticated_user');
    setIsAuthenticated(!!user);
  }, []);

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a description');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to add entries');
      window.location.href = '/login';
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to localStorage
      const newTransaction = {
        id: Date.now(),
        type: formData.type,
        amount: formData.type === 'expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
        description: formData.description.trim(),
        category: formData.category,
        date: formData.date,
        account: formData.account,
        notes: formData.notes.trim(),
        createdAt: new Date().toISOString()
      };

      const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      localStorage.setItem('transactions', JSON.stringify([newTransaction, ...existingTransactions]));

      toast.success(`${formData.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
      
      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        account: 'checking',
        notes: ''
      });

      // Redirect to dashboard after success
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

    } catch (error) {
      toast.error('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({
      ...prev,
      type,
      category: '' // Reset category when type changes
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In Required</CardTitle>
            <CardDescription>
              You need to sign in to add entries to your financial records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/login'}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In / Sign Up
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/'}
            >
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Entries</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Track Your Money
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Add income or expenses quickly and accurately
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Transaction
            </CardTitle>
            <CardDescription>
              Enter your transaction details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transaction Type */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.type === 'expense' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => handleTypeChange('expense')}
                  disabled={isSubmitting}
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Expense
                </Button>
                <Button
                  type="button"
                  variant={formData.type === 'income' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => handleTypeChange('income')}
                  disabled={isSubmitting}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Income
                </Button>
              </div>

              {/* Amount */}
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="text-2xl font-bold"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  placeholder={formData.type === 'income' ? 'e.g., Salary payment, Freelance work' : 'e.g., Grocery shopping, Gas bill'}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  disabled={isSubmitting}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.type === 'expense' ? expenseCategories : incomeCategories).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={isSubmitting}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Account */}
              <div>
                <Label htmlFor="account">Account</Label>
                <Select
                  value={formData.account}
                  onValueChange={(value) => setFormData({ ...formData, account: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.value} value={account.value}>
                        {account.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about this transaction..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  disabled={isSubmitting}
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding {formData.type === 'income' ? 'Income' : 'Expense'}...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add {formData.type === 'income' ? 'Income' : 'Expense'}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">💡</Badge>
                <span className="text-sm">Use descriptive names for easy tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">📱</Badge>
                <span className="text-sm">Add transactions immediately for accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">🏷️</Badge>
                <span className="text-sm">Consistent categories help with analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">📝</Badge>
                <span className="text-sm">Use notes for additional context</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddEntries;
