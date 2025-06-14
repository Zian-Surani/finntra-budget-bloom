
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Building2, DollarSign, Target, User, Phone, MapPin, Briefcase, CreditCard, Plus } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { updateUserData, addBank, addSavingsGoal, setCurrency } = useAppContext();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data states
  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [professionalData, setProfessionalData] = useState({
    occupation: '',
    monthlyIncome: ''
  });
  
  const [bankData, setBankData] = useState({
    name: '',
    type: '',
    balance: '',
    accountNumber: '',
    routingNumber: ''
  });
  
  const [savingsData, setSavingsData] = useState({
    goalName: '',
    currentAmount: '',
    targetAmount: ''
  });
  
  const [preferences, setPreferences] = useState({
    currency: 'USD'
  });

  const [customBank, setCustomBank] = useState('');
  const [showCustomBank, setShowCustomBank] = useState(false);

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Pre-fill email if available
  useEffect(() => {
    if (user?.email) {
      setPersonalData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const banks = [
    'Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One',
    'American Express', 'TD Bank', 'PNC Bank', 'HSBC', 'US Bank',
    'Truist', 'Fifth Third Bank', 'Citizens Bank', 'KeyBank', 'Other'
  ];

  const accountTypes = [
    'Checking Account',
    'Savings Account',
    'Money Market Account',
    'Certificate of Deposit (CD)',
    'Credit Card Account',
    'Investment Account'
  ];

  const occupations = [
    'Software Engineer', 'Teacher', 'Doctor', 'Lawyer', 'Engineer',
    'Marketing Specialist', 'Sales Representative', 'Consultant',
    'Manager', 'Analyst', 'Designer', 'Accountant', 'Nurse',
    'Student', 'Retired', 'Entrepreneur', 'Freelancer', 'Other'
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'INR', name: 'Indian Rupee (₹)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' }
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

  const handleNextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleCompleteOnboarding();
    }
  };

  const handleCompleteOnboarding = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Update user profile
      await updateUserData({
        name: personalData.name,
        email: personalData.email,
        phone: personalData.phone,
        address: personalData.address,
        occupation: professionalData.occupation,
        monthly_income: parseFloat(professionalData.monthlyIncome) || 0
      });

      // Add bank account
      if (bankData.name && bankData.type) {
        await addBank({
          name: bankData.name,
          type: bankData.type,
          balance: parseFloat(bankData.balance) || 0,
          account_number: bankData.accountNumber,
          routing_number: bankData.routingNumber
        });
      }

      // Add savings goal
      if (savingsData.goalName && savingsData.targetAmount) {
        await addSavingsGoal({
          goal_name: savingsData.goalName,
          current_amount: parseFloat(savingsData.currentAmount) || 0,
          target_amount: parseFloat(savingsData.targetAmount) || 0
        });
      }

      // Set currency preference
      await setCurrency(preferences.currency);

      toast({
        title: "Setup Complete!",
        description: "Your profile has been successfully created."
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: "There was an error setting up your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return personalData.name && personalData.email;
      case 2: return personalData.phone && personalData.address;
      case 3: return professionalData.occupation && professionalData.monthlyIncome;
      case 4: return true; // Currency selection is optional
      case 5: return bankData.name && bankData.type;
      case 6: return bankData.balance && bankData.accountNumber;
      case 7: return savingsData.goalName && savingsData.targetAmount;
      default: return false;
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
                  value={personalData.name}
                  onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={personalData.email}
                  onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
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
                  value={personalData.phone}
                  onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter your full address"
                  value={personalData.address}
                  onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })}
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
              <CardDescription>Tell us about your work and income</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation *</Label>
                <Select onValueChange={(value) => setProfessionalData({ ...professionalData, occupation: value })}>
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
                  value={professionalData.monthlyIncome}
                  onChange={(e) => setProfessionalData({ ...professionalData, monthlyIncome: e.target.value })}
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
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
              <CardTitle>Currency Preference</CardTitle>
              <CardDescription>Choose your preferred currency for the app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Currency</Label>
                <Select 
                  value={preferences.currency} 
                  onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.name}
                      </SelectItem>
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
              <Building2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Bank Information</CardTitle>
              <CardDescription>Connect your primary bank account</CardDescription>
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

      case 6:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-green-600" />
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

      case 7:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Set up your first savings goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalName">Goal Name *</Label>
                <Input
                  id="goalName"
                  placeholder="e.g., Emergency Fund, Vacation, New Car"
                  value={savingsData.goalName}
                  onChange={(e) => setSavingsData({ ...savingsData, goalName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentAmount">Current Amount (Optional)</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  placeholder="Enter current savings amount"
                  value={savingsData.currentAmount}
                  onChange={(e) => setSavingsData({ ...savingsData, currentAmount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount *</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="Enter target amount"
                  value={savingsData.targetAmount}
                  onChange={(e) => setSavingsData({ ...savingsData, targetAmount: e.target.value })}
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
            disabled={!isStepValid() || isLoading}
            className="px-8 py-3"
          >
            {isLoading ? 'Saving...' : (currentStep === totalSteps ? 'Complete Setup' : 'Continue')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
