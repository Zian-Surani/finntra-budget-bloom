
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

interface RealtimeUpdatesProps {
  hasNewUpdate?: boolean;
}

export const RealtimeUpdates = ({ hasNewUpdate }: RealtimeUpdatesProps) => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (hasNewUpdate) {
      setShowIndicator(true);
      const timer = setTimeout(() => setShowIndicator(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasNewUpdate]);

  if (!showIndicator) return null;

  return (
    <Badge 
      variant="secondary" 
      className="absolute -top-1 -right-1 h-3 w-3 p-0 bg-yellow-500 animate-pulse"
    />
  );
};
