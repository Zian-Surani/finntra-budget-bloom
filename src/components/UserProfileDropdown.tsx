
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, CreditCard, Building2, PieChart, FileText, MessageCircle, LogOut } from 'lucide-react';

export const UserProfileDropdown = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">Welcome!</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                user@example.com
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.location.href = '/bank-connections'}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Cards</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/bank-connections'}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Accounts</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/dashboard/user'}>
            <User className="mr-2 h-4 w-4" />
            <span>User Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/dashboard/user'}>
            <PieChart className="mr-2 h-4 w-4" />
            <span>Savings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/expense-report'}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Export Report to PDF</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowChatbot(true)}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Income Management Chat</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.location.href = '/'}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showChatbot && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Income Management Assistant</h3>
            <div className="space-y-3 text-sm">
              <p>💡 <strong>Tip:</strong> Set up automatic savings transfers for 20% of your income.</p>
              <p>📊 <strong>Budget Rule:</strong> Follow the 50/30/20 rule - 50% needs, 30% wants, 20% savings.</p>
              <p>🎯 <strong>Goal Setting:</strong> Create specific financial goals and track progress monthly.</p>
              <p>📈 <strong>Investment:</strong> Consider diversifying with low-cost index funds.</p>
            </div>
            <Button 
              onClick={() => setShowChatbot(false)}
              className="w-full mt-4"
            >
              Got it, thanks!
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
