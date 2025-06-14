
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, ArrowLeft, Eye, Lock, Database, Bell } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    dataCollection: false,
    marketingEmails: true,
    analyticsTracking: false,
    thirdPartySharing: false,
    twoFactorAuth: false,
    sessionTimeout: true,
    dataExport: true
  });

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success('Privacy setting updated');
  };

  const exportData = () => {
    // Simulate data export
    toast.success('Data export initiated. You will receive an email with your data shortly.');
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated. Please check your email for confirmation.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Settings</h1>
          </div>
          <Button onClick={() => window.location.href = '/settings'} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Privacy Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visibility & Sharing
            </CardTitle>
            <CardDescription>Control how your information is shared and displayed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Make your profile visible to other users</p>
              </div>
              <Switch
                checked={settings.profileVisibility}
                onCheckedChange={() => handleSettingChange('profileVisibility')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Third-party Data Sharing</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow sharing data with trusted partners</p>
              </div>
              <Switch
                checked={settings.thirdPartySharing}
                onCheckedChange={() => handleSettingChange('thirdPartySharing')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={() => handleSettingChange('twoFactorAuth')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Session Timeout</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatically log out after inactivity</p>
              </div>
              <Switch
                checked={settings.sessionTimeout}
                onCheckedChange={() => handleSettingChange('sessionTimeout')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Collection
            </CardTitle>
            <CardDescription>Control what data we collect and how it's used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help us improve by sharing anonymous usage data</p>
              </div>
              <Switch
                checked={settings.analyticsTracking}
                onCheckedChange={() => handleSettingChange('analyticsTracking')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive emails about new features and updates</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={() => handleSettingChange('marketingEmails')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export or delete your account data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={exportData} variant="outline" className="w-full">
              Export My Data
            </Button>
            <Button onClick={deleteAccount} variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacySettings;
