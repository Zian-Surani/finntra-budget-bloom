
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Building2, DollarSign, Target, CheckCircle, Plus, User, Phone, MapPin, Briefcase } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppContext } from '@/contexts/AppContext';

const Onboarding = () => {
  const { updateUserData, updateBankData, updateSavingsData } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    income: ''
  });
  const [bankData, setBankData] = useState({
    name: '',
    type: '',
    balance: '',
    accountNumber: '',
    routingNumber: ''
  });
  const [savingsData, setSavingsData] = useState({
    amount: '',
    goal: '',
    target: ''
  });
  const [customBank, setCustomBank] = useState('');
  const [showCustomBank, setShowCustomBank] = useState(false);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const banks = [
    'Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One',
    'American Express', 'TD Bank', 'PNC Bank', 'HSBC', 'Other'
  ];

  const accountTypes = [
    'Checking Account',
    'Savings Account',
    'Money Market Account',
    'Certificate of Deposit (CD)',
    'Credit Card'
  ];

  const occupations = [
    'Software Engineer', 'Teacher', 'Doctor', 'Lawyer', 'Engineer',
    'Marketing Specialist', 'Sales Representative', 'Consultant',
    'Student', 'Retired', 'Entrepreneur', 'Other'
  ];

  const handleBankSelect = (value: string) => {
    if (value === 'Other') {
      setShowCustomBank(true);
      setBankData({ ...bankData, name: '' });
    } else {
      setBankData({ ...bankData, name: value });
      setShowCustomBank(false);
    }
  };

  const handleAddCustomBank = () => {
    if (customBank.trim()) {
      setBankData({ ...bankData, name: customBank });
      setShowCustomBank(false);
      setCustomBank('');
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save all data and redirect to dashboard
      updateUserData(userData);
      updateBankData(bankData);
      updateSavingsData(savingsData);
      localStorage.setItem('onboardingComplete', 'true');
      window.location.href = '/dashboard';
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return userData.name && userData.email;
      case 2:
        return userData.phone && userData.address;
      case 3:
        return userData.occupation && userData.income;
      case 4:
        return bankData.name && bankData.type;
      case 5:
        return bankData.balance && bankData.accountNumber;
      case 6:
        return savingsData.amount && savingsData.goal && savingsData.target;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Let's start with your basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How can we reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Tell us about your work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation *</Label>
                <Select onValueChange={(value) => setUserData({ ...userData, occupation: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupations.map((occupation) => (
                      <SelectItem key={occupation} value={occupation}>{occupation}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income *</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="Enter your monthly income"
                  value={userData.income}
                  onChange={(e) => setUserData({ ...userData, income: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Connect Your Bank</CardTitle>
              <CardDescription>Select your primary bank to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bank Name *</Label>
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
              </div>
              
              {showCustomBank && (
                <div className="space-y-2">
                  <Label>Custom Bank Name</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your bank name"
                      value={customBank}
                      onChange={(e) => setCustomBank(e.target.value)}
                    />
                    <Button onClick={handleAddCustomBank} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Account Type *</Label>
                <Select onValueChange={(value) => setBankData({ ...bankData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Enter your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance *</Label>
                <Input
                  id="balance"
                  type="number"
                  placeholder="Enter current balance"
                  value={bankData.balance}
                  onChange={(e) => setBankData({ ...bankData, balance: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number (Optional)</Label>
                <Input
                  id="routingNumber"
                  placeholder="Enter routing number"
                  value={bankData.routingNumber}
                  onChange={(e) => setBankData({ ...bankData, routingNumber: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Set up your financial goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings Amount *</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="Enter current savings"
                  value={savingsData.amount}
                  onChange={(e) => setSavingsData({ ...savingsData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savingsGoal">Savings Goal *</Label>
                <Input
                  id="savingsGoal"
                  placeholder="e.g., Emergency Fund, Vacation, Car"
                  value={savingsData.goal}
                  onChange={(e) => setSavingsData({ ...savingsData, goal: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount *</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="Enter target amount"
                  value={savingsData.target}
                  onChange={(e) => setSavingsData({ ...savingsData, target: e.target.value })}
                  required
                />
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
            disabled={!isStepValid()}
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
