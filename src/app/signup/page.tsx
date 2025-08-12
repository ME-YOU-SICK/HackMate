import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { Github, User, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card text-white">
        <CardHeader className="text-center">
          <CardTitle className="font-sora text-2xl">Create an Account</CardTitle>
          <CardDescription>Join HackMate to find your next team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>I am a...</Label>
              <ToggleGroup type="single" defaultValue="participant" className="grid grid-cols-2">
                <ToggleGroupItem value="participant" aria-label="Toggle participant">
                  <User className="mr-2 h-4 w-4" />
                  Participant
                </ToggleGroupItem>
                <ToggleGroupItem value="organizer" aria-label="Toggle organizer">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Organizer
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Ada Lovelace" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className={cn('w-full warm-gradient text-white')}>
              Create Account
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 underline hover:text-orange-400">
              Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
