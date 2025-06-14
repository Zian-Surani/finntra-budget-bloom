
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, Plus, Trash2, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface AccountData {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'retirement';
  balance: number;
  accountNumber: string;
  bankName: string;
  interestRate?: number;
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountData[]>([
    {
      id: '1',
      name: 'Primary Checking',
      type: 'checking',
      balance: 5247.83,
      accountNumber: '****1234',
      bankName: 'Chase Bank',
      interestRate: 0.01
    },
    {
      id: '2',
      name: 'Emergency Savings',
      type: 'savings',
      balance: 15000.00,
      accountNumber: '****5678',
      bankName: 'Wells Fargo',
      interestRate: 4.5
    },
    {
      id: '3',
      name: 'Investment Portfolio',
      type: 'investment',
      balance: 45250.75,
      accountNumber: '****9012',
      bankName: 'Fidelity',
      interestRate: 8.2
    },
    {
      id: '4',
      name: '401(k) Retirement',
      type: 'retirement',
      balance: 125000.00,
      accountNumber: '****3456',
      bankName: 'Vanguard',
      interestRate: 7.8
    }
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: '',
    balance: '',
    accountNumber: '',
    bankName: '',
    interestRate: ''
  });

  const addAccount = () => {
    if (!newAccount.name || !newAccount.type || !newAccount.balance || !newAccount.bankName) {
      toast.error('Please fill in all required fields');
      return;
    }

    const account: AccountData = {
      id: Date.now().toString(),
      name: newAccount.name,
      type: newAccount.type as AccountData['type'],
      balance: parseFloat(newAccount.balance),
      accountNumber: `****${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
      bankName: newAccount.bankName,
      interestRate: newAccount.interestRate ? parseFloat(newAccount.interestRate) : undefined
    };

    setAccounts(prev => [...prev, account]);
    setNewAccount({ name: '', type: '', balance: '', accountNumber: '', bankName: '', interestRate: '' });
    setShowAddAccount(false);
    toast.success('Account added successfully!');
  };

  const removeAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
    toast.success('Account removed successfully!');
  };

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return '💳';
      case 'savings':
        return '🏦';
      case 'investment':
        return '📈';
      case 'retirement':
        return '🏆';
      default:
        return '💰';
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'savings':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'investment':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'retirement':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Accounts</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Account</DialogTitle>
                  <DialogDescription>
                    Add a new bank account to track your finances
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account Name</Label>
                    <Input
                      placeholder="e.g., Primary Checking"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select value={newAccount.type} onValueChange={(value) => setNewAccount(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="retirement">Retirement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input
                      placeholder="e.g., Chase Bank"
                      value={newAccount.bankName}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, bankName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Balance</Label>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={newAccount.balance}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, balance: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Interest Rate (Optional)</Label>
                    <Input
                      placeholder="e.g., 4.5"
                      type="number"
                      step="0.1"
                      value={newAccount.interestRate}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, interestRate: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addAccount} className="w-full">
                    Add Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Total Balance Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Total Net Worth</CardTitle>
            <CardDescription>Combined balance across all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              +2.5% from last month
            </div>
          </CardContent>
        </Card>

        {/* Accounts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getAccountTypeColor(account.type)}`}>
                      <span className="text-lg">{getAccountTypeIcon(account.type)}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription className="capitalize">{account.type} Account</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAccount(account.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bank</p>
                    <p className="font-medium">{account.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Account</p>
                    <p className="font-medium font-mono">{account.accountNumber}</p>
                  </div>
                </div>
                
                {account.interestRate && (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="text-sm text-green-800 dark:text-green-200">Interest Rate</p>
                      <p className="font-bold text-green-600">{account.interestRate}% APY</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                )}
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    View Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Account Type Summary */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {['checking', 'savings', 'investment', 'retirement'].map((type) => {
            const typeAccounts = accounts.filter(acc => acc.type === type);
            const typeBalance = typeAccounts.reduce((sum, acc) => sum + acc.balance, 0);
            
            return (
              <Card key={type}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getAccountTypeIcon(type)}</span>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{type}</p>
                      <p className="font-bold">${typeBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
