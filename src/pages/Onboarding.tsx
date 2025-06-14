
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Building2, DollarSign, Target, CheckCircle, Plus } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bankData, setBankData] = useState({ name: '', type: '', balance: '' });
  const [savingsData, setSavingsData] = useState({ amount: '', goal: '', target: '' });
  const [customBank, setCustomBank] = useState('');
  const [showCustomBank, setShowCustomBank] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const banks = [
    'Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One',
    'American Express', 'TD Bank', 'PNC Bank', 'HSBC', 'Other'
  ];

  const handleBankSelect = (value: string) => {
    if (value === 'Other') {
      setShowCustomBank(true);
    } else {
      setBankData({ ...bankData, name: value });
      setShowCustomBank(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and redirect to dashboard
      localStorage.setItem('onboardingComplete', 'true');
      localStorage.setItem('userBankData', JSON.stringify(bankData));
      localStorage.setItem('userSavingsData', JSON.stringify(savingsData));
      window.location.href = '/dashboard';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Connect Your Bank</CardTitle>
              <CardDescription>Select your primary bank to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={handleBankSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {showCustomBank && (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your bank name"
                    value={customBank}
                    onChange={(e) => setCustomBank(e.target.value)}
                  />
                  <Button 
                    onClick={() => setBankData({ ...bankData, name: customBank })}
                    className="w-full"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Bank
                  </Button>
                </div>
              )}
              
              <Select onValueChange={(value) => setBankData({ ...bankData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Current Balance</CardTitle>
              <CardDescription>Enter your current account balance</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                placeholder="Enter balance amount"
                value={bankData.balance}
                onChange={(e) => setBankData({ ...bankData, balance: e.target.value })}
              />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Set up your financial goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="number"
                placeholder="Current savings amount"
                value={savingsData.amount}
                onChange={(e) => setSavingsData({ ...savingsData, amount: e.target.value })}
              />
              <Input
                placeholder="Savings goal (e.g., Emergency Fund)"
                value={savingsData.goal}
                onChange={(e) => setSavingsData({ ...savingsData, goal: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Target amount"
                value={savingsData.target}
                onChange={(e) => setSavingsData({ ...savingsData, target: e.target.value })}
              />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>All Set!</CardTitle>
              <CardDescription>Your financial dashboard is ready</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Your Setup:</h4>
                <p><strong>Bank:</strong> {bankData.name}</p>
                <p><strong>Account:</strong> {bankData.type}</p>
                <p><strong>Balance:</strong> ${bankData.balance}</p>
                <p><strong>Savings Goal:</strong> {savingsData.goal}</p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FinnTra Setup</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Step {currentStep} of {totalSteps}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="mb-6" />
        </div>

        {renderStep()}

        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && !bankData.name) ||
              (currentStep === 2 && !bankData.balance) ||
              (currentStep === 3 && (!savingsData.amount || !savingsData.goal))
            }
            className="px-8 py-3"
          >
            {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
