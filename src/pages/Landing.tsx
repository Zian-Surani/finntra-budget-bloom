import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Smartphone, Shield, Zap, Star, TrendingUp, PieChart, Calculator } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import FeatureGrid from "@/components/FeatureGrid";
const Landing = () => {
  const handleGetStarted = () => {
    window.location.href = '/login';
  };
  const handleStartImporting = () => {
    window.location.href = '/login';
  };
  const handleConnectBank = () => {
    window.location.href = '/login';
  };
  const handleAIAssistant = () => {
    window.location.href = '/ai-chat';
  };
  const testimonials = [{
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "FinnTra has completely transformed how I manage my business finances. The AI insights are incredibly helpful!",
    rating: 5
  }, {
    name: "Mike Chen",
    role: "Freelancer",
    content: "Finally, a financial tool that understands my needs. The expense tracking is seamless and the reports are beautiful.",
    rating: 5
  }, {
    name: "Emily Davis",
    role: "Personal User",
    content: "I've tried many budgeting apps, but FinnTra's simplicity and power make it stand out from the rest.",
    rating: 5
  }];
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b dark:bg-gray-900/80 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FinnTra</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button onClick={() => window.location.href = '/login'} variant="outline">
              Sign In
            </Button>
            <Button onClick={() => window.location.href = '/login'}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            ✨ Now with AI-powered insights
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Master Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Finances</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate financial management platform that combines powerful analytics, seamless bank integration, and AI-driven insights to help you make smarter financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button onClick={handleGetStarted} size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={handleAIAssistant} size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
              Try AI Assistant
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-gray-600 dark:text-gray-300">Transactions Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Quick Action Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Get Started in Minutes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Add Entries</CardTitle>
                <CardDescription>Start tracking your income and expenses</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={handleGetStarted} className="w-full transition-colors bg-gray-50 text-gray-950">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Import Files</CardTitle>
                <CardDescription>Upload your existing financial data</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={handleStartImporting} variant="outline" className="w-full transition-colors bg-gray-50 text-zinc-950">
                  Start Importing
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Connect Banks</CardTitle>
                <CardDescription>Automatic transaction syncing</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={handleConnectBank} variant="outline" className="w-full transition-colors bg-gray-50 text-gray-950">
                  Connect Your Bank
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-8 w-8" />
                <h3 className="text-xl font-bold">FinnTra</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner in financial management and growth.
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Fast
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Expense Tracking</li>
                <li>Bank Integration</li>
                <li>AI Insights</li>
                <li>Tax Calculator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press Kit</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinnTra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;