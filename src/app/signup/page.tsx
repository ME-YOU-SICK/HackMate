
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { signUpWithEmailAndPassword, processProviderSignIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader, Github } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";


const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.344-11.303-8H4.694v5.31C8.169,39.863,15.523,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.986,35.62,44,30.36,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProviderLoading, setIsProviderLoading] = useState<null | 'google' | 'github'>(null);


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signUpWithEmailAndPassword(email, password, fullName);

    if (result.success && result.userId) {
      toast({
        title: "Account Created!",
        description: "Welcome to HackMate! Let's get your profile set up.",
      });
      router.push('/dashboard/onboarding');
    } else {
      setIsLoading(false);
      setError(result.error || "An unexpected error occurred.");
    }
  };

  const handleProviderSignup = async (providerName: 'google' | 'github') => {
    setIsProviderLoading(providerName);
    setError(null);

    const provider = providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const serverResult = await processProviderSignIn(user.uid, user.email, user.displayName, user.photoURL);

        if (serverResult.success) {
             toast({
                title: "Account Created!",
                description: "Welcome to HackMate!",
            });
            router.push(serverResult.isNewUser ? '/dashboard/onboarding' : '/dashboard');
        } else {
            setError(serverResult.error || "An unexpected error occurred during profile processing.");
        }

    } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential') {
            setError("An account already exists with the same email address but different sign-in credentials. Please sign in using the original method.");
        } else {
            setError(error.message || "An unexpected error occurred.");
        }
    } finally {
        setIsProviderLoading(null);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-secondary/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create Your Account</CardTitle>
          <CardDescription>Join HackMate to find your dream team.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Signup Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleProviderSignup('google')} disabled={!!isProviderLoading}>
                    {isProviderLoading === 'google' ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <GoogleIcon />}
                    Google
                </Button>
                <Button variant="outline" onClick={() => handleProviderSignup('github')} disabled={!!isProviderLoading}>
                     {isProviderLoading === 'github' ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <Github className="mr-2 h-4 w-4" />}
                    GitHub
                </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="Ada Lovelace" required value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !!isProviderLoading}>
                    {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="w-full text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
      </Card>
    </div>
  );
}
