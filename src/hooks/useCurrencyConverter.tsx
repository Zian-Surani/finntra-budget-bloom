
import { useState, useEffect, useCallback } from 'react';

const exchangeRates: Record<string, number> = {
  'USD': 1,
  'INR': 83.25,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50
};

export const useCurrencyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [rates, setRates] = useState(exchangeRates);

  const convertAmount = useCallback((amount: number, fromCurrency: string = 'USD', toCurrency: string = selectedCurrency): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[toCurrency];
  }, [rates, selectedCurrency]);

  const formatCurrency = useCallback((amount: number, currency: string = selectedCurrency): string => {
    const symbols = {
      'USD': '$',
      'INR': '₹',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥'
    };
    
    const convertedAmount = convertAmount(amount, 'USD', currency);
    const formattedNumber = convertedAmount.toLocaleString('en-US', {
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2
    });
    
    return `${symbols[currency as keyof typeof symbols]}${formattedNumber}`;
  }, [convertAmount, selectedCurrency]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => ({
        ...prev,
        INR: prev.INR + (Math.random() - 0.5) * 0.1,
        EUR: prev.EUR + (Math.random() - 0.5) * 0.001,
        GBP: prev.GBP + (Math.random() - 0.5) * 0.001,
        JPY: prev.JPY + (Math.random() - 0.5) * 0.1
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return { 
    convertAmount, 
    formatCurrency, 
    rates, 
    selectedCurrency, 
    setSelectedCurrency 
  };
};
