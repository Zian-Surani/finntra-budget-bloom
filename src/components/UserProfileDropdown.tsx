
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
import { CreditCard, Building2, PiggyBank, FileText, MessageCircle, LogOut, Settings } from 'lucide-react';
import { AiChatModal } from '@/components/AiChatModal';

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
          <DropdownMenuItem onClick={() => window.location.href = '/cards'}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Cards</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/accounts'}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Accounts</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/savings'}>
            <PiggyBank className="mr-2 h-4 w-4" />
            <span>Smart Savings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = '/expense-report'}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Export Report to PDF</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
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
        <AiChatModal onClose={() => setShowChatbot(false)} />
      )}
    </>
  );
};
