
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Settings as SettingsIcon, Cpu, MemoryStick, HardDrive, Home, User, Shield, Bell, Key, Palette, Globe } from 'lucide-react';

const Settings = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [storageUsage, setStorageUsage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 100));
      setMemoryUsage(Math.floor(Math.random() * 100));
      setStorageUsage(Math.floor(Math.random() * 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const settingsMenuItems = [
    {
      title: "Profile Settings",
      description: "Update your personal information and avatar",
      icon: User,
      href: "/profile-settings",
      color: "text-blue-600"
    },
    {
      title: "Change Password",
      description: "Update your password and security settings",
      icon: Key,
      href: "/password-settings",
      color: "text-green-600"
    },
    {
      title: "Privacy Settings",
      description: "Control your privacy and data sharing preferences",
      icon: Shield,
      href: "/privacy-settings",
      color: "text-purple-600"
    },
    {
      title: "Notification Settings",
      description: "Manage your notification preferences",
      icon: Bell,
      href: "/notification-settings",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Settings Menu Items */}
          {settingsMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = item.href}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                      <IconComponent className={`h-5 w-5 ${item.color}`} />
                    </div>
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Open Settings
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                System Performance
              </CardTitle>
              <CardDescription>Real-time system monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-gray-500">{cpuUsage}%</span>
                </div>
                <Progress value={cpuUsage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-gray-500">{memoryUsage}%</span>
                </div>
                <Progress value={memoryUsage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-gray-500">{storageUsage}%</span>
                </div>
                <Progress value={storageUsage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Info</CardTitle>
              <CardDescription>Version and system information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">App Version</span>
                <span className="text-sm text-gray-500">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-gray-500">Jan 15, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-green-500">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Backup Status</span>
                <span className="text-sm text-green-500">Up to date</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
