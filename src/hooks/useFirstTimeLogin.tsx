
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { emailService } from '@/services/emailService';

export const useFirstTimeLogin = () => {
  const { user, session } = useAuth();
  const [hasCheckedFirstLogin, setHasCheckedFirstLogin] = useState(false);

  useEffect(() => {
    const checkFirstTimeLogin = async () => {
      if (!user || !session || hasCheckedFirstLogin) return;

      try {
        // Check if this is the user's first login by looking at their metadata
        const isFirstLogin = !user.user_metadata?.last_login_at;
        const userCreatedAt = new Date(user.created_at);
        const now = new Date();
        const timeDiff = now.getTime() - userCreatedAt.getTime();
        const isNewUser = timeDiff < 60000; // Within last minute

        if (isFirstLogin || isNewUser) {
          console.log('First time login detected, sending welcome email');
          
          // Send welcome email
          await emailService.sendNotification({
            to: user.email || '',
            subject: '🎉 Welcome to FinnTra - Your Financial Journey Begins!',
            message: `
              Welcome to FinnTra, ${user.user_metadata?.name || 'there'}!
              
              We're excited to help you take control of your finances. Here's what you can do:
              
              ✅ Track your expenses and income
              ✅ Set up budgets and savings goals  
              ✅ Connect your bank accounts
              ✅ Generate detailed financial reports
              ✅ Get AI-powered financial insights
              
              Your account is now active and ready to use!
              
              Best regards,
              The FinnTra Team
            `,
            type: 'general'
          });

          // Request notification permission for future alerts
          await emailService.requestNotificationPermission();
        }

        setHasCheckedFirstLogin(true);
      } catch (error) {
        console.error('Error checking first time login:', error);
      }
    };

    checkFirstTimeLogin();
  }, [user, session, hasCheckedFirstLogin]);

  return { hasCheckedFirstLogin };
};
