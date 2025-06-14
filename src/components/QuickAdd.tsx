
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingDown, TrendingUp, Receipt, Utensils, Car, Home, ShoppingBag, Gamepad2, Heart, Briefcase, DollarSign, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

const QuickAdd = () => {
  const { addTransaction } = useAppContext();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const expenseCategories = [
    { value: 'Food & Dining', label: 'Food & Dining', icon: Utensils },
    { value: 'Transportation', label: 'Transportation', icon: Car },
    { value: 'Housing', label: 'Housing', icon: Home },
    { value: 'Shopping', label: 'Shopping', icon: ShoppingBag },
    { value: 'Entertainment', label: 'Entertainment', icon: Gamepad2 },
    { value: 'Healthcare', label: 'Healthcare', icon: Heart },
    { value: 'Utilities', label: 'Utilities', icon: Receipt },
    { value: 'Other', label: 'Other', icon: Receipt }
  ];

  const incomeCategories = [
    { value: 'Salary', label: 'Salary', icon: Briefcase },
    { value: 'Freelance', label: 'Freelance', icon: Briefcase },
    { value: 'Investment', label: 'Investment', icon: DollarSign },
    { value: 'Gift', label: 'Gift', icon: Gift },
    { value: 'Bonus', label: 'Bonus', icon: DollarSign },
    { value: 'Other', label: 'Other', icon: DollarSign }
  ];

  const handleQuickAdd = async (type: 'income' | 'expense') => {
    if (!amount || !description || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before adding the transaction.",
        variant: "destructive"
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await addTransaction({
        amount: numAmount,
        description: description.trim(),
        category,
        type,
        date: new Date().toISOString().split('T')[0]
      });

      toast({
        title: "Transaction added",
        description: `${type === 'income' ? 'Income' : 'Expense'} of $${numAmount.toFixed(2)} has been recorded.`
      });

      // Reset form
      setAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategoryButtons = (categories: typeof expenseCategories, type: 'income' | 'expense') => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((cat) => {
        const IconComponent = cat.icon;
        return (
          <Button
            key={cat.value}
            variant={category === cat.value ? "default" : "outline"}
            className="h-20 flex-col p-3"
            onClick={() => setCategory(cat.value)}
          >
            <IconComponent className="h-6 w-6 mb-2" />
            <span className="text-xs text-center">{cat.label}</span>
          </Button>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs defaultValue="expense" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Add Expense
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Add Income
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <TrendingDown className="h-5 w-5" />
                Record Expense
              </CardTitle>
              <CardDescription>Track your spending quickly and easily</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-amount">Amount</Label>
                  <Input
                    id="expense-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-description">Description</Label>
                  <Input
                    id="expense-description"
                    placeholder="What did you spend on?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Category</Label>
                {renderCategoryButtons(expenseCategories, 'expense')}
              </div>

              <Button 
                onClick={() => handleQuickAdd('expense')} 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Expense'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                Record Income
              </CardTitle>
              <CardDescription>Track your earnings and income sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income-amount">Amount</Label>
                  <Input
                    id="income-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income-description">Description</Label>
                  <Input
                    id="income-description"
                    placeholder="Income source"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Category</Label>
                {renderCategoryButtons(incomeCategories, 'income')}
              </div>

              <Button 
                onClick={() => handleQuickAdd('income')} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Income'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuickAdd;
