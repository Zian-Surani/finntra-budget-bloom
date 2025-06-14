
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Home, Download, RefreshCw } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface TaxData {
  year: number;
  brackets: TaxBracket[];
  standardDeduction: {
    single: number;
    marriedJoint: number;
    marriedSeparate: number;
    headOfHousehold: number;
  };
}

const TaxCalculator = () => {
  const [income, setIncome] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [deductions, setDeductions] = useState<string>('');
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);
  const [taxYear, setTaxYear] = useState<string>('2024');
  const [results, setResults] = useState<any>(null);
  const { formatCurrency, selectedCurrency } = useCurrencyConverter();

  // 2024 Tax Brackets (updated for current year)
  const taxData: { [key: string]: TaxData } = {
    '2024': {
      year: 2024,
      brackets: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11001, max: 44725, rate: 0.12 },
        { min: 44726, max: 95375, rate: 0.22 },
        { min: 95376, max: 182050, rate: 0.24 },
        { min: 182051, max: 231250, rate: 0.32 },
        { min: 231251, max: 578125, rate: 0.35 },
        { min: 578126, max: Infinity, rate: 0.37 }
      ],
      standardDeduction: {
        single: 13850,
        marriedJoint: 27700,
        marriedSeparate: 13850,
        headOfHousehold: 20800
      }
    },
    '2025': {
      year: 2025,
      brackets: [
        { min: 0, max: 11250, rate: 0.10 },
        { min: 11251, max: 45750, rate: 0.12 },
        { min: 45751, max: 97650, rate: 0.22 },
        { min: 97651, max: 186350, rate: 0.24 },
        { min: 186351, max: 236750, rate: 0.32 },
        { min: 236751, max: 591450, rate: 0.35 },
        { min: 591451, max: Infinity, rate: 0.37 }
      ],
      standardDeduction: {
        single: 14200,
        marriedJoint: 28400,
        marriedSeparate: 14200,
        headOfHousehold: 21300
      }
    }
  };

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const currentTaxData = taxData[taxYear];
    
    // Determine deduction amount
    const standardDed = currentTaxData.standardDeduction[filingStatus as keyof typeof currentTaxData.standardDeduction];
    const deductionAmount = useStandardDeduction ? standardDed : (parseFloat(deductions) || 0);
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - deductionAmount);
    
    // Calculate tax using brackets
    let totalTax = 0;
    let remainingIncome = taxableIncome;
    const bracketDetails = [];
    
    for (const bracket of currentTaxData.brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1);
      const taxAtThisBracket = taxableAtThisBracket * bracket.rate;
      
      if (taxableAtThisBracket > 0) {
        bracketDetails.push({
          rate: bracket.rate * 100,
          income: taxableAtThisBracket,
          tax: taxAtThisBracket,
          range: `$${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '∞' : '$' + bracket.max.toLocaleString()}`
        });
        
        totalTax += taxAtThisBracket;
        remainingIncome -= taxableAtThisBracket;
      }
    }
    
    // Calculate additional taxes and take-home
    const socialSecurityTax = Math.min(grossIncome * 0.062, 9932.40); // 2024 limit
    const medicareTax = grossIncome * 0.0145;
    const additionalMedicareTax = grossIncome > 200000 ? (grossIncome - 200000) * 0.009 : 0;
    
    const totalFederalTax = totalTax;
    const totalPayrollTax = socialSecurityTax + medicareTax + additionalMedicareTax;
    const totalTaxes = totalFederalTax + totalPayrollTax;
    const takeHome = grossIncome - totalTaxes;
    
    const effectiveRate = grossIncome > 0 ? (totalFederalTax / grossIncome) * 100 : 0;
    const marginalRate = currentTaxData.brackets.find(b => taxableIncome >= b.min && taxableIncome <= b.max)?.rate * 100 || 0;
    
    setResults({
      grossIncome,
      taxableIncome,
      deductionAmount,
      totalFederalTax,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax,
      totalPayrollTax,
      totalTaxes,
      takeHome,
      effectiveRate,
      marginalRate,
      bracketDetails,
      taxYear
    });
  };

  useEffect(() => {
    if (income) {
      calculateTax();
    }
  }, [income, filingStatus, deductions, useStandardDeduction, taxYear]);

  const exportResults = () => {
    if (!results) return;
    
    const reportData = `
Tax Calculation Report - ${results.taxYear}
=====================================
Gross Income: ${formatCurrency(results.grossIncome)}
Deductions: ${formatCurrency(results.deductionAmount)}
Taxable Income: ${formatCurrency(results.taxableIncome)}

Federal Income Tax: ${formatCurrency(results.totalFederalTax)}
Social Security Tax: ${formatCurrency(results.socialSecurityTax)}
Medicare Tax: ${formatCurrency(results.medicareTax)}
Additional Medicare Tax: ${formatCurrency(results.additionalMedicareTax)}

Total Taxes: ${formatCurrency(results.totalTaxes)}
Take-Home Pay: ${formatCurrency(results.takeHome)}

Effective Tax Rate: ${results.effectiveRate.toFixed(2)}%
Marginal Tax Rate: ${results.marginalRate.toFixed(2)}%

Tax Bracket Breakdown:
${results.bracketDetails.map((b: any) => 
  `${b.rate}% bracket (${b.range}): ${formatCurrency(b.tax)} on ${formatCurrency(b.income)}`
).join('\n')}
    `;
    
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-calculation-${results.taxYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tax Calculator</h1>
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
                <CardTitle>Tax Information</CardTitle>
                <CardDescription>Enter your income and filing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="taxYear">Tax Year</Label>
                  <Select value={taxYear} onValueChange={setTaxYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="income">Annual Gross Income</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="75000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="filingStatus">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={setFilingStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="marriedJoint">Married Filing Jointly</SelectItem>
                      <SelectItem value="marriedSeparate">Married Filing Separately</SelectItem>
                      <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="standardDeduction"
                      checked={useStandardDeduction}
                      onChange={(e) => setUseStandardDeduction(e.target.checked)}
                    />
                    <Label htmlFor="standardDeduction">Use Standard Deduction</Label>
                  </div>
                  
                  {!useStandardDeduction && (
                    <div>
                      <Label htmlFor="deductions">Itemized Deductions</Label>
                      <Input
                        id="deductions"
                        type="number"
                        placeholder="15000"
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                      />
                    </div>
                  )}
                </div>

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
                      Tax Calculation Results
                      <Button variant="outline" size="sm" onClick={exportResults}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </CardTitle>
                    <CardDescription>Based on {results.taxYear} tax brackets</CardDescription>
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
                        <span className="font-semibold">{formatCurrency(results.grossIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deductions:</span>
                        <span className="text-green-600">-{formatCurrency(results.deductionAmount)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Taxable Income:</span>
                        <span className="font-semibold">{formatCurrency(results.taxableIncome)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Federal Income Tax:</span>
                      <span className="text-red-600">{formatCurrency(results.totalFederalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Security (6.2%):</span>
                      <span className="text-red-600">{formatCurrency(results.socialSecurityTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medicare (1.45%):</span>
                      <span className="text-red-600">{formatCurrency(results.medicareTax)}</span>
                    </div>
                    {results.additionalMedicareTax > 0 && (
                      <div className="flex justify-between">
                        <span>Additional Medicare (0.9%):</span>
                        <span className="text-red-600">{formatCurrency(results.additionalMedicareTax)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Taxes:</span>
                      <span className="text-red-600">{formatCurrency(results.totalTaxes)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Take-Home Pay:</span>
                      <span className="text-green-600">{formatCurrency(results.takeHome)}</span>
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
                              <p className="font-semibold">{formatCurrency(bracket.tax)}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">on {formatCurrency(bracket.income)}</p>
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
