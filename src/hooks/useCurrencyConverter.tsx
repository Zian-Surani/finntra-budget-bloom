
import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';

const exchangeRates: Record<string, number> = {
  'USD': 1,
  'INR': 83.25,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50,
  'CAD': 1.35,
  'AUD': 1.52
};

export const useCurrencyConverter = () => {
  const { state, setCurrency } = useAppContext();
  const [rates, setRates] = useState(exchangeRates);

  const convertAmount = useCallback((amount: number, fromCurrency: string = 'USD', toCurrency: string = state.currency): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[toCurrency];
  }, [rates, state.currency]);

  const formatCurrency = useCallback((amount: number, currency: string = state.currency): string => {
    const symbols = {
      'USD': '$',
      'INR': '₹',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CAD': 'C$',
      'AUD': 'A$'
    };
    
    const convertedAmount = convertAmount(amount, 'USD', currency);
    const formattedNumber = convertedAmount.toLocaleString('en-US', {
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2
    });
    
    return `${symbols[currency as keyof typeof symbols] || currency}${formattedNumber}`;
  }, [convertAmount, state.currency]);

  const setSelectedCurrency = async (currency: string) => {
    try {
      await setCurrency(currency);
    } catch (error) {
      console.error('Error setting currency:', error);
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => ({
        ...prev,
        INR: prev.INR + (Math.random() - 0.5) * 0.1,
        EUR: prev.EUR + (Math.random() - 0.5) * 0.001,
        GBP: prev.GBP + (Math.random() - 0.5) * 0.001,
        JPY: prev.JPY + (Math.random() - 0.5) * 0.1,
        CAD: prev.CAD + (Math.random() - 0.5) * 0.01,
        AUD: prev.AUD + (Math.random() - 0.5) * 0.01
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return { 
    convertAmount, 
    formatCurrency, 
    rates, 
    selectedCurrency: state.currency, 
    setSelectedCurrency 
  };
};
