import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, PieChart, Building2, Calculator, FileText, Smartphone, Shield, Zap, BarChart3, CreditCard } from 'lucide-react';
const FeatureGrid = () => {
  const features = [{
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "AI-powered insights into your spending patterns and financial trends",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    badge: "Popular"
  }, {
    icon: PieChart,
    title: "Visual Reports",
    description: "Beautiful charts and graphs that make your finances easy to understand",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    badge: "New"
  }, {
    icon: Building2,
    title: "Bank Integration",
    description: "Connect all your accounts for automatic transaction syncing",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    badge: "Secure"
  }, {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Real-time tax calculations based on current tax laws and brackets",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    badge: "Updated"
  }, {
    icon: FileText,
    title: "Export & Reports",
    description: "Generate professional financial reports in multiple formats",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    badge: ""
  }, {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Optimized experience across all devices with offline capabilities",
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
    badge: "Mobile"
  }, {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your financial data is protected with enterprise-level encryption",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    badge: "Secure"
  }, {
    icon: Zap,
    title: "Real-time Sync",
    description: "Instant updates across all your devices and platforms",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    badge: "Fast"
  }];
  return <div className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Master Your Finances
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From basic expense tracking to advanced analytics, FinnTra provides all the tools you need to take control of your financial future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-xl ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    {feature.badge && <Badge variant="secondary" className="text-xs font-medium">
                        {feature.badge}
                      </Badge>}
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>;
        })}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 border-2 border-blue-100 hover:border-blue-300 transition-colors">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2+</h3>
            <p className="text-gray-600 dark:text-gray-300">Active Users</p>
          </Card>
          <Card className="text-center p-8 border-2 border-green-100 hover:border-green-300 transition-colors">
            <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">$2M+</h3>
            <p className="text-gray-600 dark:text-gray-300">Transactions Viewed</p>
          </Card>
          <Card className="text-center p-8 border-2 border-purple-100 hover:border-purple-300 transition-colors">
            <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">24/7</h3>
            <p className="text-gray-600 dark:text-gray-300">Uptime Guarantee</p>
          </Card>
        </div>
      </div>
    </div>;
};
export default FeatureGrid;