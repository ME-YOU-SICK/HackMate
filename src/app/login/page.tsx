import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 text-white">
        <CardHeader className="text-center">
          <CardTitle className="font-sora text-2xl">Welcome Back</CardTitle>
          <CardDescription>Log in to find your hackathon team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Log In
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <Separator className="flex-1 bg-slate-600" />
            <span className="mx-4 text-xs text-slate-400">OR CONTINUE WITH</span>
            <Separator className="flex-1 bg-slate-600" />
          </div>
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange-400 underline hover:text-orange-300">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
