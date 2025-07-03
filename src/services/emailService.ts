interface EmailNotification {
  to: string;
  subject: string;
  message: string;
  type: 'security' | 'transaction' | 'budget' | 'general';
}

class EmailNotificationService {
  private static instance: EmailNotificationService;

  private constructor() {}

  public static getInstance(): EmailNotificationService {
    if (!EmailNotificationService.instance) {
      EmailNotificationService.instance = new EmailNotificationService();
    }
    return EmailNotificationService.instance;
  }

  async sendNotification(notification: EmailNotification): Promise<boolean> {
    try {
      // Simulate email sending - in a real app, this would integrate with your email service
      console.log('Sending email notification:', notification);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show browser notification if permission is granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.subject, {
          body: notification.message,
          icon: '/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png'
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to send email notification:', error);
      return false;
    }
  }

  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  // Predefined notification templates
  async sendSecurityAlert(email: string, message: string): Promise<boolean> {
    return this.sendNotification({
      to: email,
      subject: '🔒 Security Alert - FinnTra',
      message,
      type: 'security'
    });
  }

  async sendTransactionAlert(email: string, amount: number, description: string): Promise<boolean> {
    return this.sendNotification({
      to: email,
      subject: '💳 Transaction Alert - FinnTra',
      message: `New transaction: $${amount.toFixed(2)} - ${description}`,
      type: 'transaction'
    });
  }

  async sendBudgetAlert(email: string, category: string, percentage: number): Promise<boolean> {
    return this.sendNotification({
      to: email,
      subject: '📊 Budget Alert - FinnTra',
      message: `You've used ${percentage}% of your ${category} budget this month`,
      type: 'budget'
    });
  }

  async send2FACode(email: string, code: string): Promise<boolean> {
    return this.sendNotification({
      to: email,
      subject: '🔐 Your FinnTra Verification Code',
      message: `Your verification code is: ${code}. This code will expire in 10 minutes.`,
      type: 'security'
    });
  }

  async sendPasswordReset(email: string, code: string): Promise<boolean> {
    return this.sendNotification({
      to: email,
      subject: '🔑 Password Reset Code - FinnTra',
      message: `Your password reset code is: ${code}. This code will expire in 15 minutes.`,
      type: 'security'
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    return this.sendNotification({
      to: email,
      subject: '🎉 Welcome to FinnTra - Your Financial Journey Begins!',
      message: `Welcome to FinnTra, ${name}!

We're excited to help you take control of your finances. Here's what you can do:

✅ Track your expenses and income
✅ Set up budgets and savings goals  
✅ Connect your bank accounts
✅ Generate detailed financial reports
✅ Get AI-powered financial insights

Your account is now active and ready to use!

Best regards,
The FinnTra Team`,
      type: 'general'
    });
  }

  async sendTransactionSummary(email: string, totalIncome: number, totalExpenses: number, period: string): Promise<boolean> {
    const netChange = totalIncome - totalExpenses;
    const status = netChange >= 0 ? 'positive' : 'negative';
    
    return this.sendNotification({
      to: email,
      subject: `📊 Your ${period} Financial Summary - FinnTra`,
      message: `Your ${period} Financial Summary:

💰 Total Income: $${totalIncome.toFixed(2)}
💸 Total Expenses: $${totalExpenses.toFixed(2)}
📈 Net Change: ${netChange >= 0 ? '+' : ''}$${netChange.toFixed(2)}

${status === 'positive' ? 
  'Great job! You\'re on track with your financial goals.' : 
  'Consider reviewing your expenses to improve your financial health.'}

Check your dashboard for detailed insights.`,
      type: 'general'
    });
  }
}

export const emailService = EmailNotificationService.getInstance();
