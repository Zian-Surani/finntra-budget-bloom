
import { useState, useEffect } from 'react';

const exchangeRates: Record<string, number> = {
  'USD': 1,
  'INR': 83.25,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50
};

export const useCurrencyConverter = (baseCurrency: string = 'USD') => {
  const [rates, setRates] = useState(exchangeRates);

  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[toCurrency];
  };

  const formatCurrency = (amount: number, currency: string): string => {
    const symbols = {
      'USD': '$',
      'INR': '₹',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥'
    };
    
    return `${symbols[currency as keyof typeof symbols]}${amount.toLocaleString()}`;
  };

  // Simulate real-time updates (in a real app, you'd fetch from an API)
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => ({
        ...prev,
        INR: prev.INR + (Math.random() - 0.5) * 0.1,
        EUR: prev.EUR + (Math.random() - 0.5) * 0.001,
        GBP: prev.GBP + (Math.random() - 0.5) * 0.001,
        JPY: prev.JPY + (Math.random() - 0.5) * 0.1
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { convertAmount, formatCurrency, rates };
};
