
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isConnectedToSupabase, setIsConnectedToSupabase] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkSupabaseConnection = async () => {
    try {
      console.log('ConnectionStatus: Testing Supabase connection');
      const { error } = await supabase.from('profiles').select('count').limit(1);
      const connected = !error;
      setIsConnectedToSupabase(connected);
      setLastChecked(new Date());
      console.log('ConnectionStatus: Supabase connection test result:', connected);
      if (error) {
        console.error('ConnectionStatus: Supabase connection error:', error);
      }
    } catch (error) {
      console.error('ConnectionStatus: Failed to test Supabase connection:', error);
      setIsConnectedToSupabase(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      console.log('ConnectionStatus: Network came online');
      setIsOnline(true);
      checkSupabaseConnection();
    };

    const handleOffline = () => {
      console.log('ConnectionStatus: Network went offline');
      setIsOnline(false);
      setIsConnectedToSupabase(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    checkSupabaseConnection();

    // Periodic check every 30 seconds
    const interval = setInterval(checkSupabaseConnection, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (isOnline && isConnectedToSupabase !== false) {
    return null; // Don't show anything when everything is working
  }

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
      <div className="flex items-center space-x-2">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-orange-600" />
        ) : (
          <WifiOff className="h-4 w-4 text-orange-600" />
        )}
        <AlertDescription className="flex-1">
          {!isOnline ? (
            'You appear to be offline. Some features may not work properly.'
          ) : isConnectedToSupabase === false ? (
            'Having trouble connecting to our servers. Some features may be limited.'
          ) : (
            'Checking connection...'
          )}
          {lastChecked && (
            <span className="text-xs text-gray-500 ml-2">
              Last checked: {lastChecked.toLocaleTimeString()}
            </span>
          )}
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          onClick={checkSupabaseConnection}
          className="ml-2"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      </div>
    </Alert>
  );
};

export default ConnectionStatus;
