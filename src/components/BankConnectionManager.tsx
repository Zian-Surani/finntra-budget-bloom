
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, CheckCircle, AlertCircle, Plus, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  lastFour: string;
  balance: number;
  isConnected: boolean;
  lastSync: string;
}

const BankConnectionManager = () => {
  const [searchBank, setSearchBank] = useState('');
  const [connectedAccounts, setConnectedAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'Chase Bank',
      accountType: 'Checking',
      lastFour: '1234',
      balance: 2543.67,
      isConnected: true,
      lastSync: '2024-01-15 10:30 AM'
    },
    {
      id: '2',
      bankName: 'Wells Fargo',
      accountType: 'Savings',
      lastFour: '5678',
      balance: 15678.90,
      isConnected: true,
      lastSync: '2024-01-15 09:45 AM'
    }
  ]);
  const { toast } = useToast();

  const popularBanks = [
    'Chase Bank', 'Bank of America', 'Wells Fargo', 'Citibank', 'U.S. Bank',
    'PNC Bank', 'Capital One', 'TD Bank', 'BB&T', 'SunTrust',
    'American Express', 'Discover Bank', 'Ally Bank', 'Charles Schwab'
  ];

  const filteredBanks = popularBanks.filter(bank =>
    bank.toLowerCase().includes(searchBank.toLowerCase())
  );

  const handleBankSelect = (bankName: string) => {
    // Simulate bank connection process
    toast({
      title: "Connecting to Bank",
      description: `Redirecting to ${bankName} secure login...`,
    });
    
    // Simulate adding a new account after connection
    setTimeout(() => {
      const newAccount: BankAccount = {
        id: Date.now().toString(),
        bankName,
        accountType: 'Checking',
        lastFour: Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
        balance: Math.random() * 10000,
        isConnected: true,
        lastSync: new Date().toLocaleString()
      };
      
      setConnectedAccounts(prev => [...prev, newAccount]);
      
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${bankName}`,
      });
    }, 2000);
  };

  const handleSync = (accountId: string) => {
    setConnectedAccounts(prev =>
      prev.map(account =>
        account.id === accountId
          ? { ...account, lastSync: new Date().toLocaleString() }
          : account
      )
    );
    
    toast({
      title: "Sync Complete",
      description: "Account data has been updated",
    });
  };

  const handleDisconnect = (accountId: string) => {
    setConnectedAccounts(prev =>
      prev.filter(account => account.id !== accountId)
    );
    
    toast({
      title: "Account Disconnected",
      description: "Bank account has been removed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Bank-Level Security
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                We use 256-bit encryption and read-only access to protect your data. 
                We never store your banking credentials and all connections are secured through our trusted partners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      {connectedAccounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              Your linked bank accounts and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">{account.bankName}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {account.accountType} ••••{account.lastFour}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last sync: {account.lastSync}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold">${account.balance.toFixed(2)}</p>
                      <Badge variant="default" className="text-xs">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSync(account.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDisconnect(account.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Bank Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Connect New Bank
          </CardTitle>
          <CardDescription>
            Search and connect to your bank from over 12,000 supported institutions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search for your bank..."
            value={searchBank}
            onChange={(e) => setSearchBank(e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {filteredBanks.map((bank) => (
              <Button
                key={bank}
                variant="outline"
                onClick={() => handleBankSelect(bank)}
                className="justify-start p-4 h-auto hover:scale-105 transition-transform"
              >
                <Building2 className="h-5 w-5 mr-3 text-blue-500" />
                <span>{bank}</span>
              </Button>
            ))}
          </div>
          
          {filteredBanks.length === 0 && searchBank && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No banks found matching "{searchBank}"</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BankConnectionManager;
