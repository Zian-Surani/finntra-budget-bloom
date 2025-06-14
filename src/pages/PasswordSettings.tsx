
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Key, ArrowLeft, Shield, Eye, EyeOff, Smartphone, Mail, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/sonner';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordData {
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [resetPasswordStep, setResetPasswordStep] = useState<'email' | 'code' | 'password'>('email');
  const [showResetDialog, setShowResetDialog] = useState(false);

  const form = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const resetForm = useForm<ResetPasswordData>({
    defaultValues: {
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const onSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (data.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Password updated:', data);
      toast.success('Password updated successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    if (resetPasswordStep === 'email') {
      setIsLoading(true);
      try {
        // Simulate sending verification code
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Sending verification code to:', data.email);
        toast.success('Verification code sent to your email!');
        setResetPasswordStep('code');
      } catch (error) {
        toast.error('Failed to send verification code');
      } finally {
        setIsLoading(false);
      }
    } else if (resetPasswordStep === 'code') {
      if (data.verificationCode.length !== 6) {
        toast.error('Please enter the 6-digit verification code');
        return;
      }
      // Simulate code verification
      console.log('Verifying code:', data.verificationCode);
      toast.success('Code verified successfully!');
      setResetPasswordStep('password');
    } else if (resetPasswordStep === 'password') {
      if (data.newPassword !== data.confirmNewPassword) {
        toast.error('Passwords do not match');
        return;
      }
      setIsLoading(true);
      try {
        // Simulate password reset
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Password reset for:', data.email);
        toast.success('Password reset successfully!');
        setShowResetDialog(false);
        setResetPasswordStep('email');
        resetForm.reset();
      } catch (error) {
        toast.error('Failed to reset password');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const enable2FA = async () => {
    setIsLoading(true);
    try {
      // Simulate 2FA setup
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTwoFactorEnabled(true);
      setShow2FASetup(false);
      toast.success('Two-factor authentication enabled successfully!');
    } catch (error) {
      toast.error('Failed to enable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const disable2FA = async () => {
    setIsLoading(true);
    try {
      // Simulate 2FA disable
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTwoFactorEnabled(false);
      toast.success('Two-factor authentication disabled');
    } catch (error) {
      toast.error('Failed to disable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Key className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Password Settings</h1>
          </div>
          <Button onClick={() => window.location.href = '/settings'} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password for security</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPasswords.current ? "text" : "password"}
                              {...field}
                              placeholder="Enter your current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => togglePasswordVisibility('current')}
                            >
                              {showPasswords.current ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPasswords.new ? "text" : "password"}
                              {...field}
                              placeholder="Enter your new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => togglePasswordVisibility('new')}
                            >
                              {showPasswords.new ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPasswords.confirm ? "text" : "password"}
                              {...field}
                              placeholder="Confirm your new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => togglePasswordVisibility('confirm')}
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" disabled={isLoading} className="flex-1">
                      {isLoading ? 'Updating Password...' : 'Update Password'}
                    </Button>
                    <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" type="button">
                          Try Another Way
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Reset Password via Email</DialogTitle>
                          <DialogDescription>
                            {resetPasswordStep === 'email' && "Enter your email to receive a verification code"}
                            {resetPasswordStep === 'code' && "Enter the 6-digit code sent to your email"}
                            {resetPasswordStep === 'password' && "Create your new password"}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...resetForm}>
                          <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                            {resetPasswordStep === 'email' && (
                              <FormField
                                control={resetForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            
                            {resetPasswordStep === 'code' && (
                              <FormField
                                control={resetForm.control}
                                name="verificationCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                      <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                          <InputOTPSlot index={0} />
                                          <InputOTPSlot index={1} />
                                          <InputOTPSlot index={2} />
                                          <InputOTPSlot index={3} />
                                          <InputOTPSlot index={4} />
                                          <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                      </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            
                            {resetPasswordStep === 'password' && (
                              <>
                                <FormField
                                  control={resetForm.control}
                                  name="newPassword"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>New Password</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="password"
                                          placeholder="Enter new password"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={resetForm.control}
                                  name="confirmNewPassword"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Confirm New Password</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="password"
                                          placeholder="Confirm new password"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </>
                            )}
                            
                            <Button type="submit" disabled={isLoading} className="w-full">
                              {isLoading ? 'Processing...' : 
                               resetPasswordStep === 'email' ? 'Send Code' :
                               resetPasswordStep === 'code' ? 'Verify Code' : 'Reset Password'}
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!twoFactorEnabled ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Two-factor authentication is not enabled. Enable it to secure your account with an additional verification step.
                  </p>
                  <Dialog open={show2FASetup} onOpenChange={setShow2FASetup}>
                    <DialogTrigger asChild>
                      <Button>Enable Two-Factor Authentication</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
                        <DialogDescription>
                          Scan the QR code with your authenticator app or enter the setup key manually.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <p className="text-sm text-gray-500">QR Code Placeholder</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Setup Key</Label>
                          <Input value="ABCD EFGH IJKL MNOP" readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Enter verification code from your app</Label>
                          <InputOTP maxLength={6}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        <Button onClick={enable2FA} disabled={isLoading} className="w-full">
                          {isLoading ? 'Enabling...' : 'Enable 2FA'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Two-factor authentication is enabled</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your account is protected with two-factor authentication.
                  </p>
                  <Button onClick={disable2FA} disabled={isLoading} variant="destructive">
                    {isLoading ? 'Disabling...' : 'Disable Two-Factor Authentication'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Security Options */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Security</CardTitle>
              <CardDescription>Extra security options for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Email Notifications
              </Button>
              <Button variant="outline" className="w-full">
                View Active Sessions
              </Button>
              <Button variant="outline" className="w-full">
                Download Recovery Codes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PasswordSettings;
