
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
  profile_photo?: string;
  has_cards?: boolean;
  has_accounts?: boolean;
  is_onboarded?: boolean;
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
  isNewUser: boolean;
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
  uploadProfilePhoto: (file: File) => Promise<string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  userData: { name: '', email: '', has_cards: false, has_accounts: false, is_onboarded: false },
  banks: [],
  savingsGoals: [],
  transactions: [],
  currency: 'USD',
  loading: true,
  isNewUser: true
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, session } = useAuth();
  const [state, setState] = useState<AppState>(initialState);

  // Load data from Supabase when user is authenticated
  useEffect(() => {
    if (user && session) {
      loadUserData();
    } else {
      setState(initialState);
    }
  }, [user, session]);

  // Separate effect for realtime subscriptions to prevent multiple subscriptions
  useEffect(() => {
    let subscription: any = null;

    if (user && session) {
      // Setup realtime subscriptions with unique channel name
      const channelName = `user-data-changes-${user.id}-${Date.now()}`;
      subscription = supabase
        .channel(channelName)
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'profiles',
            filter: `id=eq.${user.id}`
          }, 
          () => {
            console.log('Profile change detected, reloading data');
            loadUserData();
          }
        )
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'banks',
            filter: `user_id=eq.${user.id}`
          }, 
          () => {
            console.log('Bank change detected, reloading data');
            loadUserData();
          }
        )
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'savings_goals',
            filter: `user_id=eq.${user.id}`
          }, 
          () => {
            console.log('Savings goal change detected, reloading data');
            loadUserData();
          }
        )
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'transactions',
            filter: `user_id=eq.${user.id}`
          }, 
          () => {
            console.log('Transaction change detected, reloading data');
            loadUserData();
          }
        )
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'user_settings',
            filter: `user_id=eq.${user.id}`
          }, 
          () => {
            console.log('User settings change detected, reloading data');
            loadUserData();
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription) {
        console.log('Cleaning up realtime subscription');
        supabase.removeChannel(subscription);
      }
    };
  }, [user?.id, session]);

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

      // Determine if user is new - check actual data rather than database flags
      const hasRealBanks = banks && banks.length > 0;
      const hasRealTransactions = transactions && transactions.length > 0;
      const hasValidProfile = profile?.name && profile.name.trim() !== '' && profile.name !== 'John Doe';
      
      const isNewUser = !hasValidProfile || (!hasRealBanks && !hasRealTransactions);

      setState(prev => ({
        ...prev,
        userData: {
          name: profile?.name || '',
          email: profile?.email || user.email || '',
          phone: profile?.phone || '',
          address: profile?.address || '',
          occupation: profile?.occupation || '',
          monthly_income: profile?.monthly_income || 0,
          profile_photo: profile?.profile_photo || '',
          has_cards: profile?.has_cards || false,
          has_accounts: profile?.has_accounts || false,
          is_onboarded: profile?.is_onboarded || false
        },
        banks: banks || [],
        savingsGoals: savingsGoals || [],
        transactions: (transactions || []).map(transaction => ({
          ...transaction,
          type: transaction.type as 'income' | 'expense'
        })),
        currency: settings?.currency || 'USD',
        loading: false,
        isNewUser
      }));
    } catch (error) {
      console.error('Error loading user data:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
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

  const uploadProfilePhoto = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/profile.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Error uploading photo:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(fileName);

    // Update profile with new photo URL
    await updateUserData({ profile_photo: data.publicUrl });

    return data.publicUrl;
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

    // Mark user as having accounts
    await updateUserData({ has_accounts: true });
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

    // Mark user as onboarded after first transaction
    if (state.isNewUser) {
      await updateUserData({ is_onboarded: true });
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
      refreshData,
      uploadProfilePhoto
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
