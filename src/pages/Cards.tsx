
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, Plus, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CardData {
  id: string;
  name: string;
  last4: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  expiryDate: string;
  balance: number;
  limit: number;
}

const Cards = () => {
  const [cards, setCards] = useState<CardData[]>([
    {
      id: '1',
      name: 'Primary Visa',
      last4: '4231',
      type: 'visa',
      expiryDate: '12/26',
      balance: 1250.50,
      limit: 5000
    },
    {
      id: '2',
      name: 'Cashback Mastercard',
      last4: '8901',
      type: 'mastercard',
      expiryDate: '08/25',
      balance: 750.00,
      limit: 3000
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [showCardNumbers, setShowCardNumbers] = useState<{[key: string]: boolean}>({});
  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    expiryDate: '',
    cvv: '',
    limit: ''
  });

  const toggleCardVisibility = (cardId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const addCard = () => {
    if (!newCard.name || !newCard.number || !newCard.expiryDate || !newCard.limit) {
      toast.error('Please fill in all fields');
      return;
    }

    const cardType = newCard.number.startsWith('4') ? 'visa' : 
                    newCard.number.startsWith('5') ? 'mastercard' :
                    newCard.number.startsWith('3') ? 'amex' : 'discover';

    const card: CardData = {
      id: Date.now().toString(),
      name: newCard.name,
      last4: newCard.number.slice(-4),
      type: cardType,
      expiryDate: newCard.expiryDate,
      balance: 0,
      limit: parseFloat(newCard.limit)
    };

    setCards(prev => [...prev, card]);
    setNewCard({ name: '', number: '', expiryDate: '', cvv: '', limit: '' });
    setShowAddCard(false);
    toast.success('Card added successfully!');
  };

  const removeCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    toast.success('Card removed successfully!');
  };

  const getCardIcon = (type: string) => {
    const className = "h-6 w-6";
    switch (type) {
      case 'visa':
        return <div className={`${className} bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold`}>V</div>;
      case 'mastercard':
        return <div className={`${className} bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold`}>MC</div>;
      case 'amex':
        return <div className={`${className} bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold`}>AE</div>;
      default:
        return <CreditCard className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Cards</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Card</DialogTitle>
                  <DialogDescription>
                    Add a new credit or debit card to your account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Name</Label>
                    <Input
                      placeholder="e.g., Primary Visa"
                      value={newCard.name}
                      onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value.replace(/\s/g, '') }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={newCard.expiryDate}
                        onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input
                        placeholder="123"
                        value={newCard.cvv}
                        onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Credit Limit</Label>
                    <Input
                      placeholder="5000"
                      type="number"
                      value={newCard.limit}
                      onChange={(e) => setNewCard(prev => ({ ...prev, limit: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addCard} className="w-full">
                    Add Card
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCardIcon(card.type)}
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCard(card.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Card Number</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCardVisibility(card.id)}
                    >
                      {showCardNumbers[card.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="font-mono text-lg">
                    {showCardNumbers[card.id] 
                      ? `**** **** **** ${card.last4}`
                      : `•••• •••• •••• ${card.last4}`
                    }
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Expires</p>
                    <p className="font-medium">{card.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                    <p className="font-medium capitalize">{card.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Balance</span>
                    <span className="font-medium">${card.balance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Limit</span>
                    <span className="font-medium">${card.limit.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(card.balance / card.limit) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {((card.balance / card.limit) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
