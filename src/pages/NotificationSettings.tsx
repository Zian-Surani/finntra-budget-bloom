
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, ArrowLeft, Mail, Smartphone, Monitor } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { emailService } from '@/services/emailService';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    budgetAlerts: true,
    monthlyReports: true,
    securityAlerts: true,
    marketingEmails: false,
    frequency: 'daily'
  });

  const [notificationPermission, setNotificationPermission] = useState<string>('default');

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleSettingChange = async (key: keyof typeof settings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // If enabling push notifications, request permission
    if (key === 'pushNotifications' && value === true) {
      const hasPermission = await emailService.requestNotificationPermission();
      if (hasPermission) {
        setNotificationPermission('granted');
        toast.success('Push notifications enabled successfully!');
        
        // Send a test notification
        emailService.sendNotification({
          to: 'user@example.com',
          subject: 'Notifications Enabled',
          message: 'You will now receive push notifications from FinnTra',
          type: 'general'
        });
      } else {
        setSettings(prev => ({ ...prev, pushNotifications: false }));
        toast.error('Push notification permission denied');
      }
    } else {
      toast.success('Notification setting updated');
    }

    // Send email notification about settings change if email notifications are enabled
    if (settings.emailNotifications && key !== 'emailNotifications') {
      emailService.sendNotification({
        to: 'user@example.com',
        subject: 'Notification Settings Updated',
        message: `Your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} setting has been updated.`,
        type: 'general'
      });
    }
  };

  const testNotifications = async () => {
    toast.promise(
      Promise.all([
        emailService.sendSecurityAlert('user@example.com', 'This is a test security alert'),
        emailService.sendTransactionAlert('user@example.com', 25.99, 'Coffee Shop'),
        emailService.sendBudgetAlert('user@example.com', 'Dining', 85)
      ]),
      {
        loading: 'Sending test notifications...',
        success: 'Test notifications sent successfully!',
        error: 'Failed to send test notifications'
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notification Settings</h1>
          </div>
          <Button onClick={() => window.location.href = '/settings'} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Test Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Test Notifications</CardTitle>
            <CardDescription>Send test notifications to verify your settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={testNotifications} className="w-full">
              Send Test Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Delivery Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5 text-green-600" />
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive browser push notifications
                    {notificationPermission === 'denied' && (
                      <span className="text-red-500 block">Permission denied - check browser settings</span>
                    )}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                disabled={notificationPermission === 'denied'}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-purple-600" />
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via text message</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Alerts</CardTitle>
            <CardDescription>Get notified about important financial events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Transaction Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new transactions</p>
              </div>
              <Switch
                checked={settings.transactionAlerts}
                onCheckedChange={(checked) => handleSettingChange('transactionAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Budget Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when approaching budget limits</p>
              </div>
              <Switch
                checked={settings.budgetAlerts}
                onCheckedChange={(checked) => handleSettingChange('budgetAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Monthly Reports</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive monthly financial summaries</p>
              </div>
              <Switch
                checked={settings.monthlyReports}
                onCheckedChange={(checked) => handleSettingChange('monthlyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & System */}
        <Card>
          <CardHeader>
            <CardTitle>Security & System</CardTitle>
            <CardDescription>Important security and system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of security events (always enabled)</p>
              </div>
              <Switch
                checked={settings.securityAlerts}
                disabled
                onCheckedChange={(checked) => handleSettingChange('securityAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive product updates and promotional content</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Frequency</CardTitle>
            <CardDescription>Control how often you receive digest notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Email Digest Frequency</Label>
              <Select value={settings.frequency} onValueChange={(value) => handleSettingChange('frequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationSettings;
