
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  occupation?: string;
  monthly_income?: number;
}

interface BankData {
  id?: string;
  name: string;
  type: string;
  balance: number;
  account_number?: string;
  routing_number?: string;
}

interface SavingsData {
  id?: string;
  goal_name: string;
  current_amount: number;
  target_amount: number;
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
  banks: BankData[];
  savingsGoals: SavingsData[];
  transactions: Transaction[];
  currency: string;
  loading: boolean;
}

interface AppContextType {
  state: AppState;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  addBank: (data: Omit<BankData, 'id'>) => Promise<void>;
  updateBank: (id: string, data: Partial<BankData>) => Promise<void>;
  deleteBank: (id: string) => Promise<void>;
  addSavingsGoal: (data: Omit<SavingsData, 'id'>) => Promise<void>;
  updateSavingsGoal: (id: string, data: Partial<SavingsData>) => Promise<void>;
  deleteSavingsGoal: (id: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setCurrency: (currency: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  userData: { name: '', email: '' },
  banks: [],
  savingsGoals: [],
  transactions: [],
  currency: 'USD',
  loading: true
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, session } = useAuth();
  const [state, setState] = useState<AppState>(initialState);

  // Load data from Supabase when user is authenticated
  useEffect(() => {
    if (user && session) {
      loadUserData();
      setupRealtimeSubscriptions();
    } else {
      setState(initialState);
    }
  }, [user, session]);

  const loadUserData = async () => {
    if (!user) return;
    
    setState(prev => ({ ...prev, loading: true }));

    try {
      // Load profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Load banks
      const { data: banks } = await supabase
        .from('banks')
        .select('*')
        .eq('user_id', user.id);

      // Load savings goals
      const { data: savingsGoals } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('user_id', user.id);

      // Load transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Load user settings
      const { data: settings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setState(prev => ({
        ...prev,
        userData: {
          name: profile?.name || '',
          email: profile?.email || '',
          phone: profile?.phone || '',
          address: profile?.address || '',
          occupation: profile?.occupation || '',
          monthly_income: profile?.monthly_income || 0
        },
        banks: banks || [],
        savingsGoals: savingsGoals || [],
        transactions: transactions || [],
        currency: settings?.currency || 'USD',
        loading: false
      }));
    } catch (error) {
      console.error('Error loading user data:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return;

    // Subscribe to all table changes for the current user
    const subscription = supabase
      .channel('user-data-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${user.id}`
        }, 
        () => loadUserData()
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'banks',
          filter: `user_id=eq.${user.id}`
        }, 
        () => loadUserData()
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'savings_goals',
          filter: `user_id=eq.${user.id}`
        }, 
        () => loadUserData()
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'transactions',
          filter: `user_id=eq.${user.id}`
        }, 
        () => loadUserData()
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_settings',
          filter: `user_id=eq.${user.id}`
        }, 
        () => loadUserData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const addBank = async (data: Omit<BankData, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('banks')
      .insert([{ ...data, user_id: user.id }]);

    if (error) {
      console.error('Error adding bank:', error);
      throw error;
    }
  };

  const updateBank = async (id: string, data: Partial<BankData>) => {
    if (!user) return;

    const { error } = await supabase
      .from('banks')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating bank:', error);
      throw error;
    }
  };

  const deleteBank = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('banks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting bank:', error);
      throw error;
    }
  };

  const addSavingsGoal = async (data: Omit<SavingsData, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('savings_goals')
      .insert([{ ...data, user_id: user.id }]);

    if (error) {
      console.error('Error adding savings goal:', error);
      throw error;
    }
  };

  const updateSavingsGoal = async (id: string, data: Partial<SavingsData>) => {
    if (!user) return;

    const { error } = await supabase
      .from('savings_goals')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating savings goal:', error);
      throw error;
    }
  };

  const deleteSavingsGoal = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('savings_goals')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting savings goal:', error);
      throw error;
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('transactions')
      .insert([{ ...transaction, user_id: user.id }]);

    if (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (!user) return;

    const { error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  const setCurrency = async (currency: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_settings')
      .upsert([{ user_id: user.id, currency }]);

    if (error) {
      console.error('Error updating currency:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    await loadUserData();
  };

  return (
    <AppContext.Provider value={{
      state,
      updateUserData,
      addBank,
      updateBank,
      deleteBank,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
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
