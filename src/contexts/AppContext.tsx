
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BankData {
  name: string;
  type: string;
  balance: string;
  accountNumber?: string;
  routingNumber?: string;
}

interface SavingsData {
  amount: string;
  goal: string;
  target: string;
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  occupation?: string;
  income?: string;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface AppState {
  userData: UserData;
  bankData: BankData;
  savingsData: SavingsData;
  transactions: Transaction[];
  totalBalance: number;
  currency: string;
}

interface AppContextType {
  state: AppState;
  updateUserData: (data: Partial<UserData>) => void;
  updateBankData: (data: Partial<BankData>) => void;
  updateSavingsData: (data: Partial<SavingsData>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setCurrency: (currency: string) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  userData: { name: '', email: '' },
  bankData: { name: '', type: '', balance: '0' },
  savingsData: { amount: '0', goal: '', target: '0' },
  transactions: [],
  totalBalance: 0,
  currency: 'USD'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  // Load data from localStorage on initialization
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    const savedBankData = localStorage.getItem('userBankData');
    const savedSavingsData = localStorage.getItem('userSavingsData');
    const savedTransactions = localStorage.getItem('transactions');
    const savedCurrency = localStorage.getItem('selectedCurrency');

    setState(prev => ({
      ...prev,
      userData: savedUserData ? JSON.parse(savedUserData) : prev.userData,
      bankData: savedBankData ? JSON.parse(savedBankData) : prev.bankData,
      savingsData: savedSavingsData ? JSON.parse(savedSavingsData) : prev.savingsData,
      transactions: savedTransactions ? JSON.parse(savedTransactions) : prev.transactions,
      currency: savedCurrency || prev.currency
    }));
  }, []);

  // Save to localStorage and broadcast changes
  const broadcastChange = (newState: AppState) => {
    localStorage.setItem('userData', JSON.stringify(newState.userData));
    localStorage.setItem('userBankData', JSON.stringify(newState.bankData));
    localStorage.setItem('userSavingsData', JSON.stringify(newState.savingsData));
    localStorage.setItem('transactions', JSON.stringify(newState.transactions));
    localStorage.setItem('selectedCurrency', newState.currency);
    
    // Broadcast to other tabs/windows
    window.postMessage({ type: 'APP_STATE_UPDATE', data: newState }, '*');
  };

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'APP_STATE_UPDATE') {
        setState(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateUserData = (data: Partial<UserData>) => {
    setState(prev => {
      const newState = {
        ...prev,
        userData: { ...prev.userData, ...data }
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const updateBankData = (data: Partial<BankData>) => {
    setState(prev => {
      const newState = {
        ...prev,
        bankData: { ...prev.bankData, ...data },
        totalBalance: data.balance ? parseFloat(data.balance) : prev.totalBalance
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const updateSavingsData = (data: Partial<SavingsData>) => {
    setState(prev => {
      const newState = {
        ...prev,
        savingsData: { ...prev.savingsData, ...data }
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setState(prev => {
      const newTransaction = {
        ...transaction,
        id: Date.now().toString()
      };
      const newState = {
        ...prev,
        transactions: [newTransaction, ...prev.transactions]
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setState(prev => {
      const newState = {
        ...prev,
        transactions: prev.transactions.map(t => 
          t.id === id ? { ...t, ...updates } : t
        )
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const deleteTransaction = (id: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        transactions: prev.transactions.filter(t => t.id !== id)
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const setCurrency = (currency: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        currency
      };
      broadcastChange(newState);
      return newState;
    });
  };

  const refreshData = () => {
    // Force refresh from localStorage
    const savedUserData = localStorage.getItem('userData');
    const savedBankData = localStorage.getItem('userBankData');
    const savedSavingsData = localStorage.getItem('userSavingsData');
    const savedTransactions = localStorage.getItem('transactions');
    const savedCurrency = localStorage.getItem('selectedCurrency');

    setState({
      userData: savedUserData ? JSON.parse(savedUserData) : initialState.userData,
      bankData: savedBankData ? JSON.parse(savedBankData) : initialState.bankData,
      savingsData: savedSavingsData ? JSON.parse(savedSavingsData) : initialState.savingsData,
      transactions: savedTransactions ? JSON.parse(savedTransactions) : initialState.transactions,
      totalBalance: savedBankData ? parseFloat(JSON.parse(savedBankData).balance || '0') : 0,
      currency: savedCurrency || initialState.currency
    });
  };

  return (
    <AppContext.Provider value={{
      state,
      updateUserData,
      updateBankData,
      updateSavingsData,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setCurrency,
      refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
