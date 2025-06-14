
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Coffee, Car, ShoppingCart, Home, Heart, Briefcase, Gamepad2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuickAdd = () => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const categories = [
    { name: 'Food & Dining', icon: Coffee, color: 'bg-orange-500' },
    { name: 'Transportation', icon: Car, color: 'bg-blue-500' },
    { name: 'Shopping', icon: ShoppingCart, color: 'bg-purple-500' },
    { name: 'Home', icon: Home, color: 'bg-green-500' },
    { name: 'Healthcare', icon: Heart, color: 'bg-red-500' },
    { name: 'Work', icon: Briefcase, color: 'bg-gray-500' },
    { name: 'Entertainment', icon: Gamepad2, color: 'bg-pink-500' }
  ];

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep(2);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep(3);
  };

  const handleTypeSelect = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setStep(4);
  };

  const handleSubmit = () => {
    // Simulate saving the transaction
    toast({
      title: "Transaction Added!",
      description: `${transactionType === 'income' ? '+' : '-'}$${amount} for ${selectedCategory}`,
    });
    
    // Reset form
    setAmount('');
    setSelectedCategory('');
    setTransactionType('expense');
    setStep(1);
  };

  const getTapIndicator = () => {
    return (
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4].map((tapNumber) => (
          <div
            key={tapNumber}
            className={`w-3 h-3 rounded-full mx-1 ${
              step >= tapNumber ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Quick Add - 4 Taps</CardTitle>
        <CardDescription className="text-center">
          Add a transaction in just 4 quick taps
        </CardDescription>
      </CardHeader>
      <CardContent>
        {getTapIndicator()}
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Tap 1: Enter Amount</h3>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center text-2xl font-bold"
                autoFocus
              />
            </div>
            <Button 
              onClick={handleAmountSubmit} 
              className="w-full"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Tap 2: Choose Category</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.name}
                      variant="outline"
                      onClick={() => handleCategorySelect(category.name)}
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform"
                    >
                      <div className={`p-2 rounded-full ${category.color}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs">{category.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Tap 3: Income or Expense?</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleTypeSelect('expense')}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform border-red-300 hover:border-red-500"
                >
                  <Minus className="h-8 w-8 text-red-500" />
                  <span>Expense</span>
                </Button>
                <Button
                  onClick={() => handleTypeSelect('income')}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform border-green-300 hover:border-green-500"
                >
                  <Plus className="h-8 w-8 text-green-500" />
                  <span>Income</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Tap 4: Confirm & Save</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span>Amount:</span>
                  <span className={`font-bold ${transactionType === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transactionType === 'income' ? '+' : '-'}${amount}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Category:</span>
                  <Badge variant="secondary">{selectedCategory}</Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Type:</span>
                  <Badge variant={transactionType === 'income' ? 'default' : 'destructive'}>
                    {transactionType}
                  </Badge>
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Save Transaction
              </Button>
            </div>
          </div>
        )}

        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="w-full mt-2"
          >
            Back
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickAdd;
