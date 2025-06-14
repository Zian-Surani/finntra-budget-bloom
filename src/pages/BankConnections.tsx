
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Globe, Zap, ArrowLeft, CheckCircle, Bank, Users, TrendingUp } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const BankConnections = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const features = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Connect to 12,379+ banks and financial institutions worldwide",
      stats: "190+ Countries"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption and read-only access to your accounts",
      stats: "SOC 2 Certified"
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Automatic transaction updates every few hours",
      stats: "< 2hr Delay"
    },
    {
      icon: Users,
      title: "Multi-Account Support",
      description: "Connect unlimited checking, savings, and credit card accounts",
      stats: "Unlimited Accounts"
    }
  ];

  const supportedBanks = [
    "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One",
    "American Express", "Discover", "USAA", "TD Bank", "PNC Bank",
    "HSBC", "Barclays", "Santander", "Deutsche Bank", "ING"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBackToHome} className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full w-fit mx-auto mb-6">
              <CreditCard className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Bank Connections
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Securely connect your bank accounts and credit cards for automatic transaction tracking
            </p>
          </div>
          
          <div className="mb-12">
            <img src="/lovable-uploads/7df32f9b-320d-44c0-a6e4-bdb6b8871ffa.png" alt="Bank connections interface" className="rounded-xl shadow-2xl mx-auto max-w-2xl w-full" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Bank Connections?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg w-fit mx-auto">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">{feature.stats}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How Bank Connections Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Search Your Bank</h3>
              <p className="text-gray-600 dark:text-gray-300">Find your bank from our database of 12,379+ supported institutions worldwide.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Secure Login</h3>
              <p className="text-gray-600 dark:text-gray-300">Safely authenticate using your online banking credentials through our encrypted connection.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Auto-Sync</h3>
              <p className="text-gray-600 dark:text-gray-300">Your transactions automatically appear in FinnTra, categorized and ready for analysis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Banks */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Popular Supported Banks
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {supportedBanks.map((bank, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition-transform duration-200">
                <Bank className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">{bank}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300">And 12,364+ more banks worldwide</p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Your Security is Our Priority
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                Read-Only Access
              </h3>
              <p className="text-gray-600 dark:text-gray-300">We only read your transaction data. We cannot move money or make changes to your accounts.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                Bank-Level Encryption
              </h3>
              <p className="text-gray-600 dark:text-gray-300">256-bit SSL encryption protects your data, the same security used by major banks.</p>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-transform duration-200">
            Connect Your Bank Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BankConnections;
