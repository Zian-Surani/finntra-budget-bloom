
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, Download, RefreshCw, Globe } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface CountryTaxData {
  name: string;
  currency: string;
  brackets: TaxBracket[];
  standardDeduction?: number;
  socialSecurity?: {
    rate: number;
    cap?: number;
  };
  medicare?: {
    rate: number;
    additionalRate?: number;
    additionalThreshold?: number;
  };
  filingStatuses?: string[];
}

const TaxCalculator = () => {
  const [income, setIncome] = useState<string>('');
  const [country, setCountry] = useState<string>('USA');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [results, setResults] = useState<any>(null);
  const { formatCurrency, convertAmount, selectedCurrency } = useCurrencyConverter();

  // Top 10 countries tax data
  const countryTaxData: { [key: string]: CountryTaxData } = {
    'USA': {
      name: 'United States',
      currency: 'USD',
      brackets: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11001, max: 44725, rate: 0.12 },
        { min: 44726, max: 95375, rate: 0.22 },
        { min: 95376, max: 182050, rate: 0.24 },
        { min: 182051, max: 231250, rate: 0.32 },
        { min: 231251, max: 578125, rate: 0.35 },
        { min: 578126, max: Infinity, rate: 0.37 }
      ],
      standardDeduction: 13850,
      socialSecurity: { rate: 0.062, cap: 160200 },
      medicare: { rate: 0.0145, additionalRate: 0.009, additionalThreshold: 200000 },
      filingStatuses: ['single', 'marriedJoint', 'marriedSeparate', 'headOfHousehold']
    },
    'UK': {
      name: 'United Kingdom',
      currency: 'GBP',
      brackets: [
        { min: 0, max: 12570, rate: 0.00 },      // Personal allowance
        { min: 12571, max: 50270, rate: 0.20 },  // Basic rate
        { min: 50271, max: 125140, rate: 0.40 }, // Higher rate
        { min: 125141, max: Infinity, rate: 0.45 } // Additional rate
      ],
      socialSecurity: { rate: 0.12, cap: 50270 }, // National Insurance
      filingStatuses: ['individual']
    },
    'Germany': {
      name: 'Germany',
      currency: 'EUR',
      brackets: [
        { min: 0, max: 10908, rate: 0.00 },
        { min: 10909, max: 62809, rate: 0.14 }, // Progressive from 14% to 42%
        { min: 62810, max: 277825, rate: 0.42 },
        { min: 277826, max: Infinity, rate: 0.45 }
      ],
      socialSecurity: { rate: 0.195 }, // Combined social contributions
      filingStatuses: ['single', 'married']
    },
    'Canada': {
      name: 'Canada',
      currency: 'CAD',
      brackets: [
        { min: 0, max: 53359, rate: 0.15 },
        { min: 53360, max: 106717, rate: 0.205 },
        { min: 106718, max: 165430, rate: 0.26 },
        { min: 165431, max: 235675, rate: 0.29 },
        { min: 235676, max: Infinity, rate: 0.33 }
      ],
      socialSecurity: { rate: 0.0595, cap: 68500 }, // CPP + EI
      filingStatuses: ['single', 'married']
    },
    'Australia': {
      name: 'Australia',
      currency: 'AUD',
      brackets: [
        { min: 0, max: 18200, rate: 0.00 },
        { min: 18201, max: 45000, rate: 0.19 },
        { min: 45001, max: 120000, rate: 0.325 },
        { min: 120001, max: 180000, rate: 0.37 },
        { min: 180001, max: Infinity, rate: 0.45 }
      ],
      medicare: { rate: 0.02 }, // Medicare levy
      filingStatuses: ['individual']
    },
    'France': {
      name: 'France',
      currency: 'EUR',
      brackets: [
        { min: 0, max: 10777, rate: 0.00 },
        { min: 10778, max: 27478, rate: 0.11 },
        { min: 27479, max: 78570, rate: 0.30 },
        { min: 78571, max: 168994, rate: 0.41 },
        { min: 168995, max: Infinity, rate: 0.45 }
      ],
      socialSecurity: { rate: 0.175 }, // Social contributions
      filingStatuses: ['single', 'married']
    },
    'Japan': {
      name: 'Japan',
      currency: 'JPY',
      brackets: [
        { min: 0, max: 1950000, rate: 0.05 },
        { min: 1950001, max: 3300000, rate: 0.10 },
        { min: 3300001, max: 6950000, rate: 0.20 },
        { min: 6950001, max: 9000000, rate: 0.23 },
        { min: 9000001, max: 18000000, rate: 0.33 },
        { min: 18000001, max: 40000000, rate: 0.40 },
        { min: 40000001, max: Infinity, rate: 0.45 }
      ],
      socialSecurity: { rate: 0.1525 }, // Social insurance
      filingStatuses: ['individual']
    },
    'Sweden': {
      name: 'Sweden',
      currency: 'SEK',
      brackets: [
        { min: 0, max: 540700, rate: 0.00 }, // Basic allowance
        { min: 540701, max: 685800, rate: 0.20 },
        { min: 685801, max: Infinity, rate: 0.25 }
      ],
      socialSecurity: { rate: 0.07 }, // Pension contribution
      filingStatuses: ['individual']
    },
    'Switzerland': {
      name: 'Switzerland',
      currency: 'CHF',
      brackets: [
        { min: 0, max: 14500, rate: 0.00 },
        { min: 14501, max: 31600, rate: 0.077 },
        { min: 31601, max: 41400, rate: 0.088 },
        { min: 41401, max: 55200, rate: 0.099 },
        { min: 55201, max: 72500, rate: 0.11 },
        { min: 72501, max: 78100, rate: 0.121 },
        { min: 78101, max: Infinity, rate: 0.1155 }
      ],
      socialSecurity: { rate: 0.106 }, // AHV/IV/EO + ALV
      filingStatuses: ['single', 'married']
    },
    'India': {
      name: 'India',
      currency: 'INR',
      brackets: [
        { min: 0, max: 300000, rate: 0.00 },
        { min: 300001, max: 700000, rate: 0.05 },
        { min: 700001, max: 1000000, rate: 0.10 },
        { min: 1000001, max: 1200000, rate: 0.15 },
        { min: 1200001, max: 1500000, rate: 0.20 },
        { min: 1500001, max: Infinity, rate: 0.30 }
      ],
      filingStatuses: ['individual']
    }
  };

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const currentCountryData = countryTaxData[country];
    
    if (!currentCountryData || grossIncome <= 0) {
      setResults(null);
      return;
    }

    // Convert income to country's local currency for calculation
    const localIncome = convertAmount(grossIncome, selectedCurrency, currentCountryData.currency);
    
    // Calculate tax using brackets
    let totalTax = 0;
    let remainingIncome = localIncome;
    const bracketDetails = [];
    
    for (const bracket of currentCountryData.brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1);
      const taxAtThisBracket = taxableAtThisBracket * bracket.rate;
      
      if (taxableAtThisBracket > 0) {
        bracketDetails.push({
          rate: bracket.rate * 100,
          income: taxableAtThisBracket,
          tax: taxAtThisBracket,
          range: `${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '∞' : bracket.max.toLocaleString()} ${currentCountryData.currency}`
        });
        
        totalTax += taxAtThisBracket;
        remainingIncome -= taxableAtThisBracket;
      }
    }
    
    // Calculate social security and other contributions
    let socialSecurityTax = 0;
    let medicareTax = 0;
    let additionalMedicareTax = 0;
    
    if (currentCountryData.socialSecurity) {
      const cap = currentCountryData.socialSecurity.cap || Infinity;
      socialSecurityTax = Math.min(localIncome, cap) * currentCountryData.socialSecurity.rate;
    }
    
    if (currentCountryData.medicare) {
      medicareTax = localIncome * currentCountryData.medicare.rate;
      if (currentCountryData.medicare.additionalRate && currentCountryData.medicare.additionalThreshold) {
        if (localIncome > currentCountryData.medicare.additionalThreshold) {
          additionalMedicareTax = (localIncome - currentCountryData.medicare.additionalThreshold) * currentCountryData.medicare.additionalRate;
        }
      }
    }
    
    const totalPayrollTax = socialSecurityTax + medicareTax + additionalMedicareTax;
    const totalTaxes = totalTax + totalPayrollTax;
    const takeHome = localIncome - totalTaxes;
    
    const effectiveRate = localIncome > 0 ? (totalTax / localIncome) * 100 : 0;
    const marginalRate = currentCountryData.brackets.find(b => localIncome >= b.min && localIncome <= b.max)?.rate * 100 || 0;
    
    setResults({
      grossIncome: localIncome,
      totalIncomeTax: totalTax,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax,
      totalPayrollTax,
      totalTaxes,
      takeHome,
      effectiveRate,
      marginalRate,
      bracketDetails,
      country: currentCountryData.name,
      currency: currentCountryData.currency
    });
  };

  useEffect(() => {
    if (income) {
      calculateTax();
    }
  }, [income, country, selectedCurrency]);

  const exportResults = () => {
    if (!results) return;
    
    const reportData = `
Tax Calculation Report - ${results.country}
=====================================
Gross Income: ${results.grossIncome.toLocaleString()} ${results.currency}
Income Tax: ${results.totalIncomeTax.toLocaleString()} ${results.currency}
Social Contributions: ${results.totalPayrollTax.toLocaleString()} ${results.currency}
Total Taxes: ${results.totalTaxes.toLocaleString()} ${results.currency}
Take-Home Pay: ${results.takeHome.toLocaleString()} ${results.currency}

Effective Tax Rate: ${results.effectiveRate.toFixed(2)}%
Marginal Tax Rate: ${results.marginalRate.toFixed(2)}%

Tax Bracket Breakdown:
${results.bracketDetails.map((b: any) => 
  `${b.rate}% bracket (${b.range}): ${b.tax.toLocaleString()} ${results.currency} on ${b.income.toLocaleString()} ${results.currency}`
).join('\n')}
    `;
    
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-calculation-${results.country.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentCountryData = countryTaxData[country];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Global Tax Calculator</h1>
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Tax Information
                </CardTitle>
                <CardDescription>Select country and enter your income details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(countryTaxData).map(([code, data]) => (
                        <SelectItem key={code} value={code}>
                          {data.name} ({data.currency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="income">Annual Gross Income ({selectedCurrency})</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="75000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>

                {currentCountryData?.filingStatuses && currentCountryData.filingStatuses.length > 1 && (
                  <div>
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={setFilingStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currentCountryData.filingStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status === 'single' ? 'Single' : 
                             status === 'married' ? 'Married' :
                             status === 'marriedJoint' ? 'Married Filing Jointly' :
                             status === 'marriedSeparate' ? 'Married Filing Separately' :
                             status === 'headOfHousehold' ? 'Head of Household' :
                             status === 'individual' ? 'Individual' : status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button onClick={calculateTax} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Calculate Taxes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Tax Calculation Results - {results.country}
                      <Button variant="outline" size="sm" onClick={exportResults}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </CardTitle>
                    <CardDescription>Calculated in {results.currency}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Effective Rate</p>
                        <p className="text-2xl font-bold text-blue-600">{results.effectiveRate.toFixed(2)}%</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Marginal Rate</p>
                        <p className="text-2xl font-bold text-purple-600">{results.marginalRate.toFixed(2)}%</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Gross Income:</span>
                        <span className="font-semibold">{results.grossIncome.toLocaleString()} {results.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income Tax:</span>
                        <span className="text-red-600">{results.totalIncomeTax.toLocaleString()} {results.currency}</span>
                      </div>
                      {results.totalPayrollTax > 0 && (
                        <div className="flex justify-between">
                          <span>Social Contributions:</span>
                          <span className="text-red-600">{results.totalPayrollTax.toLocaleString()} {results.currency}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Taxes:</span>
                        <span className="text-red-600">{results.totalTaxes.toLocaleString()} {results.currency}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Take-Home Pay:</span>
                        <span className="text-green-600">{results.takeHome.toLocaleString()} {results.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {results.bracketDetails.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tax Bracket Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.bracketDetails.map((bracket: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-semibold">{bracket.rate}% bracket</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{bracket.range}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{bracket.tax.toLocaleString()} {results.currency}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">on {bracket.income.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
