import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Bell, Home, LogOut, MessageSquare, PlusCircle, Settings, User, Users } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  variant?: 'landing' | 'dashboard';
}

export default function Header({ variant = 'dashboard' }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="font-sora text-xl font-bold sm:inline-block">HackMate</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          {variant === 'dashboard' ? (
            <>
               <Button asChild variant="ghost" size="sm">
                  <Link href="/teamify"><Users className="mr-2 h-4 w-4" />Teamify</Link>
              </Button>
              <Button variant="ghost" size="icon">
                <PlusCircle className="h-5 w-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 border-slate-800 bg-slate-900/80 p-0 text-white backdrop-blur">
                  <div className="p-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-slate-400">You have 2 new messages.</p>
                  </div>
                  <Separator />
                  <div className="p-2">
                      <div className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-slate-800">
                        <Avatar className="mt-1 h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Team Invite</p>
                          <p className="text-sm text-slate-400">Team "CodeCrafters" has invited you to join.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-slate-800">
                        <Avatar className="mt-1 h-8 w-8">
                          <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                          <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">New Follower</p>
                          <p className="text-sm text-slate-400">@janedoe started following you.</p>
                        </div>
                      </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
    
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border-slate-800 bg-slate-900/80 text-white backdrop-blur" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile/alex-turing">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
                  <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
