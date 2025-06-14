
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Upload,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    id: 'analytics',
    title: 'Smart Analytics',
    description: 'AI-powered insights into your spending patterns',
    icon: BarChart3,
    color: 'bg-blue-500',
    preview: 'Track your expenses with intelligent categorization and predictive analysis'
  },
  {
    id: 'security',
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and protected',
    icon: Shield,
    color: 'bg-green-500',
    preview: 'Military-grade encryption keeps your financial data safe and secure'
  },
  {
    id: 'speed',
    title: 'Lightning Fast',
    description: 'Add transactions in just 4 taps',
    icon: Zap,
    color: 'bg-yellow-500',
    preview: 'Quick entry system designed for busy lifestyles'
  },
  {
    id: 'sync',
    title: 'Auto Sync',
    description: 'Connect multiple bank accounts',
    icon: Building2,
    color: 'bg-purple-500',
    preview: 'Automatic synchronization across all your financial accounts'
  }
];

const InteractiveFeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience FinnTra Features
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Interactive preview of what makes FinnTra special
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Feature List */}
          <div className="space-y-4">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature.id === feature.id;
              
              return (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(feature)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`${feature.color} p-3 rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-center">
            <div className="text-center">
              <div className={`${activeFeature.color} p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center`}>
                <activeFeature.icon className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {activeFeature.title}
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {activeFeature.preview}
              </p>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded animate-pulse"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFeatureShowcase;
