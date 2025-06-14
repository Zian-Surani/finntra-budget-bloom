
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Home } from 'lucide-react';

const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [taxOwed, setTaxOwed] = useState(0);

  const calculateTax = () => {
    const annualIncome = parseFloat(income);
    let tax = 0;
    
    if (annualIncome > 50000) {
      tax = annualIncome * 0.25;
    } else if (annualIncome > 25000) {
      tax = annualIncome * 0.15;
    } else {
      tax = annualIncome * 0.10;
    }
    
    setTaxOwed(tax);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tax Calculator</h1>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Calculate Your Tax</CardTitle>
            <CardDescription>Estimate your tax liability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income">Annual Income</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your annual income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <Button onClick={calculateTax} className="w-full">
              Calculate Tax
            </Button>
            {taxOwed > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-lg font-semibold">Estimated Tax: ${taxOwed.toFixed(2)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxCalculator;
