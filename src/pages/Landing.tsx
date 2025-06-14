import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, PieChart, CreditCard, Shield, Smartphone, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Get AI-powered insights into your spending patterns and financial health."
    },
    {
      icon: PieChart,
      title: "Visual Reports",
      description: "Interactive charts and graphs to visualize your financial data."
    },
    {
      icon: CreditCard,
      title: "Bank Sync",
      description: "Connect multiple bank accounts and credit cards for automatic tracking."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely."
    },
    {
      icon: Smartphone,
      title: "Multi-Currency",
      description: "Support for multiple currencies including INR, USD, EUR, and more."
    },
    {
      icon: DollarSign,
      title: "Budget Management",
      description: "Set budgets, track expenses, and get alerts when you're overspending."
    }
  ];

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
              <img 
                src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" 
                alt="FinnTra Logo" 
                className="h-10 w-10"
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FinnTra</h1>
            </div>
            <div className="flex space-x-2">
              <ThemeToggle />
              <Button variant="outline" onClick={() => window.location.href = '/login'}>
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={() => window.location.href = '/login'}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Animation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Take Control of Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Finances</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              FinnTra is a modern, intelligent finance tracker that helps you manage your money, 
              set budgets, track expenses, and achieve your financial goals with ease.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover-scale" onClick={() => window.location.href = '/login'}>
                Start Tracking Now
              </Button>
              <Button size="lg" variant="outline" className="hover-scale" onClick={() => window.location.href = '/dashboard'}>
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FinnTra?</h3>
            <p className="text-lg text-gray-600">Powerful features to help you master your finances</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow hover-scale">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet the Developer</h3>
            <p className="text-lg text-gray-600">Built with passion for financial empowerment</p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-full">
                  <DollarSign className="h-16 w-16 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">FinnTra Development Team</h4>
                  <p className="text-gray-600 mb-4">
                    Passionate about creating tools that help people achieve financial freedom. 
                    FinnTra is built with modern web technologies to provide a seamless, 
                    secure, and intuitive finance tracking experience.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">Recharts</Badge>
                    <Badge variant="secondary">Shadcn/ui</Badge>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="border-t pt-6 mt-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-4 text-center">Get in Touch</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg hover-scale cursor-pointer">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">dev@finntra.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg hover-scale cursor-pointer">
                    <Github className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">github.com/finntra</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg hover-scale cursor-pointer">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">linkedin.com/finntra</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mockups Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center text-center animate-fade-in">
              <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" className="w-20 h-20 mb-4" alt="Mobile Mockup"/>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Mobile-First Design</h3>
              <p className="text-gray-500 dark:text-gray-400">Track expenses easily from your phone. UI optimized for fast input anywhere, anytime.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center text-center animate-fade-in delay-100">
              <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" className="w-20 h-20 mb-4" alt="Charts Mockup"/>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">AI-Powered Suggestions</h3>
              <p className="text-gray-500 dark:text-gray-400">Let the assistant help you save with personalized finance tips.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center text-center animate-fade-in delay-200">
              <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" className="w-20 h-20 mb-4" alt="Desktop Mockup"/>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Beautiful Visual Reports</h3>
              <p className="text-gray-500 dark:text-gray-400">Your finances, visualized in engaging and colorful ways on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4 cursor-pointer" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" 
              alt="FinnTra Logo" 
              className="h-8 w-8"
            />
            <h1 className="text-2xl font-bold">FinnTra</h1>
          </div>
          <p className="text-gray-400 mb-4">© 2024 FinnTra. All rights reserved.</p>
          <p className="text-gray-400">Your financial journey starts here.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
