import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';

// More accurate and comprehensive exchange rates (will be updated dynamically)
const initialExchangeRates: Record<string, number> = {
  'USD': 1,           // Base currency
  'EUR': 0.85,        // Euro
  'GBP': 0.73,        // British Pound
  'JPY': 110.25,      // Japanese Yen
  'CAD': 1.25,        // Canadian Dollar
  'AUD': 1.35,        // Australian Dollar
  'CHF': 0.88,        // Swiss Franc
  'CNY': 6.45,        // Chinese Yuan
  'INR': 74.85,       // Indian Rupee
  'SEK': 8.65,        // Swedish Krona
  'NOK': 8.95,        // Norwegian Krone
  'DKK': 6.35,        // Danish Krone
  'NZD': 1.42,        // New Zealand Dollar
  'SGD': 1.35,        // Singapore Dollar
  'HKD': 7.75,        // Hong Kong Dollar
  'KRW': 1180.50,     // South Korean Won
  'MXN': 17.25,       // Mexican Peso
  'BRL': 5.15,        // Brazilian Real
  'ZAR': 14.75,       // South African Rand
  'RUB': 73.25        // Russian Ruble
};

export const useCurrencyConverter = () => {
  const { state, setCurrency } = useAppContext();
  const [rates, setRates] = useState(initialExchangeRates);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch real-time exchange rates
  const fetchExchangeRates = useCallback(async () => {
    try {
      // Using a free API for exchange rates - you can replace with a paid service for production
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      if (data.rates) {
        const updatedRates = {
          'USD': 1,
          'EUR': data.rates.EUR || 0.85,
          'GBP': data.rates.GBP || 0.73,
          'JPY': data.rates.JPY || 110.25,
          'CAD': data.rates.CAD || 1.25,
          'AUD': data.rates.AUD || 1.35,
          'CHF': data.rates.CHF || 0.88,
          'CNY': data.rates.CNY || 6.45,
          'INR': data.rates.INR || 74.85,
          'SEK': data.rates.SEK || 8.65,
          'NOK': data.rates.NOK || 8.95,
          'DKK': data.rates.DKK || 6.35,
          'NZD': data.rates.NZD || 1.42,
          'SGD': data.rates.SGD || 1.35,
          'HKD': data.rates.HKD || 7.75,
          'KRW': data.rates.KRW || 1180.50,
          'MXN': data.rates.MXN || 17.25,
          'BRL': data.rates.BRL || 5.15,
          'ZAR': data.rates.ZAR || 14.75,
          'RUB': data.rates.RUB || 73.25
        };
        
        setRates(updatedRates);
        setLastUpdated(new Date());
        console.log('Exchange rates updated successfully');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Keep using cached rates if API fails
    }
  }, []);

  // Update rates on component mount and then every hour
  useEffect(() => {
    fetchExchangeRates();
    
    const interval = setInterval(() => {
      fetchExchangeRates();
    }, 3600000); // Update every hour

    return () => clearInterval(interval);
  }, [fetchExchangeRates]);

  const convertAmount = useCallback((amount: number, fromCurrency: string = 'USD', toCurrency: string = state.currency): number => {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[toCurrency];
  }, [rates, state.currency]);

  const formatCurrency = useCallback((amount: number, currency: string = state.currency): string => {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CAD': 'C$',
      'AUD': 'A$',
      'CHF': 'CHF',
      'CNY': '¥',
      'INR': '₹',
      'SEK': 'kr',
      'NOK': 'kr',
      'DKK': 'kr',
      'NZD': 'NZ$',
      'SGD': 'S$',
      'HKD': 'HK$',
      'KRW': '₩',
      'MXN': '$',
      'BRL': 'R$',
      'ZAR': 'R',
      'RUB': '₽'
    };
    
    const convertedAmount = convertAmount(amount, 'USD', currency);
    const decimals = ['JPY', 'KRW'].includes(currency) ? 0 : 2;
    
    const formattedNumber = convertedAmount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
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

  return { 
    convertAmount, 
    formatCurrency, 
    rates, 
    selectedCurrency: state.currency, 
    setSelectedCurrency,
    lastUpdated,
    refreshRates: fetchExchangeRates
  };
};
