
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Zap, Camera, MapPin, ArrowLeft, Plus, Clock, Tag } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const AddEntries = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const features = [
    {
      icon: Zap,
      title: "4-Tap Entry",
      description: "Add expenses in just 4 quick taps - amount, category, description, done!",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Camera,
      title: "Photo Receipts",
      description: "Snap a photo of your receipt and we'll extract the amount automatically",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Location Tagging",
      description: "Automatically tag expenses with location for better tracking",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: Clock,
      title: "Smart Timestamps",
      description: "Intelligent time detection with manual override options",
      color: "from-blue-400 to-indigo-500"
    }
  ];

  const quickCategories = [
    { name: "Food", emoji: "🍔", color: "bg-red-100 text-red-800" },
    { name: "Transport", emoji: "🚗", color: "bg-blue-100 text-blue-800" },
    { name: "Shopping", emoji: "🛍️", color: "bg-purple-100 text-purple-800" },
    { name: "Bills", emoji: "💡", color: "bg-yellow-100 text-yellow-800" },
    { name: "Entertainment", emoji: "🎬", color: "bg-green-100 text-green-800" },
    { name: "Health", emoji: "🏥", color: "bg-pink-100 text-pink-800" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
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
            <div className="bg-gradient-to-r from-pink-400 to-red-500 p-4 rounded-full w-fit mx-auto mb-6">
              <Smartphone className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Add Entries in the App
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Track expenses on the go with our lightning-fast mobile interface
            </p>
          </div>
          
          {/* Mobile App Mockup */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-72 h-96 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Expense</h3>
                    <div className="bg-red-500 text-white rounded-full p-2">
                      <Plus className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">$25.50</div>
                      <div className="text-sm text-gray-500">Amount</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {quickCategories.slice(0, 6).map((cat, index) => (
                        <div key={index} className={`${cat.color} rounded-lg p-2 text-center text-xs font-medium`}>
                          <div className="text-lg mb-1">{cat.emoji}</div>
                          {cat.name}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="text-sm text-gray-500 mb-1">Description</div>
                      <div className="text-gray-900 dark:text-white">Lunch at cafe</div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white">
                    Save Expense
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Fast & Intuitive Entry
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg w-fit mx-auto`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Adding an Expense in 4 Taps
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Tap Amount", desc: "Enter the expense amount using the number pad", icon: "💰" },
              { step: 2, title: "Pick Category", desc: "Select from quick categories or create custom ones", icon: "📂" },
              { step: 3, title: "Add Details", desc: "Optional description, photo, or location", icon: "📝" },
              { step: 4, title: "Save & Done", desc: "Your expense is tracked and categorized automatically", icon: "✅" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Smart Features for Faster Tracking
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <Camera className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Receipt Scanning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-left">
                  Take a photo of any receipt and our AI will automatically extract:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Amount spent</li>
                    <li>Merchant name</li>
                    <li>Date and time</li>
                    <li>Suggested category</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <Tag className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Smart Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-left">
                  AI learns your spending patterns and suggests:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Most likely categories</li>
                    <li>Frequent merchants</li>
                    <li>Recurring expenses</li>
                    <li>Custom tags</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Tracking?</h2>
          <p className="text-xl mb-8 text-pink-100">Download FinnTra today and experience effortless expense tracking</p>
          <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AddEntries;
