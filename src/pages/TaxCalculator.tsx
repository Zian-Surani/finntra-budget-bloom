
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, TrendingUp, Info } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [country, setCountry] = useState('US');
  const [currency, setCurrency] = useState('USD');
  const [filingStatus, setFilingStatus] = useState('single');
  const [taxResult, setTaxResult] = useState<any>(null);
  const { convertAmount } = useCurrencyConverter();

  const countries = [
    { code: 'US', name: 'United States', currency: 'USD' },
    { code: 'UK', name: 'United Kingdom', currency: 'GBP' },
    { code: 'CA', name: 'Canada', currency: 'CAD' },
    { code: 'DE', name: 'Germany', currency: 'EUR' },
    { code: 'FR', name: 'France', currency: 'EUR' },
    { code: 'JP', name: 'Japan', currency: 'JPY' },
    { code: 'AU', name: 'Australia', currency: 'AUD' },
    { code: 'IN', name: 'India', currency: 'INR' },
    { code: 'SG', name: 'Singapore', currency: 'SGD' },
    { code: 'NL', name: 'Netherlands', currency: 'EUR' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];

  const calculateTax = () => {
    const annualIncome = parseFloat(income);
    if (!annualIncome || annualIncome <= 0) return;

    // Convert income to USD for calculation, then convert result to selected currency
    const incomeInUSD = convertAmount(annualIncome, currency, 'USD');
    
    let tax = 0;
    let taxBrackets: any[] = [];
    let effectiveRate = 0;
    let marginalRate = 0;

    // Tax calculation based on country
    switch (country) {
      case 'US':
        if (filingStatus === 'single') {
          if (incomeInUSD <= 10275) {
            tax = incomeInUSD * 0.10;
            marginalRate = 10;
            taxBrackets = [{ range: '$0 - $10,275', rate: '10%' }];
          } else if (incomeInUSD <= 41775) {
            tax = 1027.50 + (incomeInUSD - 10275) * 0.12;
            marginalRate = 12;
            taxBrackets = [
              { range: '$0 - $10,275', rate: '10%' },
              { range: '$10,276 - $41,775', rate: '12%' }
            ];
          } else if (incomeInUSD <= 89450) {
            tax = 4807.50 + (incomeInUSD - 41775) * 0.22;
            marginalRate = 22;
            taxBrackets = [
              { range: '$0 - $10,275', rate: '10%' },
              { range: '$10,276 - $41,775', rate: '12%' },
              { range: '$41,776 - $89,450', rate: '22%' }
            ];
          } else if (incomeInUSD <= 190750) {
            tax = 15213.50 + (incomeInUSD - 89450) * 0.24;
            marginalRate = 24;
            taxBrackets = [
              { range: '$0 - $10,275', rate: '10%' },
              { range: '$10,276 - $41,775', rate: '12%' },
              { range: '$41,776 - $89,450', rate: '22%' },
              { range: '$89,451 - $190,750', rate: '24%' }
            ];
          } else {
            tax = 39525.50 + (incomeInUSD - 190750) * 0.32;
            marginalRate = 32;
            taxBrackets = [
              { range: '$0 - $10,275', rate: '10%' },
              { range: '$10,276 - $41,775', rate: '12%' },
              { range: '$41,776 - $89,450', rate: '22%' },
              { range: '$89,451 - $190,750', rate: '24%' },
              { range: '$190,751+', rate: '32%' }
            ];
          }
        }
        break;
      
      case 'UK':
        if (incomeInUSD <= 12570) {
          tax = 0;
          marginalRate = 0;
        } else if (incomeInUSD <= 50270) {
          tax = (incomeInUSD - 12570) * 0.20;
          marginalRate = 20;
        } else if (incomeInUSD <= 125140) {
          tax = 7540 + (incomeInUSD - 50270) * 0.40;
          marginalRate = 40;
        } else {
          tax = 37540 + (incomeInUSD - 125140) * 0.45;
          marginalRate = 45;
        }
        break;
      
      case 'CA':
        if (incomeInUSD <= 50197) {
          tax = incomeInUSD * 0.15;
          marginalRate = 15;
        } else if (incomeInUSD <= 100392) {
          tax = 7529.55 + (incomeInUSD - 50197) * 0.205;
          marginalRate = 20.5;
        } else if (incomeInUSD <= 155625) {
          tax = 17819.56 + (incomeInUSD - 100392) * 0.26;
          marginalRate = 26;
        } else {
          tax = 32180.14 + (incomeInUSD - 155625) * 0.29;
          marginalRate = 29;
        }
        break;
      
      case 'DE':
        if (incomeInUSD <= 10908) {
          tax = 0;
          marginalRate = 0;
        } else if (incomeInUSD <= 62810) {
          tax = (incomeInUSD - 10908) * 0.14;
          marginalRate = 14;
        } else if (incomeInUSD <= 277826) {
          tax = 7266.28 + (incomeInUSD - 62810) * 0.42;
          marginalRate = 42;
        } else {
          tax = 97573 + (incomeInUSD - 277826) * 0.45;
          marginalRate = 45;
        }
        break;
      
      default:
        // Generic calculation for other countries
        if (incomeInUSD <= 25000) {
          tax = incomeInUSD * 0.10;
          marginalRate = 10;
        } else if (incomeInUSD <= 50000) {
          tax = 2500 + (incomeInUSD - 25000) * 0.15;
          marginalRate = 15;
        } else if (incomeInUSD <= 100000) {
          tax = 6250 + (incomeInUSD - 50000) * 0.25;
          marginalRate = 25;
        } else {
          tax = 18750 + (incomeInUSD - 100000) * 0.35;
          marginalRate = 35;
        }
    }

    effectiveRate = (tax / incomeInUSD) * 100;
    
    // Convert tax result to selected currency
    const taxInSelectedCurrency = convertAmount(tax, 'USD', currency);
    const afterTaxIncome = annualIncome - taxInSelectedCurrency;

    setTaxResult({
      grossIncome: annualIncome,
      taxOwed: taxInSelectedCurrency,
      afterTaxIncome,
      effectiveRate: effectiveRate.toFixed(2),
      marginalRate,
      taxBrackets,
      country: countries.find(c => c.code === country)?.name,
      currency
    });
  };

  const formatCurrency = (amount: number, curr: string = currency) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹' };
    return `${symbols[curr as keyof typeof symbols] || curr}${amount.toLocaleString(undefined, { 
      minimumFractionDigits: curr === 'JPY' ? 0 : 2,
      maximumFractionDigits: curr === 'JPY' ? 0 : 2 
    })}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Tax Calculator</h1>
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
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Calculation</CardTitle>
              <CardDescription>Calculate taxes for multiple countries and currencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {country === 'US' && (
                <div>
                  <Label htmlFor="filingStatus">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={setFilingStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married Filing Jointly</SelectItem>
                      <SelectItem value="head">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="income">Annual Income ({currency})</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="Enter your annual income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>

              <Button onClick={calculateTax} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Tax
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {taxResult && (
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Results</CardTitle>
                <CardDescription>
                  Tax calculation for {taxResult.country} in {taxResult.currency}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gross Income</p>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency(taxResult.grossIncome)}
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tax Owed</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(taxResult.taxOwed)}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">After-Tax Income</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(taxResult.afterTaxIncome)}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective Rate</p>
                    <p className="text-xl font-bold text-purple-600">
                      {taxResult.effectiveRate}%
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Tax Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Marginal Tax Rate:</strong> {taxResult.marginalRate}%</p>
                    <p><strong>Effective Tax Rate:</strong> {taxResult.effectiveRate}%</p>
                    <p><strong>Tax as % of Income:</strong> {((taxResult.taxOwed / taxResult.grossIncome) * 100).toFixed(2)}%</p>
                  </div>
                </div>

                {taxResult.taxBrackets.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">Tax Brackets</h4>
                    <div className="space-y-2">
                      {taxResult.taxBrackets.map((bracket: any, index: number) => (
                        <div key={index} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm">{bracket.range}</span>
                          <span className="text-sm font-medium">{bracket.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
